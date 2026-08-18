/**
 * Validated environment variables.
 *
 * `publicEnv` holds `NEXT_PUBLIC_*` values — inlined into the bundle at build
 * time, safe in the browser. The site is a static export, so there is no
 * server runtime and therefore no server-only secret to read here.
 *
 * A missing/invalid variable fails fast with a clear zod error rather than
 * surfacing as a confusing runtime bug later.
 */

import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

/** Public env — safe to read anywhere (server or client). */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
