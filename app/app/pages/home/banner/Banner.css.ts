/* eslint-disable @typescript-eslint/no-magic-numbers */
// TODO: Remove eslint-disable
import { dropShadow } from "@effective/shadow"
import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"
import { variables } from "~/theme.css"

export const rootClass = style({
  backgroundColor: variables.color.darkViolet,
  position: "relative",
  filter: dropShadow[3]
})

export const imageClass = style({})

const media = {
  portrait: "(orientation: portrait) and (max-width: 959px)",
  landscape: "(orientation: landscape) or (min-width: 960px)"
}

export const contentClass = style({
  position: "absolute",
  bottom: 0,
  color: "white",
  fontFamily: elenaWebfont,
  fontSize: "var(--step-3)",
  padding: "var(--space-m-l)",
  fontWeight: 200,
  textWrap: "balance",
  backgroundImage: `linear-gradient(to bottom, transparent, ${variables.color.darkViolet} 95%)`,

  "@media": {
    [media.portrait]: {
      fontSize: "var(--step-1)"
    }
  }
})
