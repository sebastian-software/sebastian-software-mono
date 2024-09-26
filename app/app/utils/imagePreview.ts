/**
 * Fetches an image from the given URL and returns it as a data URL string.
 * @param url - The URL of the image to fetch.
 * @returns A promise that resolves to a data URL string of the image.
 */
export async function fetchToDataUrl(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  // Get the Content-Type header to determine the MIME type
  const contentType = response.headers.get("Content-Type")
  if (!contentType) {
    throw new Error("Could not determine the content type of the image")
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Convert the buffer to a base64-encoded string
  const base64 = buffer.toString("base64")

  // Construct the data URL
  const dataUrl = `data:${contentType};base64,${base64}`

  return dataUrl
}
