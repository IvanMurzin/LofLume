import type { EditorState, Range } from '@codemirror/state';
import { Decoration, ViewPlugin, WidgetType } from '@codemirror/view';
import type { DecorationSet, ViewUpdate, EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';

class Bullet extends WidgetType {
  eq() { return true; }
  toDOM() {
    const span = document.createElement('span');
    span.className = 'cm-live-bullet'; span.textContent = '•'; span.setAttribute('aria-hidden', 'true');
    return span;
  }
  ignoreEvent() { return false; }
}
const bullet = new Bullet();
// Decorations change only presentation. The document, clipboard and saved text
// retain the user's original Markdown, including whitespace and delimiters.
export function markdownDecorations(state: EditorState): DecorationSet {
  const ranges: Range<Decoration>[] = [];
  const editing = (from: number, to: number) => state.selection.ranges.some(range => range.from <= to && range.to >= from);
  const mark = (from: number, to: number, className: string) => { if (to > from) ranges.push(Decoration.mark({ class: className }).range(from, to)); };
  const line = (position: number, className: string) => ranges.push(Decoration.line({ class: className }).range(state.doc.lineAt(position).from));
  const hide = (from: number, to: number) => { if (to > from) ranges.push(Decoration.replace({}).range(from, to)); };
  syntaxTree(state).iterate({ enter(node) {
    const heading = /^(?:ATX|Setext)Heading([1-6])$/.exec(node.name);
    if (heading) line(node.from, `cm-live-heading cm-live-h${heading[1]}`);
    if (node.name === 'FencedCode' || node.name === 'CodeBlock') {
      for (let n = state.doc.lineAt(node.from).number; n <= state.doc.lineAt(node.to).number; n++) line(state.doc.line(n).from, 'cm-live-code-line');
      return false;
    }
    if (node.name === 'HeaderMark' || node.name === 'QuoteMark') {
      const to = state.sliceDoc(node.to, node.to + 1) === ' ' ? node.to + 1 : node.to;
      if (editing(node.from, to)) mark(node.from, node.to, 'cm-live-syntax'); else hide(node.from, to);
    }
    if (node.name === 'Blockquote') {
      for (let n = state.doc.lineAt(node.from).number; n <= state.doc.lineAt(node.to).number; n++) line(state.doc.line(n).from, 'cm-live-quote');
    }
    if (node.name === 'ListMark') {
      line(node.from, 'cm-live-list');
      if (/^[-+*]$/.test(state.sliceDoc(node.from, node.to)) && !editing(node.from, node.to)) ranges.push(Decoration.replace({ widget: bullet }).range(node.from, node.to));
      else mark(node.from, node.to, 'cm-live-syntax');
    }
    if (node.name === 'StrongEmphasis') mark(node.from, node.to, 'cm-live-strong');
    if (node.name === 'Emphasis') mark(node.from, node.to, 'cm-live-emphasis');
    if (node.name === 'InlineCode') mark(node.from, node.to, 'cm-live-inline-code');
    if (node.name === 'EmphasisMark' || node.name === 'CodeMark') {
      const parent = node.node.parent;
      if (parent && editing(parent.from, parent.to)) mark(node.from, node.to, 'cm-live-syntax'); else hide(node.from, node.to);
    }
    if (node.name === 'Link') mark(node.from, node.to, 'cm-live-link');
    if ((node.name === 'LinkMark' || node.name === 'URL') && node.node.parent?.name === 'Link') {
      const parent = node.node.parent;
      if (!editing(parent.from, parent.to)) hide(node.from, node.to); else mark(node.from, node.to, 'cm-live-syntax');
    }
  } });
  return Decoration.set(ranges, true);
}
export const liveMarkdown = ViewPlugin.fromClass(class {
  decorations: DecorationSet;
  constructor(view: EditorView) { this.decorations = markdownDecorations(view.state); }
  update(update: ViewUpdate) {
    if (update.docChanged || update.selectionSet || update.viewportChanged || syntaxTree(update.startState) !== syntaxTree(update.state)) this.decorations = markdownDecorations(update.state);
  }
}, { decorations: plugin => plugin.decorations });
