import test from 'node:test';
import assert from 'node:assert/strict';
import { clampPanel, clampNoteSize } from '../src/panelGeometry.ts';

test('cards can overlap page bars and leave the viewport while a heading remains reachable', () => {
 const panel={width:360,height:420},view={width:1440,height:900};
 assert.deepEqual(clampPanel({x:100,y:0},panel,view),{x:100,y:0});
 assert.deepEqual(clampPanel({x:-9999,y:9999},panel,view),{x:-200,y:836});
 assert.deepEqual(clampPanel({x:9999,y:-9999},panel,view),{x:1280,y:0});
});
test('resize and tiny viewports preserve access to the heading', () => {
 for(const width of [120,390,812,1920])for(const height of [120,375,900]){
  const box={width:360,height:420},p=clampPanel({x:9999,y:9999},box,{width,height});
  assert.ok(p.x < width && p.x+box.width>0);
  assert.ok(p.y>=0 && p.y+Math.min(64,height)<=height);
 }
});
test('notes have useful minimums and viewport-aware maximum sizes', () => {
 assert.deepEqual(clampNoteSize({width:10,height:10},{width:1440,height:1000}),{width:280,height:220});
 assert.deepEqual(clampNoteSize({width:10000,height:10000},{width:1440,height:1000}),{width:1000,height:900});
 assert.deepEqual(clampNoteSize({width:10000,height:10000},{width:390,height:375}),{width:366,height:351});
 assert.deepEqual(clampNoteSize({width:1,height:1},{width:200,height:180}),{width:176,height:156});
});
