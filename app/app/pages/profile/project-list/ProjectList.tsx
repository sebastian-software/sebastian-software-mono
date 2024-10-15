import { Trans } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import type {
  EncodeDataAttributeCallback,
  useEncodeDataAttribute
} from "@sanity/react-loader"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { CountryName, IndustryName } from "~/components/i18n"
import { Neutral } from "~/components/neutral"
import { RichText } from "~/components/richtext/RichText"
import { urlFor } from "~/sanity/image"

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

export interface ProjectListProps {
  readonly name: string
  readonly data: PROJECTS_QUERYResult
  readonly encodeDataAttribute: ReturnType<typeof useEncodeDataAttribute>
}

export function ProjectList({
  name,
  data,
  encodeDataAttribute
}: ProjectListProps) {
  const [firstName, lastName] = name.split(" ")
  return (
    <div className={rootClass}>
      <h1 className={consultantHeaderClass}>
        {firstName}{" "}
        <strong className={consultantHeaderStrongClass}>{lastName}</strong>
      </h1>
      {data.projects.map((project, i) => (
        <Project
          key={project._id}
          data={project}
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
  readonly data: PROJECTS_QUERYResult[number]
  readonly encodeDataAttribute: EncodeDataAttributeCallback
}

export function Project({ data, encodeDataAttribute }: ProjectProps) {
  const { i18n } = useLingui()
  const clientLogoUrl = urlFor(data.client.logo)?.url()
  const agentLogoUrl = data.agent?.logo
    ? urlFor(data.agent.logo)?.url()
    : undefined
  const language = i18n.locale

  return (
    <article className={projectClass}>
      <img
        className={gridLogoClass}
        src={clientLogoUrl}
        alt={data.client.name}
      />

      <Neutral as="h2" className={gridTitleClass}>
        {data.title}
      </Neutral>

      <div className={gridVerticalInfoClass}>
        <div className={gridVerticalInfoTextClass}>
          {formatProjectTime(data.contractStart, language)}
        </div>
      </div>

      <aside className={gridMetaClass}>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Role:</Trans>
        </h3>
        <p>{data.role}</p>

        <h3 className={metaHeaderClass}>
          <Trans context="label">Customer:</Trans>
        </h3>
        <p>
          {data.client.name}
          <br />
          {data.client.city}, <CountryName code={data.client.country} />
        </p>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Industry:</Trans>
        </h3>
        <p data-sanity={encodeDataAttribute("client.industry")}>
          <IndustryName code={data.client.industry} />
        </p>
        <h3 className={metaHeaderClass}>
          <Trans context="label">Period:</Trans>
        </h3>
        <p data-sanity={encodeDataAttribute("contractStart")}>
          {formatPeriod(data.contractStart, data.contractEnd, language)}
        </p>
        {data.agent && (
          <>
            <h3 className={metaHeaderClass}>
              <Trans>Agent:</Trans>
            </h3>
            <img
              src={agentLogoUrl}
              alt={data.agent.name}
              className={agentImageClass}
            />
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

      <RichText className={gridDescriptionClass}>{data.description}</RichText>

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
