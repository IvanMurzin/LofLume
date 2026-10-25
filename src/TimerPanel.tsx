import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { useSessionClock } from './useSessionClock.ts';
import type { ClockMode, ClockSettings } from './clock.ts';
import { DurationInput } from './DurationInput.tsx';

type Props = { timer: ReturnType<typeof useSessionClock>; open: boolean; clockRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void };
const modes: [ClockMode, string][] = [['timer', 'Таймер'], ['stopwatch', 'Секундомер'], ['pomodoro', 'Помодоро']];
const stageNames = { focus: 'Фокус', short: 'Короткий перерыв', long: 'Длинный перерыв' };
function PomodoroSettings({ settings, locked, onChange }: { settings: ClockSettings; locked: boolean; onChange: (settings: Partial<ClockSettings>) => void }) {
  const [draft, setDraft] = useState({ focus: String(settings.focus), short: String(settings.short), long: String(settings.long) });
  return <div className="pomodoro-settings" id="pomodoro-settings">
    <div className="pomodoro-duration-settings">{(['focus', 'short', 'long'] as const).map(key => <label key={key}><span>{key === 'focus' ? 'Фокус' : key === 'short' ? 'Отдых' : 'Длинный'}</span><div><input aria-label={`${stageNames[key]}, минут`} type="text" inputMode="numeric" maxLength={3} disabled={locked} value={draft[key]} onFocus={event => event.currentTarget.select()} onChange={event => { const value = event.target.value.replace(/\D/g, ''); setDraft(current => ({ ...current, [key]: value })); if (Number(value) >= 1) onChange({ [key]: Math.min(180, Number(value)) }); }} onBlur={() => { const minutes = Math.max(1, Math.min(180, Number(draft[key]) || 1)); setDraft(current => ({ ...current, [key]: String(minutes) })); onChange({ [key]: minutes }); }}/><span>мин</span></div></label>)}</div>
    {locked && <p>Длительности можно изменить после сброса.</p>}
    <label className="pomodoro-auto"><input type="checkbox" checked={settings.auto} onChange={event => onChange({ auto: event.target.checked })}/><span>Автоматически начинать следующий отрезок</span></label>
    <p>После четырёх фокусов — длинный перерыв.</p>
  </div>;
}
export function TimerPanel({ timer, open, clockRef, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { phase } = timer.state;
  const locked = phase === 'running' || phase === 'paused';
  const pomo = timer.mode === 'pomodoro';
  const editable = timer.mode === 'timer' && phase === 'idle';
  const panelMs = pomo && (phase === 'idle' || phase === 'finished') ? timer.model.settings[timer.readyStage] * 60000 : timer.state.remainingMs;
  const totalSeconds = Math.ceil(panelMs / 1000);
  const readout = [Math.floor(totalSeconds / 3600), Math.floor(totalSeconds / 60) % 60, totalSeconds % 60].map(value => String(value).padStart(2, '0'));
  const primaryLabel = phase === 'running' ? 'Пауза' : phase === 'paused' ? 'Продолжить' : pomo ? phase === 'finished' ? timer.readyStage === 'focus' ? 'Начать фокус' : 'Начать перерыв' : 'Начать фокус' : phase === 'finished' ? 'Ещё раз' : 'Старт';
  useEffect(() => {
    if (!open) { setSettingsOpen(false); return; }
    playRef.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const pointerdown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !panelRef.current?.contains(target) && !clockRef.current?.contains(target)) onClose(false);
    };
    document.addEventListener('keydown', keydown); document.addEventListener('pointerdown', pointerdown);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', pointerdown); };
  }, [open, clockRef, onClose]);
  return <section className="music-panel timer-panel" id="timer-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="timer-heading" hidden={!open} data-mode={timer.mode}>
    <header className="music-panel-heading"><span id="timer-heading">Часы</span><button className="music-close" id="timer-close" onClick={() => onClose()} type="button" aria-label="Закрыть часы"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    <div className="clock-modes" role="group" aria-label="Режим часов">{modes.map(([mode, label]) => <button type="button" key={mode} aria-pressed={timer.mode === mode} onClick={() => { timer.selectMode(mode); setSettingsOpen(false); }}>{label}</button>)}</div>
    <form onSubmit={event => { event.preventDefault(); timer.toggle(); }}>
      <div className="timer-readout" role={editable ? 'group' : 'timer'} aria-label={editable ? 'Длительность таймера' : readout.join(':')}>
        {(['Часы', 'Минуты', 'Секунды'] as const).map((label, index) => <div className="timer-field" key={label}>
          {index > 0 && <span className="timer-separator" aria-hidden="true">:</span>}
          {timer.mode === 'timer' ? <DurationInput id={['timer-hours', 'timer-minutes', 'timer-seconds'][index]!} label={label} value={editable ? [timer.hours, timer.minutePart, timer.secondPart][index]! : readout[index]!} readOnly={!editable} onChange={[timer.setHours, timer.setMinutePart, timer.setSecondPart][index]!}/> : <div className="timer-unit"><span className="timer-number">{readout[index]}</span><span>{label.toLowerCase()}</span></div>}
        </div>)}
      </div>
      <div className="clock-context">
        {pomo ? <><span>{stageNames[timer.readyStage]}</span><span className="pomodoro-progress" role="img" aria-label={`Завершено ${timer.model.pomodoro.completed} из 4 фокусов`}>{[1, 2, 3, 4].map(n => <i key={n} className={n <= timer.model.pomodoro.completed ? 'is-complete' : ''}/>)}</span><button type="button" className="clock-settings-button" aria-label="Настройки помодоро" aria-expanded={settingsOpen} aria-controls="pomodoro-settings" onClick={() => setSettingsOpen(value => !value)}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14M7 3v4M13 8v4M8 13v4"/></svg></button></> : null}
      </div>
      <div className="timer-actions"><button className="music-play" id="timer-toggle" ref={playRef} type="submit" disabled={!locked && !timer.valid}><svg viewBox="0 0 20 20" aria-hidden="true">{phase === 'running' ? <path d="M7 5v10M13 5v10"/> : <path d="m6 4 8 6-8 6Z"/>}</svg>{primaryLabel}</button><button className="timer-reset" id="timer-reset" type="button" onClick={timer.reset} disabled={phase === 'idle'} aria-label="Сбросить часы" title="Сбросить"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8a6 6 0 1 1 0 5M4 3v5h5"/></svg></button></div>
    </form>
    {pomo && settingsOpen && <PomodoroSettings settings={timer.model.settings} locked={timer.model.pomodoro.timer.phase !== 'idle'} onChange={timer.setSettings}/>}
  </section>;
}
