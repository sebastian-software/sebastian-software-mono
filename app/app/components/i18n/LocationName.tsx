import { useLingui } from "@lingui/react"

import { CountryName } from "./CountryName"

interface LocationNameProps {
  readonly city: string
}

export function LocationName({
  city
}: LocationNameProps) {
  const { i18n } = useLingui()

  if (i18n.locale === "de") {
    return city
  }

  return <>{city}, <CountryName code="de" /></>
}