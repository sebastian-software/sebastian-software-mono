import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"

export const rootClass = style({
  display: "flex",
  padding: "var(--space-m-l)",
  flexDirection: "column",
  gap: "var(--space-2xl-3xl)"
})

export const projectClass = style({
  display: "grid",

  gap: "0rem 5rem",

  gridTemplateColumns: "15rem auto auto",
  gridTemplateRows: "auto auto auto 1fr",

  gridTemplateAreas: `
    ". role role"
    "logo title title"
    ". description testimonials"
    "meta description testimonials"
  `,

  "@media": {
    "(width <= 1280px)": {
      gridTemplateColumns: "10rem auto auto",
      gridTemplateAreas: `
        "logo . ."
        "role role role"
        "title title title"
        "meta meta meta"
        "description description testimonials"
      `
    },

    "(width <= 1024px)": {
      gridTemplateColumns: "auto",
      gridTemplateAreas: `
        "logo"
        "role"
        "title"
        "meta"
        "description"
        "testimonials"
      `
    }
  }
})

export const titleClass = style({
  gridArea: "title",
  fontSize: "var(--step-1)",
  fontFamily: elenaWebfont,
  maxWidth: "50ch",
  textWrap: "balance",
  color: "#222",
  lineHeight: "1.25",
  paddingBottom: "var(--space-s)",

  "@media": {
    "(min-width: 960px)": {
      fontSize: "var(--step-2)",
      lineHeight: "1.25"
    }
  }
})

export const roleClass = style({
  gridArea: "role",
  fontWeight: "normal",
  display: "block",
  fontSize: "var(--step-0)",
  background: "#cff",
  textTransform: "uppercase",
  width: "fit-content",
  letterSpacing: "0.05em",
  paddingInline: "0.5rem",
  marginBottom: "0.5rem"
})

export const logoClass = style({
  gridArea: "logo"
})

export const metaClass = style({
  gridArea: "meta",
  display: "flex",
  flexDirection: "column",
  gap: "1lh"
})

export const periodClass = style({})
export const agentClass = style({})
export const agentImageClass = style({
  filter: "grayscale(1) opacity(0.5)",
  maxWidth: "var(--space-3xl)"
})

export const customerClass = style({})
export const industryClass = style({})
export const technologiesClass = style({})

export const descriptionClass = style({
  gridArea: "description",
  maxWidth: "60ch",
  hyphens: "auto",
  hyphenateLimitChars: "12 5 5"
})

export const testimonialsClass = style({
  gridArea: "testimonials",
  display: "flex",
  flexDirection: "column",
  color: "#532447",
  gap: "2rem",
  fontSize: "var(--step--1)",
  width: "45ch",
  hyphens: "auto",
  hyphenateLimitChars: "12 5 5"
})
