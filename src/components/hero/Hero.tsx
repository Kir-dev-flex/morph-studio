import { lazy, Suspense } from 'react';

import { Header } from '../Header';

const HeroCanvas = lazy(async () => {
  const module = await import('./HeroCanvas');
  return { default: module.HeroCanvas };
});

function hasWebGPU(): boolean {
  return typeof navigator !== 'undefined' && 'gpu' in navigator;
}

/**
 * Renders the MORPH hero shell and static artwork fallback.
 */
export function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Header />
      <img
        className="hero-fallback"
        src="/assets/hero-fallback.webp"
        alt="Layered abstract MORPH sculpture"
      />
      {hasWebGPU() ? (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      ) : null}
      <div className="hero-scan-line" aria-hidden="true" />
      <div className="hero-copy">
        <h1 id="hero-title">FORM IS NEVER FINAL</h1>
        <p>Collectible objects shaped by matter and motion.</p>
        <a className="outline-link" href="#collection">
          View collection
        </a>
      </div>
      <div className="hero-index" aria-hidden="true">
        <span>Sculptural index</span>
        <span>01 / 50</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}
