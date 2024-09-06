import { Outlet } from "@remix-run/react"

import { Footer } from "../footer"
import { Header } from "../header"
import { Main } from "../main"

export function Root() {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  )
}
