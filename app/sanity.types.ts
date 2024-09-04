/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch"
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: "sanity.imagePalette"
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions"
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: "sanity.fileAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: "geopoint"
  lat?: number
  lng?: number
  alt?: number
}

export type Testimonial = {
  _id: string
  _type: "testimonial"
  _createdAt: string
  _updatedAt: string
  _rev: string
  consultant: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "consultant"
  }
  date: string
  author: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "human"
  }
  position?: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  company?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
  quoteLanguage: "en" | "de"
  source?: "linkedin" | "xing" | "email" | "other"
  quote?: Array<
    {
      _key: string
    } & InternationalizedArrayTextValue
  >
}

export type Human = {
  _id: string
  _type: "human"
  _createdAt: string
  _updatedAt: string
  _rev: string
  headshot?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  name: string
  status?: "freelancer" | "owner" | "employee"
  position?: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  company?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
}

export type Project = {
  _id: string
  _type: "project"
  _createdAt: string
  _updatedAt: string
  _rev: string
  consultant: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "consultant"
  }
  client: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
  agent?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
  title: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  contractStart: string
  contractEnd: string
  role: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  description: Array<
    {
      _key: string
    } & InternationalizedArrayTextValue
  >
  testimonials?: Array<{
    _ref: string
    _type: "reference"
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: "testimonial"
  }>
}

export type Company = {
  _id: string
  _type: "company"
  _createdAt: string
  _updatedAt: string
  _rev: string
  logo?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  name: string
  city: string
  country:
    | "de"
    | "ch"
    | "at"
    | "lu"
    | "fr"
    | "nl"
    | "be"
    | "us"
    | "cn"
    | "ca"
    | "gb"
  industry:
    | "IT"
    | "Staples"
    | "Consumer"
    | "Healthcare"
    | "Financials"
    | "Industrials"
    | "Energy"
    | "Materials"
    | "Utilities"
    | "RealEstate"
    | "Telecom"
    | "Media"
    | "Retail"
    | "Transportation"
    | "Automobiles"
    | "Pharma"
    | "Insurance"
    | "CapitalGoods"
    | "Food"
    | "Chemicals"
    | "Software"
    | "Hardware"
    | "Hotels"
    | "Textiles"
    | "Household"
    | "Construction"
    | "Aerospace"
    | "Metals"
    | "Education"
    | "Recruitement"
  slug: Slug
}

export type Slug = {
  _type: "slug"
  current: string
  source?: string
}

export type Picture = {
  _id: string
  _type: "picture"
  _createdAt: string
  _updatedAt: string
  _rev: string
  image: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  alt: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  date: string
}

export type Consultant = {
  _id: string
  _type: "consultant"
  _createdAt: string
  _updatedAt: string
  _rev: string
  headshot: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  name: string
  birthday: string
  address?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "address"
  }
}

export type SanityImageCrop = {
  _type: "sanity.imageCrop"
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot"
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: "sanity.imageAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData"
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata"
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Address = {
  _id: string
  _type: "address"
  _createdAt: string
  _updatedAt: string
  _rev: string
  name: string
  street?: string
  houseNumber?: string
  zipCode?: number
  city: string
  country:
    | "Germany"
    | "Switzerland"
    | "Austria"
    | "Luxembourg"
    | "France"
    | "Netherlands"
    | "Belgium"
}

export type InternationalizedArrayTextValue = {
  _type: "internationalizedArrayTextValue"
  value?: string
}

export type InternationalizedArrayStringValue = {
  _type: "internationalizedArrayStringValue"
  value?: string
}

export type InternationalizedArrayText = Array<
  {
    _key: string
  } & InternationalizedArrayTextValue
>

export type InternationalizedArrayString = Array<
  {
    _key: string
  } & InternationalizedArrayStringValue
>

export type SanityAssistInstructionTask = {
  _type: "sanity.assist.instructionTask"
  path?: string
  instructionKey?: string
  started?: string
  updated?: string
  info?: string
}

export type SanityAssistTaskStatus = {
  _type: "sanity.assist.task.status"
  tasks?: Array<
    {
      _key: string
    } & SanityAssistInstructionTask
  >
}

export type SanityAssistSchemaTypeAnnotations = {
  _type: "sanity.assist.schemaType.annotations"
  title?: string
  fields?: Array<
    {
      _key: string
    } & SanityAssistSchemaTypeField
  >
}

export type SanityAssistOutputType = {
  _type: "sanity.assist.output.type"
  type?: string
}

export type SanityAssistOutputField = {
  _type: "sanity.assist.output.field"
  path?: string
}

export type SanityAssistInstructionContext = {
  _type: "sanity.assist.instruction.context"
  reference: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "assist.instruction.context"
  }
}

