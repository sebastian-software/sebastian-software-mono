import { style } from "@vanilla-extract/css"

import { breakpoints } from "../config"

export const rootClass = style({
  marginInline: "auto",

  maxWidth: "1920px",

  "@media": {
    [breakpoints.landscape]: {
      paddingBlock: "var(--space-m-xl)",
      paddingInline: "var(--space-s-2xl)"
    },

    [breakpoints.portrait]: {
      paddingBlock: "var(--space-m-l)",
      paddingInline: "var(--space-s-m)"
    }
  }
})
