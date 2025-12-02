import { t } from "@lingui/macro"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction } from "@remix-run/react"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { useSanityData } from "~/hooks/data"
import { getAppLanguage } from "~/language.server"
import { type ProjectConsultantMeta, ProjectList } from "~/pages/profile"
import { PROJECTS_QUERY } from "~/queries/projects"
import { loadQuery } from "~/sanity/loader.server"
import { replaceFieldAtPathString } from "~/utils/dataUtil"
import { processPicture } from "~/utils/pictureHandler"

export const meta: MetaFunction = () => {
  return [
    {
      title: t`Profile of Sebastian Fastner - Sebastian Software GmbH`
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    name: "Sebastian Fastner",
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

export default function ProfileFastner() {
  const { data, params, encodeDataAttribute } = useSanityData<typeof loader>()
  const { consultant, projects } = data

  const meta: ProjectConsultantMeta = {
    location: "Mainz",
    email: "s.fastner@sebastian-software.de",
    mobile: "+49 176 32042696"
  }

  return (
    <section>
      {consultant && (
        <ProjectList
          name={params.name}
          consultant={consultant}
          meta={meta}
          projects={projects}
          encodeDataAttribute={encodeDataAttribute}
        />
      )}
    </section>
  )
}
