import type { PropsWithChildren } from "react"

import { root } from "./Main.css"

export function Main({ children }: PropsWithChildren) {
  return <main className={root}>{children}</main>
}
