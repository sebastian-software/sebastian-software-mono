import { nameClass, rootClass } from "./ProfileHead.css"

export interface ProfileHeadProps {
  readonly name: string
}

export function ProfileHead({ name }: ProfileHeadProps) {
  return (
    <div className={rootClass}>
      <h1 className={nameClass}>{name}</h1>
    </div>
  )
}
