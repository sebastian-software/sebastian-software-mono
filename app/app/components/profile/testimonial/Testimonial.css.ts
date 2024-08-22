import { style } from "@vanilla-extract/css"

export const root = style({})

export const quote = style({
  quotes: '"»" "«"',
  whiteSpace: "pre-line",

  selectors: {
    "&::before": {
      position: "absolute",
      marginTop: "-0.5rem",
      marginLeft: "-1.5rem",
      fontSize: "2rem",
      lineHeight: 1,
      content: "open-quote"
    }
  }
})

export const caption = style({
  fontWeight: "bold"
})
