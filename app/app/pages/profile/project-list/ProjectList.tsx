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
  customerClass,
  descriptionClass,
  industryClass,
  logoClass,
  metaClass,
  periodClass,
  projectClass,
  roleClass,
  rootClass,
  testimonialsClass,
  titleClass
} from "./ProjectList.css"

export interface ProjectListProps {
  readonly data: PROJECTS_QUERYResult
  readonly encodeDataAttribute: ReturnType<typeof useEncodeDataAttribute>
}

export function ProjectList({ data, encodeDataAttribute }: ProjectListProps) {
  return (
    <div className={rootClass}>
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
    <div className={projectClass}>
      <div className={roleClass}>{data.role}</div>

      <Neutral as="h2" className={titleClass}>
        {data.title}
      </Neutral>

      <img src={clientLogoUrl} alt={data.client.name} className={logoClass} />

      <div className={metaClass}>
        <p className={customerClass}>
          <Trans context="label">Customer:</Trans>
          <br />
          {data.client.name}
          <br />
          {data.client.city}, <CountryName code={data.client.country} />
        </p>
        <p
          className={industryClass}
          data-sanity={encodeDataAttribute("client.industry")}
        >
          <Trans context="label">Industry:</Trans>
          <br />
          <IndustryName code={data.client.industry} />
        </p>
        <p
          className={periodClass}
          data-sanity={encodeDataAttribute("contractStart")}
        >
          <Trans context="label">Period:</Trans>
          <br /> {formatPeriod(data.contractStart, data.contractEnd, language)}
        </p>
        {data.agent && (
          <p className={agentClass}>
            <Trans>Agent:</Trans>
            <img
              src={agentLogoUrl}
              alt={data.agent.name}
              className={agentImageClass}
            />
          </p>
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
      </div>

      <RichText className={descriptionClass}>{data.description}</RichText>

      <ul className={testimonialsClass}>
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
    </div>
  )
}
