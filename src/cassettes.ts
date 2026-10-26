import { ru } from './locales/ru.ts';
export type Provider = 'youtube' | 'spotify' | 'yandex';
export type Cassette = { url: string; name: string; provider: Provider; embedUrl: string; videoId?: string; listId?: string; spotifyUri?: string };
export type CassetteSlots = [Cassette | null, Cassette | null, Cassette | null];
export const providerNames: Record<Provider, string> = { youtube: 'YouTube', spotify: 'Spotify', yandex: ru.providerYandex };
export const cassetteStorageKey = 'loflume.cassettes.v1';
const youtubeHosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be']);
const yandexHosts = new Set(['music.yandex.ru', 'music.yandex.com', 'music.yandex.by', 'music.yandex.kz', 'music.yandex.uz']);
const youtubeId = /^[\w-]{11}$/;
const playlistId = /^[\w-]{10,120}$/;

export function parseCassette(input: string, name = ''): Cassette | null {
  if (input.length > 2048) return null;
  let url: URL;
  try { url = new URL(input.trim()); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.port) return null;
  const title = name.trim().slice(0, 60);
  const segments = url.pathname.split('/').filter(Boolean);
  if (youtubeHosts.has(url.hostname)) {
    let videoId: string | undefined;
    if (url.hostname === 'youtu.be' && segments.length === 1) videoId = segments[0];
    else if (url.pathname === '/watch') videoId = url.searchParams.get('v') ?? undefined;
    else if (['live', 'shorts', 'embed'].includes(segments[0] ?? '') && segments.length === 2 && segments[1] !== 'videoseries') videoId = segments[1];
    const listId = url.searchParams.get('list') ?? undefined;
    if (videoId && !youtubeId.test(videoId)) return null;
    if (listId && !playlistId.test(listId)) return null;
    if (!videoId && !(listId && ['/playlist', '/watch', '/embed/videoseries'].includes(url.pathname))) return null;
    const canonical = new URL(videoId ? `https://www.youtube.com/watch?v=${videoId}` : 'https://www.youtube.com/playlist');
    const embed = new URL(`https://www.youtube.com/embed/${videoId ?? 'videoseries'}`);
    if (listId) { canonical.searchParams.set('list', listId); embed.searchParams.set('list', listId); }
    return { url: canonical.href, name: title || ru.myMix, provider: 'youtube', embedUrl: embed.href, videoId, listId };
  }
  if (url.hostname === 'open.spotify.com') {
    if (/^intl-[a-z]{2}$/.test(segments[0] ?? '')) segments.shift();
    if (segments[0] === 'embed') segments.shift();
    const [kind, id] = segments;
    if (segments.length !== 2 || !['playlist', 'album', 'track'].includes(kind ?? '') || !/^[A-Za-z0-9]{22}$/.test(id ?? '')) return null;
    return { url: `https://open.spotify.com/${kind}/${id}`, name: title || ru.myMix, provider: 'spotify', embedUrl: `https://open.spotify.com/embed/${kind}/${id}?theme=0`, spotifyUri: `spotify:${kind}:${id}` };
  }
  if (yandexHosts.has(url.hostname)) {
    let parts = segments;
    if (parts[0] === 'iframe') parts = url.hash ? url.hash.slice(1).split('/').filter(Boolean) : parts.slice(1);
    let path: string;
    let embedPath: string;
    if (parts.length === 4 && parts[0] === 'users' && parts[2] === 'playlists' && /^[A-Za-z0-9_.@-]{1,100}$/.test(parts[1]!) && /^\d+$/.test(parts[3]!)) {
      path = `/users/${parts[1]}/playlists/${parts[3]}`; embedPath = `playlist/${parts[1]}/${parts[3]}`;
    } else if (parts.length === 3 && parts[0] === 'playlist' && /^[A-Za-z0-9_.@-]{1,100}$/.test(parts[1]!) && /^\d+$/.test(parts[2]!)) {
      path = `/users/${parts[1]}/playlists/${parts[2]}`; embedPath = parts.join('/');
    } else if (parts.length === 2 && ['playlists', 'playlist'].includes(parts[0]!) && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(parts[1]!)) {
      path = `/playlists/${parts[1]}`; embedPath = `playlists/${parts[1]}`;
    } else if (parts[0] === 'album' && /^\d+$/.test(parts[1] ?? '') && parts.length === 2) {
      path = `/album/${parts[1]}`; embedPath = `album/${parts[1]}`;
    } else if (parts.length === 4 && parts[0] === 'album' && parts[2] === 'track' && /^\d+$/.test(parts[1]!) && /^\d+$/.test(parts[3]!)) {
      path = `/album/${parts[1]}/track/${parts[3]}`; embedPath = `track/${parts[3]}/${parts[1]}`;
    } else if (parts.length === 3 && parts[0] === 'track' && /^\d+$/.test(parts[1]!) && /^\d+$/.test(parts[2]!)) {
      path = `/album/${parts[2]}/track/${parts[1]}`; embedPath = parts.join('/');
    } else return null;
    return { url: `https://music.yandex.ru${path}`, name: title || ru.myMix, provider: 'yandex', embedUrl: `https://music.yandex.ru/iframe/${embedPath}` };
  }
  return null;
}

export function restoreCassettes(raw: string | null): CassetteSlots {
  const empty: CassetteSlots = [null, null, null];
  try {
    const data: unknown = JSON.parse(raw ?? 'null');
    if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('slots' in data) || !Array.isArray(data.slots)) return empty;
    return empty.map((_, i) => {
      const entry: unknown = (data.slots as unknown[])[i];
      if (!entry || typeof entry !== 'object' || !('url' in entry) || typeof entry.url !== 'string') return null;
      return parseCassette(entry.url, 'name' in entry && typeof entry.name === 'string' ? entry.name : '');
    }) as CassetteSlots;
  } catch { return empty; }
}

export function serializeCassettes(slots: CassetteSlots): string {
  return JSON.stringify({ version: 1, slots: slots.map(tape => tape && ({ url: tape.url, name: tape.name })) });
}
