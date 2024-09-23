import type { PropsWithChildren } from "react"

import { Container } from "../container"
import { root } from "./Main.css"

export function Main({ children }: PropsWithChildren) {
  return (
    <main className={root}>
      <Container>{children}</Container>
    </main>
  )
}
