import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { ColorFilter } from "~/components"
import { urlFor } from "~/sanity/image"

import {
  itemClass,
  listClass,
  logoClass,
  rootClass,
  titleClass
} from "./ClientList.css"

export interface Customer {
  name?: string | null
  logo?: SanityImageSource | null
}

export interface ClientListProps {
  readonly data: Customer[]
}

export function ClientList({ data }: ClientListProps) {
  return (
    <div className={rootClass}>
      <h1 className={titleClass}>Unsere Kunden</h1>
      <ColorFilter
        invert
        boost
        name="company-logo-mono"
        end="#333333"
        start="#FFFFFF"
      />

      <ul className={listClass} style={{ filter: "url(#company-logo-mono)" }}>
        {data.map(
          (customer) =>
            customer.logo && (
              <li key={customer.name} className={itemClass}>
                <img
                  className={logoClass}
                  src={urlFor(customer.logo)?.url()}
                  width={150}
                  alt={customer.name ?? ""}
                />
              </li>
            )
        )}
      </ul>
    </div>
  )
}
