import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCassette, restoreCassettes, serializeCassettes} from '../src/cassettes.ts';
import {CassetteSound} from '../src/CassetteSound.ts';

test('YouTube video, music playlist and live links normalize without tracking or autoplay',()=>{
  for(const url of ['https://youtu.be/jfKfPfyJRdk?si=tracking','https://www.youtube.com/live/jfKfPfyJRdk','https://www.youtube.com/watch?v=jfKfPfyJRdk&t=55']) assert.equal(parseCassette(url).url,'https://www.youtube.com/watch?v=jfKfPfyJRdk');
  const tape=parseCassette('https://music.youtube.com/playlist?list=PL1234567890abcdef&si=secret',' Coding ');
  assert.equal(tape.name,'Coding');assert.equal(tape.provider,'youtube');assert.equal(tape.listId,'PL1234567890abcdef');assert.ok(!tape.embedUrl.includes('autoplay'));
});
test('Spotify links normalize collections and international paths',()=>{
  const tape=parseCassette('https://open.spotify.com/intl-ru/playlist/37i9dQZF1DXc8kgYqQLMfH?si=tracking');
  assert.equal(tape.spotifyUri,'spotify:playlist:37i9dQZF1DXc8kgYqQLMfH');assert.ok(tape.embedUrl.startsWith('https://open.spotify.com/embed/playlist/'));
});
test('Yandex supports modern UUIDs, classic playlists and official embed links',()=>{
  const uuid='cc4ece5f-2c41-0b27-96a5-b6a620d1df18';
  assert.equal(parseCassette('https://music.yandex.ru/playlists/'+uuid).embedUrl,'https://music.yandex.ru/iframe/playlists/'+uuid);
  for(const url of ['https://music.yandex.ru/users/music-blog/playlists/2581','https://music.yandex.ru/iframe/playlist/music-blog/2581','https://music.yandex.ru/iframe/#playlist/music-blog/2581'])assert.equal(parseCassette(url).url,'https://music.yandex.ru/users/music-blog/playlists/2581');
  assert.equal(parseCassette('https://music.yandex.ru/album/419460/track/71263').embedUrl,'https://music.yandex.ru/iframe/track/71263/419460');
});
test('untrusted and malformed URLs cannot produce an embed',()=>{
  for(const url of ['javascript:alert(1)','data:text/html,test','https://youtube.com.evil.test/watch?v=jfKfPfyJRdk','https://youtube.com@evil.test/watch?v=jfKfPfyJRdk','https://www.youtube.com:444/watch?v=jfKfPfyJRdk','https://youtube.com/watch?v=bad','https://open.spotify.com/playlist/invalid','https://music.yandex.ru/users/../playlists/1','https://youtube.com/other?list=PL1234567890','https://example.com'])assert.equal(parseCassette(url),null,url);
});
test('storage keeps three independent slots, revalidates URLs and ignores persisted embed HTML',()=>{
  const one=parseCassette('https://youtu.be/jfKfPfyJRdk','One');const two=parseCassette('https://youtu.be/jfKfPfyJRdk','Two');
  const slots=restoreCassettes(serializeCassettes([one,two,null]));assert.equal(slots.length,3);assert.equal(slots[1].name,'Two');
  const dirty=restoreCassettes(JSON.stringify({version:1,slots:[{url:'https://evil.test',name:'Bad'},{...one,embedUrl:'https://evil.test'},null,one]}));assert.equal(dirty[0],null);assert.ok(!dirty[1].embedUrl.includes('evil'));assert.equal(dirty.length,3);
  for(const raw of [null,'{broken','[]','{"version":2,"slots":[]}']) assert.deepEqual(restoreCassettes(raw),[null,null,null]);
});
test('missing audio support and muted insertion never block cassette actions',()=>{
  const sound=new CassetteSound();assert.doesNotThrow(()=>{sound.play(0);sound.play(.45);sound.dispose();});
});
