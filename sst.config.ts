/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />

import type { CdnArgs } from ".sst/platform/src/components/aws";

const buildDate = new Date().toISOString();

async function canAccessDir(path: string): Promise<boolean> {
  const fs = await import("fs/promises");

  try {
    await fs.access(path, fs.constants.R_OK | fs.constants.X_OK); // R_OK = readable, X_OK = executable (enterable)
    return true;
  } catch {
    return false;
  }
}

async function setupInfra() {
  const path = await import("path");

  const SITE_DIR = "./dist/site";

  const { redirectMap } = await import("./redirect.config");
  const esbuild = await import("esbuild");
  const fs = await import("fs/promises");

  const redirectedDomains = Object.keys(redirectMap);

  if (!await canAccessDir(SITE_DIR)) {
    await fs.mkdir(SITE_DIR, { recursive: true });
  }

  await fs.writeFile(
    path.join(SITE_DIR, "index.html"),
    "Empty index html file"
  )

  await esbuild.build({
    entryPoints: ["./infra/edge.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "esm",
    legalComments: "inline",
    outfile: "./dist/edge.js",
  })

  const edgeFileContent = (await fs.readFile("./dist/edge.js", "utf-8")).split("/*!--STRIP-EXPORT--*/")[0];

  return {
    sitePath: "./dist/site",
    edgeFileContent,
    redirectedDomains
  }
}

export default $config({
  app(input) {
    return {
      name: "app",
      removal: input.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-central-1",
          // AWS Profile configuration in ~/.aws/credentials
          // You need aws_access_key_id and aws_secret_access_key of an account that
          // can write to the stack.
          // We currently ignore stage and always use PROD profile.
          // profile: process.env.CI ? undefined : "sebastiansoftwarede"
        },
        cloudflare: true
      }
    };
  },
  async run() {
    const { sitePath, edgeFileContent, redirectedDomains } = await setupInfra();

    sst.Linkable.wrap(aws.dynamodb.Table, (table) => ({
      properties: { tableName: table.name }
    }))

    const table = new sst.aws.Dynamo("WebVitals", {
      fields: {
        id: "string"
      },
      primaryIndex: { hashKey: "id" }
    })

    let domain: CdnArgs["domain"]
    let studioDomain: CdnArgs["domain"]

    if ($app.stage === "production") {
      domain = {
        name: "sebastian-software.de",
        aliases: ["sebastian-software.com"],
        dns: sst.cloudflare.dns({
          transform: {
            record(record) {
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        })
      }

      studioDomain = {
        name: "studio.sebastian-software.de",
        dns: sst.cloudflare.dns({
          zone: "1849459b28dd975658208ee4ffdb2257",
          transform: {
            record(record) {
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        })
      }
    } else {
      domain = {
        name: "dev.sebastian-software.de",
        redirects: ["www.dev.sebastian-software.de"],
        dns: sst.cloudflare.dns({
          zone: "1849459b28dd975658208ee4ffdb2257",
          transform: {
            record(record) {
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        })
      }

      studioDomain = {
        name: "dev.studio.sebastian-software.de",
        dns: sst.cloudflare.dns({
          zone: "1849459b28dd975658208ee4ffdb2257",
          transform: {
            record(record) {
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        })
      }
    }

    new sst.aws.StaticSite("RedirectStaticSite", {
      path: sitePath,
      edge: {
        viewerRequest: {
          injection: `${edgeFileContent}\nreturn sfhandler(event);`
        }
      },
      domain: {
        name: redirectedDomains[0],
        aliases: redirectedDomains.slice(1),
        dns: sst.cloudflare.dns({
          // override: true,
          transform: {
            record: (record) => {
              if (redirectedDomains.includes(`${record.name}`)) {
                // record.proxied = true;
                // record.ttl = 1;
              }
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        })
      }
    });

    const studioSite: sst.aws.StaticSite = new sst.aws.StaticSite("Studio", {
      path: "./studio",
      build: {
        command: "pnpm build",
        output: "dist",
      },
      domain: studioDomain
    })

    new sst.aws.Remix("Website", {
      environment: {
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN ?? "",
        SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
        SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET ?? "",
        SANITY_STUDIO_URL: studioSite.url as $util.Output<string>,
        SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED ?? ""
      },
      domain,
      server: {
        architecture: "arm64",
        memory: "1024 MB"
      },
      link: [table],
      path: "app"
    });

    console.log("DELETE DIR")
  },
});
