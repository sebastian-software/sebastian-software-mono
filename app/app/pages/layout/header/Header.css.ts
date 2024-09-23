import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.darkViolet,
  color: variables.color.white
})

export const containerClass = style({
  display: "flex",
  gap: "var(--space-2xs)",
  flexDirection: "column",

  "@media": {
    "(min-width: 960px)": {
      flexDirection: "row",
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
