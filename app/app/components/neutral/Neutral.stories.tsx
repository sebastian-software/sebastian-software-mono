import type { Meta, StoryObj } from "@storybook/react"

import { RichText } from "../richtext/RichText"
import { Neutral } from "./Neutral"

const meta: Meta<typeof Neutral> = {
  component: Neutral
}

export default meta

type Story = StoryObj<typeof Neutral>

export const FitContent: Story = {
  render: () => (
    <div style={{ width: "fit-content" }}>
      <RichText>
        <h1>Modern Fit-content on the Container</h1>
        <Neutral>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <p>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua.
          </p>
        </Neutral>
      </RichText>
    </div>
  )
}

export const InlineBlock: Story = {
  render: () => (
    <div style={{ display: "inline-block" }}>
      <RichText>
        <h1>Inline-block on the Container</h1>
        <Neutral>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <p>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua.
          </p>
        </Neutral>
      </RichText>
    </div>
  )
}

export const WithoutNeutral: Story = {
  render: () => (
    <div style={{ display: "inline-block" }}>
      <RichText>
        <h1>This is the default behavior without Neutral</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
        <p>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua.
        </p>
      </RichText>
    </div>
  )
}
