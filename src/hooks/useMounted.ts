import { useSyncExternalStore } from "react";

// Never notifies: the value flips exactly once, when React finishes hydrating.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * True only after hydration. React uses getServerSnapshot for both the server
 * render and the hydration render, so gating browser-only UI on this can never
 * produce a hydration mismatch — unlike reading client state during render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
