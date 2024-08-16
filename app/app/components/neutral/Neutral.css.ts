import { style } from "@vanilla-extract/css"

export const root = style({
  display: "flex"
})

export const inner = style({
  width: 0,
  flexGrow: 1
})
