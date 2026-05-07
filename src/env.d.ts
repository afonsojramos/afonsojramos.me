/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    CFP_PASSWORD?: string;
    LASTFM_API_KEY?: string;
    CF_ZONE_TAG?: string;
    CF_ANALYTICS_TOKEN?: string;
  }
}
