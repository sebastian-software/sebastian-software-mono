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

export async function postProcessData<
  TData extends Record<string, unknown>,
  TBlock extends SanityPortableBlock = SanityPortableBlock
>(data: TData) {
  // Note: It's important to not use type narrowing here otherwise
  // the produced return type will be incorrect.
  if (
    "page" in data &&
    typeof data.page === "object" &&
    data.page != null &&
    "content" in data.page &&
    Array.isArray(data.page.content)
  ) {
    const page = data.page
    const content = page.content as TBlock[]

    if (Array.isArray(content)) {
      const modifiedContent: ProcessedBlock[] = []
      for (const block of content) {
        let modifiedBlock = block as ProcessedBlock
        for (const plugin of plugins) {
          modifiedBlock = await plugin(modifiedBlock)
        }

        modifiedContent.push(modifiedBlock)
      }

      type ModifiedPage = Omit<NonNullable<TData["page"]>, "content"> & {
        content: ProcessedBlock[]
      }
      type ModifiedData = Omit<TData, "page"> & { page: typeof modifiedPage }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const modifiedPage = { ...page, content: modifiedContent } as ModifiedPage

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const modifiedData = { ...data, page: modifiedPage } as ModifiedData

      return modifiedData
    }
  }

  return data
}
