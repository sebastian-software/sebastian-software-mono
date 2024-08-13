import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import type { Post } from '~/sanity/types'
import { Image } from '@unpic/react'

export default function Card({
  post,
  encodeDataAttribute,
}: {
  post: Post
  encodeDataAttribute: EncodeDataAttributeCallback
}) {
  return (
    <div className="card">
      <div>
        <Link
          data-sanity={encodeDataAttribute('slug')}
          className="card__link"
          to={post.slug?.current ? `/post/${post.slug.current}` : '/'}
        >
          <Image src={urlFor(post.author.headshot).url()} width={150} />
          <h3>{post.author.name}</h3>
        </Link>
        <p>
          {post.position} at {post.company.name}
        </p>
        <p data-sanity={encodeDataAttribute('date')}>{formatDate(post.date)}</p>
      </div>
    </div>
  )
}
