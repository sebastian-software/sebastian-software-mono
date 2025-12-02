import { Trans } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import type {
  EncodeDataAttributeCallback,
  useEncodeDataAttribute
} from "@sanity/react-loader"
import { Globe, Mail, MapPin } from 'lucide-react';

import type { SupportedCountry, SupportedIndustry } from "~/components/i18n"
import { CountryName, IndustryName } from "~/components/i18n"
import { LanguageName } from "~/components/i18n/LanguageName";
import { LocationName } from "~/components/i18n/LocationName";
import { Neutral } from "~/components/neutral"
import { RichText } from "~/components/richtext/RichText"
import { SanityPortableImage } from "~/components/sanity-image"
import type { SlicedPictureBlock } from "~/utils/pictureHandler"

import {
  consultantHeaderClass,
  consultantHeaderStrongClass,
  gridDescriptionClass,
  gridLogoClass,
  gridMetaClass,
  gridTitleClass,
  gridVerticalInfoClass,
  gridVerticalInfoTextClass,
  metaHeaderClass,
  metaInformationContent,
  metaInformationLine,
  metaInformationLink,
  projectClass,
  rootClass
} from "./ProjectList.css"

export interface ProjectConsultant {
  name: string
  headshot: SlicedPictureBlock
}

export interface ProjectConsultantMeta {
  location: string
  email: string
  mobile: string
}

export type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null
}

export interface ProjectData {
  _id: string

  // Translated fields (might null because of filtering query)
  title: string | null
  description: string | null
  role: string | null

  client: {
    name: string
    city: string
    country: SupportedCountry
    industry: SupportedIndustry
    logo: PartialNullable<{
      url: string
      width: number
      height: number
    }>
  }
  agent?: {
    name: string
  } | null
  contractStart: string
  contractEnd: string
}

export interface ProjectListProps {
  readonly name: string
  readonly consultant: ProjectConsultant
  readonly meta: ProjectConsultantMeta
  readonly projects: ProjectData[]
  readonly encodeDataAttribute: ReturnType<typeof useEncodeDataAttribute>
}

export function ProjectList({
  name,
  consultant,
  meta,
  projects,
  encodeDataAttribute
}: ProjectListProps) {
  const [firstName, lastName] = name.split(" ")
  return (
    <div className={rootClass}>
      <SanityPortableImage value={consultant.headshot} />
      <h1 className={consultantHeaderClass}>
        {firstName}{" "}
        <strong className={consultantHeaderStrongClass}>{lastName}</strong>
      </h1>
      <MetaInformation meta={meta} />
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

/*
function trimPhoneNumber(phoneNumber: string) {
  // eslint-disable-next-line unicorn/prefer-string-replace-all
  return phoneNumber.replace(/\s/g, "")
}
*/

export interface MetaInformationProps {
  readonly meta: ProjectConsultantMeta
}
function MetaInformation({ meta }: MetaInformationProps) {
  const iconSize = 24;

  return (
    <article className={projectClass}>
      <div className={gridVerticalInfoClass}>
        <div className={gridVerticalInfoTextClass}>
          Kontakt
        </div>
      </div>

      <div className={metaInformationContent}>
        <div className={metaInformationLine}><MapPin size={iconSize} /> <LocationName city={meta.location} /></div>
        <div className={metaInformationLine}><Mail size={iconSize} /> <a className={metaInformationLink} href={"mailto:" + meta.email}>{meta.email}</a></div>
        { /* <div className={metaInformationLine}><Headset size={iconSize} /> <a className={metaInformationLink} href={"tel:" + trimPhoneNumber(meta.mobile)}>{meta.mobile}</a></div> */}
        <div className={metaInformationLine}><Globe size={iconSize} /> <LanguageName code="de" />, <LanguageName code="en" /></div>
      </div>
    </article>
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

  return (
    <article className={projectClass}>
      {clientLogo.url && (
        <img
          className={gridLogoClass}
          src={clientLogo.url}
          alt={project.client.name}
          width={clientLogo.width ?? ""}
          height={clientLogo.height ?? ""}
        />
      )}

      <Neutral as="h2" className={gridTitleClass}>
        {project.title}
      </Neutral>

      <div className={gridVerticalInfoClass}>
        <div className={gridVerticalInfoTextClass}>
          {formatProjectTime(project.contractStart, language)}
          &#160;&#160;|&#160;&#160;
          <IndustryName code={project.client.industry} />
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
            <p>{project.agent.name}</p>
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
