/**
 * Builds a public asset URL that works both locally and under a Vite base path.
 */
export function getAssetUrl(
  assetPath: string,
  baseUrl: string = import.meta.env.BASE_URL,
): string {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedAssetPath = assetPath.replace(/^\/+/, '');

  return `${normalizedBaseUrl}${normalizedAssetPath}`;
}