export type AssistInstructionContext = {
  _id: string
  _type: "assist.instruction.context"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  context?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal"
    listItem?: never
    markDefs?: null
    level?: number
    _type: "block"
    _key: string
  }>
}

export type SanityAssistInstructionUserInput = {
  _type: "sanity.assist.instruction.userInput"
  message: string
  description?: string
}

export type SanityAssistInstructionPrompt = Array<{
  children?: Array<
    | {
        marks?: Array<string>
        text?: string
        _type: "span"
        _key: string
      }
    | ({
        _key: string
      } & SanityAssistInstructionFieldRef)
    | ({
        _key: string
      } & SanityAssistInstructionContext)
    | ({
        _key: string
      } & SanityAssistInstructionUserInput)
  >
  style?: "normal"
  listItem?: never
  markDefs?: null
  level?: number
  _type: "block"
  _key: string
}>

export type SanityAssistInstructionFieldRef = {
  _type: "sanity.assist.instruction.fieldRef"
  path?: string
}

export type SanityAssistInstruction = {
  _type: "sanity.assist.instruction"
  prompt?: SanityAssistInstructionPrompt
  icon?: string
  title?: string
  userId?: string
  createdById?: string
  output?: Array<
    | ({
        _key: string
      } & SanityAssistOutputField)
    | ({
        _key: string
      } & SanityAssistOutputType)
  >
}

export type SanityAssistSchemaTypeField = {
  _type: "sanity.assist.schemaType.field"
  path?: string
  instructions?: Array<
    {
      _key: string
    } & SanityAssistInstruction
  >
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Testimonial
  | Human
  | Project
  | Company
  | Slug
  | Picture
  | Consultant
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Address
  | InternationalizedArrayTextValue
  | InternationalizedArrayStringValue
  | InternationalizedArrayText
  | InternationalizedArrayString
  | SanityAssistInstructionTask
  | SanityAssistTaskStatus
  | SanityAssistSchemaTypeAnnotations
  | SanityAssistOutputType
  | SanityAssistOutputField
  | SanityAssistInstructionContext
  | AssistInstructionContext
  | SanityAssistInstructionUserInput
  | SanityAssistInstructionPrompt
  | SanityAssistInstructionFieldRef
  | SanityAssistInstruction
  | SanityAssistSchemaTypeField
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./app/queries/customers.ts
// Variable: CUSTOMERS_QUERY
// Query: *[_id in array::unique(*[_type == "project"].customer->_id)]{    _id,    name,    city,    country,    industry,    logo  } | order(name asc)
export type CUSTOMERS_QUERYResult = Array<
  | {
      _id: string
      name: null
      city: null
      country: null
      industry: null
      logo: null
    }
  | {
      _id: string
      name: string
      city: null
      country: null
      industry: null
      logo: null
    }
  | {
      _id: string
      name: string
      city: string
      country:
        | "at"
        | "be"
        | "ca"
        | "ch"
        | "cn"
        | "de"
        | "fr"
        | "gb"
        | "lu"
        | "nl"
        | "us"
      industry:
        | "Aerospace"
        | "Automobiles"
        | "CapitalGoods"
        | "Chemicals"
        | "Construction"
        | "Consumer"
        | "Education"
        | "Energy"
        | "Financials"
        | "Food"
        | "Hardware"
        | "Healthcare"
        | "Hotels"
        | "Household"
        | "Industrials"
        | "Insurance"
        | "IT"
        | "Materials"
        | "Media"
        | "Metals"
        | "Pharma"
        | "RealEstate"
        | "Recruitement"
        | "Retail"
        | "Software"
        | "Staples"
        | "Telecom"
        | "Textiles"
        | "Transportation"
        | "Utilities"
      logo: {
        asset?: {
          _ref: string
          _type: "reference"
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: "image"
      } | null
    }
  | {
      _id: string
      name: string
      city: string
      country:
        | "Austria"
        | "Belgium"
        | "France"
        | "Germany"
        | "Luxembourg"
        | "Netherlands"
        | "Switzerland"
      industry: null
      logo: null
    }
>

// Source: ./app/queries/projects.ts
// Variable: PROJECTS_QUERY
// Query: *[_type == "project" && consultant->name == $name]  {    _id,    "title": title[_key == $language][0].value,    "description": description[_key == $language][0].value,    "role": role[_key == $language][0].value,    contractStart,    contractEnd,    consultant->{      name,    },    client->    {      name,      city,      country,      industry,      logo    },    agent->    {      name,      city,      country,      logo    },    testimonials[]->    {      _id,      "quote": quote[_key == $language][0].value,      "position": position[_key == $language][0].value,      author->{        name,        headshot      },      company->{        name      }    }  } | order(contractStart desc)
export type PROJECTS_QUERYResult = Array<{
  _id: string
  title: string | null
  description: string | null
  role: string | null
  contractStart: string
  contractEnd: string
  consultant: {
    name: string
  }
  client: {
    name: string
    city: string
    country:
      | "at"
      | "be"
      | "ca"
      | "ch"
      | "cn"
      | "de"
      | "fr"
      | "gb"
      | "lu"
      | "nl"
      | "us"
    industry:
      | "Aerospace"
      | "Automobiles"
      | "CapitalGoods"
      | "Chemicals"
      | "Construction"
      | "Consumer"
      | "Education"
      | "Energy"
      | "Financials"
      | "Food"
      | "Hardware"
      | "Healthcare"
      | "Hotels"
      | "Household"
      | "Industrials"
      | "Insurance"
      | "IT"
      | "Materials"
      | "Media"
      | "Metals"
      | "Pharma"
      | "RealEstate"
      | "Recruitement"
      | "Retail"
      | "Software"
      | "Staples"
      | "Telecom"
      | "Textiles"
      | "Transportation"
      | "Utilities"
    logo: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    } | null
  }
  agent: {
    name: string
    city: string
    country:
      | "at"
      | "be"
      | "ca"
      | "ch"
      | "cn"
      | "de"
      | "fr"
      | "gb"
      | "lu"
      | "nl"
      | "us"
    logo: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    } | null
  } | null
  testimonials: Array<{
    _id: string
    quote: string | null
    position: string | null
    author: {
      name: string
      headshot: {
        asset?: {
          _ref: string
          _type: "reference"
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: "image"
      } | null
    }
    company: {
      name: string
    } | null
  }> | null
}>

// Source: ./app/queries/testimonials.ts
// Variable: TESTIMONIALS_QUERY
// Query: *[_type == "testimonial"] | order(date desc){    _id,    date,    consultant->{      name    },    author->{      name,      headshot    },    "position": position[_key == $language][0].value,    company->{      name    }  }
export type TESTIMONIALS_QUERYResult = Array<{
  _id: string
  date: string
  consultant: {
    name: string
  }
  author: {
    name: string
    headshot: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    } | null
  }
  position: string | null
  company: {
    name: string
  } | null
}>
// Variable: TESTIMONIAL_QUERY
// Query: *[_type == "testimonial" && string::startsWith(_id, $shortId)][0] {    date,    consultant->{      name    },    author->{      name,      headshot,    },    language,    "quote": quote[_key == $language][0].value,    "position": position[_key == $language][0].value,    company->{      name    }  }
export type TESTIMONIAL_QUERYResult = {
  date: string
  consultant: {
    name: string
  }
  author: {
    name: string
    headshot: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    } | null
  }
  language: null
  quote: string | null
  position: string | null
  company: {
    name: string
  } | null
} | null

