export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

/** Keep a useful section of the heading reachable, while allowing the body off screen. */
export function clampPanel(point: Point, panel: Size, viewport: Size): Point {
  const visible = Math.min(160, panel.width, viewport.width);
  return { x: Math.max(visible - panel.width, Math.min(point.x, viewport.width - visible)), y: Math.max(0, Math.min(point.y, Math.max(0, viewport.height - 64))) };
}
export function clampNoteSize(size: Size, viewport: Size): Size {
  const maxWidth = Math.max(1, Math.min(1000, viewport.width - 24));
  const maxHeight = Math.max(1, Math.min(900, viewport.height - 24));
  return { width: Math.max(Math.min(280, maxWidth), Math.min(size.width, maxWidth)), height: Math.max(Math.min(220, maxHeight), Math.min(size.height, maxHeight)) };
}
