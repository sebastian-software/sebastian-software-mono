import "@effective/css-reset"

import { Favicon } from "../favicon"
import { Utopia } from "../utopia/Utopia"

export function HeadContent() {
  return (
    <>
      <Utopia />
      <Favicon />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    </>
  )
}
