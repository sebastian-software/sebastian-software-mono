import { Link } from "@remix-run/react"

import { RichText } from "~/components"

export function Introduction() {
  return (
    <RichText>
      <h2>Mission</h2>

      <p>
        Unsere Leidenschaft für Qualität und Innovation wird durch eine
        unstillbare Neugier angetrieben. Tiefes Eintauchen in Technologien und
        die Verknüpfung verschiedenster Ideen ermöglichen es uns,
        zukunftsweisende Lösungen zu schaffen. Wir gestalten aktiv die
        dynamischen Entwicklungen unserer Branche.
      </p>

      <Link to="/mission">Mehr erfahren</Link>

      <h2>Team</h2>

      <p>
        Unser Team vereint fundiertes Informatikwissen mit jahrzehntelanger
        Erfahrung in der professionellen Softwareentwicklung. Als Experten für
        moderne Frontend-Technologien haben wir ein Auge für Details und
        verpassen keine relevanten Trends. Mit Elan und Ehrgeiz treiben wir
        Projekte voran und setzen Maßstäbe für herausragende Entwickler- und
        Benutzererfahrung.
      </p>

      <Link to="/team">Mehr erfahren</Link>

      <h2>Consulting</h2>

      <p>
        Gemeinsam entwickeln wir maßgeschneiderte Lösungen, die genau auf Ihre
        Anforderungen zugeschnitten sind. Unterstützt von unserer umfangreichen
        Erfahrung und technischen Expertise bieten wir Ihnen eine Partnerschaft,
        die von der Entwicklung über Beratung bis hin zu Schulungen reicht.
        Unser Ziel ist es, Ihr Team zu stärken und Ihre Vision effektiv
        umzusetzen.
      </p>

      <Link to="/consulting">Mehr erfahren</Link>
    </RichText>
  )
}
