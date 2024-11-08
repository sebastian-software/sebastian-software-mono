import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"

import { getAppLanguage, languageCookie } from "./language.server"
import { Body, Root } from "./pages/layout"
import { HeadContent } from "./pages/layout/head-content"

// const LiveVisualEditing = lazy(
//   async () => import("~/components/LiveVisualEditing")
// )

export async function loader({ request }: LoaderFunctionArgs) {
  // Note: This follows the recommendation of Remix to not inject
  // env at built time, but instead at runtime from the server.
  // https://remix.run/docs/en/main/guides/envvars#browser-environment-variables
  return json({
    LOCALE: await getAppLanguage(request),

    /* eslint-disable @typescript-eslint/naming-convention */
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED
    }
    /* eslint-enable @typescript-eslint/naming-convention */
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { ENV, LOCALE } = useLoaderData<typeof loader>()

  return (
    <html lang={LOCALE}>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <HeadContent />
      </head>
      <Body>
        <Root />
        <ScrollRestoration />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`
          }}
        />
        {/* {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
            <Suspense>
              <LiveVisualEditing />
            </Suspense>
          ) : null} */}
        <Scripts />
      </Body>
    </html>
  )
}
