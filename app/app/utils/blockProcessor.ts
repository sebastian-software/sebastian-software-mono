// blockProcessor.ts

import type { QueryResponseInitial } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  [key: string]: unknown
  _type: string
}

/**
 * Block handler type that processes a block and returns a processed block.
 */
export type BlockHandler = (
  block: SanityPortableBlock
) => Promise<SanityPortableBlock>

/**
 * Map of block handlers keyed by block `_type`.
 * Each handler may or may not be present, so the value can be `BlockHandler` or `undefined`.
 */
export type BlockHandlersMap = Record<string, BlockHandler | undefined>

/**
 * Processes a single block using the appropriate handler if available.
 */
export async function processBlock(
  block: SanityPortableBlock,
  handlers: BlockHandlersMap
): Promise<SanityPortableBlock> {
  const handler = handlers[block._type]
  if (handler) {
    return handler(block)
  }

  return block
}

/**
 * Processes an array of content blocks, applying the appropriate handler to each block based on its `_type`.
 */
export async function postProcessContent(
  content: SanityPortableBlock[],
  handlers: BlockHandlersMap
): Promise<SanityPortableBlock[]> {
  return Promise.all(
    content.map(async (block) => processBlock(block, handlers))
  )
}

/**
 * Processes the page content by applying the appropriate handlers to each block.
 */
export async function postProcessPage<
  T extends QueryResponseInitial<PAGES_QUERYResult>
>(initial: T, handlers: BlockHandlersMap): Promise<T> {
  const page = initial.data.page
  if (page) {
    const modifiedContent = await postProcessContent(page.content, handlers)
    const modifiedPage = {
      ...page,
      content: modifiedContent
    }

    const modifiedInitial = {
      ...initial,
      data: {
        ...initial.data,
        page: modifiedPage
      }
    }

    return modifiedInitial
  }

  return initial
}
