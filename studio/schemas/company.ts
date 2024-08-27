import { defineField, defineType } from "sanity"

import { removeCompanySuffixes } from "./utils"

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "image"
    }),

    defineField({
      name: "name",
      type: "string"
    }),

    defineField({
      name: "city",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "country",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "de",
      options: {
        list: [
          { title: "Germany", value: "de" },
          { title: "Switzerland", value: "ch" },
          { title: "Austria", value: "at" },
          { title: "Luxembourg", value: "lu" },
          { title: "France", value: "fr" },
          { title: "Netherlands", value: "nl" },
          { title: "Belgium", value: "be" },
          { title: "United States", value: "us" },
          { title: "China", value: "cn" },
          { title: "Canada", value: "ca" }
        ]
      }
    }),

    defineField({
      name: "industry",
      type: "string",
      options: {
        list: [
          { title: "Informationstechnologie", value: "IT" },
          { title: "Basiskonsumgüter", value: "Staples" },
          { title: "Nicht-Basiskonsumgüter", value: "Consumer" },
          { title: "Gesundheitswesen", value: "Healthcare" },
          { title: "Finanzen", value: "Financials" },
          { title: "Industrie", value: "Industrials" },
          { title: "Energie", value: "Energy" },
          { title: "Materialien", value: "Materials" },
          { title: "Versorgungsunternehmen", value: "Utilities" },
          { title: "Immobilien", value: "RealEstate" },
          { title: "Telekommunikation", value: "Telecom" },
          { title: "Medien", value: "Media" },
          { title: "Einzelhandel", value: "Retail" },
          { title: "Transport", value: "Transportation" },
          { title: "Automobile", value: "Automobiles" },
          { title: "Pharma", value: "Pharma" },
          { title: "Versicherungen", value: "Insurance" },
          { title: "Investitionsgüter", value: "CapitalGoods" },
          { title: "Lebensmittel", value: "Food" },
          { title: "Chemie", value: "Chemicals" },
          { title: "Software", value: "Software" },
          { title: "Hardware", value: "Hardware" },
          { title: "Hotels", value: "Hotels" },
          { title: "Textilien", value: "Textiles" },
          { title: "Haushaltsprodukte", value: "Household" },
          { title: "Bau", value: "Construction" },
          { title: "Luft- und Raumfahrt", value: "Aerospace" },
          { title: "Metalle", value: "Metals" },
          { title: "Bildung", value: "Education" }
        ]
      }
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (document) => removeCompanySuffixes(document.name)
      }
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address.city",
      media: "logo"
    }
  }
})
