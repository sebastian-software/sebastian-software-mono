import { clsx } from "clsx"
import type { PropsWithChildren } from "react"

import { container, content, footer, root, title } from "./Card.css"

interface PropsWithStyling extends PropsWithChildren {
  readonly className?: string
}

export function Card({ children, className }: PropsWithStyling) {
  return <div className={clsx(root, className)}>{children}</div>
}

export function CardTitle({ children, className }: PropsWithStyling) {
  return <div className={clsx(title, className)}>{children}</div>
}

export function CardContent({ children, className }: PropsWithStyling) {
  return <div className={clsx(content, className)}>{children}</div>
}

export function CardFooter({ children, className }: PropsWithStyling) {
  return <div className={clsx(footer, className)}>{children}</div>
}

export function CardContainer({ children, className }: PropsWithStyling) {
  return <div className={clsx(container, className)}>{children}</div>
}
