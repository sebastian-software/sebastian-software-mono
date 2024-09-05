import { defineQuery } from "groq"
export const CLIENTS_QUERY = defineQuery(`
  *[_id in array::unique(*[_type == "project"].client->_id)]{
    _id,
    name,
    city,
    country,
    industry,
    logo
  } | order(name asc)
`)
