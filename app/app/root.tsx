import "@effective/css-reset"

import { setupI18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import type { LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"
import { lazy, Suspense } from "react"

import { Body, Favicon, Footer, Header, Main } from "./components/page"
import { getAppLanguage, languageCookie } from "./language.server"

const LiveVisualEditing = lazy(
  async () => import("~/components/LiveVisualEditing")
)

export const loader: LoaderFunction = async ({ request }) => {
  const appLanguage = await getAppLanguage(request)

  // Note: This follows the recommendation of Remix to not inject
  // env at built time, but instead at runtime from the server.
  // https://remix.run/docs/en/main/guides/envvars#browser-environment-variables
  return json({
    ENV: {
      APP_LANGUAGE: appLanguage,
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED
    }
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const referer = request.headers.get("Referer") ?? "/"
  const bodyParams = await request.formData()
  const paramLanguage = bodyParams.get("language")

  if (paramLanguage) {
    return redirect(referer, {
      headers: {
        "Set-Cookie": await languageCookie.serialize(paramLanguage)
      }
    })
  }

  return null
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()

  // i18n.activate(ENV.APP_LANGUAGE)

  console.log("LANG LINGUI:", ENV.APP_LANGUAGE)
  const i18n = setupI18n({ locale: ENV.APP_LANGUAGE })

  return (
    <I18nProvider i18n={i18n}>
      <html lang={i18n.locale}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <Favicon />
          <script
            defer
            data-domain="sebastian-software.de"
            src="https://t.sebastian-software.de/js/script.js"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href="https://sebastian-software.de/rss.xml"
          />
        </head>
        <Body>
          <div>
            <Header />
            <Main>
              <Outlet />
            </Main>
            <Footer />
          </div>
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`
            }}
          />
          {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
            <Suspense>
              <LiveVisualEditing />
            </Suspense>
          ) : null}
          <Scripts />
        </Body>
      </html>
    </I18nProvider>
  )
}
