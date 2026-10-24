import type { RefObject } from "react";

type Props = { dimmed: boolean; onToggleLight: () => void; exploring: boolean; playing: boolean; panelOpen: boolean; radioRef: RefObject<SVGGElement | null>; onOpenRadio: () => void; clockRef: RefObject<SVGGElement | null>; timerOpen: boolean; timerLabel: string; onOpenTimer: () => void };

export function SceneArtwork({ dimmed, onToggleLight, exploring, playing, panelOpen, radioRef, onOpenRadio, clockRef, timerOpen, timerLabel, onOpenTimer }: Props) {
  return <>
          <svg className={exploring ? "room-objects is-exploring" : "room-objects"} id="room-objects" viewBox="0 0 1671 941" aria-label="Предметы в комнате">
            <defs>
              <marker id="pencil-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M2 2 Q6 5 10 6 Q6 7 2 10"/></marker>
            </defs>
            <g ref={clockRef} onClick={onOpenTimer} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenTimer(); } }} transform="translate(-27 0)" className="object-target" data-object="timer" tabIndex={0} role="button" aria-label={timerLabel} aria-haspopup="dialog" aria-expanded={timerOpen} aria-controls="timer-panel">
              <path className="object-shape" d="M1281 679 Q1271 677 1269 690 L1261 748 Q1258 761 1271 765 L1393 780 Q1408 783 1412 769 L1420 707 Q1420 694 1407 691 Z"/>
            </g>
            <g ref={radioRef} onClick={onOpenRadio} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenRadio(); } }} transform="matrix(1.11 0 0 1 -186 0)" className={playing ? "object-target is-playing" : "object-target"} data-object="music" tabIndex={0} role="button" aria-label={playing ? "Радио — музыка играет" : "Радио — включить музыку"} aria-haspopup="dialog" aria-expanded={panelOpen} aria-controls="music-panel">
              <path className="object-shape" d="M1456 645 L1524 640 L1526 635 Q1527 627 1539 628 L1644 633 Q1654 633 1655 642 L1671 647 L1671 779 Q1668 788 1657 785 L1454 762 Q1443 761 1444 748 L1446 659 Q1447 649 1456 645 Z"/>
            </g>
            <g transform="translate(-35 4)" className="object-target" data-object="light" tabIndex={0} role="button" aria-label="Приглушить свет" aria-pressed={dimmed} onClick={onToggleLight} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onToggleLight(); } }}>
              <path className="object-shape" d="M1487 304 C1447 305 1413 333 1393 371 Q1385 382 1403 391 C1440 413 1501 432 1540 433 Q1556 435 1557 421 C1567 372 1546 323 1518 311 Q1504 306 1487 304 Z"/>
            </g>
            <g className="annotations" id="landmarks" aria-hidden="true">
              <g className="annotation"><text x="1170" y="855" transform="rotate(-7 1170 855)">часы</text><path className="annotation-arrow" d="M1233 826 Q1250 816 1260 784"/></g>
              <g className="annotation"><text x="1478" y="862" transform="rotate(5 1478 862)">радио</text><path className="annotation-arrow" d="M1533 829 Q1555 813 1544 783"/></g>
              <g className="annotation"><text x="1195" y="250" transform="rotate(-6 1195 250)">лампа</text><path className="annotation-arrow" d="M1283 256 Q1330 235 1397 333"/></g>
            </g>
          </svg>
  </>;
}
