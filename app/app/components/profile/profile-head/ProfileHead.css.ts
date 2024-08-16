import { style } from "@vanilla-extract/css"

export const rootClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "4rem"
})

export const nameClass = style({
  fontSize: "7.5vw",
  textAlign: "center",
  letterSpacing: "0.1em",
  whiteSpace: "balance",
  textTransform: "uppercase",
  textDecoration: "underline",
  marginBottom: "2rem"
})
