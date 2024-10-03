import { defineQuery } from "groq"

import { CLIENTS_QUERY } from "./clients"
import { PAGES_QUERY } from "./pages"

export const HOME_QUERY = defineQuery(`
  {
    ...${CLIENTS_QUERY},
    ...${PAGES_QUERY}
  }
`)
