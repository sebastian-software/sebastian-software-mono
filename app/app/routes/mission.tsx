import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { ContentSourceMap } from "@sanity/react-loader"
import { loadQuery } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"
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

// Define a generic type T to represent the data returned by the loader
export function useSanityData() {
  // Call useLoaderData to get the loader data and use generic T to infer its type
  const { initial, query, params } = useLoaderData<typeof loader>()

  // This is a fallback sourcemap to be used with useQuery which requires it, but
  // laodQuery only has it optionally.
  const sourceMap: ContentSourceMap = { mappings: {}, documents: [], paths: [] }

  // Use the initial data with useQuery and handle the typing
  const { data } = useQuery(query, params, {
    initial: { sourceMap, ...initial }
  })

  return { data, initial }
}

export default function Index() {
  const { data } = useSanityData()
  const orig = useLoaderData<typeof loader>()

  console.log("NEW:", data)
  console.log("ORIG:", orig.initial.data)

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
