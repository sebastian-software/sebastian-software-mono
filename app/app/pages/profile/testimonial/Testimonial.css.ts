import { style } from "@vanilla-extract/css"

export const rootClass = style({
  listStyle: "none"
})

export const figureClass = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-s)",
  maxWidth: "40ch"
})

export const imageClass = style({
  backgroundColor: "#ddd",
  border: "1px solid #aaa",
  borderRadius: "50%",
  filter: "grayscale(1)",
  maxWidth: "max-content"
})

export const captionClass = style({
  fontSize: "var(--step-0)",
  lineHeight: "1.2",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",

  selectors: {
    "&::first-line": {
      fontWeight: "bold"
    }
  }
})

export const quoteClass = style({
  quotes: '"»" "«"',
  whiteSpace: "pre-line",
  maxWidth: "40ch"

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
