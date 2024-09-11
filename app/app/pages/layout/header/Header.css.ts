import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white,

  paddingInline: "var(--space-m-2xl)",
  paddingTop: "var(--space-m)",

  "@media": {
    "(min-width: 960px)": {
      display: "flex",
      gap: "var(--space-m)",
      paddingBottom: "var(--space-m)",
      alignItems: "center"
    }
  }
})

export const logoClass = style({
  width: "var(--space-5xl)"
})

export const listClass = style({
  paddingBlock: "var(--space-m)",
  listStyle: "none",
  display: "flex",
  gap: "var(--space-xs)",

  "@media": {
    "(min-width: 960px)": {
      paddingBlock: 0
    }
  }
})
