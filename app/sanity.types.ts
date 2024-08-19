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

export type Picture = {
  _id: string
  _type: "picture"
  _createdAt: string
  _updatedAt: string
  _rev: string
  image?: {
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
  alt?: LocaleString
  date?: string
  slug?: Slug
}

export type TranslationMetadata = {
  _id: string
  _type: "translation.metadata"
  _createdAt: string
  _updatedAt: string
  _rev: string
  translations?: Array<
    {
      _key: string
    } & InternationalizedArrayReferenceValue
  >
  schemaTypes?: Array<string>
}

export type InternationalizedArrayReferenceValue = {
  _type: "internationalizedArrayReferenceValue"
  value?:
    | {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "project"
      }
    | {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "testimonial"
      }
}

export type Testimonial = {
  _id: string
  _type: "testimonial"
  _createdAt: string
  _updatedAt: string
  _rev: string
  language?: string
  consultant?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "consultant"
  }
  project?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "project"
  }
  quote?: string
  slug?: Slug
  date?: string
  author?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "human"
  }
  position?: string
  company?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
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
  name?: string
  position?: LocaleString
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
  consultant?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "consultant"
  }
  language?: string
  title?: string
  slug?: Slug
  role?: string
  customer?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "company"
  }
  contractStart?: string
  contractEnd?: string
  description?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
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
  name?: string
  city?: LocaleString
  country?:
    | "Germany"
    | "Switzerland"
    | "Austria"
    | "Luxembourg"
    | "France"
    | "Netherlands"
    | "Belgium"
  industry?: string
  slug?: Slug
}

export type LocaleString = {
  _type: "localeString"
  en?: string
  de?: string
}

export type Slug = {
  _type: "slug"
  current?: string
  source?: string
}

export type Consultant = {
  _id: string
  _type: "consultant"
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
  name?: string
  birthday?: string
  address?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "address"
  }
}

export type Address = {
  _id: string
  _type: "address"
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  street?: string
  houseNumber?: string
  zipCode?: number
  city?: string
  country?:
    | "Germany"
    | "Switzerland"
    | "Austria"
    | "Luxembourg"
    | "France"
    | "Netherlands"
    | "Belgium"
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

export type InternationalizedArrayReference = Array<
  {
    _key: string
  } & InternationalizedArrayReferenceValue
>

export type InternationalizedArrayStringValue = {
  _type: "internationalizedArrayStringValue"
  value?: string
}

export type InternationalizedArrayString = Array<
  {
    _key: string
  } & InternationalizedArrayStringValue
>

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Picture
  | TranslationMetadata
  | InternationalizedArrayReferenceValue
  | Testimonial
  | Human
  | Project
  | Company
  | LocaleString
  | Slug
  | Consultant
  | Address
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | InternationalizedArrayReference
  | InternationalizedArrayStringValue
  | InternationalizedArrayString
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./app/routes/testimonial.$slug.tsx
// Variable: TESTIMONIAL_QUERY
// Query: *[_type == "testimonial" && slug.current == $slug][0] {    date,    language,    quote,    author->{      name,      headshot,      position,      company->{        name      }    },    position,    company->{      name    }  }
export type TESTIMONIAL_QUERYResult = {
  date: string | null
  language: string | null
  quote: string | null
  author: {
    name: string | null
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
    position: LocaleString | null
    company: {
      name: string | null
    } | null
  } | null
  position: string | null
  company: {
    name: string | null
  } | null
} | null

// Source: ./app/routes/testimonials.tsx
// Variable: TESTIMONIALS_QUERY
// Query: *[_type == "testimonial" && language == $language && defined(slug.current)] | order(date desc){    _id,    slug,    date,    language,    author->{      name,      headshot,      position,      company->{        name      }    },    project->{      name    },    position,    company->{      name    }  }
export type TESTIMONIALS_QUERYResult = Array<{
  _id: string
  slug: Slug | null
  date: string | null
  language: string | null
  author: {
    name: string | null
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
    position: LocaleString | null
    company: {
      name: string | null
    } | null
  } | null
  project: {
    name: null
  } | null
  position: string | null
  company: {
    name: string | null
  } | null
}>

// Source: ./app/routes/werner.tsx
// Variable: PROJECTS_QUERY
// Query: *[_type == "project" && language == $language && defined(consultant)]    {      _id,      title,      description,      contractStart,      contractEnd,      customer->      {        name,        location,        industry,        logo      },      role,      technologies,      testimonials[]->      {        _id,        quote,        position,        author->{          name        },        company->{          name,          city        }      }    } | order(contractStart desc)
export type PROJECTS_QUERYResult = Array<{
  _id: string
  title: string | null
  description: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }> | null
  contractStart: string | null
  contractEnd: string | null
  customer: {
    name: string | null
    location: null
    industry: string | null
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
  role: string | null
  technologies: null
  testimonials: Array<{
    _id: string
    quote: string | null
    position: string | null
    author: {
      name: string | null
    } | null
    company: {
      name: string | null
      city: LocaleString | null
    } | null
  }> | null
}>

// Query TypeMap
import "@sanity/client"
declare module "@sanity/client" {
  interface SanityQueries {
    '*[_type == "testimonial" && slug.current == $slug][0] {\n    date,\n    language,\n    quote,\n    author->{\n      name,\n      headshot,\n      position,\n      company->{\n        name\n      }\n    },\n    position,\n    company->{\n      name\n    }\n  }\n': TESTIMONIAL_QUERYResult
    '*[_type == "testimonial" && language == $language && defined(slug.current)] | order(date desc){\n    _id,\n    slug,\n    date,\n    language,\n    author->{\n      name,\n      headshot,\n      position,\n      company->{\n        name\n      }\n    },\n    project->{\n      name\n    },\n    position,\n    company->{\n      name\n    }\n  }\n': TESTIMONIALS_QUERYResult
    '\n    *[_type == "project" && language == $language && defined(consultant)]\n    {\n      _id,\n      title,\n      description,\n      contractStart,\n      contractEnd,\n      customer->\n      {\n        name,\n        location,\n        industry,\n        logo\n      },\n      role,\n      technologies,\n      testimonials[]->\n      {\n        _id,\n        quote,\n        position,\n        author->{\n          name\n        },\n        company->{\n          name,\n          city\n        }\n      }\n    } | order(contractStart desc)\n  ': PROJECTS_QUERYResult
  }
}
