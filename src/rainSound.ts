// Own synthesized rain: correlated soft noise + sparse, damped droplets.
// A buffer is allocated only after the user explicitly enables the weather.
export function fillRainChannel(data: Float32Array, sampleRate: number, random = Math.random) {
  let low = 0, brown = 0, droplet = 0, phase = 0, frequency = 1000;
  for (let i = 0; i < data.length; i++) {
    const white = random() * 2 - 1;
    low = .91 * low + .09 * white;
    brown = .997 * brown + .003 * white;
    if (random() < 7 / sampleRate) { droplet = .015 + random() * .025; frequency = 650 + random() * 1400; phase = 0; }
    phase += 2 * Math.PI * frequency / sampleRate;
    droplet *= .9991;
    data[i] = low * .7 + brown * 2 + Math.sin(phase) * droplet;
  }
  // Periodic crossfade removes a click at the loop seam without a quiet gap.
  const blend = Math.min(Math.floor(sampleRate * .3), Math.floor(data.length / 4));
  for (let i = 0; i < blend; i++) {
    const weight = i / blend;
    data[i] = data[data.length - blend + i]! * (1 - weight) + data[i]! * weight;
  }
}

export class RainSound {
  private context: AudioContext | null = null;
  private gain: GainNode | null = null;
  private source: AudioBufferSourceNode | null = null;
  private stopTimer: ReturnType<typeof setTimeout> | undefined;
  private revision = 0;

  async start() {
    const version = ++this.revision;
    clearTimeout(this.stopTimer);
    let context = this.context;
    if (!context || context.state === 'closed') {
      context = new AudioContext(); this.context = context;
      const gain = context.createGain(); gain.gain.value = 0; gain.connect(context.destination); this.gain = gain;
      const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 5200; filter.Q.value = .3; filter.connect(gain);
      const source = context.createBufferSource();
      const buffer = context.createBuffer(2, context.sampleRate * 14, context.sampleRate);
      for (let channel = 0; channel < 2; channel++) fillRainChannel(buffer.getChannelData(channel), context.sampleRate);
      source.buffer = buffer; source.loop = true; source.loopEnd = 13.7; source.connect(filter); source.start(); this.source = source;
    }
    try {
      await context.resume();
      if (version !== this.revision || context !== this.context) return;
      if (context.state !== 'running') throw new Error('Audio unavailable');
      this.gain!.gain.cancelScheduledValues(context.currentTime);
      this.gain!.gain.setTargetAtTime(.11, context.currentTime, .35);
    } catch (error) {
      if (version === this.revision) this.dispose();
      throw error;
    }
  }
  stop() {
    ++this.revision;
    const context = this.context;
    if (!context || !this.gain) return;
    this.gain.gain.cancelScheduledValues(context.currentTime);
    this.gain.gain.setTargetAtTime(0, context.currentTime, .22);
    clearTimeout(this.stopTimer);
    this.stopTimer = setTimeout(() => this.release(), 1000);
  }
  private release() {
    clearTimeout(this.stopTimer);
    const context = this.context;
    this.context = null; this.gain = null;
    this.source?.stop(); this.source?.disconnect(); this.source = null;
    if (context && context.state !== 'closed') void context.close().catch(() => {});
  }
  dispose() { ++this.revision; this.release(); }
}
