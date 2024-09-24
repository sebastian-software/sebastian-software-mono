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
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "no-warning-comments": "off",

      // Sanity uses "null" for empty values
      "@typescript-eslint/ban-types": "off"
    }
  },
  {
    files: ["**/*.css.ts"],
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
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
