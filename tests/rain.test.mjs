import test from 'node:test';
import assert from 'node:assert/strict';
import { fillRainChannel, RainSound } from '../src/rainSound.ts';

test('generated rain stays finite, soft and non-silent with no DC offset', () => {
  let seed = 7;
  const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
  const samples = new Float32Array(48000 * 2);
  fillRainChannel(samples, 48000, random);
  let peak = 0, power = 0, mean = 0;
  for (const value of samples) { assert(Number.isFinite(value)); peak = Math.max(peak, Math.abs(value)); power += value ** 2; mean += value; }
  assert(peak < .8, 'no clipping');
  assert(Math.sqrt(power / samples.length) > .03, 'audible texture');
  assert(Math.sqrt(power / samples.length) < .2, 'comfortable amplitude');
  assert(Math.abs(mean / samples.length) < .02, 'no DC offset');
});

function fakeAudio() {
  const contexts = [];
  globalThis.AudioContext = class {
    state = 'suspended'; currentTime = 1; sampleRate = 8000; stops = 0; targets = []; destination = {};
    constructor() { contexts.push(this); }
    createGain() { return { connect() {}, gain: { value: 0, cancelScheduledValues() {}, setTargetAtTime: (...args) => this.targets.push(args) } }; }
    createBiquadFilter() { return { connect() {}, frequency: {}, Q: {} }; }
    createBuffer(channels, length) { return { getChannelData: () => new Float32Array(length) }; }
    createBufferSource() { return { connect() {}, disconnect() {}, start() {}, stop: () => { this.stops++; } }; }
    async resume() { this.state = 'running'; }
    async close() { this.state = 'closed'; }
  };
  return contexts;
}

test('rain reuses one source on quick toggles and releases it on exit', async () => {
  const contexts = fakeAudio(); const rain = new RainSound();
  try {
    await rain.start(); rain.stop(); await rain.start();
    assert.equal(contexts.length, 1);
    assert.equal(contexts[0].state, 'running');
    assert.equal(contexts[0].targets.at(-1)[0], .11);
    rain.dispose();
    assert.equal(contexts[0].state, 'closed'); assert.equal(contexts[0].stops, 1);
    rain.dispose(); assert.equal(contexts[0].stops, 1);
  } finally { rain.dispose(); delete globalThis.AudioContext; }
});

test('switching off before resume resolves never schedules an audible fade-in', async () => {
  const contexts = fakeAudio(); const rain = new RainSound();
  let resume;
  globalThis.AudioContext.prototype.resume = function () { return new Promise(resolve => { resume = () => { this.state = 'running'; resolve(); }; }); };
  try {
    const start = rain.start(); rain.stop(); resume(); await start;
    assert(contexts[0].targets.every(([target]) => target === 0));
  } finally { rain.dispose(); delete globalThis.AudioContext; }
});

test('failed audio startup closes resources and allows retry', async () => {
  const contexts = fakeAudio(); const rain = new RainSound();
  const resume = globalThis.AudioContext.prototype.resume;
  globalThis.AudioContext.prototype.resume = async function () { throw new Error('blocked'); };
  try {
    await assert.rejects(rain.start(), /blocked/); assert.equal(contexts[0].state, 'closed');
    globalThis.AudioContext.prototype.resume = resume;
    await rain.start(); assert.equal(contexts.length, 2); assert.equal(contexts[1].state, 'running');
  } finally { rain.dispose(); delete globalThis.AudioContext; }
});
