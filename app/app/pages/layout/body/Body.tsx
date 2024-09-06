import { clsx } from "clsx"
import type { PropsWithChildren } from "react"

import { themeClass } from "~/theme.css"

import { root } from "./Body.css"

export function Body({ children }: PropsWithChildren) {
  return <body className={clsx(themeClass, root)}>{children}</body>
}
