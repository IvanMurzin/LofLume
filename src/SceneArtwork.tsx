import type { Space } from './spaces.ts';
import { useI18n } from './I18n.tsx';
import type { RefObject } from "react";

type Props = { space: Space; dictionaryRef: RefObject<SVGGElement | null>; languageOpen: boolean; onOpenLanguage: () => void; notesRef: RefObject<SVGGElement | null>; notesOpen: boolean; onOpenNotes: () => void; cassetteRef: RefObject<SVGGElement | null>; cassetteOpen: boolean; onOpenCassettes: () => void; dimmed: boolean; onToggleLight: () => void; exploring: boolean; playing: boolean; panelOpen: boolean; radioRef: RefObject<SVGGElement | null>; onOpenRadio: () => void; clockRef: RefObject<SVGGElement | null>; timerOpen: boolean; timerLabel: string; onOpenTimer: () => void };

export function SceneArtwork({ space, dictionaryRef, languageOpen, onOpenLanguage, notesRef, notesOpen, onOpenNotes, cassetteRef, cassetteOpen, onOpenCassettes, dimmed, onToggleLight, exploring, playing, panelOpen, radioRef, onOpenRadio, clockRef, timerOpen, timerLabel, onOpenTimer }: Props) {
  const { t } = useI18n();
  return <>
          <svg className={exploring ? "room-objects is-exploring" : "room-objects"} id="room-objects" viewBox={`0 0 ${space.width} ${space.height}`} aria-label={t('roomObjects')}>
            <defs>
              <marker id="pencil-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M2 2 Q6 5 10 6 Q6 7 2 10"/></marker>
            </defs>
            <g ref={dictionaryRef} className="object-target" data-object="language" tabIndex={0} role="button" aria-label={t('chooseLanguage')} aria-haspopup="dialog" aria-expanded={languageOpen} aria-controls="language-panel" onClick={onOpenLanguage} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenLanguage(); } }}><path className="object-shape" d={space.objects.language}/></g>
            <g ref={clockRef} onClick={onOpenTimer} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenTimer(); } }} className="object-target" data-object="timer" tabIndex={0} role="button" aria-label={timerLabel} aria-haspopup="dialog" aria-expanded={timerOpen} aria-controls="timer-panel">
              <path className="object-shape" d={space.objects.timer}/>
            </g>
            <g ref={radioRef} onClick={onOpenRadio} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenRadio(); } }} className={playing ? "object-target is-playing" : "object-target"} data-object="music" tabIndex={0} role="button" aria-label={playing ? t('radioPlaying') : t('radioPlayHint')} aria-haspopup="dialog" aria-expanded={panelOpen} aria-controls="music-panel">
              <path fillRule="evenodd" className="object-shape" d={space.objects.music}/>
            </g>
            <g className="object-target" data-object="light" tabIndex={0} role="button" aria-label={dimmed ? t('restoreLight') : t('dimLight')} aria-pressed={dimmed} onClick={onToggleLight} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onToggleLight(); } }}>
              <path className="object-shape exclude-discovery" d={space.objects.light}/>
            </g>
            <g ref={cassetteRef} className="object-target" data-object="cassettes" tabIndex={0} role="button" aria-label={t('tapesHint')} aria-haspopup="dialog" aria-expanded={cassetteOpen} aria-controls="cassette-panel" onClick={onOpenCassettes} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenCassettes(); } }}><path className="object-shape" d={space.objects.cassettes}/></g>
            <g ref={notesRef} className="object-target" data-object="notes" tabIndex={0} role="button" aria-label={t('notesHint')} aria-haspopup="dialog" aria-expanded={notesOpen} aria-controls="notes-panel" onClick={onOpenNotes} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenNotes(); } }}><path className="object-shape" d={space.objects.notes}/></g>
            <g className="annotations" id="landmarks" aria-hidden="true">
              {space.landmarks.map(mark => <g className="annotation" key={mark.key}><text x={mark.x} y={mark.y} transform={`rotate(${mark.rotation ?? -5} ${mark.x} ${mark.y})`}>{t(mark.key)}</text><path className="annotation-arrow" d={mark.arrow}/></g>)}
            </g>
          </svg>
  </>;
}
