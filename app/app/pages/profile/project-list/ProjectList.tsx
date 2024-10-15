import { Trans } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import type {
  EncodeDataAttributeCallback,
  useEncodeDataAttribute
} from "@sanity/react-loader"

import type { SupportedCountry, SupportedIndustry } from "~/components/i18n"
import { CountryName, IndustryName } from "~/components/i18n"
import { Neutral } from "~/components/neutral"
import { RichText } from "~/components/richtext/RichText"
import { SanityPortableImage } from "~/components/sanity-image"
import type { SlicedPictureBlock } from "~/utils/pictureHandler"

import {
  agentImageClass,
  consultantHeaderClass,
  consultantHeaderStrongClass,
  gridDescriptionClass,
  gridLogoClass,
  gridMetaClass,
  gridTitleClass,
  gridVerticalInfoClass,
  gridVerticalInfoTextClass,
  metaHeaderClass,
  projectClass,
  rootClass
} from "./ProjectList.css"

export interface ProjectConsultant {
  name: string
  headshot: SlicedPictureBlock
}

export interface ProjectData {
  _id: string
  title: string
  role: string
  client: {
    name: string
    city: string
    country: SupportedCountry
    industry: SupportedIndustry
    logo: {
      url: string
      width: number
      height: number
    }
  }
  agent?: {
    name: string
    logo: {
      url: string
      width: number
      height: number
    }
  }
  contractStart: string
  contractEnd: string
  description: string
}

export interface ProjectListProps {
  readonly name: string
  readonly consultant: ProjectConsultant
  readonly projects: ProjectData[]
  readonly encodeDataAttribute: ReturnType<typeof useEncodeDataAttribute>
}

export function ProjectList({
  name,
  consultant,
  projects,
  encodeDataAttribute
}: ProjectListProps) {
  const [firstName, lastName] = name.split(" ")
  return (
    <div className={rootClass}>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <SanityPortableImage value={consultant.headshot} />
      <h1 className={consultantHeaderClass}>
        {firstName}{" "}
        <strong className={consultantHeaderStrongClass}>{lastName}</strong>
      </h1>
      {projects.map((project, i) => (
        <Project
          key={project._id}
          project={project}
          encodeDataAttribute={encodeDataAttribute.scope([i])}
        />
      ))}
    </div>
  )
}

export function formatPeriod(start: string, end: string, language: string) {
  const startDate = new Date(start).toLocaleDateString(language, {
    year: "numeric",
    month: "2-digit"
  })
  const endDate = new Date(end).toLocaleDateString(language, {
    year: "numeric",
    month: "2-digit"
  })

  return `${startDate} - ${endDate}`
}

export function formatProjectTime(moment: string, language: string) {
  const formatted = new Date(moment).toLocaleDateString(language, {
    year: "numeric",
    month: "long"
  })

  return formatted
}

export interface ProjectProps {
  readonly project: ProjectData
  readonly encodeDataAttribute: EncodeDataAttributeCallback
}

export function Project({ project, encodeDataAttribute }: ProjectProps) {
  const { i18n } = useLingui()
  const language = i18n.locale

  const clientLogo = project.client.logo
  const agentLogo = project.agent?.logo

  return (
    <article className={projectClass}>
      {clientLogo.url && (
        <img
          className={gridLogoClass}
          src={clientLogo.url}
          alt={project.client.name}
          width={clientLogo.width}
          height={clientLogo.height}
        />
      )}

      <Neutral as="h2" className={gridTitleClass}>
        {project.title}
      </Neutral>

      <div className={gridVerticalInfoClass}>
        <div className={gridVerticalInfoTextClass}>
          {formatProjectTime(project.contractStart, language)}
        </div>
      </div>

      <aside className={gridMetaClass}>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Role:</Trans>
        </h3>
        <p>{project.role}</p>

        <h3 className={metaHeaderClass}>
          <Trans context="label">Customer:</Trans>
        </h3>
        <p>
          {project.client.name}
          <br />
          {project.client.city}, <CountryName code={project.client.country} />
        </p>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Industry:</Trans>
        </h3>
        <p data-sanity={encodeDataAttribute("client.industry")}>
          <IndustryName code={project.client.industry} />
        </p>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Period:</Trans>
        </h3>
        <p data-sanity={encodeDataAttribute("contractStart")}>
          {formatPeriod(project.contractStart, project.contractEnd, language)}
        </p>
        {project.agent && (
          <>
            <h3 className={metaHeaderClass}>
              <Trans>Agent:</Trans>
            </h3>
            {agentLogo?.url && (
              <img
                src={agentLogo.url}
                alt={project.agent.name}
                className={agentImageClass}
                width={agentLogo.width}
                height={agentLogo.height}
              />
            )}
          </>
        )}
        {/* {data.technologies && (
          <Neutral>
            <TagList className={technologiesClass}>
              {data.technologies.map((text) => (
                <Tag key={text}>{text}</Tag>
              ))}
            </TagList>
          </Neutral>
        )} */}
      </aside>

      <RichText className={gridDescriptionClass}>
        {project.description}
      </RichText>

      {/* {data.testimonials?.length && (
        <ul className={gridTestimonialsClass}>
          {data.testimonials.map((entry) => (
            <TestimonialBlock
              key={entry._id}
              headshot={entry.author.headshot}
              author={entry.author.name}
              position={entry.position}
              company={entry.company?.name}
              text={entry.quote}
            />
          ))}
        </ul>
      )} */}
    </article>
  )
}
