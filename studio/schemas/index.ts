import "./localeStringType"

import { addressType } from "./address"
import { companyType } from "./company"
import { consultantType } from "./consultant"
import { humanType } from "./human"
import { pictureType } from "./picture"
import { projectType } from "./project"
import { testimonialType } from "./testimonial"
import { localeString } from "./localeStringType"

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
