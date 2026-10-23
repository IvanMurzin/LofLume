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
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks);
 assert.equal(audio.plays,0);assert.equal(audio.src,'');
 await player.play();audio.currentTime=37;player.pause();await player.play();
 assert.equal(audio.currentTime,37);assert.equal(player.state.phase,'playing');
});

test('ended plays the next track and wraps after the last', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks);await player.play();
 for(const index of [1,2,0]){audio.dispatchEvent(new Event('ended'));await tick();assert.equal(player.state.index,index);assert.equal(player.state.phase,'playing');}
 assert.equal(audio.plays,4);
});

test('manual next while paused changes track without resuming', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks);await player.play();player.pause();player.next();
 assert.equal(player.state.track.id,'b');assert.equal(audio.paused,true);assert.equal(audio.plays,1);
});

test('failed playback can be retried, without leaving a stale error', async()=>{
 const audio=new AudioStub();audio.reject=true;const player=new SceneMusic(audio,tracks);await player.play();
 assert.equal(player.state.phase,'error');audio.reject=false;await player.play();
 assert.equal(player.state.phase,'playing');assert.equal(player.state.error,null);
 audio.dispatchEvent(new Event('error'));assert.equal(player.state.phase,'error');await player.play();assert.equal(player.state.phase,'playing');
});

test('stale play rejection after pausing does not change the paused state', async()=>{
 const audio=new AudioStub();let reject;audio.pending=new Promise((_,r)=>{reject=r;});
 const player=new SceneMusic(audio,tracks);const playing=player.play();player.pause();reject(new Error('aborted'));await playing;
 assert.equal(player.state.phase,'paused');assert.equal(player.state.error,null);
});

test('invalid saved volume is bounded and does not prevent playback', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks,NaN);assert.equal(audio.volume,.45);
 player.setVolume(2);assert.equal(audio.volume,1);player.setVolume(-1);assert.equal(audio.volume,0);
 await player.play();assert.equal(player.state.phase,'playing');
});

test('native pause before ended does not cancel automatic continuation', async()=>{
 const audio=new AudioStub();const player=new SceneMusic(audio,tracks);await player.play();
 audio.ended=true;audio.pause();audio.dispatchEvent(new Event('ended'));await tick();
 assert.equal(player.state.track.id,'b');assert.equal(player.state.phase,'playing');
});
