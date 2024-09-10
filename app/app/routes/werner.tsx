import type { LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction, useLoaderData } from "@remix-run/react"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { getAppLanguage } from "~/language.server"
import { ProjectList } from "~/pages/profile"
import { PROJECTS_QUERY } from "~/queries/projects"
import { loadQuery } from "~/sanity/loader.server"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    name: "Sebastian Werner",
    language: await getAppLanguage(request)
  }

  const initial = await loadQuery<PROJECTS_QUERYResult>(PROJECTS_QUERY, params)
  return { initial, query: PROJECTS_QUERY, params }
}

export interface ProjectDetailsProps {
  data: PROJECTS_QUERYResult[number]
  encodeDataAttribute: EncodeDataAttributeCallback
}

export default function ProfileWerner() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, encodeDataAttribute } = useQuery<PROJECTS_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  return (
    <section>
      <ProjectList data={data} encodeDataAttribute={encodeDataAttribute} />
    </section>
  )
}
