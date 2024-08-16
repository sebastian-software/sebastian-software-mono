import { PortableText } from "@portabletext/react"

import { Tag, TagList } from "~/components/tag/Tag"
import { urlFor } from "~/sanity/image"

import { Neutral } from "../../neutral"
import { RichText } from "../../richtext/RichText"
import { TestimonialBlock } from "../testimonial"
import {
  customer,
  description,
  logo,
  meta,
  period,
  project,
  role,
  root,
  technologies,
  testimonials,
  title
} from "./ProjectList.css"
import { EncodeDataAttributeCallback } from "@sanity/react-loader"
import { PROJECTS_QUERYResult } from "sanity.types"

export interface ProjectListProps {
  readonly data: unknown[]
  encodeDataAttribute: EncodeDataAttributeCallback
}

export function ProjectList({ data, encodeDataAttribute }: ProjectListProps) {
  return (
    <div className={root}>
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

const DEFAULT_LOCALE = "de-DE"

export function formatPeriod(start: string, end: string) {
  const startDate = new Date(start).toLocaleDateString(DEFAULT_LOCALE, {
    year: "numeric",
    month: "numeric"
  })
  const endDate = new Date(end).toLocaleDateString(DEFAULT_LOCALE, {
    year: "numeric",
    month: "numeric"
  })

  return `${startDate} - ${endDate}`
}

export interface ProjectProps {
  readonly data: PROJECTS_QUERYResult[number]
}

export function Project({ data }: ProjectProps) {
  const customerLogoUrl = urlFor(data.customer?.logo).url()

  return (
    <div className={project}>
      <Neutral as="h2" className={title}>
        <span className={role}>{data.role}</span>
        {data.title}
      </Neutral>

      <img src={customerLogoUrl} alt={data.customer?.name} className={logo} />

      <div className={meta}>
        <p className={customer}>
          Kunde:
          <br />
          {data.customer?.name}
          <br />
          {data.customer?.location}
          <br />
          {data.customer?.industry}
        </p>
        <p className={period}>
          Zeitraum:
          <br /> {formatPeriod(data.contractStart, data.contractEnd)}
        </p>
        {/* <p className={period}>
          Auftraggeber:
          <br /> {data.contractor}
        </p> */}

        {data.technologies && (
          <Neutral>
            <TagList className={technologies}>
              {data.technologies.map((text) => (
                <Tag key={text}>{text}</Tag>
              ))}
            </TagList>
          </Neutral>
        )}
      </div>

      <RichText className={description}>
        <PortableText value={data.description} />
      </RichText>

      <ul className={testimonials}>
        {data.testimonials?.map((entry) => (
          <TestimonialBlock
            key={entry._id}
            author={entry.author.name}
            position={entry.position}
            company={entry.company.name}
            text={entry.quote}
          />
        ))}
      </ul>
    </div>
  )
}
