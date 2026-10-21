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
    // drive.google.com/thumbnail redirige acá, pero el primer salto no carga
    // de forma confiable como <img> (sus headers lo bloquean en el navegador
    // aunque curl lo siga bien) — se arma directo el link final.
    return `https://lh3.googleusercontent.com/d/${driveId}=w1000`
  }

  return url
}
