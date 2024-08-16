/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: Remove eslint-disable stuff
import { buildShades, buildSpectrum } from "@effective/color"
import { createTheme } from "@vanilla-extract/css"

const violet = "#3F2B3D"
const teal = "#22404B"
const gold = "#C89F6B"
const white = "#FFFFFF"

const violetSpectrum = buildSpectrum(violet)
const darkViolet = violetSpectrum["-2"] as string
const lightViolet = violetSpectrum["+5"] as string

const goldShades = buildShades(white, gold)
const veryLightGold = goldShades[1] as string
const lightGold = goldShades[4] as string

const goldSpectrum = buildSpectrum(gold)
const darkGold = goldSpectrum["-4"] as string

export const [themeClass, variables] = createTheme({
  color: {
    white,
    violet,
    darkViolet,
    lightViolet,
    veryLightGold,
    lightGold,
    darkGold,
    gold,
    teal
  },
  font: {
    body: "arial"
  }
})
