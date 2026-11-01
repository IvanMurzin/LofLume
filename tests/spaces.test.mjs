import test from 'node:test';
import assert from 'node:assert/strict';
import { findSpace, homeWork, nightShift, spaceNotesKey, spaceLightKey } from '../src/spaces.ts';
import { clockReducer, createClock, clockValue } from '../src/clock.ts';

test('restoring a missing or stale space safely opens Home Work', () => {
  for (const id of [null, undefined, '', 'deleted-room', '<script>', {}]) assert.equal(findSpace(id), homeWork);
  assert.equal(findSpace('night-shift'), nightShift);
});
test('space keys retain existing Home Work data and isolate new notes and light', () => {
  assert.equal(spaceNotesKey('home-work'), 'loflume.notes.v1');
  assert.equal(spaceLightKey('home-work'), 'loflume.light');
  assert.notEqual(spaceNotesKey('night-shift'), spaceNotesKey('home-work'));
  assert.notEqual(spaceLightKey('night-shift'), spaceLightKey('home-work'));
});
test('leaving a room pauses each clock mode without time leaking into the next room', () => {
  for (const mode of ['timer', 'stopwatch', 'pomodoro']) {
    let own = clockReducer(createClock(), { type: 'select', mode, now: 1000 });
    own = clockReducer(own, { type: 'toggle', now: 1000, seconds: 60 });
    own = clockReducer(own, { type: 'pause', now: 4500 });
    const other = createClock(), saved = clockValue(own);
    assert.equal(saved.phase, 'paused');
    assert.equal(saved.remainingMs, mode === 'stopwatch' ? 3000 : mode === 'timer' ? 56500 : 1496500);
    if (mode === 'stopwatch') assert.equal(own.stopwatch.elapsedMs, 3500);
    assert.equal(clockValue(other).phase, 'idle');
    assert.deepEqual(clockValue(clockReducer(own, { type: 'tick', now: 999999 })), saved);
  }
});
