import type { RefObject } from "react"
import { useEffect, useRef, useState } from "react"

interface UseSizeResult<SizeElementType> {
  ref: RefObject<SizeElementType>
  rect: DOMRectReadOnly
}

function useSize<
  SizeElementType extends HTMLElement
>(): UseSizeResult<SizeElementType> {
  const [rect, setRect] = useState<DOMRectReadOnly>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    toJSON: () => ({})
  })
  const ref = useRef<SizeElementType>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) {
        return
      }

      setRect(entries[0].contentRect)
    })

    resizeObserver.observe(element)

    // Clean up observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return { ref, rect }
}

export default useSize
