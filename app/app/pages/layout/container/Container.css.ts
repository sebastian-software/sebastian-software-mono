import { style } from "@vanilla-extract/css"

import { breakpoints } from "../config"

export const rootClass = style({
  "@media": {
    [breakpoints.landscape]: {
      marginInline: "auto",
      maxWidth: "1920px",
      paddingInline: "var(--space-s-2xl)"
    },

    [breakpoints.portrait]: {
      paddingInline: "var(--space-s-m)"
    }
  }
})
