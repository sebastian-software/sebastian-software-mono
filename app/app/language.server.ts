import { createCookie } from "@remix-run/node"
import acceptLanguage from "accept-language-parser"

export const languageCookie = createCookie("language", {})

export const DEFAULT_LANGUAGE = "en"

export async function getAppLanguage(request) {
  const headers = request.headers
  const languages = acceptLanguage.parse(
    headers.get("Accept-Language") ?? DEFAULT_LANGUAGE
  )

  const browserLanguage = languages[0].code
  const cookieLanguage = await languageCookie.parse(headers.get("Cookie"))

  // console.log("LANG: BROWSER:", browserLanguage)
  // console.log("LANG: COOKIE:", cookieLanguage)

  const appLanguage = cookieLanguage ?? browserLanguage
  // console.log("LANG: APP:", appLanguage)

  return appLanguage
}
