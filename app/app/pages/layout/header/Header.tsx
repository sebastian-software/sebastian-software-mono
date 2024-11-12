import { Trans } from "@lingui/macro"

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
                <Trans>Mission</Trans>
              </a>
            </li>
            <li>
              <a href="/team" className={linkClass}>
                <Trans>Team</Trans>
              </a>
            </li>
            <li>
              <a href="/consulting" className={linkClass}>
                <Trans>Consulting</Trans>
              </a>
            </li>
            <li>
              <a href="/testimonials" className={linkClass}>
                <Trans>Testimonials</Trans>
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
