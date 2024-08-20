import { useLoaderData, type MetaFunction } from "@remix-run/react"
import { useQuery } from "@sanity/react-loader"
import { loadQuery } from "~/sanity/loader.server"
import { Link } from "@remix-run/react"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { formatDate } from "~/utils/formatDate"
import { urlFor } from "~/sanity/image"
import { Image } from "@unpic/react"
import { defineQuery } from "groq"
import { TESTIMONIALS_QUERYResult } from "sanity.types"

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
  data: TESTIMONIALS_QUERYResult[number]
  encodeDataAttribute: EncodeDataAttributeCallback
}

export function Testimonial({ data, encodeDataAttribute }: TestimonialProps) {
  return (
    <div style={{ padding: "20px" }}>
      <Link
        data-sanity={encodeDataAttribute("slug")}
        to={data.slug?.current ? `/testimonial/${data.slug.current}` : "/"}
      >
        <div
          style={{
            background: "linear-gradient(#dff, #4dd)",
            border: "1px solid #666",
            display: "inline-block"
          }}
        >
          {data.author?.headshot && (
            <Image src={urlFor(data.author?.headshot).url()} width={150} />
          )}
        </div>
        <h3>{data.author?.name}</h3>
      </Link>
      <p>
        {data.author?.status}
        <br />
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
    { initial: initial as Required<typeof initial> }
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
