import { i18n } from "@lingui/core"
import { createCookie } from "@remix-run/node"
import acceptLanguage from "accept-language-parser"

export const languageCookie = createCookie("language", {})

export async function getAppLanguage(request: Request): Promise<string> {
  const headers = request.headers
  const acceptLangHeader = headers.get("Accept-Language")
  const hostHeader = headers.get("Host")

  const languages = acceptLangHeader
    ? acceptLanguage.parse(acceptLangHeader)
    : []

  const domain = hostHeader?.split(":")[0]
  const domainLanguage =
    domain === "sebastian-software.de"
      ? "de"
      : domain === "sebastian-software.com"
        ? "en"
        : ""

  const browserLanguage = languages[0]?.code
  const cookieLanguage = (await languageCookie.parse(
    headers.get("Cookie")
  )) as string

  const appLanguage =
    cookieLanguage || domainLanguage || browserLanguage || "en"
  return appLanguage
}

export interface MessagesModule {
  messages: Record<string, string>
}

// Using glob to import all the .po files in the locales directory
// which is way easier to maintain than manually importing each locale
// specific file.
const messages = import.meta.glob<MessagesModule>("./locales/*.po", {
  eager: true
})

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

export function loadAllMessages() {
  for (const key of Object.keys(messages)) {
    const clean = key.replace("./locales/", "").replace(".po", "")
    i18n.load(clean, messages[key].messages)
  }
}

// Note: Side-Effect!
// Pass all messages of all locales to i18n - server side this might be okay.
loadAllMessages()
