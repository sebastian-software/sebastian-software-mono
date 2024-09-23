import { style } from "@vanilla-extract/css"

export const rootClass = style({
  "@media": {
    "(max-width: 800px)": {
      paddingInline: "8vw"
    }
  }
})

export const titleClass = style({
  fontSize: "var(--step-3)",
  textTransform: "uppercase",
  marginBlockStart: "var(--space-xl)",
  marginBlockEnd: "var(--space-m)"
})

export const listClass = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(var(--space-3xl), 1fr))",
  gap: "var(--space-m) var(--space-l)",
  alignItems: "center"
})

export const itemClass = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  listStyle: "none",
  flexShrink: 0
})

export const logoClass = style({
  maxHeight: "var(--space-2xl)",
  width: "100%",
  objectFit: "contain",
  objectPosition: "center"
})
