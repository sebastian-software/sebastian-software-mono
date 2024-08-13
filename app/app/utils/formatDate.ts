export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
