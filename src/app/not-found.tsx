import Link from "next/link";

/**
 * 404 page. Rendered for unmatched routes and `notFound()` calls; Next serves
 * it with a 404 status, so crawlers see a proper not-found response.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center">
      <p className="text-eyebrow font-medium uppercase tracking-[0.25em] text-muted">
        PAGE NOT FOUND
      </p>
      <h1 className="font-display text-[clamp(80px,20vw,160px)] font-extralight leading-none tracking-title text-gradient-accent">
        404
      </h1>
      <p className="max-w-md text-lead font-light leading-[1.8] text-muted">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex h-12 items-center justify-center rounded-full border border-border-glass bg-surface-glass px-8 text-button font-medium tracking-wide text-foreground backdrop-blur-md"
      >
        ホームに戻る
      </Link>
    </main>
  );
}
