"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { MapProvider } from "@/contexts/MapContext";
import { ToastProvider } from "@/components/Toast/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <MapProvider>
        <ToastProvider>{children}</ToastProvider>
      </MapProvider>
    </PostHogProvider>
  );
}
