import type { TechEntry } from "~/routes/_index"

import { Tag, TagList } from "../../tag/Tag"
import { rootClass, titleClass } from "./TechList.css"

export interface TechListProps {
  readonly data?: Record<string, TechEntry>
}

export function TechList({ data }: TechListProps) {
  return (
    <div className={rootClass}>
      <h1 className={titleClass}>Unsere Technologie</h1>
      <TagList>
        {data &&
          Object.entries(data).map(([tech]) => <Tag key={tech}>{tech}</Tag>)}
      </TagList>
    </div>
  )
}
