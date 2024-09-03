import { msg, Trans } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import { stegaClean } from "@sanity/client/stega"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"
import type { PROJECTS_QUERYResult } from "sanity.types"

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

const countries = {
  de: msg`Germany`,
  ch: msg`Switzerland`,
  at: msg`Austria`,
  lu: msg`Luxembourg`,
  fr: msg`France`,
  nl: msg`Netherlands`,
  be: msg`Belgium`,
  us: msg`United States`,
  cn: msg`China`,
  ca: msg`Canada`
}

console.log("Countries", countries)

const industries: Record<string, Record<string, string>> = {
  de: {
    IT: "Informationstechnologie",
    Consumer: "Nicht-Basiskonsumgüter",
    Staples: "Basiskonsumgüter",
    Healthcare: "Gesundheitswesen",
    Financials: "Finanzdienstleistungen",
    Industrials: "Industrie",
    Energy: "Energie",
    Materials: "Materialien",
    Utilities: "Versorgungsunternehmen",
    RealEstate: "Immobilien",
    Telecom: "Telekommunikation",
    Media: "Medien und Unterhaltung",
    Retail: "Einzelhandel",
    Transportation: "Transport",
    Automobiles: "Automobile und Komponenten",
    Pharma: "Pharmazeutika und Biotechnologie",
    Insurance: "Versicherungen",
    CapitalGoods: "Investitionsgüter",
    Food: "Lebensmittel, Getränke & Tabak",
    Chemicals: "Chemikalien",
    Software: "Software & Dienstleistungen",
    Hardware: "Hardware & Ausrüstung",
    Semiconductors: "Halbleiter",
    Hotels: "Hotels, Restaurants & Freizeit",
    Textiles: "Textilien, Bekleidung & Luxusgüter",
    Household: "Haushalts- & Körperpflegeprodukte",
    Construction: "Bau & Ingenieurwesen",
    Aerospace: "Luft- und Raumfahrt & Verteidigung",
    Metals: "Metalle & Bergbau",
    Education: "Bildung"
  },
  en: {
    IT: "Information Technology",
    Consumer: "Consumer Discretionary",
    Staples: "Consumer Staples",
    Healthcare: "Healthcare",
    Financials: "Financials",
    Industrials: "Industrials",
    Energy: "Energy",
    Materials: "Materials",
    Utilities: "Utilities",
    RealEstate: "Real Estate",
    Telecom: "Telecommunication Services",
    Media: "Media and Entertainment",
    Retail: "Retail",
    Transportation: "Transportation",
    Automobiles: "Automobiles and Components",
    Pharma: "Pharmaceuticals and Biotechnology",
    Insurance: "Insurance",
    CapitalGoods: "Capital Goods",
    Food: "Food, Beverage & Tobacco",
    Chemicals: "Chemicals",
    Software: "Software & Services",
    Hardware: "Hardware & Equipment",
    Semiconductors: "Semiconductors",
    Hotels: "Hotels, Restaurants & Leisure",
    Textiles: "Textiles, Apparel & Luxury Goods",
    Household: "Household & Personal Products",
    Construction: "Construction & Engineering",
    Aerospace: "Aerospace & Defense",
    Metals: "Metals & Mining",
    Education: "Education"
  }
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
          <Trans>Customer:</Trans>
          <br />
          {data.customer.name}
          <br />
          {data.customer.city},{" "}
          {i18n._(countries[stegaClean(data.customer.country)])}
        </p>
        <p className={industryClass}>
          <Trans>Industry:</Trans>
          <br /> {industries[language][stegaClean(data.customer.industry)]}
        </p>
        <p className={periodClass}>
          <Trans>Period:</Trans>
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
