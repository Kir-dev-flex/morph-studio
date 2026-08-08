import { describe, expect, it } from 'vitest';

import { getArtworkScale } from './getArtworkScale';

describe('getArtworkScale', () => {
  it('should keep the sculpture inside an ultrawide hero after WebGPU loads', () => {
    const scale = getArtworkScale({ width: 18.82, height: 9.53 });

    expect(scale).toBeCloseTo(8.9582, 4);
    expect(scale).toBeLessThanOrEqual(9.53 * 0.94);
  });

  it('should preserve intentional overscan on a portrait viewport', () => {
    const scale = getArtworkScale({ width: 3.9, height: 8.44 });

    expect(scale).toBeCloseTo(5.772, 3);
  });
});
