import { Trans } from "@lingui/macro"
import { Form, Link } from "@remix-run/react"

import { Container } from "../container"
import { buttonClass, containerClass, rootClass } from "./Footer.css"

export function Footer() {
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
          <button
            type="submit"
            name="language"
            value="de"
            className={buttonClass}
          >
            Deutsch
          </button>
          <button
            type="submit"
            name="language"
            value="en"
            className={buttonClass}
          >
            English
          </button>
        </Form>
        <Trans>Made with ♥ in Mainz and Heidelberg</Trans>
      </Container>
    </footer>
  )
}
