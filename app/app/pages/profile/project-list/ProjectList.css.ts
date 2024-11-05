import { style } from "@vanilla-extract/css"

import { elenaWebfont } from "~/components"
import { breakpoints } from "~/pages/layout/config"
import { variables } from "~/theme.css"

export const rootClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2xl)",
  color: variables.color.violet,

  "@media": {
    [breakpoints.landscape]: {
      maxWidth: "calc(100% + 2 * var(--space-s-2xl))",
      marginLeft: "calc(var(--space-s-2xl) * -1)",
      marginRight: "calc(var(--space-s-2xl) * -1)"
    },

    [breakpoints.portrait]: {
      maxWidth: "calc(100% + 2 * var(--space-s-m))",
      marginLeft: "calc(var(--space-s-m) * -1)",
      marginRight: "calc(var(--space-s-m) * -1)"
    }
  }
})

export const consultantHeaderClass = style({
  position: "relative",

  fontSize: "var(--step-4)",
  textTransform: "uppercase",
  fontWeight: "200",
  color: "white",

  lineHeight: "1",
  paddingBlock: "var(--space-m)",
  background: `linear-gradient(to bottom left , transparent, ${variables.color.darkViolet})`,
  backdropFilter: "blur(0.5rem)",

  "@media": {
    [breakpoints.landscape]: {
      marginTop: "calc((var(--space-2xl)* -1) - 1lh - var(--space-m) * 2)",
      paddingInline: "var(--space-s-2xl)"
    },

    [breakpoints.portrait]: {
      // in this layout the name is typically spread to two lines (=> 2lh)
      marginTop: "calc((var(--space-2xl)* -1) - 2lh - var(--space-m) * 2)",
      paddingInline: "var(--space-s-m)"
    }
  }
})

export const consultantHeaderStrongClass = style({
  fontWeight: "600"
})

export const projectClass = style({
  display: "grid",

  "@media": {
    [breakpoints.landscape]: {
      gap: "var(--space-l) var(--space-l)",

      gridTemplateAreas: `
        "vertical logo meta"
        "vertical title meta"
        "vertical description meta"
      `,

      gridTemplateColumns: "auto 1fr auto",
      gridTemplateRows: "auto auto 1fr"
    },

    [breakpoints.portrait]: {
      gap: "var(--space-s-m) var(--space-xs-s)",

      gridTemplateAreas: `
        "vertical logo"
        "vertical title"
        "vertical description"
        "vertical meta"
      `,

      gridTemplateColumns: "auto 1fr"
    }
  }
})

// =====================================================
// GRID START
// =====================================================

export const gridLogoClass = style({
  gridArea: "logo",

  width: "auto",
  height: "auto",
  maxWidth: "calc(var(--space-5xl))",

  "@media": {
    [breakpoints.landscape]: {
      maxHeight: "calc(var(--space-2xl))"
    },

    [breakpoints.portrait]: {
      maxHeight: "calc(var(--space-xl))"
    }
  }
})

export const gridTitleClass = style({
  gridArea: "title",
  fontFamily: elenaWebfont,
  textWrap: "balance",

  "@media": {
    [breakpoints.landscape]: {
      maxWidth: "40ch",
      fontSize: "var(--step-3)",
      lineHeight: "1.1"
    },

    [breakpoints.portrait]: {
      fontSize: "var(--step-2)",
      lineHeight: "1.25"
    }
  }
})

export const gridVerticalInfoClass = style({
  gridArea: "vertical",
  background: variables.color.violet,
  color: variables.color.lightGold
})

export const gridVerticalInfoTextClass = style({
  writingMode: "vertical-lr",
  boxSizing: "content-box",
  width: "1lh",

  "@media": {
    [breakpoints.landscape]: {
      lineHeight: "var(--space-s-2xl)",
      paddingInline: "var(--space-s-l)"
    },

    [breakpoints.portrait]: {
      fontSize: "var(--step--1)",
      lineHeight: "var(--space-s-m)",
      paddingInline: "var(--space-xs)"
    }
  },

  textTransform: "uppercase",
  letterSpacing: "0.2em"
})

export const gridMetaClass = style({
  gridArea: "meta",
  background: variables.color.lightGold,

  width: "35ch",
  lineHeight: "1.35",
  fontSize: "var(--step--1)",
  paddingInline: "var(--space-m)",
  paddingBlock: "var(--space-m)",
  paddingInlineEnd: "var(--space-m)"
})

export const gridDescriptionClass = style({
  gridArea: "description",
  whiteSpace: "pre-line",
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
  maxHeight: "var(--space-xl)",
  maxWidth: "var(--space-5xl)"
})

// =====================================================
// META END
// =====================================================
