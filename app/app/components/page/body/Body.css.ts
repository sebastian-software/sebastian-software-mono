import { style } from "@vanilla-extract/css"

export const root = style({
  display: "flex",
  flexDirection: "column",

  // Via: https://ardislu.dev/min-height-100dvh
  minBlockSize: "100dvb"
})
