import { globalStyle, style } from "@vanilla-extract/css"

export const root = style({})

globalStyle(`${root} h1`, {
  fontSize: "2rem"
})

globalStyle(`${root} h2`, {
  fontSize: "1.5rem"
})