// Query TypeMap
import "@sanity/client"
declare module "@sanity/client" {
  interface SanityQueries {
    '\n  *[_id in array::unique(*[_type == "project"].customer->_id)]{\n    _id,\n    name,\n    city,\n    country,\n    industry,\n    logo\n  } | order(name asc)\n': CUSTOMERS_QUERYResult
    '\n  *[_type == "project" && consultant->name == $name]\n  {\n    _id,\n    "title": title[_key == $language][0].value,\n    "description": description[_key == $language][0].value,\n    "role": role[_key == $language][0].value,\n    contractStart,\n    contractEnd,\n    consultant->{\n      name,\n    },\n    client->\n    {\n      name,\n      city,\n      country,\n      industry,\n      logo\n    },\n    agent->\n    {\n      name,\n      city,\n      country,\n      logo\n    },\n    testimonials[]->\n    {\n      _id,\n      "quote": quote[_key == $language][0].value,\n      "position": position[_key == $language][0].value,\n      author->{\n        name,\n        headshot\n      },\n      company->{\n        name\n      }\n    }\n  } | order(contractStart desc)\n': PROJECTS_QUERYResult
    '*[_type == "testimonial"] | order(date desc){\n    _id,\n    date,\n    consultant->{\n      name\n    },\n    author->{\n      name,\n      headshot\n    },\n    "position": position[_key == $language][0].value,\n    company->{\n      name\n    }\n  }\n': TESTIMONIALS_QUERYResult
    '*[_type == "testimonial" && string::startsWith(_id, $shortId)][0] {\n    date,\n    consultant->{\n      name\n    },\n    author->{\n      name,\n      headshot,\n    },\n    language,\n    "quote": quote[_key == $language][0].value,\n    "position": position[_key == $language][0].value,\n    company->{\n      name\n    }\n  }\n': TESTIMONIAL_QUERYResult
  }
}
