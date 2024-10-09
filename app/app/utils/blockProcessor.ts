/* eslint-disable @typescript-eslint/require-await */

import type { ContentSourceMap } from "@sanity/client"

import { processPictureBlock } from "./pictureHandler"

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  _type: string
}

// export async function processContent<T extends SanityPortableBlock>(
//   content: T[]
// ): Promise<T[]> {
//   const plugins = [processPictureBlock]

//   const processedContent = await Promise.all(
//     content.map(async (block) => {
//       let processedBlock = block
//       for (const plugin of plugins) {
//         // eslint-disable-next-line no-await-in-loop
//         processedBlock = await plugin(processedBlock)
//       }

//       return processedBlock
//     })
//   )

//   return processedContent
// }

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

export async function postProcessPage<TBlock extends SanityPortableBlock>(
  initial: AbstractSanityLoaderResult<TBlock | ProcessedBlock>
) {
  const page = initial.data.page
  const content = page?.content

  if (content) {
    const newContent = await processContent(content)
    page.content = newContent

    console.log("Old Content", content[0])
    console.log("New Content", newContent[0])
  }

  return initial
}
