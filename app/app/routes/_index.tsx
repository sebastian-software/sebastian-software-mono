import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { loadQuery, useQuery } from "@sanity/react-loader"
import type { CLIENTS_QUERYResult } from "sanity.types"

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
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery<CLIENTS_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

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
