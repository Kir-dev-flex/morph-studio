const PORTRAIT_ASPECT_THRESHOLD = 0.75;
const DESKTOP_WIDTH_RATIO = 0.66;
const DESKTOP_HEIGHT_RATIO = 0.94;
const PORTRAIT_WIDTH_RATIO = 1.48;
const PORTRAIT_HEIGHT_RATIO = 0.74;

interface ArtworkViewport {
  width: number;
  height: number;
}

/**
 * Calculates a square artwork size that preserves the intended overscan without
 * allowing ultrawide viewports to crop the sculpture vertically.
 */
export function getArtworkScale({
  width,
  height,
}: ArtworkViewport): number {
  if (width <= 0 || height <= 0) {
    return 0;
  }

  const aspectRatio = width / height;
  const isPortrait = aspectRatio < PORTRAIT_ASPECT_THRESHOLD;
  const widthRatio = isPortrait ? PORTRAIT_WIDTH_RATIO : DESKTOP_WIDTH_RATIO;
  const heightRatio = isPortrait ? PORTRAIT_HEIGHT_RATIO : DESKTOP_HEIGHT_RATIO;

  return Math.min(width * widthRatio, height * heightRatio);
}
