import { buildSpectrum } from "@effective/color"
import { style } from "@vanilla-extract/css"

const darkViolet = buildSpectrum("3F2B3D")

export const root = style({
  // TODO: how to remove no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  background: darkViolet["-5"],
  // TODO: how to remove no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  color: darkViolet["+5"],
  paddingInline: "2vw",
  paddingBlock: "1rem",
  display: "flex",
  gap: "0.5rem",

  "@media": {
    "(max-width: 800px)": {
      flexDirection: "column",
      gap: "0"
    }
  }
})
