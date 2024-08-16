import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { loadQuery } from '~/sanity/loader.server'
import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { Image } from '@unpic/react'
import { defineQuery } from 'groq'
import { PROJECTS_QUERYResult, TESTIMONIALS_QUERYResult } from 'sanity.types'

export const meta: MetaFunction = () => {
  return [{ title: 'Sebastian Software GmbH' }]
}

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && language == $language] | order(date desc){
    _id,
    slug,
    language,
    title
  }
`)

export const loader = async () => {
  const initial = await loadQuery<PROJECTS_QUERYResult>(PROJECTS_QUERY, {
    language: 'de',
  })

  return { initial, query: PROJECTS_QUERY, params: {} }
}

export interface ProjectDetailsProps {
  data: PROJECTS_QUERYResult[number]
  encodeDataAttribute: EncodeDataAttributeCallback
}

export function ProjectDetails({
  data,
  encodeDataAttribute,
}: ProjectDetailsProps) {
  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  )
}

export default function ProfileWerner() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, encodeDataAttribute } = useQuery<PROJECTS_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    { initial: initial as Required<typeof initial> },
  )

  console.log('DATA:', data)

  return (
    <section>
      <h1>Sebastian Werner</h1>
      {data?.length &&
        data.map((item, i) => (
          <ProjectDetails
            key={item._id}
            data={item}
            encodeDataAttribute={encodeDataAttribute.scope([i])}
          />
        ))}
    </section>
  )
}
