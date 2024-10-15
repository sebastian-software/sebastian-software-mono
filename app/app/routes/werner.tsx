import type { LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction } from "@remix-run/react"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { ProjectList } from "~/pages/profile"
import { PROJECTS_QUERY } from "~/queries/projects"
import { loadQuery } from "~/sanity/loader.server"
import { replaceFieldAtPathString } from "~/utils/dataUtil"
import { processPicture } from "~/utils/pictureHandler"

export const meta: MetaFunction = () => {
  return [{ title: "Sebastian Software GmbH" }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    name: "Sebastian Werner",
    language: await getAppLanguage(request)
  }

  const initial = await loadQuery<PROJECTS_QUERYResult>(PROJECTS_QUERY, params)

  const modifiedHeadshot = await processPicture(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    initial.data.consultant!.headshot
  )

  const modifiedInitial = replaceFieldAtPathString(
    initial,
    "data.consultant.headshot",
    modifiedHeadshot
  )

  return { initial: modifiedInitial, query: PROJECTS_QUERY, params }
}

export default function ProfileWerner() {
  const { data, params, encodeDataAttribute } = useSanityData<typeof loader>()
  const { consultant, projects } = data

  return (
    <section>
      {consultant && (
        <ProjectList
          name={params.name}
          consultant={consultant}
          projects={projects}
          encodeDataAttribute={encodeDataAttribute}
        />
      )}
    </section>
  )
}
