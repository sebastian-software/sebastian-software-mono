import type { LoaderFunctionArgs } from "@remix-run/node"
import { loadQuery } from "@sanity/react-loader"
import type { HOME_QUERYResult } from "sanity.types"

import { SanityPage } from "~/components/sanity-page"
import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { ClientList } from "~/pages/home"
import { HOME_QUERY } from "~/queries/home"
import { postProcessData } from "~/utils/blockProcessor"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "home"
  }

  const initial = await loadQuery<HOME_QUERYResult>(HOME_QUERY, params)
  const data = await postProcessData(initial.data)

  return {
    initial: {
      ...initial,
      data
    },
    query: HOME_QUERY,
    params
  }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()

  return (
    <>
      <SanityPage page={data.page} />
      <ClientList data={data.clients} />
    </>
  )
}
