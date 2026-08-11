"use client";

import { Canvas } from "@react-three/fiber";
import {
  Component,
  useCallback,
  useState,
  useSyncExternalStore,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Flat3DFallback } from "./flat-3d-fallback";
import { Flat3DScene } from "./flat-3d-scene";
import styles from "./flat-3d.module.css";

export type Flat3DIslandProps = {
  className?: string;
  staticMode?: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  failed: boolean;
};

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("The decorative flat 3D scene could not be rendered.", error, info);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

    if (!context) return false;

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

let webGLSupportCache: boolean | undefined;

function getWebGLSnapshot() {
  if (webGLSupportCache === undefined) {
    webGLSupportCache = canCreateWebGLContext();
  }
  return webGLSupportCache;
}

function getServerWebGLSnapshot() {
  return false;
}

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return true;
}

function subscribeToVisibility(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

function getVisibilitySnapshot() {
  return document.visibilityState !== "hidden";
}

function getServerVisibilitySnapshot() {
  return true;
}

function subscribeToWebGLSupport() {
  return () => undefined;
}

function useRenderPreferences() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
  const supportsWebGL = useSyncExternalStore(
    subscribeToWebGLSupport,
    getWebGLSnapshot,
    getServerWebGLSnapshot,
  );
  const documentVisible = useSyncExternalStore(
    subscribeToVisibility,
    getVisibilitySnapshot,
    getServerVisibilitySnapshot,
  );

  return { documentVisible, prefersReducedMotion, supportsWebGL };
}

export function Flat3DIsland({ className, staticMode = false }: Flat3DIslandProps) {
  const { documentVisible, prefersReducedMotion, supportsWebGL } = useRenderPreferences();
  const [contextLost, setContextLost] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const handleContextLost = useCallback(() => setContextLost(true), []);
  const fallback = <Flat3DFallback />;

  const useFallback =
    staticMode || prefersReducedMotion || !supportsWebGL || contextLost;

  return (
    <div
      className={joinClassNames(styles.root, className)}
      aria-hidden="true"
      data-flat-3d={useFallback ? "static" : "webgl"}
    >
      {useFallback ? (
        fallback
      ) : (
        <SceneErrorBoundary fallback={fallback}>
          <Canvas
            aria-hidden="true"
            className={styles.canvas}
            camera={{ far: 100, near: 0.1, position: [6, 5.2, 8], zoom: 68 }}
            dpr={[1, 1.5]}
            fallback={fallback}
            flat
            frameloop={documentVisible ? "always" : "never"}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            onCreated={({ camera, gl }) => {
              camera.lookAt(0, -0.05, 0);
              camera.updateProjectionMatrix();
              gl.setClearColor(0x000000, 0);
            }}
            onPointerEnter={() => setPointerInside(true)}
            onPointerLeave={() => setPointerInside(false)}
            orthographic
            performance={{ min: 0.75 }}
            tabIndex={-1}
          >
            <Flat3DScene
              active={documentVisible}
              onContextLost={handleContextLost}
              pointerInside={pointerInside}
            />
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  );
}

export default Flat3DIsland;
