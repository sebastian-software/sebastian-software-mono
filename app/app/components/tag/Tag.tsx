import { clsx } from "clsx"
import type { PropsWithChildren } from "react"

import { list, root } from "./Tag.css"

export interface TagListProps extends PropsWithChildren {
  readonly className?: string
}

export function TagList({ children, className }: TagListProps) {
  return <ul className={clsx(list, className)}>{children}</ul>
}

export function Tag({ children }: PropsWithChildren) {
  return <li className={root}>{children}</li>
}
