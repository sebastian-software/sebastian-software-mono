import '@effective/css-reset'

import { json } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Suspense, lazy } from 'react'
import { Body, Favicon, Footer, Header, Main } from './components/page'

const LiveVisualEditing = lazy(() => import('~/components/LiveVisualEditing'))

export const loader = () => {
  // Note: This follows the recommendation of Remix to not inject
  // env at built time, but instead at runtime from the server.
  // https://remix.run/docs/en/main/guides/envvars#browser-environment-variables
  return json({
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  })
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
          <Main>
            <Outlet />
          </Main>
          <Footer />
        </div>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
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
