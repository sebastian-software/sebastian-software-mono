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

export type Page = {
  _id: string
  _type: "page"
  _createdAt: string
  _updatedAt: string
  _rev: string
  id: string
  title: Array<
    {
      _key: string
    } & InternationalizedArrayStringValue
  >
  content: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: "span"
          _key: string
        }>
        style?: "normal" | "h2" | "blockquote"
        listItem?: "bullet" | "number"
        markDefs?: Array<{
          href?: string
          _type: "link"
          _key: string
        }>
        level?: number
        _type: "block"
        _key: string
      }
    | {
        _ref: string
        _type: "reference"
        _weak?: boolean
        _key: string
        [internalGroqTypeReferenceTo]?: "picture"
      }
  >
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
  closed?: boolean
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
  | Page
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
