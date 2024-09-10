import { style } from "@vanilla-extract/css"

export const rootClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "4rem"
})

export const projectClass = style({
  display: "grid",
  maxWidth: "max-content",
  marginInline: "auto",
  gap: "1rem 5rem",

  gridTemplateColumns: "15rem auto auto",
  gridTemplateRows: "auto auto 1fr",

  gridTemplateAreas: `
    ". title title"
    "logo description testimonials"
    "meta description testimonials"
  `,

  "@media": {
    "(width <= 80rem)": {
      gridTemplateColumns: "10rem auto auto",
      gridTemplateAreas: `
        "logo . ."
        "title title title"
        "meta meta meta"
        "description description testimonials"
      `
    },

    "(width <= 64rem)": {
      gridTemplateColumns: "auto",
      gridTemplateAreas: `
        "logo"
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
  fontSize: "2.5rem",
  fontWeight: "bold",
  textWrap: "balance",
  color: "#222"
})

export const roleClass = style({
  fontWeight: "normal",
  display: "block",
  fontSize: "1rem",
  background: "#cff",
  textTransform: "uppercase",
  width: "fit-content",
  letterSpacing: "0.05em",
  paddingInline: "0.5rem",
  marginBottom: "0.5rem"
})

export const logoClass = style({
  gridArea: "logo",
  maxHeight: "4rem",
  maxWidth: "12rem"
})

export const metaClass = style({
  gridArea: "meta",
  display: "flex",
  flexDirection: "column",
  gap: "1lh"
})

export const periodClass = style({})
export const agentClass = style({})
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
  fontSize: "0.875rem",
  width: "45ch",
  hyphens: "auto",
  hyphenateLimitChars: "12 5 5"
})
