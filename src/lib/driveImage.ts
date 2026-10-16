/**
 * Mamá va a pegar links de "Compartir" de Google Drive (/file/d/ID/view),
 * que no sirven como <img src>. Los convertimos al formato que sí se puede mostrar.
 */
export function resolveImageUrl(rawUrl: string): string {
  const url = rawUrl.trim()
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  const driveIdMatch = url.match(/[?&]id=([^&]+)/)
  const driveId = driveMatch?.[1] ?? (url.includes('drive.google.com') ? driveIdMatch?.[1] : undefined)

  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`
  }

  return url
}
