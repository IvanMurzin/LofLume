export type Track = { id: string; title: string; url: string; artist: string; artistUrl?: string; source: string; license: string };
export type MusicState = { track: Track; index: number; phase: 'idle' | 'loading' | 'playing' | 'paused' | 'error'; volume: number; error: string | null };
type AudioPort = Pick<HTMLAudioElement, 'src' | 'currentTime' | 'ended' | 'volume' | 'play' | 'pause' | 'load' | 'addEventListener' | 'removeEventListener'>;

export class SceneMusic {
  private audio: AudioPort;
  private tracks: readonly Track[];
  private index = 0;
  private queue: number[];
  private cursor = 0;
  private random: () => number;
  private phase: MusicState['phase'] = 'idle';
  private error: string | null = null;
  private request = 0;
  private wanted = false;
  private loaded = false;
  private listeners = new Set<(state: MusicState) => void>();

  constructor(audio: AudioPort, tracks: readonly Track[], volume = .45, random = Math.random) {
    if (!tracks.length) throw new Error('A music catalog is required');
    this.audio = audio;
    this.tracks = tracks;
    this.random = random;
    this.queue = this.shuffle();
    this.index = this.queue[0]!;
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

  private shuffle(previous?: number): number[] {
    const queue = this.tracks.map((_, index) => index);
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j]!, queue[i]!];
    }
    if (queue.length > 1 && queue[0] === previous) {
      const j = 1 + Math.floor(this.random() * (queue.length - 1));
      [queue[0], queue[j]] = [queue[j]!, queue[0]!];
    }
    return queue;
  }

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
    this.cursor++;
    if (this.cursor === this.queue.length) {
      this.queue = this.shuffle(this.index);
      this.cursor = 0;
    }
    this.index = this.queue[this.cursor]!;
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
    this.error = 'playback';
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
