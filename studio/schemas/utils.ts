const companySuffixes = new Set([
  "Inc.",
  "Ltd.",
  "GmbH",
  "AG",
  "Co.",
  "KG",
  "LLC",
  "Gbr",
  "KGaA",
  "B.V.",
  "SE",
  "&"
])

export function removeWordsFromEnd(
  input: string,
  wordsToRemove: Set<string>
): string {
  const words = input.trim().split(/\s+/)

  while (words.length > 0) {
    const lastWord = words.at(-1)
    if (lastWord && wordsToRemove.has(lastWord)) {
      words.pop()
    } else {
      break
    }
  }

  const combined = words.join(" ")
  if (combined.endsWith(",")) {
    return combined.slice(0, -1)
  }

  return combined
}

export function removeCompanySuffixes(input: string): string {
  return removeWordsFromEnd(input, companySuffixes)
}

export function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const clientOptions = { apiVersion: getCurrentDate() }
