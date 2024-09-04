import { msg } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import { stegaClean } from "@sanity/client/stega"

const countries = {
  de: msg`Germany`,
  ch: msg`Switzerland`,
  at: msg`Austria`,
  lu: msg`Luxembourg`,
  fr: msg`France`,
  nl: msg`Netherlands`,
  be: msg`Belgium`,
  us: msg`United States`,
  cn: msg`China`,
  ca: msg`Canada`,
  gb: msg`United Kingdom`
}

export function CountryName({
  code
}: {
  readonly code: keyof typeof countries
}) {
  const { i18n } = useLingui()
  return i18n._(countries[stegaClean(code)])
}
