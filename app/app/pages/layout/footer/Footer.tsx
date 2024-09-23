import { Form, Link } from "@remix-run/react"

import { Container } from "../container"
import { buttonClass, containerClass, rootClass } from "./Footer.css"

export function Footer() {
  return (
    <footer className={rootClass}>
      <Container className={containerClass}>
        <div>
          &copy; 2024 Sebastian Software GmbH |{" "}
          <Link to="/imprint">Impressum</Link>
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
        <span>Gemacht mit ♥ in Mainz und Heidelberg</span>
      </Container>
    </footer>
  )
}
