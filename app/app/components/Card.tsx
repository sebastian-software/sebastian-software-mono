import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import type { Post } from '~/sanity/types'

export default function Card({
  post,
  encodeDataAttribute,
}: {
  post: Post
  encodeDataAttribute: EncodeDataAttributeCallback
}) {
  console.log('DATA:', post)
  return (
    <div className="card">
      {post.mainImage ? (
        <img
          data-sanity={encodeDataAttribute('mainImage')}
          className="card__cover"
          src={urlFor(post.mainImage).width(500).height(300).url()}
          alt=""
        />
      ) : (
        <div />
      )}
      <div>
        <Link
          data-sanity={encodeDataAttribute('slug')}
          className="card__link"
          to={post.slug?.current ? `/post/${post.slug.current}` : '/'}
        >
          <img
            src={urlFor(post.author.headshot).url()}
            style={{ width: '20rem' }}
          />
          <h3>{post.author.name}</h3>
          <p>
            {post.position} at {post.company.name}
          </p>
        </Link>
        <p>{formatDate(post.date)}</p>
      </div>
    </div>
  )
}
