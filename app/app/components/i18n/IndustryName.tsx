import { msg } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import { stegaClean } from "@sanity/client/stega"

const industries = {
  Aerospace: msg`Aerospace & Defense`,
  Automobiles: msg`Automobiles and Components`,
  CapitalGoods: msg`Capital Goods`,
  Chemicals: msg`Chemicals`,
  Consumer: msg`Consumer Discretionary`,
  Construction: msg`Construction & Engineering`,
  Education: msg`Education`,
  Energy: msg`Energy`,
  Financials: msg`Financials`,
  Food: msg`Food, Beverage & Tobacco`,
  Healthcare: msg`Healthcare`,
  Hardware: msg`Hardware & Equipment`,
  Household: msg`Household & Personal Products`,
  Hotels: msg`Hotels, Restaurants & Leisure`,
  Industrials: msg`Industrials`,
  Insurance: msg`Insurance`,
  IT: msg`Information Technology`,
  Materials: msg`Materials`,
  Media: msg`Media and Entertainment`,
  Metals: msg`Metals & Mining`,
  Pharma: msg`Pharmaceuticals and Biotechnology`,
  RealEstate: msg`Real Estate`,
  Retail: msg`Retail`,
  Semiconductors: msg`Semiconductors`,
  Software: msg`Software & Services`,
  Staples: msg`Consumer Staples`,
  Telecom: msg`Telecommunication Services`,
  Textiles: msg`Textiles, Apparel & Luxury Goods`,
  Transportation: msg`Transportation`,
  Utilities: msg`Utilities`,
  Recruitement: msg`Recruitment`
}

export function IndustryName({
  code
}: {
  readonly code: keyof typeof industries
}) {
  const { i18n } = useLingui()
  return i18n._(industries[stegaClean(code)])
}
