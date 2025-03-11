type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals extends Runtime {}
}
