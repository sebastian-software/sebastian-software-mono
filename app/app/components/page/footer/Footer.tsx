import { Form, Link } from "@remix-run/react"

import { Spacer } from "../../spacer/Spacer"
import { root } from "./Footer.css"

export function Footer() {
  return (
    <footer className={root}>
      <span>
        &copy; 2024 Sebastian Software GmbH |{" "}
        <Link to="/imprint">Impressum</Link>
      </span>
      <Spacer />
      <Form method="post">
        <button type="submit" name="language" value="de">
          Deutsch
        </button>{" "}
        |{" "}
        <button type="submit" name="language" value="en">
          English
        </button>
      </Form>
      <Spacer />
      <span>Gemacht mit ♥ in Mainz und Heidelberg</span>
    </footer>
  )
}
