import { style } from "@vanilla-extract/css"

export const rootClass = style({})

export const titleClass = style({})

export const visualHideClass = style({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
})
