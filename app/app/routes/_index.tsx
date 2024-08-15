import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <section>
      <ul>
        <li>
          <Link to="/testimonials">Testimonials</Link>
        </li>
        <li>
          <Link to="/werner">Werner</Link>
        </li>
        <li>
          <Link to="/fastner">Fastner</Link>
        </li>
      </ul>
    </section>
  )
}
