import test from 'node:test';
import assert from 'node:assert/strict';
import { SceneMusic } from '../src/music.ts';

class AudioStub extends EventTarget {
  src = ''; currentTime = 0; ended = false; volume = 1; plays = 0; paused = true;
  reject = false;
  pending = null;
  load() { this.currentTime = 0; this.ended = false; }
  pause() { this.paused = true; this.dispatchEvent(new Event('pause')); }
  async play() {
    this.plays++; this.paused = false;
    if (this.pending) return this.pending;
    if (this.reject) throw new Error('network');
    this.dispatchEvent(new Event('playing'));
  }
}
const tracks = ['a','b','c'].map(id=>({id,title:id,url:`/${id}.mp3`,artist:'Artist',source:'https://example.com',license:'CC BY 4.0'}));
const tick = ()=>new Promise(resolve=>setImmediate(resolve));

test('opening is silent; pause/resume keeps the playback position', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,.45,()=>.999);
 assert.equal(audio.plays,0);assert.equal(audio.src,'');
 await player.play();audio.currentTime=37;player.pause();await player.play();
 assert.equal(audio.currentTime,37);assert.equal(player.state.phase,'playing');
});

test('ended plays each track once and reshuffles without a boundary repeat', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,.45,()=>.999);await player.play();
 for(const index of [1,2,0]){audio.dispatchEvent(new Event('ended'));await tick();assert.equal(player.state.index,index);assert.equal(player.state.phase,'playing');}
 assert.equal(audio.plays,4);
});

test('a late ended event while paused cannot change the station track', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,.45,()=>.999);await player.play();player.pause();audio.dispatchEvent(new Event('ended'));
 assert.equal(player.state.track.id,'a');assert.equal(player.state.phase,'paused');assert.equal(audio.plays,1);
});

test('failed playback can be retried, without leaving a stale error', async()=>{
 const audio=new AudioStub();audio.reject=true;const player=new SceneMusic(audio,tracks,.45,()=>.999);await player.play();
 assert.equal(player.state.phase,'error');audio.reject=false;await player.play();
 assert.equal(player.state.phase,'playing');assert.equal(player.state.error,null);
 audio.dispatchEvent(new Event('error'));assert.equal(player.state.phase,'error');await player.play();assert.equal(player.state.phase,'playing');
});

test('stale play rejection after pausing does not change the paused state', async()=>{
 const audio=new AudioStub();let reject;audio.pending=new Promise((_,r)=>{reject=r;});
 const player=new SceneMusic(audio,tracks,.45,()=>.999);const playing=player.play();player.pause();reject(new Error('aborted'));await playing;
 assert.equal(player.state.phase,'paused');assert.equal(player.state.error,null);
});

test('invalid saved volume is bounded and does not prevent playback', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,NaN);assert.equal(audio.volume,.45);
 player.setVolume(2);assert.equal(audio.volume,1);player.setVolume(-1);assert.equal(audio.volume,0);
 await player.play();assert.equal(player.state.phase,'playing');
});

test('native pause before ended does not cancel automatic continuation', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,.45,()=>.999);await player.play();
 audio.ended=true;audio.pause();audio.dispatchEvent(new Event('ended'));await tick();
 assert.equal(player.state.track.id,'b');assert.equal(player.state.phase,'playing');
});

for (const count of [1, 2, 3]) {
 test(`shuffle preserves complete cycles for ${count} tracks`, async()=>{
  const audio = new AudioStub();
  let seed = 17;
  const random = ()=>{seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646;};
  const catalog = tracks.slice(0,count);
  const player = new SceneMusic(audio,catalog,.45,random);
  await player.play();
  let previous;
  for(let cycle=0;cycle<10;cycle++) {
   const heard=[];
   for(let i=0;i<count;i++) {
    const id=player.state.track.id;
    if(count>1) assert.notEqual(id,previous);
    heard.push(id); previous=id;
    audio.ended=true;audio.pause();audio.dispatchEvent(new Event('ended'));await tick();
    assert.equal(player.state.phase,'playing');
   }
   assert.deepEqual([...heard].sort(),catalog.map(t=>t.id).sort());
  }
  player.dispose();
 });
}

test('random start and pause/retry keep the chosen track and queue', async()=>{
 const audio=new AudioStub();let draws=0;
 const player=new SceneMusic(audio,tracks,.45,()=>{draws++;return 0;});
 assert.equal(player.state.track.id,'b');
 assert.equal(audio.src,'');assert.equal(audio.plays,0);
 await player.play();audio.currentTime=43;player.pause();await player.play();
 assert.equal(audio.currentTime,43);assert.equal(draws,2);
 audio.dispatchEvent(new Event('error'));await player.play();
 assert.equal(player.state.track.id,'b');assert.equal(draws,2);
 audio.ended=true;audio.dispatchEvent(new Event('ended'));await tick();
 assert.equal(player.state.track.id,'c');assert.equal(draws,2);
});

test('boundary collision is replaced with another first track', async()=>{
 const duoAudio=new AudioStub();let calls=0;
 const duo=new SceneMusic(duoAudio,tracks.slice(0,2),.45,()=> calls++ === 0 ? .999 : 0);
 await duo.play();duoAudio.dispatchEvent(new Event('ended'));await tick();
 assert.equal(duo.state.track.id,'b');
 duoAudio.dispatchEvent(new Event('ended'));await tick();
 assert.equal(duo.state.track.id,'a');
});
