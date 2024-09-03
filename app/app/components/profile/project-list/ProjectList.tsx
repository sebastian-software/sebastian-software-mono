import { Trans } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import type { PROJECTS_QUERYResult } from "sanity.types"

import { CountryName, IndustryName } from "~/components/i18n"
import { urlFor } from "~/sanity/image"

import { Neutral } from "../../neutral"
import { RichText } from "../../richtext/RichText"
import { TestimonialBlock } from "../testimonial"
import {
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
  readonly data: unknown[]
  readonly encodeDataAttribute: EncodeDataAttributeCallback
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
}

export function Project({ data }: ProjectProps) {
  const { i18n } = useLingui()
  const customerLogoUrl = urlFor(data.customer.logo).url()
  const language = i18n.locale

  return (
    <div className={projectClass}>
      <Neutral as="h2" className={titleClass}>
        <span className={roleClass}>{data.role}</span>
        {data.title}
      </Neutral>

      <img
        src={customerLogoUrl}
        alt={data.customer.name}
        className={logoClass}
      />

      <div className={metaClass}>
        <p className={customerClass}>
          <Trans context="label">Customer:</Trans>
          <br />
          {data.customer.name}
          <br />
          {data.customer.city}, <CountryName code={data.customer.country} />
        </p>
        <p className={industryClass}>
          <Trans context="label">Industry:</Trans>
          <br />
          <IndustryName code={data.customer.industry} />
        </p>
        <p className={periodClass}>
          <Trans context="label">Period:</Trans>
          <br /> {formatPeriod(data.contractStart, data.contractEnd, language)}
        </p>
        {/* <p className={period}>
          <Trans>Auftraggeber:</Trans>
          <br /> {data.contractor}
        </p> */}
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
