import slugify from "@sindresorhus/slugify"

// Note (via ChatGPT):
// A good "special" character that is URL-safe, rarely used otherwise, and can
// work as a prefix for identifying a UUID segment could be the tilde (~).
// The tilde is part of the standard URL character set, and it is generally
// not used frequently in most contexts, making it a unique and easily
// identifiable prefix for your UUID segment.

/**
 * Extract the first UUID segment from a prepared URL
 */
export function extractFirstUuidSegment(url?: string | null): string | null {
  if (!url) {
    return null
  }

  // Regular expression to match a UUID pattern after a tilde (~) followed by a word boundary
  const regex = /~([\da-f]{8})\b/i

  // Attempt to match the pattern in the URL
  const match = regex.exec(url)

  // If a match is found, return the first UUID segment, otherwise return null
  return match ? match[1] : null
}

/**
 * Return the first 8 characters of the UUID add add a tilde (~) prefix
 */
export function encodeFirstUuidSegment(id: string): string {
  return "~" + id.split("-")[0]
}

const safeSymbols = new Set(["_", "~", "."])

/**
 * Join slugified string segments with a hyphen
 */
export function buildReadableUrl(segments: string[]): string {
  return segments
    .map((value) => (safeSymbols.has(value) ? value : slugify(value)))
    .join("-")
}
