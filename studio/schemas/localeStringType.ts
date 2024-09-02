import { defineType } from "sanity"

export const defaultLanguage = "en"

// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
export const supportedLanguages = [
  { id: "en", title: "English" },
  { id: "de", title: "Deutsch" }
]

export const localeString = defineType({
  title: "Localized string",
  name: "localeString",
  type: "object",
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "string"
  }))
})
