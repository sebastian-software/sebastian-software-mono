import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { loadQuery } from "@sanity/react-loader"
import type { HOME_QUERYResult } from "sanity.types"

import { RichText } from "~/components/richtext/RichText"
import { SanityPortableImage } from "~/components/sanity-image"
import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { ClientList } from "~/pages/home"
import { HOME_QUERY } from "~/queries/home"
import { postProcessData } from "~/utils/blockProcessor"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "home"
  }

  const initial = await loadQuery<HOME_QUERYResult>(HOME_QUERY, params)
  const data = await postProcessData(initial.data)

  return {
    initial: {
      ...initial,
      data
    },
    query: HOME_QUERY,
    params
  }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()
  if (!data.page) {
    return null
  }

  // console.log("CLIENT DATA:", JSON.stringify(data, null, 2))

  // for (const block of data.page.content) {
  //   if (isSlicedPictureBlock(block)) {
  //     console.log("CLIENT RECT ORIG:", block.rect)
  //   }
  // }

  return (
    <>
      <RichText>
        <h1>{data.page.title}</h1>
        <h1>{data.page.title}</h1>

        <PortableText
          value={data.page.content}
          components={{
            types: {
              "sliced-picture": SanityPortableImage
            }
          }}
        />
      </RichText>
      <ClientList data={data.clients} />
    </>
  )
}
