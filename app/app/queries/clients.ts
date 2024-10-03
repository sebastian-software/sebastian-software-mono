import { defineQuery } from "groq"
export const CLIENTS_QUERY = defineQuery(`
  {
    "clients": *[_id in array::unique(*[_type == "project" && client->closed != true].client->_id)]{
      _id,
      name,
      logo
    } | order(name asc)
  }
`)
