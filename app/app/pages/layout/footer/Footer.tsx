import { Trans } from "@lingui/macro"
import { Form, Link } from "@remix-run/react"

import { useHydrated } from "~/hooks/hydrated"

import { Container } from "../container"
import { buttonClass, containerClass, rootClass } from "./Footer.css"

function hasDomainLanguage() {
  const domain = location.host
  return (
    domain === "sebastian-software.de" || domain === "sebastian-software.com"
  )
}

export function DomainLanguageToggle() {
  const hydrated = useHydrated()
  const pathname = hydrated ? window.location.pathname : "/"
  return (
    <>
      <a
        href={`https://sebastian-software.de${pathname}`}
        className={buttonClass}
      >
        Deutsch
      </a>{" "}
      <a
        href={`https://sebastian-software.com${pathname}`}
        className={buttonClass}
      >
        English
      </a>
    </>
  )
}

export function LiveLanguageToggle() {
  return (
    <>
      <button type="submit" name="language" value="de" className={buttonClass}>
        Deutsch
      </button>{" "}
      <button type="submit" name="language" value="en" className={buttonClass}>
        English
      </button>
    </>
  )
}

export function Footer() {
  const hydrated = useHydrated()
  const toggleDomain = hydrated && !hasDomainLanguage()

  return (
    <footer className={rootClass}>
      <Container className={containerClass}>
        <div>
          &copy; 2024 Sebastian Software GmbH |{" "}
          <Link to="/imprint">
            <Trans>Imprint</Trans>
          </Link>{" "}
          |{" "}
          <Link to="/privacy-policy">
            <Trans>Privacy Protection</Trans>
          </Link>
        </div>
        <Form method="post">
          {toggleDomain ? <DomainLanguageToggle /> : <LiveLanguageToggle />}
        </Form>
        <Trans>Made with ♥ in Mainz and Heidelberg</Trans>
      </Container>
    </footer>
  )
}
