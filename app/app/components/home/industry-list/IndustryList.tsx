import { ColorFilter } from "~/components/color-filter"
import { IndustryIcon } from "~/components/industry-icon"
import { Tag, TagList } from "~/components/tag/Tag"

import { rootClass, titleClass } from "./IndustryList.css"

export interface IndustryListProps {
  readonly data: string[]
}

export function IndustryList({ data }: IndustryListProps) {
  return (
    <div className={rootClass}>
      <h1 className={titleClass}>Branchen-Erfahrung</h1>
      <ColorFilter name="industry" start="#FFFFFF" end="#FFFFFF" />
      <TagList>
        {data.map((industry) => (
          <Tag key={industry}>
            <IndustryIcon name={industry} filter="industry" alt="" />
            {industry}
          </Tag>
        ))}
      </TagList>
    </div>
  )
}
