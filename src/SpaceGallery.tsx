import { useState } from 'react';
import { useI18n } from './I18n.tsx';
import { publicAsset } from './assets.ts';
import { findSpace, spaces } from './spaces.ts';
import type { Space, SpaceId } from './spaces.ts';

type Props = { current: SpaceId; loading: string | null; error: boolean; onEnter: (space: Space) => void };
const arrow = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
export function SpaceGallery({ current, loading, error, onEnter }: Props) {
  const { t } = useI18n();
  const [previewErrors, setPreviewErrors] = useState<Set<SpaceId>>(() => new Set());
  return <main className="space-gallery">
    <header className="gallery-header">
      <span className="wordmark"><img src={publicAsset('favicon.svg')} width="28" height="28" alt=""/>loflume</span>
      <button className="gallery-return" type="button" disabled={!!loading} onClick={() => onEnter(findSpace(current))}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H4m5-5-5 5 5 5"/></svg><span>{t('returnToSpace')}</span></button>
    </header>
    <section className="gallery-content" aria-labelledby="gallery-title" aria-busy={!!loading}>
      <div className="gallery-intro"><h1 id="gallery-title" tabIndex={-1}>{t('spaces')}</h1><p>{t('chooseSpace')}</p></div>
      <div className="space-grid">
        {spaces.map(space => <button key={space.id} type="button" className="space-card" data-space-card={space.id} data-tone={space.id} disabled={!!loading} aria-label={t('enterSpace', { name: space.title })} onClick={() => onEnter(space)}>
          <div className="space-preview">
            {previewErrors.has(space.id) ? <span className="space-preview-error">{t('previewUnavailable')}</span> : <img src={publicAsset(space.image)} width={space.width} height={space.height} alt="" decoding="async" draggable={false} onError={() => setPreviewErrors(previous => new Set(previous).add(space.id))}/>}
            <span className="space-preview-shade"/>
            {space.id === current && <span className="space-last"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12M3 14V6a5 5 0 0 1 10 0v8Z"/></svg>{t('lastSpace')}</span>}
            {loading === space.id && <span className="space-loading" role="status">{t('loading')}</span>}
          </div>
          <div className="space-card-caption"><div><h2>{space.title}</h2><p>{space.tagline}</p></div><span className="space-enter">{arrow}</span></div>
        </button>)}
      </div>
      {error && <p className="gallery-error" role="alert">{t('spaceLoadError')}</p>}
    </section>
  </main>;
}
