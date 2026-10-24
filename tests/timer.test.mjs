import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimer, parseMinutes, timerReducer, formatTimer } from '../src/timer.ts';

test('clock starts at zero and rejects invalid durations', () => {
  const state = createTimer();
  assert.equal(formatTimer(state.remainingMs), '00:00');
  for (const value of ['', ' ', '-1', '0', '181', '1.5', '1e2', 'Infinity', 'NaN']) assert.equal(parseMinutes(value), null);
  for (const value of [1, 25, 180]) assert.equal(parseMinutes(String(value)), value);
  for (const minutes of [0, 181, 1.5, NaN, Infinity]) assert.deepEqual(timerReducer(state, {type:'start', minutes, now:0}), state);
});
test('start, exact pause and resume preserve remaining time', () => {
  let state = timerReducer(createTimer(), {type:'start', minutes:40, now:1000});
  state = timerReducer(state, {type:'pause', now:2250});
  assert.equal(state.phase, 'paused'); assert.equal(state.remainingMs, 2398750);
  assert.deepEqual(timerReducer(state, {type:'tick', now:9000000}), state);
  state = timerReducer(state, {type:'resume', now:10000000});
  assert.equal(state.deadline, 12398750);
  state = timerReducer(state, {type:'tick', now:10000500});
  assert.equal(state.remainingMs, 2398250);
});
test('delayed ticks use deadline rather than number of updates', () => {
  const start = timerReducer(createTimer(), {type:'start', minutes:25, now:1000});
  const delayed = timerReducer(start, {type:'tick', now:301000});
  assert.equal(formatTimer(delayed.remainingMs), '20:00');
  assert.deepEqual(timerReducer(delayed, {type:'tick', now:1501000}), {phase:'finished', remainingMs:0, deadline:null});
});
test('completion never goes negative or restarts after further updates', () => {
  const start = timerReducer(createTimer(), {type:'start', minutes:1, now:0});
  const done = timerReducer(start, {type:'pause', now:70000});
  assert.equal(done.phase, 'finished'); assert.equal(done.remainingMs, 0);
  assert.deepEqual(timerReducer(done, {type:'tick', now:90000}), done);
  assert.deepEqual(timerReducer(done, {type:'resume', now:90000}), done);
});
test('reset returns idle zero from every phase; another session requires start', () => {
  let state = timerReducer(createTimer(), {type:'start', minutes:180, now:0});
  assert.equal(formatTimer(state.remainingMs), '180:00');
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  state = timerReducer(state, {type:'pause', now:10000});
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  state = timerReducer(state, {type:'resume', now:20000});
  state = timerReducer(state, {type:'tick', now:20000000});
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  assert.equal(timerReducer(state, {type:'start', minutes:1, now:21000000}).phase, 'running');
});
test('formatting rounds up fractional seconds and supports all allowed durations', () => {
  assert.equal(formatTimer(1), '00:01'); assert.equal(formatTimer(59999), '01:00');
  assert.equal(formatTimer(60001), '01:01'); assert.equal(formatTimer(-100), '00:00');
  assert.equal(formatTimer(10800000), '180:00');
});

test('hour/minute editor validates components and total session duration', async () => {
  const { parseTimerDuration } = await import('../src/timer.ts');
  for (const [hours,minutes,total] of [['00','01',1],['00','25',25],['01','30',90],['02','59',179],['03','00',180]]) assert.equal(parseTimerDuration(hours,minutes),total);
  for (const [hours,minutes] of [['','25'],['00',''],['00','00'],['00','60'],['03','01'],['04','00'],['-1','30'],['1.5','00'],['0','1e'],['a','25']]) assert.equal(parseTimerDuration(hours,minutes),null);
});
