import type { GlobalStyleRule } from "@vanilla-extract/css"
import { globalStyle, style } from "@vanilla-extract/css"

import { breakpoints } from "~/pages/layout/config"
import { variables } from "~/theme.css"

import { elenaWebfont } from "../fonts"

// desktop:
// - main body text: 50-75 (https://baymard.com/blog/line-length-readability)
// - column text: 40-50

// mobile:
// - main body text: 30-50 (https://blog.designary.com/p/the-optimal-text-line-length-for-readability)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  fontSize: "var(--step-0)"
  // paddingInline: "var(--space-m-l)",

  // Auto hyphens which are a good compromise for longer German words.
  // "The CSS Text Module Level 4 suggests that browsers use "5 2 2" as their starting point (which I think results in too much hyphenation), but browsers are free to vary that as they see fit."
  // Via: https://medium.com/clear-left-thinking/all-you-need-to-know-about-hyphenation-in-css-2baee2d89179
  // hyphens: "auto",
  // hyphenateLimitChars: "8 4 4",
})

globalStyle(`${root} :where(p, ul, ol, h1, h2)`, {
  position: "relative",
  overflowX: "hidden"
})

globalStyle(`${root} :where(h1, h2):first-child`, {
  marginTop: "var(--space-xl)"
})

globalStyle(`${root} :where(p, ul, ol)`, {
  marginBottom: "var(--space-s)",

  // Limit max width on landscape to keep legibility
  maxWidth: "70ch"
})

// // Mobile

// globalStyle(
//   `${root} :where(h1, h2)::before`,
//   generateVerticalLine("22ch", "red")
// )

// globalStyle(
//   `${root} :where(p, ul, ol)::before`,
//   generateVerticalLine("30ch", "red")
// )

// Desktop

// globalStyle(
//   `${root} :where(h1, h2)::before`,
//   generateVerticalLine("50ch", "red")
// )

// globalStyle(
//   `${root} :where(p, ul, ol)::before`,
//   generateVerticalLine("50ch", "green")
// )

// globalStyle(
//   `${root} :where(p, ul, ol)::after`,
//   generateVerticalLine("75ch", "red")
// )

globalStyle(`${root} h1`, {
  fontSize: "var(--step-3)",
  textTransform: "uppercase",
  lineHeight: "1.2",
  color: variables.color.violet,
  marginBottom: "var(--space-m)"
})

globalStyle(`${root} h2`, {
  fontFamily: elenaWebfont,
  lineHeight: "1.35",
  fontSize: "var(--step-1)",
  marginTop: "var(--space-m)",
  marginBottom: "var(--space-2xs)",
  textWrap: "balance"
})

globalStyle(`${root} ul`, {
  paddingLeft: "var(--space-m)"
})

globalStyle(`${root} ol`, {
  paddingLeft: "var(--space-m)"
})

globalStyle(`${root} li`, {})

globalStyle(`${root} picture`, {
  "@media": {
    [breakpoints.landscape]: {
      // Don't use outdent and limit the image width otherwise the full screen
      // might be quickly filled with just one image.
      maxWidth: "70ch"

      // maxWidth: "min(calc(100% + 2 * var(--space-s-2xl)), 20vw)",
      // marginLeft: "calc(var(--space-s-2xl) * -1)",
      // marginRight: "calc(var(--space-s-2xl) * -1)"
    },

    [breakpoints.portrait]: {
      maxWidth: "calc(100% + 2 * var(--space-s-m))",
      marginLeft: "calc(var(--space-s-m) * -1)",
      marginRight: "calc(var(--space-s-m) * -1)"
    }
  }
})
