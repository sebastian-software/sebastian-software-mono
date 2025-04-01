export type PathRedirect = {
  path: string;
}

export type DomainRedirect = {
  domain: string;
}

export type Redirect = PathRedirect | DomainRedirect;

export const redirectMap: Record<string, Redirect> = {
  "sebastianfastner.de": {
    path: "https://sebastian-software.de/fastner"
  },
  "www.sebastianfastner.de": {
    path: "https://sebastian-software.de/fastner"
  },
  "sebastianwerner.de": {
    path: "https://sebastian-software.de/werner"
  },
  "www.sebastianwerner.de": {
    path: "https://sebastian-software.de/werner"
  },
  "sebastiansoftware.de": {
    domain: "sebastian-software.de"
  },
  "www.sebastiansoftware.de": {
    domain: "sebastian-software.de"
  },
  "sebastiansoftware.com": {
    domain: "sebastian-software.com"
  },
  "www.sebastiansoftware.com": {
    domain: "sebastian-software.com"
  },
  "www.sebastian-software.com": {
    domain: "sebastian-software.com"
  },
  "www.sebastian-software.de": {
    domain: "sebastian-software.de"
  },
}