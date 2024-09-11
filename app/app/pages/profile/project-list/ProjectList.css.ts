import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"

export const rootClass = style({
  display: "flex",
  padding: "var(--space-m-l)",
  flexDirection: "column",
  gap: "var(--space-2xl-3xl)"
})

export const consultantHeaderClass = style({
  fontSize: "var(--step-4)",
  textTransform: "uppercase",
  fontWeight: "200",
  lineHeight: "1",
  color: "#444",

  // Partially compensating for the parent's gap
  marginBottom: "calc(var(--space-2xl-3xl) * -0.5)"
})

export const consultantHeaderStrongClass = style({
  color: "#000",
  fontWeight: "600"
})

export const projectClass = style({
  display: "grid",

  gap: "1rem 1rem",
  width: "max-content",

  // gridTemplateColumns: "",
  // gridTemplateRows: "",

  gridTemplateAreas: `
    "role logo . ."
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
  maxWidth: "calc(var(--space-3xl) * 3)",
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
  background: "red",
  gridArea: "role",
  writingMode: "vertical-lr",
  boxSizing: "content-box",
  maxWidth: "1lh",
  lineHeight: "1",
  paddingInline: "var(--space-xs)",
  paddingBlock: "var(--space-3xs)",
  textTransform: "uppercase"
})

export const gridMetaClass = style({
  border: dbgBorder,
  gridArea: "meta",
  width: "20ch",
  background: "red"
})

export const gridDescriptionClass = style({
  border: dbgBorder,
  gridArea: "description",
  fontSize: "var(--step-1)",
  whiteSpace: "pre-line",
  minWidth: "50ch",
  maxWidth: "60ch"
})

export const gridTestimonialsClass = style({
  border: dbgBorder,
  gridArea: "testimonials",
  display: "flex",
  flexDirection: "column",
  width: "40ch",
  gap: "var(--space-l)",
  borderLeft: "4px dotted #ccc"
})

// =====================================================
// GRID END
// =====================================================

// =====================================================
// META START
// =====================================================

export const periodClass = style({})
export const agentClass = style({})
export const agentImageClass = style({
  maxWidth: "var(--space-3xl)"
})
export const customerClass = style({})
export const industryClass = style({})
export const technologiesClass = style({})

// =====================================================
// META END
// =====================================================
