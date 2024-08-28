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

export const localeText = defineType({
  title: "Localized text",
  name: "localeText",
  type: "object",
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "text"
  }))
})

export const localeBlockContent = defineType({
  title: "Localized block content",
  name: "localeBlockContent",
  type: "object",
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "array",
    of: [{ type: "block" }]
  }))
})
