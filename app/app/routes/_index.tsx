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
import { postProcessPage } from "~/utils/blockHandler"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "home"
  }

  const initial = await postProcessPage(
    await loadQuery<HOME_QUERYResult>(HOME_QUERY, params)
  )

  return {
    initial,
    query: HOME_QUERY,
    params
  }
}

export default function Index() {
  const { data } = useSanityData<typeof loader>()
  if (!data.page) {
    return null
  }

  return (
    <>
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
      <ClientList data={data.clients} />
    </>
  )
}
