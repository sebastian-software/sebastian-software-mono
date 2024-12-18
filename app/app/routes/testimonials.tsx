import { t } from "@lingui/macro"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"
import type { TESTIMONIALS_QUERYResult } from "sanity.types"

import { getAppLanguage } from "~/language.server"
import { TESTIMONIALS_QUERY } from "~/queries/testimonials"
import { urlFor } from "~/sanity/image"
import { loadQuery } from "~/sanity/loader.server"
import { formatDate } from "~/utils/formatDate"
import { buildReadableUrl, encodeFirstUuidSegment } from "~/utils/urlHelper"

export const meta: MetaFunction = () => {
  return [
    {
      title: t`Testimonials - Sebastian Software GmbH`
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    name: "Sebastian Werner",
    language: await getAppLanguage(request)
  }

  const initial = await loadQuery<TESTIMONIALS_QUERYResult>(
    TESTIMONIALS_QUERY,
    params
  )

  return { initial, query: TESTIMONIALS_QUERY, params }
}

export interface TestimonialProps {
  readonly data: TESTIMONIALS_QUERYResult[number]
  readonly encodeDataAttribute: EncodeDataAttributeCallback
}

export function Testimonial({ data, encodeDataAttribute }: TestimonialProps) {
  const shortId = encodeFirstUuidSegment(data._id)
  const readableUrl = buildReadableUrl([
    data.author.name,
    ".",
    data.consultant.name
  ])

  const headshotImage = urlFor(data.author.headshot)?.url()

  return (
    <div style={{ width: "15rem" }}>
      <Link
        data-sanity={encodeDataAttribute("slug")}
        to={`/testimonial/${readableUrl}${shortId}`}
      >
        <span
          style={{
            background: "linear-gradient(#efebdc, #dedacb)",
            border: "1px solid #666",
            display: "inline-block"
          }}
        >
          {headshotImage && (
            <Image src={headshotImage} width={120} height={150} />
          )}
        </span>
        <h3>{data.author.name}</h3>
      </Link>
      <p>
        {data.position}
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  return (
    <section
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {data.map((item, i) => (
        <Testimonial
          key={item._id}
          data={item}
          encodeDataAttribute={encodeDataAttribute.scope([i])}
        />
      ))}
    </section>
  )
}
