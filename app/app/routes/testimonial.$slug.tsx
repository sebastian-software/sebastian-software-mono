import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { Image } from '@unpic/react'

import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { loadQuery } from '~/sanity/loader.server'
import { defineQuery } from 'groq'
import { TESTIMONIAL_QUERYResult } from 'sanity.types'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<TESTIMONIAL_QUERYResult>(
    TESTIMONIAL_QUERY,
    params,
  )
  return { initial, query: TESTIMONIAL_QUERY, params }
}

export const TESTIMONIAL_QUERY =
  defineQuery(`*[_type == "testimonial" && slug.current == $slug][0] {
    date,
    language,
    quote,
    author->{
      name,
      headshot,
      position,
      company->{
        name
      }
    },
    position,
    company->{
      name
    }
  }
`)

export default function TestimonialRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, encodeDataAttribute } = useQuery<typeof initial.data>(
    query,
    params,
    {
      // @ts-expect-error -- TODO fix the typing here
      initial,
    },
  )

  if (!data) {
    return null
  }

  return (
    <section data-sanity={encodeDataAttribute('slug')}>
      {data.author?.headshot && (
        <Image
          data-sanity={encodeDataAttribute('author.headshot')}
          src={urlFor(data.author?.headshot).url()}
          width={150}
        />
      )}
      <p>{formatDate(data.date)}</p>
      <div>{data.quote}</div>
    </section>
  )
}
