import { boxShadow } from "@effective/shadow"
import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  fontSize: "0.875rem"
})

export const root = style({
  background: `linear-gradient(to bottom, ${variables.color.gold}, ${variables.color.darkGold})`,
  color: variables.color.white,
  boxShadow: boxShadow[1],
  textAlign: "center",
  display: "flex",
  cursor: "default",
  userSelect: "none",

  gap: "0.5rem",
  alignItems: "center",
  paddingBlock: "0.25rem",
  paddingInline: "0.75rem",

  borderRadius: "0.5rem"
})
