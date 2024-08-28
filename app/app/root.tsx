import "@effective/css-reset"

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
import acceptLanguage from "accept-language-parser"
import { lazy, Suspense } from "react"

import { Body, Favicon, Footer, Header, Main } from "./components/page"
import { languageCookie } from "./cookies.server"

const LiveVisualEditing = lazy(
  async () => import("~/components/LiveVisualEditing")
)

export const DEFAULT_LANGUAGE = "en"

export const loader: LoaderFunction = async ({ request }) => {
  const headers = request.headers
  const languages = acceptLanguage.parse(
    headers.get("Accept-Language") ?? DEFAULT_LANGUAGE
  )

  const browserLanguage = languages[0].code
  console.log("LANG: BROWSER:", browserLanguage)

  const cookie = await languageCookie.parse(headers.get("Cookie"))
  console.log("LANG: COOKIE:", cookie)

  // Note: This follows the recommendation of Remix to not inject
  // env at built time, but instead at runtime from the server.
  // https://remix.run/docs/en/main/guides/envvars#browser-environment-variables
  return json({
    ENV: {
      APP_LANGUAGE: cookie.language,
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED
    }
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await languageCookie.parse(cookieHeader)) || {}
  const bodyParams = await request.formData()

  console.log("ACTION cookie:", cookie)
  console.log("ACTION bodyParams:", bodyParams)

  const paramLanguage = bodyParams.get("language")
  if (paramLanguage) {
    cookie.language = paramLanguage

    return redirect("/", {
      headers: {
        "Set-Cookie": await languageCookie.serialize(cookie)
      }
    })
  }

  return null
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()

  return (
    <html lang="de">
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
          <p>LANG:{ENV.APP_LANGUAGE}</p>
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
  )
}
