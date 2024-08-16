import { fontFace } from "@vanilla-extract/css"

import ElenaBold from "./Elena-Bold.woff2"
import ElenaBoldItalic from "./Elena-BoldItalic.woff2"
import ElenaLight from "./Elena-Light.woff2"
import ElenaLightItalic from "./Elena-LightItalic.woff2"
import ElenaMedium from "./Elena-Medium.woff2"
import ElenaMediumItalic from "./Elena-MediumItalic.woff2"
import ElenaRegular from "./Elena-Regular.woff2"
import ElenaRegularItalic from "./Elena-RegularItalic.woff2"

export const elenaWebfont = fontFace([
  {
    src: `url(${ElenaBold}) format('woff2')`,
    fontWeight: 700
  },
  {
    src: `url(${ElenaBoldItalic}) format('woff2')`,
    fontWeight: 700,
    fontStyle: "italic"
  },
  {
    src: `url(${ElenaLight}) format('woff2')`,
    fontWeight: 200
  },
  {
    src: `url(${ElenaLightItalic}) format('woff2')`,
    fontWeight: 200,
    fontStyle: "italic"
  },
  {
    src: `url(${ElenaMedium}) format('woff2')`,
    fontWeight: 500
  },
  {
    src: `url(${ElenaMediumItalic}) format('woff2')`,
    fontWeight: 500,
    fontStyle: "italic"
  },
  {
    src: `url(${ElenaRegular}) format('woff2')`,
    fontWeight: 400
  },
  {
    src: `url(${ElenaRegularItalic}) format('woff2')`,
    fontWeight: 400,
    fontStyle: "italic"
  }
])
