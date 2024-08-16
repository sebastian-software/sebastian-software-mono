import { RichText } from "~/components/richtext/RichText"

export default function Index() {
  return (
    <RichText>
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG</p>
      <h2>Anschrift</h2>
      <p>
        Sebastian Software GmbH
        <br />
        Dalheimer Straße 12
        <br />
        55128 Mainz <br />
        Deutschland
      </p>
      <h2>Vertreten durch</h2>
      <p>
        Sebastian Fastner
        <br /> Sebastian Werner
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: +49-6131-9729-830 <br />
        Telefax: +49-6131-9729-831 <br />
        E-Mail: info@sebastian-software.de
      </p>
      <h2>Registereintrag</h2>
      <p>
        Eintragung im Handelsregister
        <br />
        Registergericht: Amtsgericht Mainz
        <br />
        Registernummer: HRB 45232
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
        <br />
        DE295226721
      </p>
      <h2>Aufsichtsbehörde</h2>
      <p>Landgericht Mainz</p>
    </RichText>
  )
}
