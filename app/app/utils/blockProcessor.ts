/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/require-await */

import { processPictureBlock } from "./pictureHandler"

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  _type: string
}

const plugins = [processPictureBlock]

export interface SanityBasePage extends Record<string, unknown> {
  content: SanityPortableBlock[] | ProcessedBlock[]
}

type ProcessedBlock = Awaited<ReturnType<(typeof plugins)[number]>>

//

export async function postProcessData<TData extends object>(data: TData) {
  if (
    "page" in data &&
    typeof data.page === "object" &&
    data.page != null &&
    "content" in data.page &&
    Array.isArray(data.page.content)
  ) {
    const page = data.page
    const content = page.content

    if (Array.isArray(content)) {
      const modifiedContent: ProcessedBlock[] = []
      for (const block of content) {
        let modifiedBlock = block
        for (const plugin of plugins) {
          modifiedBlock = await plugin(modifiedBlock)
        }

        modifiedContent.push(modifiedBlock)
      }

      const modifiedPage = { ...page, content: modifiedContent } as Omit<
        NonNullable<(typeof data)["page"]>,
        "content"
      > & { content: ProcessedBlock[] }

      return { content: modifiedContent, page: modifiedPage }
    }
  }

  return { data }
}
