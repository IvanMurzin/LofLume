// A short original two-note chime. Master volume follows the radio; the voice
// envelopes keep the tone soft and avoid clicks at either end.
export class TimerChime {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Set<OscillatorNode>();

  prepare(): void {
    try {
      this.context ??= new AudioContext();
      if (!this.master) {
        this.master = this.context.createGain();
        this.master.connect(this.context.destination);
      }
      if (this.context.state === 'suspended') void this.context.resume().catch(() => {});
    } catch { /* Visual completion remains available if audio is unavailable. */ }
  }

  play(volume: number): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master || context.state !== 'running') return;
    this.cancel();
    master.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), context.currentTime);
    for (const [offset, frequency] of [[0, 523.25], [.22, 659.25]] as const) {
      for (const [harmonic, level] of [[1, .18], [2, .022]] as const) {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        const start = context.currentTime + offset;
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency * harmonic;
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(level, start + .012);
        envelope.gain.exponentialRampToValueAtTime(.0001, start + .82);
        envelope.gain.linearRampToValueAtTime(0, start + .9);
        oscillator.connect(envelope);
        envelope.connect(master);
        this.voices.add(oscillator);
        oscillator.onended = () => {
          this.voices.delete(oscillator);
          oscillator.disconnect();
          envelope.disconnect();
        };
        oscillator.start(start);
        oscillator.stop(start + .9);
      }
    }
  }

  cancel(): void {
    for (const voice of this.voices) { try { voice.stop(); } catch { /* Already ended. */ } }
    this.voices.clear();
  }

  dispose(): void {
    this.cancel();
    const context = this.context;
    this.context = null;
    this.master = null;
    if (context && context.state !== 'closed') void context.close().catch(() => {});
  }
}
