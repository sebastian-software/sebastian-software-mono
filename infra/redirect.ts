import type { APIGatewayProxyResult } from "aws-lambda";

const RedirectMap: Record<string, string> = {
  "www.sebastian-software.de": "sebastian-software.de",
  "www.sebastian-software.com": "sebastian-software.com",

  "www.dev.sebastian-software.de": "dev.sebastian-software.de",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
export const handler = async (event: any): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const requestHost: string = event.headers["x-forwarded-host"] ?? "";
  const redirectHost: string | undefined = RedirectMap[requestHost]

  if (!redirectHost) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const newLocation = `https://${redirectHost}${event.rawPath}${event.rawQueryString ? `?${event.rawQueryString}` : ""}`;

  return {
    statusCode: 302,
    headers: {
      "Location": newLocation,
      "Content-type": "text/plain",
    },
    body: "Redirect to " + newLocation,
  };
};