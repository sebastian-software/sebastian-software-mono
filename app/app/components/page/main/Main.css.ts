import { buildSpectrum } from "@effective/color"
import { style } from "@vanilla-extract/css"

const darkViolet = buildSpectrum("3F2B3D")

export const root = style({
  // TODO: how to remove no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  color: darkViolet["0"],
  flexGrow: 1
})
