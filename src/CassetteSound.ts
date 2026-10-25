export type CassetteAction = 'insert' | 'eject';
// Original mechanical sequence: sliding tape, latch and a short resonant clunk.
export class CassetteSound {
  private context: AudioContext | null = null;
  play(volume: number, action: CassetteAction = 'insert'): void {
    if (!Number.isFinite(volume) || volume <= 0) return;
    try {
      const context = this.context ??= new AudioContext();
      if (context.state === 'suspended') void context.resume().catch(() => {});
      const gain = context.createGain();
      gain.gain.value = Math.min(1, volume) * .72;
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -10; compressor.ratio.value = 5;
      gain.connect(compressor); compressor.connect(context.destination);
      const duration = action === 'insert' ? 1.12 : .86;
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
      const samples = buffer.getChannelData(0);
      const latch = action === 'insert' ? .69 : .12;
      const clunk = action === 'insert' ? .87 : .48;
      for (let i = 0; i < samples.length; i++) {
        const t = i / context.sampleRate;
        const slideStart = action === 'insert' ? .07 : .24;
        const slideEnd = action === 'insert' ? .66 : .67;
        const slide = t > slideStart && t < slideEnd ? .3 * Math.sin(Math.PI * (t - slideStart) / (slideEnd - slideStart)) ** 2 : 0;
        const impulse = (at: number, level: number) => t >= at ? level * Math.exp(-(t - at) * 60) : 0;
        const noise = (Math.random() * 2 - 1) * (slide + impulse(latch, .9) + impulse(clunk, .7));
        const resonance = t >= clunk ? .5 * Math.sin(2 * Math.PI * 132 * (t - clunk)) * Math.exp(-(t - clunk) * 25) : 0;
        samples[i] = noise + resonance;
      }
      const source = context.createBufferSource(); const filter = context.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 2600;
      source.buffer = buffer; source.connect(filter); filter.connect(gain);
      source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); compressor.disconnect(); };
      source.start();
    } catch { /* The physical sound is optional; cassette actions still work. */ }
  }
  dispose(): void { if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {}); this.context = null; }
}
