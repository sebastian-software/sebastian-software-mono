import { style } from "@vanilla-extract/css"

export const rootClass = style({})

export const quoteClass = style({
  quotes: '"»" "«"',
  whiteSpace: "pre-line",

  selectors: {
    "&::before": {
      position: "absolute",
      marginTop: "-0.5rem",
      marginLeft: "-1.5rem",
      fontSize: "2rem",
      content: "open-quote"
    }
  }
})

export const captionClass = style({
  fontWeight: "bold"
})

export const imageClass = style({
  backgroundColor: "#ddd",
  border: "1px solid #aaa",
  borderRadius: "50%",
  filter: "grayscale(1)",
  marginBottom: "0.5rem",

  selectors: {
    "&:hover": {
      filter: "none"
    }
  }
})
