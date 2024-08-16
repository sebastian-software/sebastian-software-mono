import { clsx } from "clsx"
import type { PropsWithChildren } from "react"

import { root } from "./RichText.css"

export interface RichTextProps extends PropsWithChildren {
  readonly className?: string
}

export function RichText({ children, className }: RichTextProps) {
  return <div className={clsx(root, className)}>{children}</div>
}
