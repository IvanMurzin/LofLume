import { useI18n } from './I18n.tsx';
import { useRef } from 'react';
import { FloatingPanel } from './FloatingPanel.tsx';
import type { RefObject } from 'react';
import { ExternalPlayer } from './ExternalPlayer.tsx';
import type { ExternalControls, ExternalPhase } from './ExternalPlayer.tsx';
import type { Cassette } from './cassettes.ts';

type Props = { objectRef: RefObject<SVGGElement | null>; controls: ExternalControls | null; tape: Cassette; revision: number; phase: ExternalPhase; volume: number; actionRef: RefObject<HTMLButtonElement | null>; onEject: () => void; onRetry: () => void; onPhase: (phase: ExternalPhase) => void; onControls: (controls: ExternalControls | null) => void };
export function PlayerScreen({ objectRef, controls, tape, revision, phase, volume, actionRef, onEject, onRetry, onPhase, onControls }: Props) {
  const { t } = useI18n();
  const screenRef = useRef<HTMLElement>(null);
  return <FloatingPanel panelRef={screenRef} anchorRef={objectRef} className="external-screen" title={tape.name} width={tape.provider === 'yandex' ? 280 : 320} placement="player" attributes={{ 'data-provider': tape.provider, 'data-phase': phase }} actions={<button ref={actionRef} type="button" className="eject-cassette" onClick={onEject} aria-label={t('eject')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 12 6-8 6 8ZM4 16h12"/></svg><span>{t('eject')}</span></button>}>
    <ExternalPlayer key={revision} tape={tape} volume={volume} onPhase={onPhase} onControls={onControls} />
    {tape.provider === 'yandex' && controls?.previous && controls.next && <div className="compact-transport" aria-label={t('yandexControls')}><button type="button" aria-label={t('previousTrack')} onClick={controls.previous}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5v10M15 5 7 10l8 5Z"/></svg></button><button type="button" aria-label={phase === 'playing' ? t('tapePause') : t('tapePlay')} onClick={controls.toggle}><svg viewBox="0 0 20 20" aria-hidden="true"><path d={phase === 'playing' ? 'M7 5v10M13 5v10' : 'M6 4l8 6-8 6Z'}/></svg></button><button type="button" aria-label={t('nextTrack')} onClick={controls.next}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15 5v10M5 5l8 5-8 5Z"/></svg></button></div>}
    {phase === 'loading' && <p className="external-loading" role="status">{t('loading')}</p>}
    {phase === 'error' && <div className="external-screen-footer external-error-actions" role="status"><span>{t('playerError')}</span><button type="button" onClick={onRetry}>{t('retry')}</button><a href={tape.url} target="_blank" rel="noopener noreferrer">{t('openService')}</a></div>}
  </FloatingPanel>;
}
