// Original short mechanical clack and sliding noise; no external sound asset.
export class CassetteSound {
  private context: AudioContext | null = null;
  play(volume: number): void {
    if (volume <= 0) return;
    try {
      const context = this.context ??= new AudioContext();
      if (context.state === 'suspended') void context.resume().catch(() => {});
      const gain = context.createGain();
      gain.gain.value = Math.max(0, Math.min(1, volume)) * .3;
      gain.connect(context.destination);
      const noise = context.createBuffer(1, Math.ceil(context.sampleRate * .34), context.sampleRate);
      const samples = noise.getChannelData(0);
      for (let i = 0; i < samples.length; i++) {
        const t = i / context.sampleRate;
        const slide = .12 * Math.sin(Math.PI * Math.min(1, t / .26)) ** 2;
        const clack = Math.exp(-t * 160) + .8 * Math.exp(-Math.max(0, t - .23) * 150) * (t >= .23 ? 1 : 0);
        samples[i] = (Math.random() * 2 - 1) * (slide + clack);
      }
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 1900;
      source.buffer = noise; source.connect(filter); filter.connect(gain);
      source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
      source.start();
    } catch { /* Installing a cassette does not depend on sound support. */ }
  }
  dispose(): void { if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {}); this.context = null; }
}
