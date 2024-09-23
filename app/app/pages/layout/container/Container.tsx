import clsx from "clsx"
import type { PropsWithChildren } from "react"

import { rootClass } from "./Container.css"

export interface ContainerProps extends PropsWithChildren {
  readonly className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx(rootClass, className)}>{children}</div>
}
