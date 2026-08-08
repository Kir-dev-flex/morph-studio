import { describe, expect, it } from 'vitest';

import { getAssetUrl } from './getAssetUrl';

describe('getAssetUrl', () => {
  it('should prefix assets with the GitHub Pages repository base', () => {
    expect(
      getAssetUrl('/assets/morph-hero-source.png', '/morph-studio/'),
    ).toBe('/morph-studio/assets/morph-hero-source.png');
  });

  it('should preserve root-based local development assets', () => {
    expect(getAssetUrl('assets/fold-lamp.png', '/')).toBe(
      '/assets/fold-lamp.png',
    );
  });
});
