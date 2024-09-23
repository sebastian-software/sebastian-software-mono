/* eslint-disable @typescript-eslint/no-magic-numbers */
// TODO: Remove eslint-disable
import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"
import { breakpoints } from "~/pages/layout/config"
import { variables } from "~/theme.css"

export const rootClass = style({
  backgroundColor: variables.color.darkViolet,
  // marginInline: "calc(var(--space-s) * -1)",
  position: "relative",
  borderRadius: "var(--space-m)",
  overflow: "hidden"
})

export const imageClass = style({})

export const contentClass = style({
  position: "absolute",
  bottom: 0,
  color: variables.color.lightGold,
  fontFamily: elenaWebfont,
  padding: "var(--space-m)",
  textWrap: "balance",
  backgroundImage: `linear-gradient(to bottom, transparent, ${variables.color.darkViolet} 95%)`,

  "@media": {
    [breakpoints.landscape]: {
      fontSize: "var(--step-3)",
      lineHeight: 1.25
    },

    [breakpoints.portrait]: {
      fontSize: "var(--step-0)"
    }
  }
})
