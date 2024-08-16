import type { CSSProperties } from "react"

import bankIcon from "./assets/bank.svg"
import brickIcon from "./assets/brick.svg"
import carIcon from "./assets/car.svg"
import ecommerceIcon from "./assets/e-commerce.svg"
import educationIcon from "./assets/education.svg"
import gameIcon from "./assets/game.svg"
import healthIcon from "./assets/health.svg"
import energyIcon from "./assets/lightbulb.svg"
import marketingIcon from "./assets/marketing.svg"
import mobileIcon from "./assets/mobile.svg"
import networkIcon from "./assets/network.svg"
import notebookIcon from "./assets/notebook.svg"
import pillsIcon from "./assets/pills.svg"
import radioIcon from "./assets/radio.svg"
import robotIcon from "./assets/robot.svg"
import shoppingIcon from "./assets/shopping.svg"
import socialIcon from "./assets/social.svg"
import trainIcon from "./assets/train.svg"
import truckIcon from "./assets/truck.svg"
// Other imports
import { rootClass } from "./IndustryIcon.css"

const industryMap: Record<string, string> = {
  Automobil: carIcon,
  Baustoffindustrie: brickIcon,
  Bildung: educationIcon,
  "E-Commerce": ecommerceIcon,
  Energieversorgung: energyIcon,
  Finanzen: bankIcon,
  Gesundheitswesen: healthIcon,
  Handel: shoppingIcon,
  "Industrie 4.0": robotIcon,
  Informationstechnologie: networkIcon,
  "IT-Dienstleistungen": notebookIcon,
  Marketing: marketingIcon,
  Nutzfahrzeugindustrie: truckIcon,
  "Öffentlicher Verkehr": trainIcon,
  Pharma: pillsIcon,
  Rundfunk: radioIcon,
  "Soziale Medien": socialIcon,
  Spiele: gameIcon,
  Telekommunikation: mobileIcon
}

export interface IndustryIconProps {
  readonly name: string
  readonly filter?: string
  readonly alt?: string
}

export function IndustryIcon({ name, filter, alt }: IndustryIconProps) {
  const imageSource = industryMap[name]
  if (imageSource) {
    const style: CSSProperties = {}
    if (filter) {
      style.filter = `url(#${filter})`
    }

    return (
      <img
        className={rootClass}
        src={imageSource}
        // This also allows for passing alt="" which is useful when the icon is part of a labeled parent.
        alt={alt ?? name}
        style={style}
      />
    )
  }
}
