import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

import { elenaWebfont } from "../fonts/elena/Elena.css"

export const container = style({
  background: `linear-gradient(to bottom, ${variables.color.veryLightGold}, ${variables.color.lightGold})`,
  display: "flex",
  gap: "8vw",
  paddingBlock: "4rem",
  paddingInline: "4vw",

  "@media": {
    "(max-width: 800px)": {
      flexDirection: "column"
    }
  }
})

export const root = style({
  position: "relative",
  selectors: {
    "&:not(:first-child)::before": {
      content: " ",
      background: variables.color.white,
      position: "absolute",
      top: "0",
      left: "-4vw",
      width: "1px",
      height: "100%"
    }
  }
})

export const title = style({
  fontFamily: elenaWebfont,
  fontSize: "2rem"
})

export const content = style({
  hyphens: "auto"
})

export const footer = style({})
