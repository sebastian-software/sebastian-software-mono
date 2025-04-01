import { redirectMap, type Redirect, type DomainRedirect, type PathRedirect } from '../redirect.config';

type CloudFrontFunctionEvent = {
  version: string;
  context: {
    distributionDomainName: string;
    distributionId: string;
    eventType: "viewer-request";
    requestId: string;
  };
  request: CloudFrontRequest;
};

type CloudFrontRequest = {
  method: string;
  uri: string;
  querystring: string;
  headers: Record<string, { value: string }>;
};

type CloudFrontFunctionResult =
  | CloudFrontRequest
  | {
    statusCode: number;
    statusDescription?: string;
    headers?: {
      [key: string]: { value: string };
    };
    body?: string | {
      encoding: string;
      data: string;
    };
  };

function isPathRedirect(redirect: Redirect): redirect is PathRedirect {
  return "path" in redirect;
}

function isDomainRedirect(redirect: Redirect): redirect is DomainRedirect {
  return "domain" in redirect;
}

function create404() {
  return {
    statusCode: 404,
    statusDescription: "Not Found",
    headers: {
      "content-type": {
        value: "text/plain"
      }
    }
  } satisfies CloudFrontFunctionResult;
}

/* example event
{
  "method": "GET",
  "uri": "/",
  "querystring": {
    
  },
  "headers": {
    "user-agent": {
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    },
    "sec-ch-ua-mobile": {
      "value": "?0"
    },
    "cache-control": {
      "value": "max-age=0"
    },
    "host": {
      "value": "sebastianfastner.de"
    },
    "accept": {
      "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,* /*;q=0.8"
    },
    "upgrade-insecure-requests": {
      "value": "1"
    },
    "sec-fetch-site": {
      "value": "none"
    },
    "priority": {
      "value": "u=0, i"
    },
    "sec-gpc": {
      "value": "1"
    },
    "accept-language": {
      "value": "de-DE,de;q=0.6"
    },
    "sec-fetch-dest": {
      "value": "document"
    },
    "accept-encoding": {
      "value": "gzip, deflate, br, zstd"
    },
    "sec-ch-ua-platform": {
      "value": "\"macOS\""
    },
    "sec-fetch-user": {
      "value": "?1"
    },
    "sec-ch-ua": {
      "value": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Brave\";v=\"134\""
    },
    "sec-fetch-mode": {
      "value": "navigate"
    }
  },
  "cookies": {
    
  }
}
*/

function preventCloudfrontAccess(event: CloudFrontFunctionEvent): CloudFrontFunctionResult | undefined {
  if (event.request.headers.host.value.includes('cloudfront.net')) {
    return {
      statusCode: 403,
      statusDescription: 'Forbidden',
      body: {
        encoding: "text",
        data: '<html><head><title>403 Forbidden</title></head><body><center><h1>403 Forbidden</h1></center></body></html>'
      }
    };
  }

  return undefined;
}

// This function is called by CloudFront when a request is made to the distribution
// Please keep the name "sfhandler"
const sfhandler = (event: CloudFrontFunctionEvent): CloudFrontFunctionResult => {
  const preventResult = preventCloudfrontAccess(event);
  if (preventResult) {
    return preventResult;
  }

  const hostname = event.request.headers.host.value ?? "unbekannt";

  const redirect = redirectMap[hostname];
  if (!redirect) {
    return create404();
  }

  let redirectUrl: string | undefined = undefined;

  if (isPathRedirect(redirect)) {
    // Redirect to concrete path
    redirectUrl = redirect.path;
  }

  if (isDomainRedirect(redirect)) {
    // Redirect to domain with same path
    const path = event.request.uri;
    redirectUrl = `https://${redirect.domain}${path}`;
  }

  if (!redirectUrl) {
    return create404();
  }

  return {
    statusCode: 302,
    statusDescription: "Not Found",
    headers: {
      "content-type": {
        value: "text/plain"
      },
      "location": {
        value: redirectUrl
      }
    },
    body: `Redirect to ${redirectUrl}`,
  };
}

/*!--STRIP-EXPORT--*/
export { sfhandler };