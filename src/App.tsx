import { SmallInteractions } from './SmallInteractions.tsx';
import { useI18n } from './I18n.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { LanguagePanel } from './LanguagePanel.tsx';
import { NotesPanel } from './NotesPanel.tsx';
import { useNotes } from './useNotes.ts';
import { useCassettes } from './useCassettes.ts';
import { CassettePanel } from './CassettePanel.tsx';
import { PlayerScreen } from './PlayerScreen.tsx';
import type { ExternalControls, ExternalPhase } from './ExternalPlayer.tsx';
import type { Cassette } from './cassettes.ts';
import { publicAsset } from './assets.ts';
import { SceneArtwork } from './SceneArtwork.tsx';
import { useMusic } from './useMusic.ts';
import { useRoom } from './useRoom.ts';
import { useSessionClock } from './useSessionClock.ts';
import { ClockDisplay } from './ClockDisplay.tsx';
import { TimerPanel } from './TimerPanel.tsx';
import { formatTimer } from './timer.ts';
import { useTimerFeedback } from './useTimerFeedback.ts';
import { TimerNotice } from './TimerNotice.tsx';

export function App() {
  const { t, providers } = useI18n();
  const [languageOpen, setLanguageOpen] = useState(false);
  const dictionaryRef = useRef<SVGGElement>(null);
  const closeLanguage = useCallback((returnFocus = true) => { setLanguageOpen(false); if (returnFocus) dictionaryRef.current?.focus({ preventScroll: true }); }, []);
  const room = useRoom();
  const music = useMusic();
  const cassettes = useCassettes();
  const notes = useNotes();
  const [notesPinned, setNotesPinned] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const notesRef = useRef<SVGGElement>(null);
  const closeNotes = useCallback((returnFocus = true) => { setNotesOpen(false); if (returnFocus) notesRef.current?.focus({ preventScroll: true }); }, []);
  const [cassetteOpen, setCassetteOpen] = useState(false);
  const cassetteRef = useRef<SVGGElement>(null);
  const [installed, setInstalled] = useState<{ slot: number; tape: Cassette; revision: number } | null>(null);
  const revision = useRef(0);
  const [externalPhase, setExternalPhase] = useState<ExternalPhase>('loading');
  const [canControl, setCanControl] = useState(false);
  const externalControls = useRef<ExternalControls | null>(null);
  const screenAction = useRef<HTMLButtonElement>(null);
  const updateControls = useCallback((controls: ExternalControls | null) => { externalControls.current = controls; setCanControl(!!controls); }, []);
  const closeCassettes = useCallback((returnFocus = true) => { setCassetteOpen(false); if (returnFocus) cassetteRef.current?.focus({ preventScroll: true }); }, []);
  const timer = useSessionClock();
  const timerFeedback = useTimerFeedback(timer.state, music.state.volume, timer);
  const toggleTimer = () => {
    if (timer.state.phase !== "running" && timer.valid) timerFeedback.prepareSound();
    timer.toggle();
  };
  const [timerPinned, setTimerPinned] = useState(false);
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
  const message = state.error ? t('musicError') : (state.phase === 'loading' ? t('loading') : '');
  const playLabel = state.phase === 'error' ? t('retryMusic') : active ? t('pause') : t('playMusic');
  const fullscreenLabel = room.fullscreen ? t('exitFullscreen') : t('fullscreen');
  const closePanel = useCallback((returnFocus = true) => {
    setPanelOpen(false);
    if (returnFocus) radioRef.current?.focus({ preventScroll: true });
  }, []);
  const raisePanel = (id: string) => document.getElementById(id)?.querySelector<HTMLElement>('.floating-grab')?.focus({ preventScroll: true });
  function openPanel() {
    setLanguageOpen(false); if (!notesPinned) setNotesOpen(false);
    setCassetteOpen(false);
    if (installed) { screenAction.current?.focus({ preventScroll: true }); return; }
    if (!timerPinned) setTimerOpen(false);
    setPanelOpen(true);
    // An already open panel should also return focus to its main action.
    playRef.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (panelOpen) playRef.current?.focus({ preventScroll: true });
  }, [panelOpen]);
  useEffect(() => {
    if (!panelOpen) return;
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape' && !event.defaultPrevented && !document.activeElement?.closest('.floating-panel')) closePanel(); };
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
  useEffect(() => { if (installed) screenAction.current?.focus({ preventScroll: true }); }, [installed]);
  function installCassette(slot: number, tape: Cassette) {
    music.pause();
    cassettes.playSound(state.volume, 'insert');
    setExternalPhase('loading'); setCanControl(false);
    setInstalled({ slot, tape, revision: ++revision.current });
    setLanguageOpen(false); if (!notesPinned) setNotesOpen(false); setCassetteOpen(false); setPanelOpen(false); if (!timerPinned) setTimerOpen(false);
  }
  function ejectCassette(openRadio = false) {
    if (installed) cassettes.playSound(state.volume, 'eject');
    setInstalled(null); setCanControl(false); externalControls.current = null;
    if (openRadio) { setCassetteOpen(false); if (!timerPinned) setTimerOpen(false); setPanelOpen(true); }
  }
  return (
    <main className="room" aria-label={t('roomLabel')}>
      <div className="scene-viewport" style={{ "--scene-ratio": room.ratio } as CSSProperties}>
        <div className="scene" id="scene" data-light={room.dimmed ? "dimmed" : "normal"}>
          <img draggable={false} className="scene-image" id="scene-image" ref={room.imageRef} src={room.imageSrc} onLoad={room.imageLoaded} onError={room.imageFailed} alt={t('sceneAlt')} fetchPriority="high" width="1671" height="941" />
          <ClockDisplay state={timer.state} />
          {installed && <svg className="cassette-indicator" viewBox="0 0 1671 941" aria-hidden="true"><g transform="matrix(1 .065 0 1 1438 687)"><rect x="0" y="0" width="103" height="28" rx="3"/><circle cx="10" cy="14" r="2.2" className={externalPhase === 'playing' ? 'tape-led is-playing' : 'tape-led'}/><text x="20" y="18">{installed.tape.name.length > 12 ? installed.tape.name.slice(0, 11) + '…' : installed.tape.name}</text></g></svg>}
          <TimerNotice message={timer.noticeText} visible={timerFeedback.noticeVisible} onDismiss={timerFeedback.dismissNotice} />
          <SceneArtwork dictionaryRef={dictionaryRef} languageOpen={languageOpen} onOpenLanguage={() => { if (!notesPinned) setNotesOpen(false); setCassetteOpen(false); if (!timerPinned) setTimerOpen(false); setPanelOpen(false); setLanguageOpen(true); }} notesRef={notesRef} notesOpen={notesOpen} onOpenNotes={() => { setLanguageOpen(false); if (!timerPinned) setTimerOpen(false); setPanelOpen(false); setCassetteOpen(false); if (notesOpen) raisePanel('notes-panel'); setNotesOpen(true); }} cassetteRef={cassetteRef} cassetteOpen={cassetteOpen} onOpenCassettes={() => { setLanguageOpen(false); if (!notesPinned) setNotesOpen(false); if (!timerPinned) setTimerOpen(false); setPanelOpen(false); if (cassetteOpen) raisePanel('cassette-panel'); setCassetteOpen(true); }} dimmed={room.dimmed} onToggleLight={room.toggleLight} clockRef={clockRef} timerOpen={timerOpen} timerLabel={t('clockTime', { time: formatTimer(timer.state.remainingMs) })} onOpenTimer={() => { setLanguageOpen(false); if (!notesPinned) setNotesOpen(false); timerFeedback.dismissNotice(); setCassetteOpen(false); setPanelOpen(false); if (timerOpen) raisePanel('timer-panel'); setTimerOpen(true); }} exploring={room.exploring} playing={playing} panelOpen={panelOpen} radioRef={radioRef} onOpenRadio={openPanel} />
          <SmallInteractions />
          <section className="music-panel" id="music-panel" ref={panelRef} data-phase={state.phase} role="dialog" aria-modal="false" aria-labelledby="music-heading" hidden={!panelOpen}>
            <header className="music-panel-heading"><span id="music-heading">{t('radio')}</span><button className="music-close" id="music-close" onClick={() => closePanel()} type="button" aria-label={t('closeRadio')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
            <p id="music-title" className="music-title" aria-live="polite">{state.track.title}</p>
            <p id="music-artist" className="music-artist">{state.track.artist}</p>
            <p id="music-message" className="music-message" role="status" hidden={!message}>{message}</p>
            <div className="music-actions"><button id="music-play" ref={playRef} onClick={music.toggle} aria-label={playLabel} className="music-play" type="button">{state.phase === "error" ? t('tryAgain') : active ? t('pause') : t('play')}</button></div>
            <div className="music-volume"><label htmlFor="music-volume">{t('volume')}</label><output id="music-volume-value" htmlFor="music-volume">{volume}%</output><input id="music-volume" aria-label={t('musicVolume')} type="range" min="0" max="100" value={volume} onChange={event => music.setVolume(Number(event.target.value) / 100)} /></div>
          </section>
          <audio id="scene-audio" ref={music.audioRef} preload="none"></audio>
        </div>
          <LanguagePanel open={languageOpen} objectRef={dictionaryRef} onClose={closeLanguage} />
          <NotesPanel pinned={notesPinned} onTogglePin={() => setNotesPinned(value => !value)} open={notesOpen} notes={notes} objectRef={notesRef} onClose={closeNotes} />
          <CassettePanel open={cassetteOpen} slots={cassettes.slots} activeSlot={installed?.slot} persistent={cassettes.persistent} objectRef={cassetteRef} onClose={closeCassettes} onSave={(slot, tape) => { cassettes.save(slot, tape); if (!tape && installed?.slot === slot) ejectCassette(); }} onInstall={installCassette} />
          {installed && <PlayerScreen objectRef={radioRef} controls={externalControls.current} tape={installed.tape} revision={installed.revision} phase={externalPhase} volume={state.volume} actionRef={screenAction} onEject={() => ejectCassette(true)} onRetry={() => { setExternalPhase('loading'); setInstalled({ ...installed, revision: ++revision.current }); }} onPhase={setExternalPhase} onControls={updateControls} />}
          <TimerPanel timer={{ ...timer, toggle: toggleTimer }} open={timerOpen} clockRef={clockRef} onClose={closeTimer} pinned={timerPinned} onTogglePin={() => setTimerPinned(value => !value)} />
        <div className="scene-hud">
          {installed ? <div className="now-playing tape-now-playing" id="tape-now-playing" aria-label={t('tapeLabel', { number: installed.slot + 1, name: installed.tape.name })}>
            <button className="radio-toggle" type="button" aria-label={canControl ? externalPhase === 'playing' ? t('tapePause') : t('tapePlay') : t('eject')} title={canControl ? t('tapeControls') : t('eject')} onClick={() => { if (canControl) externalControls.current?.toggle(); else ejectCassette(); }}><svg viewBox="0 0 20 20" aria-hidden="true"><path d={canControl ? externalPhase === 'playing' ? 'M7 5v10M13 5v10' : 'M7 4l9 6-9 6Z' : 'M5 5h10v10H5Z'}/></svg></button>
            <div className="ticker-viewport"><div className="ticker-track">{[0, 1].map(copy => <span className="ticker-copy" key={copy} aria-hidden={copy === 1 ? true : undefined}><span className="ticker-title">{installed.tape.name}</span><span>—</span><a className="ticker-artist" href={installed.tape.url} target="_blank" rel="noopener noreferrer" tabIndex={copy === 1 ? -1 : undefined}>{providers[installed.tape.provider]}</a></span>)}</div></div>
          </div> : <>

        <div className="now-playing" id="now-playing" hidden={state.phase === "idle"} aria-label={playing ? t('nowPlaying', { title: state.track.title, artist: state.track.artist }) : t('radio')}>
          <button className="radio-toggle" id="radio-toggle" onClick={music.toggle} type="button" aria-label={playLabel} title={playLabel}><svg viewBox="0 0 20 20" aria-hidden="true"><path id="radio-toggle-icon" d={active ? "M7 5v10M13 5v10" : "M7 4l9 6-9 6Z"}/></svg></button>
          <div className="ticker-viewport" hidden={!playing}><div className="ticker-track">
            <span className="ticker-copy"><span className="ticker-title">{state.track.title}</span><span aria-hidden="true"> — </span><a className="ticker-artist" href={state.track.artistUrl ?? state.track.source} target="_blank" rel="noopener noreferrer">{state.track.artist}</a></span>
            <span className="ticker-copy" aria-hidden="true"><span className="ticker-title">{state.track.title}</span><span> — </span><a className="ticker-artist" href={state.track.artistUrl ?? state.track.source} tabIndex={-1} target="_blank" rel="noopener noreferrer">{state.track.artist}</a></span>
          </div></div>
          <span className="radio-status" id="radio-status" hidden={playing}>{state.phase === "loading" ? t('loading') : state.phase === "error" ? t('retryPlayback') : t('radioPaused')}</span>
        </div>
        </>}
        </div>
      </div>
      <header className="room-header">
        <span className="wordmark" aria-label="LofLume"><img src={publicAsset("favicon.svg")} width="28" height="28" alt="" />loflume</span>
        <button className="icon-button" id="fullscreen" onClick={room.toggleFullscreen} hidden={!document.fullscreenEnabled} type="button" aria-label={fullscreenLabel} title={fullscreenLabel}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5H5v3m11-3h3v3M5 16v3h3m11-3v3h-3"/></svg></button>
      </header>
      <footer className="room-footer">
        <div className="room-caption" id="room-caption"><h1>Home Work</h1><p className="eyebrow">Lofi · chill · focus</p></div>
        <button className="explore-button" id="explore" onClick={room.showLandmarks} type="button" aria-pressed={room.exploring} aria-controls="landmarks"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><span>{t('explore')}</span></button>
      </footer>
      <p className="sr-only" role="status" aria-live="polite">{timerFeedback.noticeVisible ? timer.noticeText : ""}</p>
      <p id="status" className="sr-only" role="status" aria-live="polite">{room.status ? t(room.status) : ''}</p>
      <div id="image-error" className="image-error" hidden={!room.imageError}><p>{t('roomError')}</p><button type="button" id="retry-image" onClick={room.retryImage}>{t('tryAgain')}</button></div>
    </main>
  );
}
