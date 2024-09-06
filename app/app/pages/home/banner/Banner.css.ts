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

export const contentClass = style({
  position: "absolute",
  bottom: 0,
  paddingBlock: "4vw",
  paddingInline: "4vw",
  color: "white",
  fontFamily: elenaWebfont,
  fontSize: "max(3vw, 1.25rem)",
  fontWeight: 200,
  lineHeight: "1.2",
  textWrap: "balance",
  backgroundImage: `linear-gradient(to bottom, transparent, ${variables.color.darkViolet} 95%)`
})
