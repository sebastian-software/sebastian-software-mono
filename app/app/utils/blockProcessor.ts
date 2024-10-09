/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/require-await */

import type { Merge } from "type-fest"

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

function isPage(page: unknown): page is SanityBasePage {
  return (
    typeof page === "object" &&
    page != null &&
    "content" in page &&
    Array.isArray(page.content)
  )
}

type ProcessedBlock = Awaited<ReturnType<(typeof plugins)[number]>>

export async function postProcessData<TData extends Record<string, unknown>>(
  data: TData
) {
  const page = data.page
  if (isPage(page)) {
    const content = page.content
    const modifiedContent: ProcessedBlock[] = []
    for (const block of content) {
      let modifiedBlock = block
      for (const plugin of plugins) {
        modifiedBlock = await plugin(modifiedBlock)
      }

      modifiedContent.push(modifiedBlock)
    }

    const modifiedPage: Merge<
      typeof page,
      { content: typeof modifiedContent }
    > = { ...page, content: modifiedContent }

    return { content: modifiedContent, page: modifiedPage }
  }

  return { data }
}
