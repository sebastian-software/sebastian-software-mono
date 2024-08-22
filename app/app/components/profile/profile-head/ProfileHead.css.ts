import { style } from "@vanilla-extract/css"

export const rootClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "4rem"
})

export const nameClass = style({
  fontSize: "5vw",
  textAlign: "center",
  textTransform: "uppercase",
  marginBottom: "2rem"
})
