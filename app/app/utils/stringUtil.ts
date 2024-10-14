/**
 * Removes invisible characters from the end of a string.
 *
 * Works fine with Sanity metadata as well.
 */
export function trimEndInvisible(str: string): string {
  return str.replace(/[\s\u200B-\u200D]+$/, "")
}
