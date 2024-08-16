import { useLoaderData, type MetaFunction } from "@remix-run/react"
import { useQuery } from "@sanity/react-loader"
import { loadQuery } from "~/sanity/loader.server"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { defineQuery } from "groq"
import { PROJECTS_QUERYResult } from "sanity.types"
import { ProjectList } from "~/components/profile"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && language == $language && defined(consultant)]
    {
      _id,
      title,
      description,
      contractStart,
      contractEnd,
      customer->{
        name,
        location,
        industry,
        logo},
      role,
      technologies,
      testimonials[]->{
        author,
        position,
        company,
        text
      }
    } | order(contractStart desc)
  `)

export const loader = async () => {
  const initial = await loadQuery<PROJECTS_QUERYResult>(PROJECTS_QUERY, {
    language: "de"
  })

  return { initial, query: PROJECTS_QUERY, params: {} }
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
    { initial: initial as Required<typeof initial> }
  )

  return (
    <section>
      <h1>Sebastian Werner</h1>
      <ProjectList data={data} encodeDataAttribute={encodeDataAttribute} />
    </section>
  )
}
