export interface PointerUvInput {
  pointerX: number;
  pointerY: number;
  viewportWidth: number;
  viewportHeight: number;
  artworkScale: number;
}

interface PointerUv {
  x: number;
  y: number;
}

export interface PointerNdcInput {
  clientX: number;
  clientY: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Maps full-canvas pointer coordinates to the square artwork's local UV space.
 */
export function getPointerUv({
  pointerX,
  pointerY,
  viewportWidth,
  viewportHeight,
  artworkScale,
}: PointerUvInput): PointerUv {
  if (artworkScale <= 0) {
    return { x: 0.5, y: 0.5 };
  }

  return {
    x: (pointerX * viewportWidth) / (2 * artworkScale) + 0.5,
    y: (pointerY * viewportHeight) / (2 * artworkScale) + 0.5,
  };
}

/**
 * Maps a DOM pointer position inside the hero to normalized device coordinates.
 */
export function getPointerNdc({
  clientX,
  clientY,
  left,
  top,
  width,
  height,
}: PointerNdcInput): PointerUv {
  if (width <= 0 || height <= 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: ((clientX - left) / width) * 2 - 1,
    y: 1 - ((clientY - top) / height) * 2,
  };
}
