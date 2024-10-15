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
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/naming-convention": "off",

      "jsdoc/check-param-names": ["warn", { checkDestructured: false }],
      "jsdoc/tag-lines": "off"
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
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-magic-numbers": "off"
    }
  }
]
