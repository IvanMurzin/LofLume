import type { MessageKey } from './i18n.ts';
export type SpaceId = 'home-work' | 'night-shift' | 'cafe-terrace';
export type SceneObject = 'language' | 'timer' | 'music' | 'light' | 'cassettes' | 'notes';
export type Landmark = { key: 'hintLanguage' | 'hintClock' | 'hintRadio' | 'hintTapes' | 'hintNotes' | 'hintMusic'; x: number; y: number; rotation?: number; arrow: string };
export type Space = {
  id: SpaceId; title: string; tagline: string; altKey: MessageKey; coffee: string; image: string; width: number; height: number;
  objects: Record<SceneObject, string>; landmarks: Landmark[];
  clock: { face: string; matrix: [number, number, number, number, number, number]; offset: string; width: number; height: number; preserveFace?: boolean };
};
export const homeWork: Space = {
  id: 'home-work', title: 'Home Work', tagline: 'Lofi · chill · focus', altKey: 'sceneAlt', coffee: 'M696 656 L700 647 Q700 639 715 638 L786 637 Q800 637 803 644 L805 655 L815 658 Q820 661 816 669 L808 673 L799 785 Q799 794 780 795 L725 794 Q711 793 710 785 L699 676 L691 673 Q685 669 691 660 Z', image: 'assets/cozy-coding-v6.webp', width: 1671, height: 941,
  objects: {
    language: 'M139 104 L217 117 L217 259 L112 246 L112 111 Z',
    timer: 'M1256 678 L1376 687 Q1394 687 1397 705 L1399 752 Q1401 775 1386 777 L1372 777 Q1367 784 1353 781 L1246 770 Q1229 767 1232 748 L1242 699 Q1244 678 1256 678 Z',
    music: 'M1426 639 L1498 635 L1498 627 L1506 627 L1632 632 L1636 632 L1636 642 L1671 645 L1671 759 L1641 772 L1427 758 Q1414 757 1415 744 L1416 654 Q1416 641 1426 639 Z',
    light: 'M1438 312 C1401 311 1369 344 1355 378 Q1349 384 1358 390 C1393 412 1466 438 1506 438 Q1518 438 1520 427 C1526 380 1503 332 1476 320 Q1456 311 1438 312 Z',
    cassettes: 'M202 342 L228 338 L302 346 L302 361 L300 364 L303 365 L303 379 L301 383 L303 385 L303 398 L301 401 L303 404 L303 416 L301 420 L303 423 L302 434 L301 438 L302 441 L300 456 L201 455 L201 440 L203 436 L202 420 L204 416 L202 401 L204 397 L202 381 L204 377 L202 362 L204 359 Z',
    notes: 'M960 808 L1280 850 L1280 862 L1290 865 L1284 877 L1098 922 L757 872 Q745 869 749 856 L749 846 Q752 837 773 837 Z',
  },
  landmarks: [
    { key: 'hintLanguage', x: 300, y: 130, arrow: 'M335 151 Q275 173 218 183' },
    { key: 'hintNotes', x: 550, y: 887, rotation: -6, arrow: 'M666 876 Q708 892 745 865' },
    { key: 'hintTapes', x: 320, y: 305, rotation: -6, arrow: 'M359 315 Q328 320 300 357' },
    { key: 'hintClock', x: 1170, y: 855, rotation: -7, arrow: 'M1233 826 Q1250 816 1260 784' },
    { key: 'hintRadio', x: 1478, y: 862, rotation: 5, arrow: 'M1533 829 Q1555 813 1544 783' },
  ],
  clock: { face: 'M1284 695 L1395 705 L1387 755 L1276 744Z', matrix: [1, .1, -.14, 1, 1287, 704], offset: 'translate(-27 0)', width: 94, height: .85 },
};
export const nightShift: Space = {
  id: 'night-shift', title: 'Night Shift', tagline: 'Lofi · synth · night', altKey: 'nightSceneAlt', coffee: 'M118 678 C132 665 189 666 209 675 Q215 677 215 687 L215 696 C232 690 245 704 248 719 C252 740 240 765 214 775 L211 795 Q177 811 130 802 Q118 800 118 791 Z M216 706 C231 699 241 713 239 728 C238 743 228 757 215 762 Z', image: 'assets/night-shift.webp', width: 1672, height: 941,
  objects: {
    language: 'M67 39 L82 51 L82 202 L66 196 L66 42 Z',
    timer: 'M148 162 L210 178 Q220 181 220 192 L220 231 Q220 242 209 239 L148 224 Q140 222 140 210 L140 173 Q140 160 148 162 Z',
    music: 'M1441 510 L1447 510 L1447 505 Q1447 495 1458 495 L1552 495 Q1563 496 1563 505 L1563 514 L1573 517 Q1583 519 1583 530 L1583 582 Q1583 590 1571 593 L1442 584 Q1430 583 1430 573 L1430 523 Q1430 512 1441 510 Z M1454 509 L1556 513 L1556 506 Q1556 502 1551 502 L1459 502 Q1454 502 1454 506 Z',
    light: 'M82 304 C126 302 175 329 192 365 Q196 371 190 378 C167 397 52 428 7 419 Q0 419 0 414 L0 368 C17 334 46 311 82 304 Z',
    cassettes: 'M293 472 L408 472 L427 477 L428 496 L426 500 L429 502 L429 522 L427 526 L429 528 L428 546 L426 550 L429 552 L429 570 L427 574 L429 576 L429 594 L427 598 L430 600 L430 613 L314 616 L294 548 L290 526 L292 522 L292 504 L294 500 L291 496 L291 477 Q291 473 293 472 Z',
    notes: 'M278 700 L470 695 L484 707 L486 712 L493 715 L550 759 L551 770 L306 782 Q299 780 296 773 L264 720 Q259 710 268 705 Q271 700 278 700 Z',
  },
  landmarks: [
    { key: 'hintLanguage', x: 154, y: 105, rotation: -8, arrow: 'M167 118 Q124 135 84 111' },
    { key: 'hintClock', x: 275, y: 220, arrow: 'M290 228 Q259 258 219 216' },
    { key: 'hintTapes', x: 320, y: 417, arrow: 'M365 430 Q379 451 361 470' },
    { key: 'hintNotes', x: 486, y: 842, arrow: 'M506 814 Q490 800 458 780' },
    { key: 'hintRadio', x: 1300, y: 610, arrow: 'M1374 600 Q1413 593 1434 567' },
  ],
  clock: { face: 'M150 168 L210 184 Q214 185 214 191 L214 226 Q214 233 209 231 L149 215 Q145 214 145 208 L145 174 Q145 167 150 168 Z', matrix: [.59, .1475, 0, .8, 151, 177], offset: 'translate(0 0)', width: 94, height: .9, preserveFace: true },
};
export const cafeTerrace: Space = {
  id: 'cafe-terrace', title: 'Café Terrace', tagline: 'Lofi · café · focus', altKey: 'cafeSceneAlt', image: 'assets/cafe-terrace.webp', width: 1672, height: 941,
  coffee: 'M977 755 C988 740 1045 737 1067 749 Q1076 752 1075 767 L1074 774 Q1091 769 1098 783 C1106 800 1088 821 1068 828 L1064 836 Q1043 849 998 841 Q985 838 983 825 Z M1074 783 C1089 776 1095 785 1087 798 Q1081 808 1071 811 Z',
  objects: {
    language: 'M111 77 L232 103 Q244 106 244 119 L244 296 Q244 311 231 310 L111 303 Q99 302 99 288 L98 89 Q98 76 111 77 Z',
    timer: 'M1376 715 Q1385 712 1395 710 L1488 717 Q1500 718 1500 732 L1499 766 Q1499 777 1487 781 L1475 785 Q1469 787 1458 785 L1376 780 Q1363 779 1363 767 L1368 733 Q1369 720 1376 715 Z',
    music: 'M860 841.5 L901 844 Q904 844.5 904 848 L902.5 855.5 L865 885.5 Q862 888.5 857 887.5 L817 884.5 Q814 884 814 881 L814.5 875 Q814.5 874 817 872 Z',
    light: 'M1268 492 Q1276 491 1279 498 C1328 501 1365 537 1372 586 Q1373 591 1366 593 C1321 604 1211 601 1170 590 Q1165 590 1167 583 C1174 540 1209 507 1250 499 Q1253 492 1268 492 Z',
    cassettes: 'M1105 711 L1136 697 L1208 707 L1211 710 L1211 720 L1179 734 L1103 723 L1103 715 Z',
    notes: 'M404 875 C402 869 401 858 407 855 Q415 851 421 857 C447 840 499 819 531 815 Q541 812 548 817 L743 840 L744 848 L748 850 L748 857 L645 905 L397 880 L397 876 Z',
  },
  landmarks: [
    { key: 'hintLanguage', x: 280, y: 184, arrow: 'M299 199 Q268 221 248 218' },
    { key: 'hintClock', x: 1479, y: 663, rotation: 5, arrow: 'M1513 676 Q1510 699 1490 710' },
    { key: 'hintMusic', x: 806, y: 793, arrow: 'M849 806 Q877 815 874 839' },
    { key: 'hintTapes', x: 1100, y: 647, arrow: 'M1151 657 Q1169 671 1162 695' },
    { key: 'hintNotes', x: 400, y: 780, arrow: 'M466 790 Q493 798 497 816' },
  ],
  clock: { face: 'M1380 720 L1472 727 Q1480 728 1479 738 L1476 770 Q1475 784 1464 781 L1376 775 Q1367 774 1369 764 L1373 731 Q1374 720 1380 720 Z', matrix: [.78, .0468, -.039, .75, 1388, 735], offset: 'translate(0 0)', width: 94, height: .9, preserveFace: true },
};
export const spaces: readonly Space[] = [homeWork, nightShift, cafeTerrace];
export function findSpace(id: unknown): Space { return spaces.find(space => space.id === id) ?? homeWork; }
export function spaceNotesKey(id: SpaceId) { return id === 'home-work' ? 'loflume.notes.v1' : `loflume.notes.${id}.v1`; }
export function spaceLightKey(id: SpaceId) { return id === 'home-work' ? 'loflume.light' : `loflume.light.${id}`; }
