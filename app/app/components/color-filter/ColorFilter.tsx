import { rootClass } from "./ColorFilter.css"

const hexToRgb = (hex: string) => {
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  return {
    r: Number.parseInt(hex.slice(1, 3), 16) / 255,
    g: Number.parseInt(hex.slice(3, 5), 16) / 255,
    b: Number.parseInt(hex.slice(5, 7), 16) / 255
  }
  /* eslint-enable @typescript-eslint/no-magic-numbers */
}

export interface ColorFilterProps {
  readonly name: string
  readonly start?: string
  readonly end?: string

  // eslint-disable-next-line react/boolean-prop-naming
  readonly invert?: boolean

  // eslint-disable-next-line react/boolean-prop-naming
  readonly boost?: boolean
}

export function ColorFilter({
  name,
  start,
  end,
  invert = false,
  boost = false
}: ColorFilterProps) {
  const duoStartFields = start && hexToRgb(start)
  const duoEndFields = end && hexToRgb(end)

  const applyDuotone = start && end

  return (
    <svg aria-hidden className={rootClass}>
      <filter id={name} colorInterpolationFilters="sRGB">
        {/* Convert to grayscale */}
        <feColorMatrix
          type="matrix"
          values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
        />

        {/* Adjust brightness and contrast */}
        {boost && (
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.7" intercept="-0.5" />
            <feFuncG type="linear" slope="1.7" intercept="-0.5" />
            <feFuncB type="linear" slope="1.7" intercept="-0.5" />
          </feComponentTransfer>
        )}

        {/* Invert all colors */}
        {invert && (
          <feComponentTransfer>
            <feFuncR type="table" tableValues="1 0" />
            <feFuncG type="table" tableValues="1 0" />
            <feFuncB type="table" tableValues="1 0" />
          </feComponentTransfer>
        )}

        {/* Set the alpha (transparency) value */}
        {!applyDuotone && (
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
        )}

        {/* Map grayscale values to duotone colors */}
        {duoStartFields && duoEndFields && (
          <feComponentTransfer>
            <feFuncR
              type="table"
              tableValues={`${duoStartFields.r} ${duoEndFields.r}`}
            />
            <feFuncG
              type="table"
              tableValues={`${duoStartFields.g} ${duoEndFields.g}`}
            />
            <feFuncB
              type="table"
              tableValues={`${duoStartFields.b} ${duoEndFields.b}`}
            />
          </feComponentTransfer>
        )}
      </filter>
    </svg>
  )
}
