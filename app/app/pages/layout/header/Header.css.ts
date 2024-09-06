import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white,

  paddingInline: "var(--space-m-l)",
  paddingTop: "var(--space-s)",

  "@media": {
    "(min-width: 960px)": {
      display: "flex",
      gap: "var(--space-m)",
      paddingBottom: "var(--space-s)",
      alignItems: "center"
    }
  }
})

export const logoClass = style({
  width: "10rem"
})

export const listClass = style({
  paddingBlock: "var(--space-s)",
  listStyle: "none",
  display: "flex",
  gap: "var(--space-xs)",

  "@media": {
    "(min-width: 960px)": {
      paddingBlock: 0
    }
  }
})
