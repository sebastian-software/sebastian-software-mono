import { msg } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import { stegaClean } from "@sanity/client/stega"

const languages = {
  de: msg`German`,
  en: msg`English`
}

export type SupportedLanguages = keyof typeof languages

export function LanguageName({
  code
}: {
  readonly code: keyof typeof languages
}) {
  const { i18n } = useLingui()
  return i18n._(languages[stegaClean(code)])
}
