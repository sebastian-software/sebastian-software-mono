import { Link } from "@remix-run/react"

import { RichText } from "~/components/richtext/RichText"

export default function Index() {
  return (
    <RichText>
      <h1>Das Team</h1>

      <h2>Sebastian Fastner</h2>
      <p>
        Ausgezeichnetes Informatik-Studium als Basis. Klassische und moderne
        Web-Technologie fest im Griff. Kommandozeilen-Fan mit Fokus auf
        Sicherheit und Cloud-Lösungen. Vereint Moderne und Stabilität.
      </p>
      <ul>
        <li>
          <Link to="/fastner">Profil</Link>
        </li>
        <li>Standort: Mainz</li>
      </ul>

      <h2>Sebastian Werner</h2>
      <p>
        20 Jahre Webtechnologie-Erfahrung. Klares Design und clevere Interfaces
        im Blut. Visionär, Erfinder und Weltverbesserer. Autodidakt, Kritiker
        und Mentor. Experte für UI-Frameworks. Leidenschaft für Automation,
        Typografie und UX. Qualität und Fokus sind meine Maximen.
      </p>
      <ul>
        <li>
          <Link to="/werner">Profil</Link>
        </li>
        <li>Standort: Heidelberg</li>
      </ul>
    </RichText>
  )
}
