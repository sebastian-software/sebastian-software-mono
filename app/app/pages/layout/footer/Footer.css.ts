import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white,
  fontSize: "var(--step--1)",

  paddingInline: "var(--space-m-l)",
  paddingBlock: "var(--space-s)",

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
