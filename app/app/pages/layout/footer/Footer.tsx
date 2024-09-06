import { Form, Link } from "@remix-run/react"

export function Footer() {
  return (
    <footer>
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
