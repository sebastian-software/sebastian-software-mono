import { boxShadow, dropShadow } from "@effective/shadow"
import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"
import { variables } from "~/theme.css"

export const rootClass = style({
  display: "flex",
  padding: "var(--space-m-2xl)",
  flexDirection: "column",
  gap: "var(--space-2xl)",
  color: variables.color.violet
})

export const consultantHeaderClass = style({
  fontSize: "var(--step-4)",
  textTransform: "uppercase",
  fontWeight: "200",
  lineHeight: "1",
  color: variables.color.lightViolet,

  // Partially compensating for the parent's gap
  marginBottom: "calc(var(--space-1xl) * -1)"
})

export const consultantHeaderStrongClass = style({
  color: variables.color.violet,
  fontWeight: "600"
})

export const projectClass = style({
  display: "grid",
  boxShadow: boxShadow[3],
  borderTopLeftRadius: "var(--space-s)",
  borderBottomRightRadius: "var(--space-s)",

  gap: "var(--space-l) var(--space-l)",
  width: "max-content",
  maxWidth: "100%",
  background: `linear-gradient(to bottom right, ${variables.color.veryLightGold}, #fff)`,

  gridTemplateAreas: `
    "vertical logo logo ."
    "vertical title title title"
    "vertical meta description testimonials"
    "vertical . . ."
  `,

  gridTemplateColumns: "auto auto 1fr auto",

  // The 0px row is necessary for adding padding identical to the gap (harmonious spacing)
  gridTemplateRows: "auto auto auto 0px"

  // gridTemplateAreas: `
  //   ". role role"
  //   "logo title title"
  //   ". description testimonials"
  //   "meta description testimonials"
  // `,

  // "@media": {
  //   "(width <= 1280px)": {
  //     gridTemplateColumns: "10rem auto auto",
  //     gridTemplateAreas: `
  //       "logo . ."
  //       "role role role"
  //       "title title title"
  //       "meta meta meta"
  //       "description description testimonials"
  //     `
  //   },

  //   "(width <= 1024px)": {
  //     gridTemplateColumns: "auto",
  //     gridTemplateAreas: `
  //       "logo"
  //       "role"
  //       "title"
  //       "meta"
  //       "description"
  //       "testimonials"
  //     `
  //   }
  // }
})

// =====================================================
// GRID START
// =====================================================

export const gridLogoClass = style({
  gridArea: "logo",
  maxWidth: "calc(var(--space-4xl) * 2)",
  maxHeight: "calc(var(--space-2xl))",
  marginTop: "var(--space-s-m)"
})

export const gridTitleClass = style({
  gridArea: "title",
  fontFamily: elenaWebfont,
  letterSpacing: "-0.04em",
  fontSize: "var(--step-3)",
  textWrap: "balance",
  lineHeight: "1.1",
  maxWidth: "40ch"
})

export const gridVerticalInfoClass = style({
  gridArea: "vertical",
  background: variables.color.violet,
  color: variables.color.lightGold,
  borderTopLeftRadius: "var(--space-s)"
})

export const gridVerticalInfoTextClass = style({
  writingMode: "vertical-lr",

  lineHeight: 1,
  boxSizing: "content-box",
  width: "1lh",
  paddingInline: "var(--space-s-m)",
  paddingBlock: "var(--space-s)",

  textTransform: "uppercase",
  letterSpacing: "0.2em"
})

export const gridMetaClass = style({
  gridArea: "meta",
  background: variables.color.lightGold,
  filter: dropShadow[1],

  width: "30ch",
  height: "max-content",
  lineHeight: "1.35",
  fontSize: "var(--step--1)",
  paddingInline: "var(--space-s)",
  paddingBlock: "var(--space-s)",
  paddingInlineEnd: "var(--space-m)",
  borderTopRightRadius: "var(--space-s)"
})

export const gridDescriptionClass = style({
  gridArea: "description",
  fontSize: "var(--step-1)",
  whiteSpace: "pre-line",
  minWidth: "40ch",
  maxWidth: "65ch"
})

export const gridTestimonialsClass = style({
  gridArea: "testimonials",
  display: "flex",
  flexDirection: "column",
  minWidth: "30ch",
  maxWidth: "40ch",
  lineHeight: "1.35",
  gap: "var(--space-xl)",
  borderLeft: "4px dotted",
  borderLeftColor: variables.color.gold,
  paddingInline: "var(--space-m)",

  hyphens: "auto",
  hyphenateLimitChars: "8 4 4"
})

// =====================================================
// GRID END
// =====================================================

// =====================================================
// META START
// =====================================================

export const metaHeaderClass = style({
  fontSize: "var(--step-0)",
  fontWeight: "600",
  marginTop: "var(--space-s)",
  marginBottom: "var(--space-3xs)",

  selectors: {
    "&:first-child": {
      marginTop: "0"
    }
  }
})

export const agentImageClass = style({
  maxHeight: "var(--space-xl)"
})

// =====================================================
// META END
// =====================================================
