"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` warns during server rendering, but this is exactly what we
 * need on the client: apply client-only state (locale, saved rig) before the
 * browser paints, so the server-rendered defaults never flash.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
