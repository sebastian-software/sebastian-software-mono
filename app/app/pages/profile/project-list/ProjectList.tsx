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

import { TestimonialBlock } from "../testimonial"
import {
  agentClass,
  agentImageClass,
  consultantHeaderClass,
  consultantHeaderStrongClass,
  customerClass,
  gridDescriptionClass,
  gridLogoClass,
  gridMetaClass,
  gridRoleClass,
  gridTestimonialsClass,
  gridTitleClass,
  industryClass,
  periodClass,
  projectClass,
  rootClass
} from "./ProjectList.css"

export interface ProjectListProps {
  readonly data: PROJECTS_QUERYResult
  readonly encodeDataAttribute: ReturnType<typeof useEncodeDataAttribute>
}

export function ProjectList({ data, encodeDataAttribute }: ProjectListProps) {
  return (
    <div className={rootClass}>
      <h1 className={consultantHeaderClass}>
        Sebastian{" "}
        <strong className={consultantHeaderStrongClass}>Werner</strong>
      </h1>
      {data.map((project, i) => (
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

      <div className={gridRoleClass}>{data.role}</div>

      <aside className={gridMetaClass}>
        <h3>
          <Trans context="label">Customer:</Trans>
        </h3>
        <p className={customerClass}>
          {data.client.name}
          <br />
          {data.client.city}, <CountryName code={data.client.country} />
        </p>

        <h3>
          <Trans context="label">Industry:</Trans>
        </h3>
        <p
          className={industryClass}
          data-sanity={encodeDataAttribute("client.industry")}
        >
          <IndustryName code={data.client.industry} />
        </p>

        <h3>
          <Trans context="label">Period:</Trans>
        </h3>
        <p
          className={periodClass}
          data-sanity={encodeDataAttribute("contractStart")}
        >
          {formatPeriod(data.contractStart, data.contractEnd, language)}
        </p>

        {data.agent && (
          <>
            <h3>
              <Trans>Agent:</Trans>
            </h3>
            <p className={agentClass}>
              <img
                src={agentLogoUrl}
                alt={data.agent.name}
                className={agentImageClass}
              />
            </p>
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

      <ul className={gridTestimonialsClass}>
        {data.testimonials?.map((entry) => (
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
    </article>
  )
}
