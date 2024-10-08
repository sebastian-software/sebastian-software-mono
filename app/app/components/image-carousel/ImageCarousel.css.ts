import { keyframes, style } from "@vanilla-extract/css"

import { variables } from "~/theme.css"

const bounce = keyframes({
  "0%": {
    transform: "translateX(var(--over-scroll))"
  },
  "50%": {
    transform: "translateX(calc(-100% + 100cqw - var(--over-scroll)))"
  },
  "100%": {
    transform: "translateX(var(--over-scroll))"
  }
})

// Container that holds the image track
export const containerClass = style({
  marginBlock: "var(--space-xl)",
  width: "100%",
  overflow: "hidden",
  containerType: "inline-size",
  position: "relative",

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      inset: 0,
      background: `linear-gradient(to right, ${variables.color.veryLightGold}, transparent 15%, transparent 85%, ${variables.color.veryLightGold})`
    }
  }
})

// Track containing the images
export const trackClass = style({
  display: "flex",
  width: "max-content",

  animation: `var(--duration) linear 500ms infinite ${bounce}`,
  transform: "translateX(var(--over-scroll))"
})
