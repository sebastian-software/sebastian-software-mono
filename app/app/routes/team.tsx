import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { loadQuery, useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"

import { RichText } from "~/components/richtext/RichText"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "team"
  }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)
  return { initial, query: PAGES_QUERY, params }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery<PAGES_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  console.log("DATA:", data)

  return (
    <RichText>
      <h1>{data[0].title}</h1>

      <PortableText
        value={data[0].content}
        components={{
          types: {
            picture({ value }) {
              return (
                <Image
                  src={value.imageUrl}
                  alt={value.alt}
                  width={200}
                  aspectRatio={4 / 5}
                />
              )
            }
          }
        }}
      />
    </RichText>
  )
}
