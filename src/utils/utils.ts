export const getUserName = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function timeAgo(timestamp: number) {
  const diffSeconds = Math.floor((Date.now() - timestamp * 1000) / 1000);

  if (diffSeconds < 60) {
    return `${diffSeconds} sekunder siden`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minutter siden`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} timer siden`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} dage siden`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} måneder siden`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} år siden`;
}
