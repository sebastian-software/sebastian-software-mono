import type { GlobalStyleRule } from "@vanilla-extract/css"
import { globalStyle, style } from "@vanilla-extract/css"

// desktop:
// - main body text: 50-75 (https://baymard.com/blog/line-length-readability)
// - column text: 40-50

// mobile:
// - main body text: 30-50 (https://blog.designary.com/p/the-optimal-text-line-length-for-readability)

function generateVerticalLine(column: "40ch", color: string): GlobalStyleRule {
  return {
    content: "",
    position: "absolute",
    left: column /* Position the line at the 40 character width */,
    top: 0,
    bottom: 0,
    width: "1px" /* Line width */,
    backgroundColor: color,
    zIndex: 1 /* Ensure the line appears above the text */
  }
}

export const root = style({
  fontSize: "var(--step-0)",
  padding: "1.5rem"
})

globalStyle(`${root} :where(p, ul, ol)`, {
  position: "relative",
  overflowX: "hidden"
})

globalStyle(
  `${root} :where(p, ul, ol)::before`,
  generateVerticalLine("30ch", "red")
)
globalStyle(
  `${root} :where(p, ul, ol)::after`,
  generateVerticalLine("50ch", "green")
)

globalStyle(`${root} h1`, {
  fontSize: "var(--step-3)"
})

globalStyle(`${root} h2`, {
  fontSize: "var(--step-2)"
})

globalStyle(`${root} h3`, {
  fontSize: "var(--step-1)"
})
