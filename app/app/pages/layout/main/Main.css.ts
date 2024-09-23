import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const root = style({
  backgroundColor: variables.color.veryLightGold,
  flexGrow: 1,
  paddingInline: "var(--space-s-m)",
  paddingBlock: "var(--space-m-l)"
})
