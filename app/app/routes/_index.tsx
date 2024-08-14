import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { loadQuery } from '~/sanity/loader.server'
import { Post } from '~/sanity/types'
import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { Image } from '@unpic/react'
import groq from 'groq'

export const meta: MetaFunction = () => {
  return [{ title: 'Sebastian Software GmbH' }]
}

export const loader = async () => {
  const initial = await loadQuery<Post[]>(TESTIMONIALS_QUERY, {
    language: 'de',
  })

  return { initial, query: TESTIMONIALS_QUERY, params: {} }
}

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && language == $language && defined(slug.current)] | order(date desc){
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
}`

export function Testimonial({
  post,
  encodeDataAttribute,
}: {
  post: Post
  encodeDataAttribute: EncodeDataAttributeCallback
}) {
  return (
    <div>
      <Link
        data-sanity={encodeDataAttribute('slug')}
        to={post.slug?.current ? `/testimonial/${post.slug.current}` : '/'}
      >
        <Image src={urlFor(post.author.headshot).url()} width={150} />
        <h3>{post.author.name}</h3>
      </Link>
      <p>
        {post.position} at {post.company.name} for {post.project?.name}
      </p>
      <p data-sanity={encodeDataAttribute('date')}>{formatDate(post.date)}</p>
    </div>
  )
}

export default function Index() {
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
    <section>
      {data?.length &&
        data.map((post, i) => (
          <Testimonial
            key={post._id}
            post={post}
            encodeDataAttribute={encodeDataAttribute.scope([i])}
          />
        ))}
    </section>
  )
}
