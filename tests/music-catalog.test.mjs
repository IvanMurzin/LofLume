import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('the full radio library ships intact with unique files and source credits', async()=>{
 const catalog=JSON.parse(await readFile(new URL('../docs/assets/music-catalog.json',import.meta.url),'utf8'));
 assert.ok(catalog.tracks.length>=30);
 assert.ok(catalog.tracks.reduce((sum,track)=>sum+track.durationSeconds,0)>=90*60);
 assert.equal(new Set(catalog.tracks.map(track=>track.id)).size,catalog.tracks.length);
 assert.equal(new Set(catalog.tracks.map(track=>track.sha256)).size,catalog.tracks.length);
 for(const track of catalog.tracks){
  assert.match(track.url,/^\/audio\/[a-z0-9-]+\.mp3$/);
  assert.equal(track.license,'CC0 1.0');
  assert.ok(catalog.sources.some(source=>source.url===track.source));
  assert.ok(track.title&&track.artist&&track.durationSeconds>0);
  const file=await readFile(new URL(`../public${track.url}`,import.meta.url));
  assert.equal(file.length,track.bytes,track.id);
  assert.equal(createHash('sha256').update(file).digest('hex'),track.sha256,track.id);
 }
});
