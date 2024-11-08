import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"

import type { MessagesModule } from "./language.server"

async function main() {
  const locale = document.documentElement.lang
  const messagesModule = (await import(
    `./locales/${locale}.po`
  )) as MessagesModule

  i18n.load(locale, messagesModule.messages)
  i18n.activate(locale)

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <I18nProvider i18n={i18n}>
          <RemixBrowser />
        </I18nProvider>
      </StrictMode>
    )
  })
}

await main()
