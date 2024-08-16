import {
  logo,
  logoLink,
  navigation,
  navigationItem,
  navigationList,
  root,
  spacer,
} from './Header.css'
import logoDark from './logo-dark.svg'

export function Header() {
  return (
    <header className={root}>
      <a href="/" className={logoLink}>
        <img className={logo} src={logoDark} alt="Sebastian Software GmbH" />
      </a>
      <div className={spacer} />
      <nav className={navigation}>
        <ul className={navigationList}>
          {/* <li>
            <a className={navigationItem} href="/blog">
              Blog
            </a>
          </li> */}
          <li>
            <a className={navigationItem} href="/mission">
              Mission
            </a>
          </li>
          <li>
            <a className={navigationItem} href="/team">
              Team
            </a>
          </li>
          <li>
            <a className={navigationItem} href="/consulting">
              Consulting
            </a>
          </li>
          <li>
            <a className={navigationItem} href="/testimonials">
              Testimonials
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
