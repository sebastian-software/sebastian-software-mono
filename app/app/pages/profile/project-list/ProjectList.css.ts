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
  color: "#444"
})

export const consultantHeaderStrongClass = style({
  color: "#000",
  fontWeight: "600"
})

export const projectClass = style({
  // display: "grid",

  gap: "1rem 5rem"

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

export const gridLogoClass = style({
  border: "1px solid red",
  gridArea: "logo",
  maxWidth: "calc(var(--space-3xl) * 3)",
  maxHeight: "calc(var(--space-2xl))"
})

export const gridTitleClass = style({
  border: "1px solid red",
  gridArea: "title",
  fontFamily: elenaWebfont,
  letterSpacing: "-0.04em",
  fontSize: "var(--step-3)",
  textWrap: "balance",
  lineHeight: "1.1",
  maxWidth: "40ch"
})

export const gridRoleClass = style({
  border: "1px solid red",
  gridArea: "role",
  writingMode: "vertical-lr"
})

export const gridMetaClass = style({
  border: "1px solid red",
  gridArea: "meta",
  width: "20ch"
})

export const gridDescriptionClass = style({
  border: "1px solid red",
  gridArea: "description",
  fontSize: "var(--step-1)",
  whiteSpace: "pre-line",
  maxWidth: "60ch"
})

export const gridTestimonialsClass = style({
  border: "1px solid red",
  gridArea: "testimonials",

  listStyle: "none",
  maxWidth: "40ch"
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
