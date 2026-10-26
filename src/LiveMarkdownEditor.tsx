import { useI18n } from './I18n.tsx';
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, drawSelection, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, isolateHistory } from '@codemirror/commands';
import { markdown, markdownKeymap, insertNewlineContinueMarkupCommand } from '@codemirror/lang-markdown';
import { liveMarkdown } from './liveMarkdown.ts';

export type LiveEditorHandle = { focus: () => void };
type Props = { source: boolean; active: boolean; value: string; onChange: (value: string) => void };
export const LiveMarkdownEditor = forwardRef<LiveEditorHandle, Props>(function LiveMarkdownEditor({ source, active, value, onChange }, ref) {
  const { t, locale } = useI18n();
  const labels = useRef(new Compartment());
  const labelExtensions = () => [placeholder(t('notePlaceholder')), EditorView.contentAttributes.of({ 'aria-label': t('noteEditor'), role: 'textbox', 'aria-multiline': 'true', spellcheck: 'false' })];
  const host = useRef<HTMLDivElement>(null);
  const editor = useRef<EditorView | null>(null);
  const preview = useRef(new Compartment());
  const updateValue = useRef(onChange); updateValue.current = onChange;
  useImperativeHandle(ref, () => ({ focus() { editor.current?.requestMeasure(); editor.current?.focus(); } }), []);
  useLayoutEffect(() => {
    if (!host.current) return;
    const view = new EditorView({ parent: host.current, state: EditorState.create({ doc: value, extensions: [
      history(), drawSelection(), EditorView.lineWrapping,
      markdown({ addKeymap: false, completeHTMLTags: false, pasteURLAsLink: false }),
      keymap.of([{ key: 'Enter', run: insertNewlineContinueMarkupCommand({ nonTightLists: false }) }, ...markdownKeymap.filter(binding => binding.key !== 'Enter'), ...defaultKeymap, ...historyKeymap]),
      preview.current.of(source ? [] : liveMarkdown), labels.current.of(labelExtensions()),
      EditorView.updateListener.of(update => { if (update.docChanged) updateValue.current(update.state.doc.toString()); }),
    ] }) });
    editor.current = view;
    return () => { editor.current = null; view.destroy(); };
    // One editor keeps its selection and undo history across React updates.
  }, []);
  useLayoutEffect(() => {
    const view = editor.current;
    if (view && value !== view.state.doc.toString()) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
  }, [value]);
  useLayoutEffect(() => {
    if (active) { editor.current?.requestMeasure(); editor.current?.focus(); }
    else editor.current?.dispatch({ annotations: isolateHistory.of('full') });
  }, [active]);
  useLayoutEffect(() => {
    editor.current?.dispatch({ effects: preview.current.reconfigure(source ? [] : liveMarkdown), annotations: isolateHistory.of('full') });
    if (active) { editor.current?.requestMeasure(); editor.current?.focus(); }
  }, [source]);
  useLayoutEffect(() => { editor.current?.dispatch({ effects: labels.current.reconfigure(labelExtensions()) }); }, [locale]);
  return <div ref={host} className={`notes-live-editor${source ? ' is-source' : ''}`}/>;
});
