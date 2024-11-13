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
  const isGerman = hydrated && window.location.host === "sebastian-software.de"

  return (
    <>
      {!isGerman && (
        <a
          href={`https://sebastian-software.de${pathname}`}
          className={buttonClass}
        >
          Deutsch
        </a>
      )}
      {isGerman && (
        <a
          href={`https://sebastian-software.com${pathname}`}
          className={buttonClass}
        >
          English
        </a>
      )}
    </>
  )
}

export function LiveLanguageToggle() {
  return (
    <>
      <button type="submit" name="lang" value="de" className={buttonClass}>
        Deutsch
      </button>{" "}
      <button type="submit" name="lang" value="en" className={buttonClass}>
        English
      </button>
    </>
  )
}

export function LiveEditToggle() {
  return (
    <>
      <button type="submit" name="edit" value="on" className={buttonClass}>
        <Trans>Editmode</Trans>
      </button>{" "}
      <button type="submit" name="edit" value="off" className={buttonClass}>
        <Trans>Disable Editmode</Trans>
      </button>
    </>
  )
}

export function Footer() {
  const hydrated = useHydrated()
  const toggleDomain = hydrated && hasDomainLanguage()

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
          <LiveEditToggle />
        </Form>
        <Trans>Made with ♥ in Mainz and Heidelberg</Trans>
      </Container>
    </footer>
  )
}
