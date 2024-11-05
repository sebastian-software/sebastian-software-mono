import { t } from "@lingui/macro"
import type { MetaFunction } from "@remix-run/node"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"
import type { TESTIMONIAL_QUERYResult } from "sanity.types"

import { getAppLanguage } from "~/language.server"
import { TESTIMONIAL_QUERY } from "~/queries/testimonials"
import { urlFor } from "~/sanity/image"
import { loadQuery } from "~/sanity/loader.server"
import { formatDate } from "~/utils/formatDate"
import { extractFirstUuidSegment } from "~/utils/urlHelper"

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const shortId = extractFirstUuidSegment(params.slug)
  const queryParams = {
    language: await getAppLanguage(request),
    shortId
  }

  const initial = await loadQuery<TESTIMONIAL_QUERYResult>(
    TESTIMONIAL_QUERY,
    queryParams
  )
  return { initial, query: TESTIMONIAL_QUERY, params: queryParams }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const author = data?.initial.data?.author.name
  return [
    {
      title: t`Testmonial of ${author} - Sebastian Software GmbH`
    }
  ]
}

export default function TestimonialRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, encodeDataAttribute } = useQuery<typeof initial.data>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  if (!data) {
    return null
  }

  const headshotImage = urlFor(data.author.headshot)?.url()

  return (
    <section data-sanity={encodeDataAttribute("slug")}>
      <div style={{ background: "grey" }}>
        {headshotImage && (
          <Image
            data-sanity={encodeDataAttribute("author.headshot")}
            src={headshotImage}
            width={120}
            height={150}
          />
        )}
      </div>
      <p data-sanity={encodeDataAttribute("date")}>{formatDate(data.date)}</p>
      <p style={{ whiteSpace: "pre-line" }}>{data.quote}</p>
      <p>
        {data.position}
        <br />
        {data.company?.name}
      </p>
    </section>
  )
}
