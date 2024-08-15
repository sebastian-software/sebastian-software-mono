import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { loadQuery } from '~/sanity/loader.server'
import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { Image } from '@unpic/react'
import { defineQuery } from 'groq'
import { TESTIMONIALS_QUERYResult } from 'sanity.types'

export const meta: MetaFunction = () => {
  return [{ title: 'Sebastian Software GmbH' }]
}

export const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && language == $language && defined(slug.current)] | order(date desc){
    _id,
    slug,
    date,
    language,
    author->{
      name,
      headshot,
      position,
      company->{
        name
      }
    },
    project->{
      name
    },
    position,
    company->{
      name
    }
  }
`)

export const loader = async () => {
  const initial = await loadQuery<TESTIMONIALS_QUERYResult>(
    TESTIMONIALS_QUERY,
    {
      language: 'de',
    },
  )

  return { initial, query: TESTIMONIALS_QUERY, params: {} }
}

export interface TestimonialProps {
  data: TESTIMONIALS_QUERYResult[number]
  encodeDataAttribute: EncodeDataAttributeCallback
}

export function Testimonial({ data, encodeDataAttribute }: TestimonialProps) {
  return (
    <div>
      <Link
        data-sanity={encodeDataAttribute('slug')}
        to={data.slug?.current ? `/testimonial/${data.slug.current}` : '/'}
      >
        {data.author?.headshot && (
          <Image src={urlFor(data.author?.headshot).url()} width={150} />
        )}
        <h3>{data.author?.name}</h3>
      </Link>
      <p>
        {data.position} at {data.company?.name} for {data.project?.name}
      </p>
      {data.date && (
        <p data-sanity={encodeDataAttribute('date')}>{formatDate(data.date)}</p>
      )}
    </div>
  )
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, encodeDataAttribute } = useQuery<TESTIMONIALS_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    { initial: initial as Required<typeof initial> },
  )

  return (
    <section>
      {data?.length &&
        data.map((item, i) => (
          <Testimonial
            key={item._id}
            data={item}
            encodeDataAttribute={encodeDataAttribute.scope([i])}
          />
        ))}
    </section>
  )
}
