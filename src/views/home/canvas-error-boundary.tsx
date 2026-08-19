"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered in place of `children` once a render-phase error is caught. */
  fallback: ReactNode;
}

interface State {
  failed: boolean;
}

/**
 * Error boundary scoped to the WebGL backdrop.
 *
 * `ParticleCanvas` already catches its own setup failures, but a boundary is
 * still needed for anything thrown during *render* (a bad three import, a
 * module-eval error in a shader chunk). Without one, such an error propagates to
 * `app/error.tsx` and replaces the entire page with "問題が発生しました" — a
 * decorative backdrop must never be able to do that. Errors are contained here
 * and the static gradient takes over.
 *
 * Class component because `componentDidCatch` has no hook equivalent.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("CanvasErrorBoundary: backdrop failed", error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
