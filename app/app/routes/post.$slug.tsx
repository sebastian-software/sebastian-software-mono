import { PortableText } from '@portabletext/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { loadQuery } from '~/sanity/loader.server'
import { POST_QUERY } from '~/sanity/queries'
import { Post } from '~/sanity/types'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<Post>(POST_QUERY, params)

  return { initial, query: POST_QUERY, params }
}

export default function PostRoute() {
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

  console.log('POST-DATA:', data)

  return (
    <section data-sanity={encodeDataAttribute('slug')} className="post">
      <img
        data-sanity={encodeDataAttribute('author.headshot')}
        className="post__cover"
        src={urlFor(data?.author.headshot).url()}
        style={{ width: '20rem' }}
      />
      <div className="post__container">
        <h1 className="post__title">{data?.title}</h1>
        <p className="post__excerpt">{data?.excerpt}</p>
        <p className="post__date">{formatDate(data.date)}</p>
        <div className="post__content">{data.quote}</div>
      </div>
    </section>
  )
}
