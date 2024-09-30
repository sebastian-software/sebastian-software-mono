import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { loadQuery, useQuery } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

import { RichText } from "~/components/richtext/RichText"
import { SanityPortableImage } from "~/components/sanity-image"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { postProcessData } from "~/utils/blockHandler"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const language = await getAppLanguage(request)
  const params = { language, id: "mission" }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)
  const modified = await postProcessData(initial)

  return { initial: modified, query: PAGES_QUERY, params }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  return (
    <RichText>
      <h1>{data[0].title}</h1>

      <PortableText
        value={data[0].content}
        components={{
          types: {
            picture: SanityPortableImage
          }
        }}
      />
    </RichText>
  )
}
