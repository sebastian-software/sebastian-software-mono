import { main } from "@effective/eslint-config"

export default [
  {
    ignores: [
      ".*/**/*",
      "build/**/*",
      "public/**/*",
      "sst-env.d.ts",
      "sanity.types.ts"
    ]
  },
  {
    ...main,
    rules: {
      ...main.rules,
      "unicorn/prevent-abbreviations": "off"
    }
  },
  {
    files: ["**/*.css.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid",
          filter: {
            regex: "[- ]",
            match: false
          }
        }
      ]
    }
  }
]
