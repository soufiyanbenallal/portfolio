/**
 * Next.js compiles the App Router against its own vendored React canary, which
 * ships `<ViewTransition>` even though the `react` package pinned in
 * package.json is the stable release. This reference loads the matching canary
 * type declarations so `import { ViewTransition } from "react"` type-checks the
 * same way it builds.
 *
 * See node_modules/next/dist/docs/01-app/02-guides/view-transitions.md
 */
/// <reference types="react/canary" />

export {};
