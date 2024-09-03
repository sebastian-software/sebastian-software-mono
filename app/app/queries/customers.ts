import { defineQuery } from "groq"
export const CUSTOMERS_QUERY = defineQuery(`
  *[_id in array::unique(*[_type == "project"].customer->_id)]{
    _id,
    name,
    city,
    country,
    industry,
    logo
  } | order(name asc)
`)
