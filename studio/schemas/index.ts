import "./localeStringType"

import { addressType } from "./address"
import { companyType } from "./company"
import { consultantType } from "./consultant"
import { humanType } from "./human"
import { pictureType } from "./picture"
import { projectType } from "./project"
import { testimonialType } from "./testimonial"
import { localeString, localeText } from "./localeStringType"

export const schemaTypes = [
  // Base Types
  localeString,
  localeText,

  // Actual Schemas
  addressType,
  consultantType,
  pictureType,
  projectType,
  companyType,
  humanType,
  testimonialType
]
