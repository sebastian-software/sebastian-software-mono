import { globalStyle, style } from "@vanilla-extract/css"

export const root = style({})

globalStyle(`${root} h1`, {
  fontWeight: "normal",
  fontSize: "2rem",
  lineHeight: "1.2",
  textWrap: "balance"
})

globalStyle(`${root} h1 strong`, {
  fontSize: "3rem",
  textTransform: "uppercase",
  display: "block"
})

globalStyle(`${root} h2`, {
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "1.2",
  textWrap: "balance",
  marginTop: "2rem"
})

globalStyle(`${root} p:not(:first-child)`, {
  marginTop: "1rem"
})

globalStyle(`${root} p:not(:last-child)`, {
  marginBottom: "1rem"
})

globalStyle(`${root} ol`, {
  marginBlock: "1rem",
  marginLeft: "2rem"
})
