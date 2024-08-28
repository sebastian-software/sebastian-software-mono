import { urlFor } from "~/sanity/image"

import { ColorFilter } from "../../color-filter"
import {
  itemClass,
  listClass,
  logoClass,
  rootClass,
  titleClass
} from "./CustomersList.css"

export interface Customer {
  name: string
  logo: string
}

export interface CustomersListProps {
  readonly data: Customer[]
}

export function CustomersList({ data }: CustomersListProps) {
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
        {data.map((customer) => (
          <li key={customer.name} className={itemClass}>
            <img
              className={logoClass}
              src={urlFor(customer.logo).url()}
              width={150}
              alt={customer.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
