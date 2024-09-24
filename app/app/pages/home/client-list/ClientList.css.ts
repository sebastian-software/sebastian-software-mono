import { style } from "@vanilla-extract/css"

export const listClass = style({
  gap: "var(--space-2xl)"
})

export const itemClass = style({
  listStyle: "none"
})

export const logoClass = style({
  maxWidth: "var(--space-4xl)",
  maxHeight: "var(--space-xl)",

  width: "100%",
  height: "100%",

  objectFit: "contain",
  objectPosition: "center"
})
