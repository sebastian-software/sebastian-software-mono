/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare global {
  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string
      SANITY_STUDIO_DATASET: string
      SANITY_STUDIO_URL: string
      SANITY_STUDIO_STEGA_ENABLED: string
    }
  }
}

// This makes sure the file is treated as a module
export {}
