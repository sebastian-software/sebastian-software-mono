/* eslint-disable @typescript-eslint/no-magic-numbers */
// TODO: Remove eslint-disable
import { dropShadow } from "@effective/shadow"
import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

export const root = style({
  background: variables.color.darkViolet,
  color: variables.color.lightViolet,
  display: "flex",
  flexDirection: "row",
  gap: "4rem",
  alignItems: "center",
  paddingBlock: "1.5rem",
  paddingInline: "4vw",
  borderBottom: "1px solid",
  borderColor: variables.color.lightViolet,
  filter: dropShadow[5],
  zIndex: 1000,

  "@media": {
    "(max-width: 800px)": {
      flexDirection: "column",
      gap: "0.75rem"
    }
  }
})

export const logoLink = style({
  flexShrink: 0
})

export const logo = style({
  height: "3rem"
})

export const spacer = style({
  flex: 1
})

export const navigation = style({
  fontSize: "0.875rem"
})

export const navigationList = style({
  display: "flex",
  gap: "1.5rem",
  listStyle: "none",

  "@media": {
    "(max-width: 800px)": {
      gap: "0.5rem"
    }
  }
})

export const navigationItem = style({
  borderRadius: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textUnderlineOffset: "0.3em",

  selectors: {
    "&:hover": {
      borderColor: "white",
      color: "white"
    }
  }
})
