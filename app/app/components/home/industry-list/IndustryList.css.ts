import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components/fonts/elena/Elena.css"
import { variables } from "~/theme.css"

export const rootClass = style({
  background: variables.color.lightGold,
  paddingBlock: "6rem",
  paddingInline: "4vw",

  "@media": {
    "(max-width: 800px)": {
      paddingInline: "8vw"
    }
  }
})

export const titleClass = style({
  fontFamily: elenaWebfont,
  fontSize: "3rem",
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  textDecorationThickness: "from-font",
  color: variables.color.violet,
  marginBottom: "2rem",

  "@media": {
    "(max-width: 800px)": {
      fontSize: "2rem"
    }
  }
})
