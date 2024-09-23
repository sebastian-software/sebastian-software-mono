import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const root = style({
  backgroundColor: variables.color.veryLightGold,
  flexGrow: 1
})
