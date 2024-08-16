import { Link } from "@remix-run/react"
import type { PropsWithChildren } from "react"

import { root } from "./Button.css"

export interface ButtonProps extends PropsWithChildren {
  readonly to?: string
}

export function Button({ children, to }: ButtonProps) {
  if (to) {
    return (
      <Link to={to} className={root}>
        {children}
      </Link>
    )
  }

  return (
    <button className={root} type="button">
      {children}
    </button>
  )
}
