import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { SceneArtwork } from './SceneArtwork.tsx';
import { useMusic } from './useMusic.ts';
import { useRoom } from './useRoom.ts';
import { useFocusTimer } from './useFocusTimer.ts';
import { ClockDisplay } from './ClockDisplay.tsx';
import { TimerPanel } from './TimerPanel.tsx';
import { formatTimer } from './timer.ts';

export function App() {
  const room = useRoom();
  const music = useMusic();
  const timer = useFocusTimer();
  const [timerOpen, setTimerOpen] = useState(false);
  const clockRef = useRef<SVGGElement>(null);
  const closeTimer = useCallback((returnFocus = true) => {
    setTimerOpen(false);
    if (returnFocus) clockRef.current?.focus({ preventScroll: true });
  }, []);
  const { state } = music;
  const [panelOpen, setPanelOpen] = useState(false);
  const radioRef = useRef<SVGGElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const playing = state.phase === 'playing';
  const active = playing || state.phase === 'loading';
  const volume = Math.round(state.volume * 100);
  const message = state.error ?? (state.phase === 'loading' ? 'Загрузка…' : '');
  const playLabel = state.phase === 'error' ? 'Повторить запуск музыки' : active ? 'Пауза' : 'Включить музыку';
  const fullscreenLabel = room.fullscreen ? 'Выйти из полного экрана' : 'На весь экран';
  const closePanel = useCallback((returnFocus = true) => {
    setPanelOpen(false);
    if (returnFocus) radioRef.current?.focus({ preventScroll: true });
  }, []);
  function openPanel() {
    setTimerOpen(false);
    setPanelOpen(true);
    // An already open panel should also return focus to its main action.
    playRef.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (panelOpen) playRef.current?.focus({ preventScroll: true });
  }, [panelOpen]);
  useEffect(() => {
    if (!panelOpen) return;
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') closePanel(); };
    const pointerdown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !panelRef.current?.contains(target) && !radioRef.current?.contains(target)) closePanel(false);
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', pointerdown);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('pointerdown', pointerdown);
    };
  }, [panelOpen, closePanel]);
  return (
    <main className="room" aria-label="Домашняя комната для кодинга">
      <div className="scene-viewport" style={{ "--scene-ratio": room.ratio } as CSSProperties}>
        <div className="scene" id="scene">
          <img className="scene-image" id="scene-image" ref={room.imageRef} src={room.imageSrc} onLoad={room.imageLoaded} onError={room.imageFailed} alt="Девушка в наушниках работает за ноутбуком у окна. За окном закат над городом и рекой. На столе — чашка, часы, радио и лампа." fetchPriority="high" width="1672" height="941" />
          <ClockDisplay state={timer.state} />
          <p className="timer-complete" hidden={timer.state.phase !== "finished"}>Время вышло</p>
          <TimerPanel timer={timer} open={timerOpen} clockRef={clockRef} onClose={closeTimer} />
          <SceneArtwork clockRef={clockRef} timerOpen={timerOpen} timerLabel={`Часы — ${formatTimer(timer.state.remainingMs)}`} onOpenTimer={() => { setPanelOpen(false); setTimerOpen(true); }} exploring={room.exploring} playing={playing} panelOpen={panelOpen} radioRef={radioRef} onOpenRadio={openPanel} />
          <section className="music-panel" id="music-panel" ref={panelRef} data-phase={state.phase} role="dialog" aria-modal="false" aria-labelledby="music-heading" hidden={!panelOpen}>
            <header className="music-panel-heading"><span id="music-heading">Радио LofLume</span><button className="music-close" id="music-close" onClick={() => closePanel()} type="button" aria-label="Закрыть радио"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
            <p id="music-title" className="music-title" aria-live="polite">{state.track.title}</p>
            <p id="music-artist" className="music-artist">{state.track.artist}</p>
            <p id="music-message" className="music-message" role="status" hidden={!message}>{message}</p>
            <div className="music-actions"><button id="music-play" ref={playRef} onClick={music.toggle} aria-label={playLabel} className="music-play" type="button">{state.phase === "error" ? "Попробовать ещё раз" : active ? "Пауза" : "Включить"}</button></div>
            <div className="music-volume"><label htmlFor="music-volume">Громкость</label><output id="music-volume-value" htmlFor="music-volume">{volume}%</output><input id="music-volume" aria-label="Громкость музыки" type="range" min="0" max="100" value={volume} onChange={event => music.setVolume(Number(event.target.value) / 100)} /></div>
          </section>
          <audio id="scene-audio" ref={music.audioRef} preload="none"></audio>
        </div>
        <div className="scene-hud">
        <div className="now-playing" id="now-playing" hidden={state.phase === "idle"} aria-label={playing ? "Сейчас играет: " + state.track.title + " — " + state.track.artist : "Радио LofLume"}>
          <button className="radio-toggle" id="radio-toggle" onClick={music.toggle} type="button" aria-label={playLabel} title={playLabel}><svg viewBox="0 0 20 20" aria-hidden="true"><path id="radio-toggle-icon" d={active ? "M7 5v10M13 5v10" : "M7 4l9 6-9 6Z"}/></svg></button>
          <div className="ticker-viewport" hidden={!playing}><div className="ticker-track">
            <span className="ticker-copy"><span className="ticker-title">{state.track.title}</span><span aria-hidden="true"> — </span><a className="ticker-artist" href={state.track.artistUrl ?? state.track.source} target="_blank" rel="noopener noreferrer">{state.track.artist}</a></span>
            <span className="ticker-copy" aria-hidden="true"><span className="ticker-title">{state.track.title}</span><span> — </span><a className="ticker-artist" href={state.track.artistUrl ?? state.track.source} tabIndex={-1} target="_blank" rel="noopener noreferrer">{state.track.artist}</a></span>
          </div></div>
          <span className="radio-status" id="radio-status" hidden={playing}>{state.phase === "loading" ? "Загрузка…" : state.phase === "error" ? "Повторить запуск" : "Радио на паузе"}</span>
        </div>
        </div>
      </div>
      <header className="room-header">
        <span className="wordmark" aria-label="LofLume"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V8a7 7 0 0 1 14 0v11H5ZM12 2v17M5 11h14"/></svg>loflume</span>
        <button className="icon-button" id="fullscreen" onClick={room.toggleFullscreen} hidden={!document.fullscreenEnabled} type="button" aria-label={fullscreenLabel} title={fullscreenLabel}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5H5v3m11-3h3v3M5 16v3h3m11-3v3h-3"/></svg></button>
      </header>
      <footer className="room-footer">
        <div className="room-caption" id="room-caption"><h1>Home Work</h1><p className="eyebrow">Lofi · chill · focus</p></div>
        <button className="explore-button" id="explore" onClick={room.showLandmarks} type="button" aria-pressed={room.exploring} aria-controls="landmarks"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><span>Осмотреться</span></button>
      </footer>
      <p className="sr-only" role="status" aria-live="polite">{timer.state.phase === "finished" ? "Время вышло" : ""}</p>
      <p id="status" className="sr-only" role="status" aria-live="polite">{room.status}</p>
      <div id="image-error" className="image-error" hidden={!room.imageError}><p>Не удалось открыть комнату.</p><button type="button" id="retry-image" onClick={room.retryImage}>Попробовать ещё раз</button></div>
    </main>
  );
}
