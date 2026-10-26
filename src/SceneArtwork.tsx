import { useI18n } from './I18n.tsx';
import type { RefObject } from "react";

type Props = { dictionaryRef: RefObject<SVGGElement | null>; languageOpen: boolean; onOpenLanguage: () => void; notesRef: RefObject<SVGGElement | null>; notesOpen: boolean; onOpenNotes: () => void; cassetteRef: RefObject<SVGGElement | null>; cassetteOpen: boolean; onOpenCassettes: () => void; dimmed: boolean; onToggleLight: () => void; exploring: boolean; playing: boolean; panelOpen: boolean; radioRef: RefObject<SVGGElement | null>; onOpenRadio: () => void; clockRef: RefObject<SVGGElement | null>; timerOpen: boolean; timerLabel: string; onOpenTimer: () => void };

export function SceneArtwork({ dictionaryRef, languageOpen, onOpenLanguage, notesRef, notesOpen, onOpenNotes, cassetteRef, cassetteOpen, onOpenCassettes, dimmed, onToggleLight, exploring, playing, panelOpen, radioRef, onOpenRadio, clockRef, timerOpen, timerLabel, onOpenTimer }: Props) {
  const { t } = useI18n();
  return <>
          <svg className={exploring ? "room-objects is-exploring" : "room-objects"} id="room-objects" viewBox="0 0 1671 941" aria-label={t('roomObjects')}>
            <defs>
              <marker id="pencil-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M2 2 Q6 5 10 6 Q6 7 2 10"/></marker>
            </defs>
            <g ref={dictionaryRef} className="object-target" data-object="language" tabIndex={0} role="button" aria-label={t('chooseLanguage')} aria-haspopup="dialog" aria-expanded={languageOpen} aria-controls="language-panel" onClick={onOpenLanguage} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenLanguage(); } }}><path className="object-shape" d="M139 104 L217 117 L217 259 L112 246 L112 111 Z"/></g>
            <g ref={clockRef} onClick={onOpenTimer} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenTimer(); } }} className="object-target" data-object="timer" tabIndex={0} role="button" aria-label={timerLabel} aria-haspopup="dialog" aria-expanded={timerOpen} aria-controls="timer-panel">
              <path className="object-shape" d="M1256 678 L1376 687 Q1394 687 1397 705 L1399 752 Q1401 775 1386 777 L1372 777 Q1367 784 1353 781 L1246 770 Q1229 767 1232 748 L1242 699 Q1244 678 1256 678 Z"/>
            </g>
            <g ref={radioRef} onClick={onOpenRadio} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenRadio(); } }} className={playing ? "object-target is-playing" : "object-target"} data-object="music" tabIndex={0} role="button" aria-label={playing ? t('radioPlaying') : t('radioPlayHint')} aria-haspopup="dialog" aria-expanded={panelOpen} aria-controls="music-panel">
              <path className="object-shape" d="M1426 639 L1498 635 L1498 627 L1506 627 L1632 632 L1636 632 L1636 642 L1671 645 L1671 759 L1641 772 L1427 758 Q1414 757 1415 744 L1416 654 Q1416 641 1426 639 Z"/>
            </g>
            <g className="object-target" data-object="light" tabIndex={0} role="button" aria-label={dimmed ? t('restoreLight') : t('dimLight')} aria-pressed={dimmed} onClick={onToggleLight} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onToggleLight(); } }}>
              <path className="object-shape" d="M1438 312 C1401 311 1369 344 1355 378 Q1349 384 1358 390 C1393 412 1466 438 1506 438 Q1518 438 1520 427 C1526 380 1503 332 1476 320 Q1456 311 1438 312 Z"/>
            </g>
            <g ref={cassetteRef} className="object-target" data-object="cassettes" tabIndex={0} role="button" aria-label={t('tapesHint')} aria-haspopup="dialog" aria-expanded={cassetteOpen} aria-controls="cassette-panel" onClick={onOpenCassettes} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenCassettes(); } }}><path className="object-shape" d="M202 342 L228 338 L302 346 L302 361 L300 364 L303 365 L303 379 L301 383 L303 385 L303 398 L301 401 L303 404 L303 416 L301 420 L303 423 L302 434 L301 438 L302 441 L300 456 L201 455 L201 440 L203 436 L202 420 L204 416 L202 401 L204 397 L202 381 L204 377 L202 362 L204 359 Z"/></g>
            <g ref={notesRef} className="object-target" data-object="notes" tabIndex={0} role="button" aria-label={t('notesHint')} aria-haspopup="dialog" aria-expanded={notesOpen} aria-controls="notes-panel" onClick={onOpenNotes} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenNotes(); } }}><path className="object-shape" d="M960 808 L1280 850 L1280 862 L1290 865 L1284 877 L1098 922 L757 872 Q745 869 749 856 L749 846 Q752 837 773 837 Z"/></g>
            <g className="annotations" id="landmarks" aria-hidden="true">
              <g className="annotation"><text x="300" y="130" transform="rotate(-5 300 130)">{t('hintLanguage')}</text><path className="annotation-arrow" d="M335 151 Q275 173 218 183"/></g>
              <g className="annotation"><text x="550" y="887" transform="rotate(-6 550 887)">{t('hintNotes')}</text><path className="annotation-arrow" d="M666 876 Q708 892 745 865"/></g>
              <g className="annotation"><text x="320" y="305" transform="rotate(-6 320 305)">{t('hintTapes')}</text><path className="annotation-arrow" d="M359 315 Q328 320 300 357"/></g>
              <g className="annotation"><text x="1170" y="855" transform="rotate(-7 1170 855)">{t('hintClock')}</text><path className="annotation-arrow" d="M1233 826 Q1250 816 1260 784"/></g>
              <g className="annotation"><text x="1478" y="862" transform="rotate(5 1478 862)">{t('hintRadio')}</text><path className="annotation-arrow" d="M1533 829 Q1555 813 1544 783"/></g>
              <g className="annotation"><text x="1195" y="250" transform="rotate(-6 1195 250)">{t('hintLamp')}</text><path className="annotation-arrow" d="M1283 256 Q1330 235 1397 333"/></g>
            </g>
          </svg>
  </>;
}
