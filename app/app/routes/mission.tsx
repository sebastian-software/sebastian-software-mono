/* eslint-disable @typescript-eslint/naming-convention */
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

interface LoaderReturn {
  initial: {
    data: unknown
  }
  query: string
  params: Record<string, string>
}

export type AbstractLoader = ({
  request
}: LoaderFunctionArgs) => Promise<LoaderReturn>

// Define a generic type T to represent the data returned by the loader
export function useSanityData<TLoader extends AbstractLoader>() {
  // Call useLoaderData to get the loader data and use generic T to infer its type
  const result = useLoaderData<TLoader>()

  // Note: TypeScript is unable to corrcetly infer the type of the initial data when using destructuring
  type InitialType = (typeof result)["initial"]
  type DataType = InitialType["data"]

  const initial: InitialType = result.initial
  const query = result.query
  const params = result.params

  type InitialQuery = Awaited<ReturnType<typeof loadQuery>>
  const initialCast = initial as InitialQuery

  // Use the initial data with useQuery and handle the typing
  const { data } = useQuery(query, params, {
    initial: initialCast
  })

  const dataCast = data as DataType
  return { data: dataCast, query, params }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()

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
