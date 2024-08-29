import { lingui } from "@lingui/vite-plugin"
import { vitePlugin as remix } from "@remix-run/dev"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import { vercelPreset } from "@vercel/remix/vite"
import { defineConfig } from "vite"
import macrosPlugin from "vite-plugin-babel-macros"
import tsconfigPaths from "vite-tsconfig-paths"

// SST is 1 if SST is used for deployment
const presets = process.env.SST === "1" ? [] : [vercelPreset()]

export default defineConfig({
  build: {
    assetsInlineLimit(filePath) {
      if (filePath.includes("/favicon/")) {
        return false
      }

      // return nothing => default behavior
    }
  },
  plugins: [
    remix({ presets }),
    macrosPlugin(),
    lingui(),
    tsconfigPaths(),
    vanillaExtractPlugin()
  ]
})
