import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  listStyle: "none"
})

export const figureClass = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-s)",

  marginBottom: "var(--space-xs)"
})

export const imageClass = style({
  backgroundColor: variables.color.lightGold,
  borderRadius: "50%",
  filter: "grayscale(0.5)",

  maxWidth: "max-content"
})

export const captionClass = style({
  fontSize: "var(--step--1)",
  lineHeight: "1.2",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",

  selectors: {
    "&::first-line": {
      fontWeight: "600",
      fontSize: "var(--step-0)"
    }
  }
})

export const quoteClass = style({
  quotes: '"»" "«"',
  whiteSpace: "pre-line"

  // selectors: {
  //   "&::before": {
  //     position: "absolute",
  //     marginTop: "-0.5rem",
  //     marginLeft: "-1.5rem",
  //     fontSize: "2rem",
  //     content: "open-quote"
  //   }
  // }
})
