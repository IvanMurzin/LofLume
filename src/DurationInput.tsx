import { insertTimerDigit } from './timer.ts';

type Props = { id: string; label: string; value: string; readOnly: boolean; onChange: (value: string) => void };

export function DurationInput({ id, label, value, readOnly, onChange }: Props) {
  return <label className="timer-unit"><input
    id={id} aria-label={label} type="text" inputMode="numeric" autoComplete="off"
    value={value} readOnly={readOnly} tabIndex={readOnly ? -1 : 0}
    onFocus={event => { if (!readOnly) event.currentTarget.select(); }}
    onClick={event => { if (!readOnly) event.currentTarget.select(); }}
    onPointerDown={event => { if (readOnly) event.preventDefault(); }}
    onBlur={() => { if (!readOnly) onChange(value.padStart(2, '0')); }}
    onKeyDown={event => {
      if (readOnly || event.ctrlKey || event.metaKey || event.altKey || event.nativeEvent.isComposing || !/^\d$/.test(event.key)) return;
      event.preventDefault();
      const input = event.currentTarget;
      onChange(insertTimerDigit(value, event.key, input.selectionStart ?? 0, input.selectionEnd ?? value.length));
    }}
    onPaste={event => {
      if (readOnly) return;
      event.preventDefault();
      onChange(event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 2));
    }}
    onChange={event => {
      const inserted = (event.nativeEvent as InputEvent).data;
      const next = event.currentTarget.value;
      // Mobile keyboards may bypass keydown: do not let a full field reject typing.
      onChange(next.length > 2 && inserted && /^\d+$/.test(inserted) ? inserted.slice(-2) : next);
    }}
  /><span>{label.toLowerCase()}</span></label>;
}
