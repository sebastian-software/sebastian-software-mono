import { addressType } from "./address"
import { companyType } from "./company"
import { consultantType } from "./consultant"
import { humanType } from "./human"
import { localeString } from "./localeStringType"
import { pictureType } from "./picture"
import { projectType } from "./project"
import { testimonialType } from "./testimonial"

export const schemaTypes = [
  // Base Types
  localeString,

  // Actual Schemas
  addressType,
  consultantType,
  pictureType,
  projectType,
  companyType,
  humanType,
  testimonialType
]
