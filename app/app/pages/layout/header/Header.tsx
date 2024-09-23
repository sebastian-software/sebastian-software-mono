import { Spacer } from "~/components"

import { Container } from "../container"
import {
  containerClass,
  linkClass,
  listClass,
  logoClass,
  rootClass
} from "./Header.css"
import logoDark from "./logo-dark.svg"

export function Header() {
  return (
    <header className={rootClass}>
      <Container className={containerClass}>
        <a href="/">
          <img
            className={logoClass}
            src={logoDark}
            alt="Sebastian Software GmbH"
          />
        </a>
        <Spacer />
        <nav>
          <ul className={listClass}>
            <li>
              <a href="/mission" className={linkClass}>
                Mission
              </a>
            </li>
            <li>
              <a href="/team" className={linkClass}>
                Team
              </a>
            </li>
            <li>
              <a href="/consulting" className={linkClass}>
                Consulting
              </a>
            </li>
            <li>
              <a href="/testimonials" className={linkClass}>
                Testimonials
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
