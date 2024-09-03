// Note: General Rule:
// "Am" or "an der" (meaning "on the") and similar terms indicating a geographical feature (usually a river) are usually not translated into English.
// These geographical indicators are kept in their original form to maintain the specific identity of the city, especially when it might be necessary to distinguish between cities with similar names.
const cityMap: Record<string, string> = {
  München: "Munich",
  Köln: "Cologne",
  Nürnberg: "Nuremberg",
  Braunschweig: "Brunswick",
  Hannover: "Hanover",
  Aachen: "Aix-la-Chapelle",
  Wien: "Vienna",
  Zürich: "Zurich",
  Genf: "Geneva",
  Luzern: "Lucerne"
}

export function formatCity(city: string): string {
  return cityMap[city] || city
}
