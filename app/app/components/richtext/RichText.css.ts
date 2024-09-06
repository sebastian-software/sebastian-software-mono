import type { GlobalStyleRule } from "@vanilla-extract/css"
import { globalStyle, style } from "@vanilla-extract/css"

import { elenaWebfont } from "../fonts"

// desktop:
// - main body text: 50-75 (https://baymard.com/blog/line-length-readability)
// - column text: 40-50

// mobile:
// - main body text: 30-50 (https://blog.designary.com/p/the-optimal-text-line-length-for-readability)

function generateVerticalLine(column: string, color: string): GlobalStyleRule {
  return {
    content: "",
    position: "absolute",
    left: column /* Position the line at the 40 character width */,
    top: 0,
    bottom: 0,
    width: "2px" /* Line width */,
    backgroundColor: color,
    zIndex: 1 /* Ensure the line appears above the text */
  }
}

export const root = style({
  fontSize: "var(--step-0)",
  padding: "1.5rem",

  // Auto hyphens which are a good compromise for longer German words.
  // "The CSS Text Module Level 4 suggests that browsers use "5 2 2" as their starting point (which I think results in too much hyphenation), but browsers are free to vary that as they see fit."
  // Via: https://medium.com/clear-left-thinking/all-you-need-to-know-about-hyphenation-in-css-2baee2d89179
  hyphens: "auto",
  hyphenateLimitChars: "8 4 4"
})

globalStyle(`${root} :where(p, ul, ol, h1, h2)`, {
  position: "relative",
  overflowX: "hidden"
})

// globalStyle(
//   `${root} :where(h1, h2)::before`,
//   generateVerticalLine("22ch", "red")
// )

// globalStyle(
//   `${root} :where(p, ul, ol)::before`,
//   generateVerticalLine("30ch", "red")
// )

globalStyle(`${root} h1`, {
  fontSize: "var(--step-2)",
  fontFamily: elenaWebfont
})

globalStyle(`${root} h2`, {
  fontSize: "var(--step-1)"
})
