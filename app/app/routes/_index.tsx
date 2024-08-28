import type { MetaFunction } from "@remix-run/node"

import { Button } from "~/components/button/Button"
import {
  Card,
  CardContainer,
  CardContent,
  CardFooter,
  CardTitle
} from "~/components/card/Card"
import { Banner } from "~/components/home"

export const meta: MetaFunction = () => [
  { title: "Sebastian Software" },
  {
    name: "description",
    content:
      "Ein Team von Spezialisten für React-Entwicklung mit Fokus auf nachhaltige, innovative Lösungen mit über 20 Jahre Erfahrung."
  }
]

export default function Index() {
  return (
    <>
      <Banner alt="Gründer der Sebastian Software GmbH">
        Fundiertes technisches Know-How trifft auf Leidenschaft für Innovation
        und herausragende User-Experience.
      </Banner>
      <CardContainer>
        <Card>
          <CardTitle>Mission</CardTitle>
          <CardContent>
            <p>
              Unsere Leidenschaft für Qualität und Innovation wird durch eine
              unstillbare Neugier angetrieben. Tiefes Eintauchen in Technologien
              und die Verknüpfung verschiedenster Ideen ermöglichen es uns,
              zukunftsweisende Lösungen zu schaffen. Wir gestalten aktiv die
              dynamischen Entwicklungen unserer Branche.
            </p>
          </CardContent>
          <CardFooter>
            <Button to="/mission">Mehr erfahren</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardTitle>Team</CardTitle>
          <CardContent>
            <p>
              Unser Team vereint fundiertes Informatikwissen mit
              jahrzehntelanger Erfahrung in der professionellen
              Softwareentwicklung. Als Experten für moderne
              Frontend-Technologien haben wir ein Auge für Details und verpassen
              keine relevanten Trends. Mit Elan und Ehrgeiz treiben wir Projekte
              voran und setzen Maßstäbe für herausragende Entwickler- und
              Benutzererfahrung.
            </p>
          </CardContent>

          <CardFooter>
            <Button to="/team">Mehr erfahren</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardTitle>Consulting</CardTitle>
          <CardContent>
            <p>
              Gemeinsam entwickeln wir maßgeschneiderte Lösungen, die genau auf
              Ihre Anforderungen zugeschnitten sind. Unterstützt von unserer
              umfangreichen Erfahrung und technischen Expertise bieten wir Ihnen
              eine Partnerschaft, die von der Entwicklung über Beratung bis hin
              zu Schulungen reicht. Unser Ziel ist es, Ihr Team zu stärken und
              Ihre Vision effektiv umzusetzen.
            </p>
          </CardContent>

          <CardFooter>
            <Button to="/consulting">Mehr erfahren</Button>
          </CardFooter>
        </Card>
      </CardContainer>

      {/* <CustomersList data={customers} />
      <TechList data={technologies} />
      <IndustryList data={industries} /> */}
    </>
  )
}
