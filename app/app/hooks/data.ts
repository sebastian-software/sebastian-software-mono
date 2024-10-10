import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { ContentSourceMap } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"

export interface SanityLoaderResult {
  query: string
  params: Record<string, unknown>
  initial: {
    sourceMap: ContentSourceMap | undefined
    data: unknown
  }
}

// Define a generic type T to represent the data returned by the loader
export function useSanityData<
  RouteLoader extends ({
    request
  }: LoaderFunctionArgs) => Promise<SanityLoaderResult>
>() {
  type InferredResultType = Awaited<ReturnType<RouteLoader>>

  const result = useLoaderData<RouteLoader>()

  type InferredInitial = InferredResultType["initial"]
  type InferredData = InferredInitial["data"]
  type InferredParams = InferredResultType["params"]

  const query = result.query
  const initial = result.initial as InferredInitial
  const params = result.params as InferredParams

  // Use the initial data with useQuery and handle the typing
  const { data, encodeDataAttribute } = useQuery<InferredData>(query, params, {
    initial
  })

  return {
    query,
    params,
    initial,
    data,
    encodeDataAttribute
  }
}
