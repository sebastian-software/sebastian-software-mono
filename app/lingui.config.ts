import type { LinguiConfig } from "@lingui/conf"

const config: LinguiConfig = {
  locales: ["en", "de"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/app/locales/{locale}",
      include: ["app"]
    }
  ]
}

export default config
