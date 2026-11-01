export type SpaceId = 'home-work' | 'night-shift';
export type SceneObject = 'language' | 'timer' | 'music' | 'light' | 'cassettes' | 'notes';
export type Landmark = { key: 'hintLanguage' | 'hintClock' | 'hintRadio' | 'hintTapes' | 'hintNotes'; x: number; y: number; rotation?: number; arrow: string };
export type Space = {
  id: SpaceId; title: string; image: string; width: number; height: number;
  objects: Record<SceneObject, string>; landmarks: Landmark[];
  clock: { face: string; matrix: [number, number, number, number, number, number]; offset: string; width: number; height: number; preserveFace?: boolean };
};
export const homeWork: Space = {
  id: 'home-work', title: 'Home Work', image: 'assets/cozy-coding-v6.webp', width: 1671, height: 941,
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
  id: 'night-shift', title: 'Night Shift', image: 'assets/night-shift.webp', width: 1672, height: 941,
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
export const spaces: readonly Space[] = [homeWork, nightShift];
export function findSpace(id: unknown): Space { return spaces.find(space => space.id === id) ?? homeWork; }
export function spaceNotesKey(id: SpaceId) { return id === 'home-work' ? 'loflume.notes.v1' : `loflume.notes.${id}.v1`; }
export function spaceLightKey(id: SpaceId) { return id === 'home-work' ? 'loflume.light' : `loflume.light.${id}`; }
