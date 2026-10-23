export type Track = { id: string; title: string; url: string; artist: string; artistUrl?: string; source: string; license: string };
export type MusicState = { track: Track; index: number; phase: 'idle' | 'loading' | 'playing' | 'paused' | 'error'; volume: number; error: string | null };
type AudioPort = Pick<HTMLAudioElement, 'src' | 'currentTime' | 'ended' | 'volume' | 'play' | 'pause' | 'load' | 'addEventListener' | 'removeEventListener'>;

export class SceneMusic {
  private audio: AudioPort;
  private tracks: readonly Track[];
  private index = 0;
  private phase: MusicState['phase'] = 'idle';
  private error: string | null = null;
  private request = 0;
  private wanted = false;
  private loaded = false;
  private listeners = new Set<(state: MusicState) => void>();

  constructor(audio: AudioPort, tracks: readonly Track[], volume = .45) {
    if (!tracks.length) throw new Error('A music catalog is required');
    this.audio = audio;
    this.tracks = tracks;
    this.setVolume(volume);
    audio.addEventListener('ended', this.onEnded);
    audio.addEventListener('error', this.onError);
    audio.addEventListener('playing', this.onPlaying);
    audio.addEventListener('pause', this.onPause);
  }

  get state(): MusicState {
    return { track: this.tracks[this.index]!, index: this.index, phase: this.phase, volume: this.audio.volume, error: this.error };
  }

  subscribe(listener: (state: MusicState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => { this.listeners.delete(listener); };
  }

  private notify(): void { for (const listener of this.listeners) listener(this.state); }

  async play(): Promise<void> {
    const request = ++this.request;
    const retry = this.phase === 'error';
    this.wanted = true;
    this.error = null;
    this.phase = 'loading';
    if (!this.loaded || retry) {
      this.audio.src = this.tracks[this.index]!.url;
      this.loaded = true;
      this.audio.load();
    }
    this.notify();
    try {
      await this.audio.play();
      if (request !== this.request || !this.wanted) return;
      this.phase = 'playing';
      this.notify();
    } catch {
      if (request !== this.request || !this.wanted) return;
      this.fail();
    }
  }

  pause(): void {
    ++this.request;
    this.wanted = false;
    this.audio.pause();
    if (this.phase !== 'error' && this.phase !== 'idle') this.phase = 'paused';
    this.notify();
  }

  toggle(): void {
    if (this.phase === 'playing' || this.phase === 'loading') this.pause();
    else void this.play();
  }

  private advance(): void {
    const resume = this.wanted;
    ++this.request;
    this.wanted = false;
    this.audio.pause();
    this.index = (this.index + 1) % this.tracks.length;
    this.audio.src = this.tracks[this.index]!.url;
    this.audio.load();
    this.loaded = true;
    this.error = null;
    this.phase = 'paused';
    this.notify();
    if (resume) void this.play();
  }

  setVolume(volume: number): void {
    this.audio.volume = Number.isFinite(volume) ? Math.max(0, Math.min(1, volume)) : .45;
    this.notify();
  }

  private fail(): void {
    ++this.request;
    this.wanted = false;
    this.audio.pause();
    this.phase = 'error';
    this.error = 'Не удалось включить музыку. Попробуй ещё раз.';
    this.notify();
  }

  private onEnded = (): void => { if (this.wanted) this.advance(); };
  private onError = (): void => { if (this.loaded) this.fail(); };
  private onPlaying = (): void => { if (this.wanted) { this.phase = 'playing'; this.error = null; this.notify(); } };
  private onPause = (): void => {
    if (this.phase === 'playing' && !this.audio.ended) { this.wanted = false; this.phase = 'paused'; this.notify(); }
  };

  dispose(): void {
    this.pause();
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.removeEventListener('error', this.onError);
    this.audio.removeEventListener('playing', this.onPlaying);
    this.audio.removeEventListener('pause', this.onPause);
    this.listeners.clear();
  }
}
