import { ColorFilter } from "../../color-filter"
import {
  itemClass,
  listClass,
  logoClass,
  rootClass,
  titleClass
} from "./CustomersList.css"

export function CustomersList({
  data
}: {
  readonly data: Array<ProjectType["customer"]>
}) {
  return (
    <div className={rootClass}>
      <h1 className={titleClass}>Unsere Kunden</h1>
      <ColorFilter
        invert
        boost
        name="company-logo-mono"
        end="#ded9dd"
        start="#3F2B3D"
      />
      <ul className={listClass} style={{ filter: "url(#company-logo-mono)" }}>
        {data.map(
          (customer) =>
            customer.logo &&
            hasLogo(customer.logo) && (
              <li key={customer.name} className={itemClass}>
                <CompanyLogo
                  name={customer.logo}
                  alt={customer.name}
                  className={logoClass}
                />
              </li>
            )
        )}
      </ul>
    </div>
  )
}
