import { Form, Link } from "@remix-run/react"

import { rootClass } from "./Footer.css"

export function Footer() {
  return (
    <footer className={rootClass}>
      &copy; 2024 Sebastian Software GmbH | <Link to="/imprint">Impressum</Link>
      <Form method="post">
        <button type="submit" name="language" value="de">
          Deutsch
        </button>
        <button type="submit" name="language" value="en">
          English
        </button>
      </Form>
      <span>Gemacht mit ♥ in Mainz und Heidelberg</span>
    </footer>
  )
}
