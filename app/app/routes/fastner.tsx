import type { LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction } from "@remix-run/react"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { ProjectList } from "~/pages/profile"
import { PROJECTS_QUERY } from "~/queries/projects"
import { loadQuery } from "~/sanity/loader.server"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    name: "Sebastian Fastner",
    language: await getAppLanguage(request)
  }

  const initial = await loadQuery<PROJECTS_QUERYResult>(PROJECTS_QUERY, params)
  return { initial, query: PROJECTS_QUERY, params }
}

export default function ProfileWerner() {
  const { data, params, encodeDataAttribute } = useSanityData<typeof loader>()

  return (
    <section>
      <ProjectList
        name={params.name}
        data={data}
        encodeDataAttribute={encodeDataAttribute}
      />
    </section>
  )
}
