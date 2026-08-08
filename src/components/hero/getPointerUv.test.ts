import { describe, expect, it } from 'vitest';

import { getPointerNdc, getPointerUv } from './getPointerUv';

describe('getPointerUv', () => {
  it('should map the canvas center to the artwork center', () => {
    expect(
      getPointerUv({
        pointerX: 0,
        pointerY: 0,
        viewportWidth: 18,
        viewportHeight: 9,
        artworkScale: 8,
      }),
    ).toEqual({ x: 0.5, y: 0.5 });
  });

  it('should account for artwork size on a wide viewport', () => {
    expect(
      getPointerUv({
        pointerX: 8 / 18,
        pointerY: 0,
        viewportWidth: 18,
        viewportHeight: 9,
        artworkScale: 8,
      }),
    ).toEqual({ x: 1, y: 0.5 });
  });

  it('should map the hero center to normalized pointer coordinates', () => {
    expect(
      getPointerNdc({
        clientX: 600,
        clientY: 450,
        left: 100,
        top: 50,
        width: 1000,
        height: 800,
      }),
    ).toEqual({ x: 0, y: 0 });
  });
});
