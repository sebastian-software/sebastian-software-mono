import { clsx } from "clsx"
import type { ElementType, PropsWithChildren } from "react"

import { inner as innerClass, root as rootClass } from "./Neutral.css"

export interface NeutralProps extends PropsWithChildren {
  readonly as?: ElementType
  readonly role?: string
  readonly className?: string
}

export function Neutral({
  as = "div",
  role,
  children,
  className
}: NeutralProps) {
  const Root = as
  return (
    <Root className={clsx(rootClass, className)} role={role}>
      <div className={innerClass}>{children}</div>
    </Root>
  )
}
