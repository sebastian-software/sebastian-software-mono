import { t } from "@lingui/macro"
import type { LoaderFunctionArgs } from "@remix-run/node"
import type { MetaFunction } from "@remix-run/node"
import { loadQuery } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

import { SanityPage } from "~/components/sanity-page"
import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { postProcessData } from "~/utils/blockProcessor"

export const meta: MetaFunction = () => {
  return [
    {
      title: t`Consulting - Sebastian Software GmbH`
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "consulting"
  }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)
  const data = await postProcessData(initial.data)

  return {
    initial: {
      ...initial,
      data
    },
    query: PAGES_QUERY,
    params
  }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()

  return <SanityPage page={data.page} />
}
