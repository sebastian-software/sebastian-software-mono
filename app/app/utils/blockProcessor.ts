/* eslint-disable @typescript-eslint/require-await */

import type { ContentSourceMap } from "@sanity/client"

import { processPictureBlock } from "./pictureHandler"

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  _type: string
}

// Define the plugins outside the function, but keep them internal to your codebase
const plugins = [
  processPictureBlock
  // Add more plugins here
] as const

type ProcessedBlock = Awaited<ReturnType<(typeof plugins)[number]>>

export async function processContent<T extends SanityPortableBlock>(
  content: T[]
): Promise<Array<T | ProcessedBlock>> {
  const processedContent = await Promise.all(
    content.map(async (block) => {
      let processedBlock: T | ProcessedBlock = block

      for (const plugin of plugins) {
        // eslint-disable-next-line no-await-in-loop
        processedBlock = await plugin(processedBlock)
      }

      return processedBlock
    })
  )

  return processedContent
}

interface AbstractSanityLoaderResult<TBlock extends SanityPortableBlock> {
  sourceMap: ContentSourceMap | undefined
  data: {
    page:
      | {
          content: TBlock[] | undefined
        }
      | undefined
      | null
  }
}

export async function postProcessPage<
  T extends AbstractSanityLoaderResult<TBlock>,
  TBlock extends SanityPortableBlock
>(initial: T) {
  const page = initial.data.page
  const content = page?.content

  if (content) {
    const newContent = await processContent(content)

    // Assign the new content with Omit in place to properly manage the type
    ;(page as any).content = newContent

    console.log("Old Content", content[0])
    console.log("New Content", newContent[0])
  }

  // Return the original object with updated content using Omit to ensure typing consistency
  return initial as Omit<T, "data"> & {
    data: Omit<T["data"], "page"> & {
      page: Omit<T["data"]["page"], "content"> & {
        content: Array<TBlock | ProcessedBlock>
      }
    }
  }
}
