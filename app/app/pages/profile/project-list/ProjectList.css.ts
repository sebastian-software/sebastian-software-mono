import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"
import { variables } from "~/theme.css"

export const rootClass = style({
  display: "flex",
  padding: "var(--space-s-xl)",
  flexDirection: "column",
  gap: "var(--space-2xl-3xl)"
})

export const consultantHeaderClass = style({
  fontSize: "var(--step-4)",
  textTransform: "uppercase",
  fontWeight: "200",
  lineHeight: "1",
  color: variables.color.lightViolet,

  // Partially compensating for the parent's gap
  marginBottom: "calc(var(--space-2xl-3xl) * -0.5)"
})

export const consultantHeaderStrongClass = style({
  color: variables.color.darkViolet,
  fontWeight: "600"
})

export const projectClass = style({
  display: "grid",

  gap: "var(--space-m) var(--space-s)",
  width: "max-content",

  // gridTemplateColumns: "",
  // gridTemplateRows: "",

  gridTemplateAreas: `
    "role logo logo ."
    "role title title title"
    "role meta description testimonials"

  `

  // gridTemplateColumns: "15rem auto auto",
  // gridTemplateRows: "auto auto auto 1fr",

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

const dbgBorder = "0px solid red"

export const gridLogoClass = style({
  border: dbgBorder,
  gridArea: "logo",
  maxWidth: "calc(var(--space-4xl) * 2)",
  maxHeight: "calc(var(--space-2xl))"
})

export const gridTitleClass = style({
  border: dbgBorder,
  gridArea: "title",
  fontFamily: elenaWebfont,
  letterSpacing: "-0.04em",
  fontSize: "var(--step-3)",
  textWrap: "balance",
  lineHeight: "1.1",
  maxWidth: "40ch"
})

export const gridRoleClass = style({
  border: dbgBorder,
  background: variables.color.violet,
  color: "white",
  gridArea: "role",
  writingMode: "vertical-lr",
  boxSizing: "content-box",
  maxWidth: "1lh",
  lineHeight: "1",
  paddingInline: "var(--space-m)",
  paddingBlock: "var(--space-xs)",
  textTransform: "uppercase",
  borderTopLeftRadius: "var(--space-s)"
})

export const gridMetaClass = style({
  border: dbgBorder,
  gridArea: "meta",
  background: variables.color.lightGold,
  width: "30ch",
  fontSize: "var(--step--1)",
  paddingInline: "var(--space-s)",
  paddingBlock: "var(--space-s)",
  borderTopRightRadius: "var(--space-s)"
})

export const gridDescriptionClass = style({
  border: dbgBorder,
  gridArea: "description",
  fontSize: "var(--step-1)",
  whiteSpace: "pre-line",
  minWidth: "50ch",
  maxWidth: "70ch",
  paddingInline: "var(--space-m)"
})

export const gridTestimonialsClass = style({
  border: dbgBorder,
  gridArea: "testimonials",
  display: "flex",
  flexDirection: "column",
  width: "50ch",
  gap: "var(--space-xl)",
  borderLeft: "4px dotted",
  borderLeftColor: variables.color.gold,
  paddingInline: "var(--space-m)"
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

  selectors: {
    "&:first-child": {
      marginTop: "0"
    }
  }
})

export const periodClass = style({})
export const agentImageClass = style({
  maxHeight: "var(--space-l)",
  maxWidth: "var(--space-3xl)",
  filter: "grayscale(1)"
})
export const customerClass = style({})
export const industryClass = style({})
export const technologiesClass = style({})

// =====================================================
// META END
// =====================================================
