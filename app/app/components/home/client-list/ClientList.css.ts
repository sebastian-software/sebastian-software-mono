import { style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

import { elenaWebfont } from "../../fonts/elena/Elena.css"

export const rootClass = style({
  background: variables.color.darkViolet,
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
  color: "white",
  marginBottom: "2rem",

  "@media": {
    "(max-width: 800px)": {
      fontSize: "2rem"
    }
  }
})

export const listClass = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
  gap: "4rem 6rem",
  alignItems: "center",

  "@media": {
    "(max-width: 800px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(7rem, 1fr))",
      gap: "3rem 4rem"
    }
  }
})

export const itemClass = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  listStyle: "none",
  flexShrink: 0
})

export const logoClass = style({
  maxHeight: "5rem",
  width: "100%",
  objectFit: "contain",
  objectPosition: "center"
})
