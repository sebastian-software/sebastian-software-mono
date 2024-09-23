import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white,

  display: "flex",
  gap: "var(--space-2xs)",
  flexDirection: "column",
  paddingInline: "var(--space-s-m)",
  paddingBlock: "var(--space-s-m)",

  "@media": {
    "(min-width: 960px)": {
      flexDirection: "row",
      paddingBottom: "var(--space-m)",
      alignItems: "center"
    }
  }
})

export const logoClass = style({
  width: "var(--space-5xl)"
})

export const listClass = style({
  listStyle: "none",
  display: "flex",
  gap: "var(--space-xs)",

  "@media": {
    "(min-width: 960px)": {
      paddingBlock: 0
    }
  }
})

export const linkClass = style({
  textUnderlineOffset: ".3em"
})
