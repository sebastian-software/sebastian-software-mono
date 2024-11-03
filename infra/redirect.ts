/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";

const redirectMapWithPath = new Map([
  ["sebastianfastner.de", "https://www.sebastian-software.de/fastner"],
  ["www.sebastianfastner.de", "https://www.sebastian-software.de/fastner"],
  ["sebastianwerner.de", "https://www.sebastian-software.de/werner"],
  ["www.sebastianwerner.de", "https://www.sebastian-software.de/werner"]
])

const redirectMap = new Map([
  ["www.sebastian-software.de", "sebastian-software.de"],
  ["www.sebastian-software.com", "sebastian-software.com"],

  ["www.dev.sebastian-software.de", "dev.sebastian-software.de"]
])

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const requestHost: string = event.headers["x-forwarded-host"] ?? "unknown host";

  const redirectUrlWithPath = redirectMapWithPath.get(requestHost);

  if (redirectUrlWithPath) {
    const headers = {
      "Location": redirectUrlWithPath,
      "Content-Type": "text/plain"
    }

    return {
      statusCode: 302,
      headers,
      body: `Redirect to ${redirectUrlWithPath}`,
    } satisfies APIGatewayProxyResultV2
  }

  const redirectHost = redirectMap.get(requestHost);

  if (!redirectHost) {
    return {
      statusCode: 404,
      body: "Not found",
    } satisfies APIGatewayProxyResultV2
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const newLocation = `https://${redirectHost}${event.rawPath}${event.rawQueryString ? `?${event.rawQueryString}` : ""}`;
  const headers = {
    "Location": newLocation,
    "Content-type": "text/plain",
  }

  return {
    statusCode: 302,
    headers,
    body: "Redirect to " + newLocation,
  } satisfies APIGatewayProxyResultV2
};