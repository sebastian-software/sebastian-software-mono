import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white
})

export const containerClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-xs)"
})

export const buttonClass = style({
  border: "1px solid white",
  borderRadius: "4px",
  background: "none",
  color: variables.color.white,
  marginRight: "var(--space-xs)"
})
