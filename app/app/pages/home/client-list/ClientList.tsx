import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { ColorFilter } from "~/components"
import { ImageCarousel } from "~/components/image-carousel/ImageCarousel"
import { urlFor } from "~/sanity/image"

import { itemClass, listClass, logoClass } from "./ClientList.css"

export interface Customer {
  name?: string | null
  logo?: SanityImageSource | null
}

export interface ClientListProps {
  readonly data: Customer[]
}

export function ClientList({ data }: ClientListProps) {
  return (
    <>
      <ColorFilter
        invert
        boost
        name="company-logo-mono"
        end="#555555"
        start="#EEEEEE"
      />
      <ImageCarousel filter="url(#company-logo-mono)" className={listClass}>
        {data.map(
          (customer) =>
            customer.logo && (
              <li key={customer.name} className={itemClass}>
                <img
                  className={logoClass}
                  src={urlFor(customer.logo)?.url()}
                  alt={customer.name ?? ""}
                />
              </li>
            )
        )}
      </ImageCarousel>
    </>
  )
}
