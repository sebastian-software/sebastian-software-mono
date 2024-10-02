import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { loadQuery } from "@sanity/react-loader"
import { useQuery } from "@sanity/react-loader"

interface LoaderReturn {
  initial: {
    data: unknown
  }
  query: string
  params: Record<string, unknown>
}

export type AbstractRemixLoader = ({
  request
}: LoaderFunctionArgs) => Promise<LoaderReturn>

// Define a generic type T to represent the data returned by the loader
export function useSanityData<RemixLoader extends AbstractRemixLoader>() {
  // Call useLoaderData to get the loader data and use generic T to infer its type
  const result = useLoaderData<RemixLoader>()

  // Note: TypeScript is unable to corrcetly infer the type of the initial data when using destructuring
  type InferredInitialType = (typeof result)["initial"]
  type InferredDataType = InferredInitialType["data"]

  const initial: InferredInitialType = result.initial
  const query = result.query
  const params = result.params

  // Retrieve the initial data type from original loadQuery
  type LoadQueryInitial = Awaited<ReturnType<typeof loadQuery>>

  // Use the initial data with useQuery and handle the typing
  const { data } = useQuery<InferredDataType>(query, params, {
    initial: initial as LoadQueryInitial
  })

  return { data, query, params }
}
