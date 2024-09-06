import { Favicon } from "../favicon"

export function HeadContent() {
  return (
    <>
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
