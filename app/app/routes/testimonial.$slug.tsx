import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { Image } from '@unpic/react'

import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { loadQuery } from '~/sanity/loader.server'
import { TestimonialData } from '~/sanity/types'
import { defineQuery } from 'groq'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<TestimonialData>(TESTIMONIAL_QUERY, params)
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
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  })

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  return (
    <section data-sanity={encodeDataAttribute('slug')}>
      <Image
        data-sanity={encodeDataAttribute('author.headshot')}
        src={urlFor(data?.author.headshot).url()}
        width={150}
      />
      <p>{formatDate(data.date)}</p>
      <div>{data.quote}</div>
    </section>
  )
}
