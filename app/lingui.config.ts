import type { LinguiConfig } from "@lingui/conf"

const config: LinguiConfig = {
  fallbackLocales: {
    default: "en"
  },
  locales: ["en", "de"],
  catalogs: [
    {
      path: "<rootDir>/app/locales/{locale}",
      include: ["app"]
    }
  ]
}

export default config
