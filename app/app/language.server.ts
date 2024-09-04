import { createCookie } from "@remix-run/node"
import acceptLanguage from "accept-language-parser"

export const languageCookie = createCookie("language", {})

export async function getAppLanguage(request: Request) {
  const headers = request.headers
  const acceptLangHeader = headers.get("Accept-Language")
  const languages = acceptLangHeader
    ? acceptLanguage.parse(acceptLangHeader)
    : []

  const browserLanguage = languages[0]?.code
  const cookieLanguage = await languageCookie.parse(headers.get("Cookie"))
  const appLanguage = cookieLanguage ?? browserLanguage ?? "en"

  return appLanguage
}

interface Messages {
  messages: Record<string, string>
}

// Using glob to import all the .po files in the locales directory
// which is way easier to maintain than manually importing each locale
// specific file.
const messages = import.meta.glob<Messages>("./locales/*.po", { eager: true })

export function getMessages(locale: string) {
  // Glob imports use the path name as the key to the module
  const mod = messages[`./locales/${locale}.po`]
  return mod.messages
}

export function getSupportedLanguages() {
  return Object.keys(messages).map((key) =>
    key.replace("./locales/", "").replace(".po", "")
  )
}
