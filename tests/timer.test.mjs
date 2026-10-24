import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimer, parseTimerDuration, timerReducer, formatTimer } from '../src/timer.ts';

test('clock starts at zero and rejects invalid durations', () => {
  const state = createTimer();
  assert.equal(formatTimer(state.remainingMs), '00:00');
  for (const seconds of [0, -1, 10801, 1.5, NaN, Infinity]) assert.deepEqual(timerReducer(state, {type:'start', seconds, now:0}), state);
  assert.equal(timerReducer(state, {type:'start',seconds:1,now:0}).remainingMs,1000);
});
test('start, exact pause and resume preserve remaining time', () => {
  let state = timerReducer(createTimer(), {type:'start', seconds:2400, now:1000});
  state = timerReducer(state, {type:'pause', now:2250});
  assert.equal(state.phase, 'paused'); assert.equal(state.remainingMs, 2398750);
  assert.deepEqual(timerReducer(state, {type:'tick', now:9000000}), state);
  state = timerReducer(state, {type:'resume', now:10000000});
  assert.equal(state.deadline, 12398750);
  state = timerReducer(state, {type:'tick', now:10000500});
  assert.equal(state.remainingMs, 2398250);
});
test('delayed ticks use deadline rather than number of updates', () => {
  const start = timerReducer(createTimer(), {type:'start', seconds:1500, now:1000});
  const delayed = timerReducer(start, {type:'tick', now:301000});
  assert.equal(formatTimer(delayed.remainingMs), '20:00');
  assert.deepEqual(timerReducer(delayed, {type:'tick', now:1501000}), {phase:'finished', remainingMs:0, deadline:null});
});
test('completion never goes negative or restarts after further updates', () => {
  const start = timerReducer(createTimer(), {type:'start', seconds:60, now:0});
  const done = timerReducer(start, {type:'pause', now:70000});
  assert.equal(done.phase, 'finished'); assert.equal(done.remainingMs, 0);
  assert.deepEqual(timerReducer(done, {type:'tick', now:90000}), done);
  assert.deepEqual(timerReducer(done, {type:'resume', now:90000}), done);
});
test('reset returns idle zero from every phase; another session requires start', () => {
  let state = timerReducer(createTimer(), {type:'start', seconds:10800, now:0});
  assert.equal(formatTimer(state.remainingMs), '180:00');
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  state = timerReducer(state, {type:'pause', now:10000});
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  state = timerReducer(state, {type:'resume', now:20000});
  state = timerReducer(state, {type:'tick', now:20000000});
  assert.deepEqual(timerReducer(state, {type:'reset'}), createTimer());
  assert.equal(timerReducer(state, {type:'start', seconds:60, now:21000000}).phase, 'running');
});
test('formatting rounds up fractional seconds and supports all allowed durations', () => {
  assert.equal(formatTimer(1), '00:01'); assert.equal(formatTimer(59999), '01:00');
  assert.equal(formatTimer(60001), '01:01'); assert.equal(formatTimer(-100), '00:00');
  assert.equal(formatTimer(10800000), '180:00');
});

test('three duration fields validate whole seconds and the total maximum', () => {
  for (const [h,m,s,total] of [['00','00','01',1],['00','00','30',30],['00','25','10',1510],['01','30','45',5445],['02','59','59',10799],['03','00','00',10800]]) assert.equal(parseTimerDuration(h,m,s),total);
  for (const [h,m,s] of [['','25','00'],['00','','00'],['00','00',''],['00','00','00'],['00','60','00'],['00','00','60'],['03','00','01'],['04','00','00'],['-1','30','00']]) assert.equal(parseTimerDuration(h,m,s),null);
});

test('all three fields clamp immediately and cap total at three hours', async () => {
  const { clampTimerDuration } = await import('../src/timer.ts');
  assert.deepEqual(clampTimerDuration('99','25','30'), {hours:'03',minutes:'00',seconds:'00'});
  assert.deepEqual(clampTimerDuration('00','99','99'), {hours:'00',minutes:'59',seconds:'59'});
  assert.deepEqual(clampTimerDuration('02','34','56'), {hours:'02',minutes:'34',seconds:'56'});
  assert.deepEqual(clampTimerDuration('03','34','56'), {hours:'03',minutes:'00',seconds:'00'});
  assert.deepEqual(clampTimerDuration('','',''), {hours:'',minutes:'',seconds:''});
});

test('typing replaces selection or starts fresh when caret is in a full field', async () => {
  const { insertTimerDigit } = await import('../src/timer.ts');
  assert.equal(insertTimerDigit('25','1',0,2),'1');
  assert.equal(insertTimerDigit('25','1',1,1),'1');
  assert.equal(insertTimerDigit('25','1',0,0),'1');
  assert.equal(insertTimerDigit('25','1',2,2),'1');
  assert.equal(insertTimerDigit('1','0',1,1),'10');
  assert.equal(insertTimerDigit('','5',0,0),'5');
});

test('a sub-minute session finishes and pauses with second precision', () => {
  let state=timerReducer(createTimer(),{type:'start',seconds:30,now:1000});
  state=timerReducer(state,{type:'pause',now:2250});
  assert.equal(state.remainingMs,28750);
  state=timerReducer(state,{type:'resume',now:5000});
  assert.equal(state.deadline,33750);
  assert.equal(timerReducer(state,{type:'tick',now:33750}).phase,'finished');
});
