import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { loadQuery } from "@sanity/react-loader"
import type { CLIENTS_QUERYResult } from "sanity.types"

import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { Banner, ClientList, Introduction } from "~/pages/home"
import { CLIENTS_QUERY } from "~/queries/clients"

export const meta: MetaFunction = () => [
  { title: "Sebastian Software" },
  {
    name: "description",
    content:
      "Ein Team von Spezialisten für React-Entwicklung mit Fokus auf nachhaltige, innovative Lösungen mit über 20 Jahre Erfahrung."
  }
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request)
  }

  const initial = await loadQuery<CLIENTS_QUERYResult>(CLIENTS_QUERY, params)
  return { initial, query: CLIENTS_QUERY, params }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()

  const clients = data

  return (
    <>
      <Banner alt="Gründer der Sebastian Software GmbH">
        Fundiertes technisches Know-How trifft auf Leidenschaft für Innovation
        und herausragende User-Experience.
      </Banner>
      <Introduction />
      <ClientList data={clients} />
    </>
  )
}
