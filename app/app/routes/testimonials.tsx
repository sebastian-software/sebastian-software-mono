import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"
import { defineQuery } from "groq"
import type { TESTIMONIALS_QUERYResult } from "sanity.types"

import { urlFor } from "~/sanity/image"
import { loadQuery } from "~/sanity/loader.server"
import { formatDate } from "~/utils/formatDate"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && defined(slug.current)] | order(date desc){
    _id,
    slug,
    date,
    author->{
      name,
      headshot,
      status,
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

export const loader = async () => {
  const initial = await loadQuery<TESTIMONIALS_QUERYResult>(TESTIMONIALS_QUERY)

  return { initial, query: TESTIMONIALS_QUERY, params: {} }
}

export interface TestimonialProps {
  readonly data: TESTIMONIALS_QUERYResult[number]
  readonly encodeDataAttribute: EncodeDataAttributeCallback
}

export function Testimonial({ data, encodeDataAttribute }: TestimonialProps) {
  return (
    <div style={{ width: "15rem" }}>
      <Link
        data-sanity={encodeDataAttribute("slug")}
        to={data.slug?.current ? `/testimonial/${data.slug.current}` : "/"}
      >
        <span
          style={{
            background: "linear-gradient(#efebdc, #dedacb)",
            border: "1px solid #666",
            display: "inline-block"
          }}
        >
          {data.author?.headshot && (
            <Image
              src={urlFor(data.author?.headshot).url()}
              width={120}
              height={150}
            />
          )}
        </span>
        <h3>{data.author?.name}</h3>
      </Link>
      <p>
        {data.position?.de}
        <br />
        {data.company?.name}
      </p>
      {data.date && (
        <p data-sanity={encodeDataAttribute("date")}>{formatDate(data.date)}</p>
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
    { initial }
  )

  return (
    <section
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap"
      }}
    >
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
