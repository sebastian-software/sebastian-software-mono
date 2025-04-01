/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />

import type { CdnArgs } from ".sst/platform/src/components/aws";

const buildDate = new Date().toISOString();

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
    /*
    const redirectFunction = new sst.aws.Function("RedirectFunction", {
      handler: "infra/redirect.handler",
      url: true,
      architecture: "arm64",
      description: "Redirects www and personal domains to the correct URL",
      memory: "128 MB"
    });

    new sst.aws.Router("RedirectRouter", {
      domain: {
        name: "www.sebastian-software.com",
        aliases: [
          "www.sebastian-software.de",
          "sebastianfastner.de",
          "www.sebastianfastner.de",
          "sebastianwerner.de",
          "www.sebastianwerner.de"
        ],
        dns: sst.cloudflare.dns({
          transform: {
            record(record) {
              record.comment = `SST ${$app.stage} (${buildDate})`;
            }
          }
        }),
      },
      routes: {
        "/*": redirectFunction.url
      }
    });
    */
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
  },
});
