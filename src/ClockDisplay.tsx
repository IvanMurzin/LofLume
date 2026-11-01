import type { Space } from './spaces.ts';
import { formatTimer } from './timer.ts';
import type { TimerState } from './timer.ts';

const segments = [
  'M3 1.5H17', 'M19.5 4V17', 'M19.5 23V36', 'M3 38.5H17',
  'M.5 23V36', 'M.5 4V17', 'M3 20H17',
];
const digits: Record<string, string> = {
  '0': '012345', '1': '12', '2': '01643', '3': '01263', '4': '5612',
  '5': '05623', '6': '056432', '7': '012', '8': '0123456', '9': '012356',
};

export function ClockDisplay({ state, space }: { state: TimerState; space: Space }) {
  const text = formatTimer(state.remainingMs);
  const [minutes, seconds] = text.split(':') as [string, string];
  const count = minutes.length + seconds.length;
  const width = count * 25 + 10;
  const scale = Math.min(.85, space.clock.width / width);
  return <svg className="clock-display" viewBox={`0 0 ${space.width} ${space.height}`} aria-hidden="true" data-phase={state.phase}>
    <defs>
      <linearGradient id="clock-face" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0d0b08"/><stop offset="1" stopColor="#0c0a07"/></linearGradient>
      <clipPath id="clock-screen-clip"><path d={space.clock.face}/></clipPath>
    </defs>
    <g transform={space.clock.offset}>
    {!space.clock.preserveFace && <path d={space.clock.face} fill="url(#clock-face)"/>}
    <g clipPath={space.clock.preserveFace ? "url(#clock-screen-clip)" : undefined}>
    <g transform={`matrix(${space.clock.matrix.map((value, index) => index === 4 ? value + (space.clock.width - width * scale) / 2 : value).join(' ')})`}>
      <g transform={`scale(${scale} ${space.clock.height})`} className="clock-digits">
        {[...minutes, ':', ...seconds].map((digit, i) => {
          const x = i <= minutes.length ? i * 25 : (i - 1) * 25 + 10;
          if (digit === ':') return <g key={i} transform={`translate(${x} 0)`} className="clock-colon"><circle cx="2" cy="13" r="1.8"/><circle cx="2" cy="28" r="1.8"/></g>;
          return <g key={i} transform={`translate(${x} 0)`}>{segments.map((points, segment) => <path key={segment} d={points} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity={digits[digit]!.includes(String(segment)) ? 1 : .045}/>)}</g>;
        })}
      </g>
    </g>
    </g></g>
  </svg>;
}
