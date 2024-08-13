import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Card from '~/components/Card'
import { loadQuery } from '~/sanity/loader.server'
import { TESTIMONIALS_QUERY } from '~/sanity/queries'
import { Post } from '~/sanity/types'

export const meta: MetaFunction = () => {
  return [{ title: 'Sebastian Software GmbH' }]
}

export const loader = async () => {
  const initial = await loadQuery<Post[]>(TESTIMONIALS_QUERY)

  return { initial, query: TESTIMONIALS_QUERY, params: {} }
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
          <Card
            key={post._id}
            post={post}
            encodeDataAttribute={encodeDataAttribute.scope([i])}
          />
        ))}
    </section>
  )
}
