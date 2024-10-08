import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { loadQuery } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

import { RichText } from "~/components/richtext/RichText"
import { SanityPortableImage } from "~/components/sanity-image"
import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { postProcessPage } from "~/utils/blockProcessor"
import { processPictureBlock } from "~/utils/pictureHandler"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "imprint"
  }

  const initial = await postProcessPage(
    await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params),
    {
      picture: processPictureBlock
    }
  )

  return {
    initial,
    query: PAGES_QUERY,
    params
  }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()
  if (!data.page) {
    return null
  }

  return (
    <RichText>
      <h1>{data.page.title}</h1>

      <PortableText
        value={data.page.content}
        components={{
          types: {
            picture: SanityPortableImage
          }
        }}
      />
    </RichText>
  )
}
