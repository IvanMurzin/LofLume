import test from 'node:test';
import assert from 'node:assert/strict';
import { createClock, clockReducer as act, clockValue, clockTitle, nextPomodoroStage, restoreClockSettings } from '../src/clock.ts';
const select=(s,mode,now=0)=>act(s,{type:'select',mode,now});
const toggle=(s,now=0,seconds=60)=>act(s,{type:'toggle',now,seconds});
const tick=(s,now)=>act(s,{type:'tick',now});
test('stopwatch counts real elapsed time, pauses exactly and resets independently',()=>{
 let s=toggle(select(createClock(),'stopwatch'),1000);s=tick(s,4500);assert.equal(s.stopwatch.elapsedMs,3500);assert.equal(clockTitle(s),'LofLume | 00:03');
 s=toggle(s,4750);assert.equal(s.stopwatch.elapsedMs,3750);s=tick(s,100000);assert.equal(s.stopwatch.elapsedMs,3750);
 s=toggle(s,200000);s=tick(s,200250);assert.equal(s.stopwatch.elapsedMs,4000);
 s=act(s,{type:'reset'});assert.equal(s.stopwatch.elapsedMs,0);assert.equal(s.stopwatch.phase,'idle');assert.equal(clockTitle(s),'LofLume — Home Work');
});
test('switching modes pauses and preserves each session, no parallel counting',()=>{
 let s=toggle(createClock(),0,100);s=select(s,'stopwatch',1250);assert.equal(s.timer.phase,'paused');assert.equal(s.timer.remainingMs,98750);
 s=toggle(s,2000);s=select(s,'timer',3500);assert.equal(s.stopwatch.phase,'paused');assert.equal(s.stopwatch.elapsedMs,1500);
 s=toggle(s,5000);s=tick(s,6000);assert.equal(s.timer.remainingMs,97750);assert.equal(s.stopwatch.elapsedMs,1500);
});
test('manual pomodoro waits for action, four completed focuses lead to long rest then a fresh cycle',()=>{
 let s=select(createClock(),'pomodoro');let now=100;
 for(let n=1;n<=4;n++){
  s=toggle(s,now);assert.equal(s.pomodoro.stage,'focus');now+=25*60000;s=tick(s,now);
  assert.equal(s.pomodoro.timer.phase,'finished');assert.equal(s.pomodoro.completed,n);assert.equal(s.completion.id,n*2-1);
  assert.equal(nextPomodoroStage(s),n===4?'long':'short');assert.equal(tick(s,now+500000).pomodoro.timer.phase,'finished');
  s=toggle(s,now+1000);assert.equal(s.pomodoro.stage,n===4?'long':'short');assert.equal(s.pomodoro.timer.remainingMs,(n===4?15:5)*60000);
  now+=1000+(n===4?15:5)*60000;s=tick(s,now);
 }
 s=toggle(s,now+1000);assert.equal(s.pomodoro.stage,'focus');assert.equal(s.pomodoro.completed,0);
 s=act(s,{type:'reset'});assert.equal(s.pomodoro.timer.phase,'idle');assert.equal(s.pomodoro.completed,0);
});
test('auto transition emits one completion and starts only one new stage after a long hidden delay',()=>{
 let s=select(createClock({...restoreClockSettings(null),auto:true}),'pomodoro');s=toggle(s,1000);s=tick(s,86400000);
 assert.equal(s.pomodoro.completed,1);assert.equal(s.completion.id,1);assert.equal(s.completion.kind,'focus');assert.equal(s.pomodoro.stage,'short');assert.equal(s.pomodoro.timer.phase,'running');assert.equal(s.pomodoro.timer.deadline,86400000+5*60000);
 assert.equal(tick(s,86400000).completion.id,1);
});
test('pomodoro pause/resume preserves stage and completion is not duplicated',()=>{
 let s=toggle(select(createClock(),'pomodoro'),0);s=toggle(s,1234);assert.equal(s.pomodoro.timer.remainingMs,1500000-1234);
 s=toggle(s,999999);const deadline=s.pomodoro.timer.deadline;s=tick(s,deadline);const event=s.completion;
 s=tick(s,deadline+100000);assert.deepEqual(s.completion,event);
});
test('switch at completion counts once but does not auto-start a hidden stage',()=>{
 let s=toggle(select(createClock({...restoreClockSettings(null),auto:true}),'pomodoro'),0);s=select(s,'stopwatch',2000000);
 assert.equal(s.pomodoro.timer.phase,'finished');assert.equal(s.pomodoro.completed,1);assert.equal(s.completion.id,1);
});
test('timer retains ceiling, max duration, repeats and reset with completion event',()=>{
 let s=toggle(createClock(),0,10800);s=tick(s,10800000);assert.equal(s.timer.phase,'finished');assert.equal(s.completion.id,1);
 s=toggle(s,10800001,30);assert.equal(clockValue(s).remainingMs,30000);s=act(s,{type:'reset'});assert.equal(s.timer.phase,'idle');
 assert.equal(toggle(s,0,10801).timer.phase,'idle');
});
test('settings are validated and duration changes are blocked after cycle starts, auto remains editable',()=>{
 assert.deepEqual(restoreClockSettings({focus:0,short:181,long:'15',auto:'yes'}),{focus:25,short:5,long:15,auto:false});
 let s=select(createClock(),'pomodoro');s=act(s,{type:'settings',settings:{focus:1,short:2,long:3}});s=toggle(s);assert.equal(s.pomodoro.timer.remainingMs,60000);
 s=act(s,{type:'settings',settings:{focus:99,auto:true}});assert.equal(s.settings.focus,1);assert.equal(s.settings.auto,true);
 s=act(s,{type:'reset'});s=act(s,{type:'settings',settings:{focus:99}});assert.equal(s.settings.focus,99);
});
