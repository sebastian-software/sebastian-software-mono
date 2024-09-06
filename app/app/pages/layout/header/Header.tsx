import logoDark from "./logo-dark.svg"

export function Header() {
  return (
    <header>
      <a href="/">
        <img src={logoDark} alt="Sebastian Software GmbH" />
      </a>
      <nav>
        <ul>
          <li>
            <a href="/mission">Mission</a>
          </li>
          <li>
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/consulting">Consulting</a>
          </li>
          <li>
            <a href="/testimonials">Testimonials</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
