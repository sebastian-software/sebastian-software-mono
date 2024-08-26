import { useLoaderData, type MetaFunction } from "@remix-run/react"
import { useQuery } from "@sanity/react-loader"
import { loadQuery } from "~/sanity/loader.server"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { defineQuery } from "groq"
import { PROJECTS_QUERYResult } from "sanity.types"
import { ProfileHead, ProjectList } from "~/components/profile"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && consultant->name == $name]
    {
      _id,
      "title": title[$language],
      "description": description[$language],
      contractStart,
      contractEnd,
      consultant->{
        name,
      },
      customer->
      {
        name,
        "city": city[$language],
        country,
        industry,
        logo
      },
      "role": role[$language],
      technologies,
      testimonials[]->
      {
        _id,
        "quote": quote[$language],
        "position": position[$language],
        author->{
          name,
          headshot
        },
        company->{
          name
        }
      }
    } | order(contractStart desc)
  `)

export const loader = async () => {
  const params = {
    name: "Sebastian Werner",
    language: "de"
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
    { initial: initial as Required<typeof initial> }
  )

  return (
    <section>
      <ProfileHead name="Sebastian Werner" />
      <ProjectList data={data} encodeDataAttribute={encodeDataAttribute} />
    </section>
  )
}
