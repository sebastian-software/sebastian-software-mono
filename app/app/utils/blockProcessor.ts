/* eslint-disable @typescript-eslint/require-await */

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  _type: string
}

export async function postProcessData<TData extends Record<string, unknown>>(
  data: TData
) {
  return data
}
