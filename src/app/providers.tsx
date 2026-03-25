"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { MapProvider } from "@/contexts/MapContext";
import { ToastProvider } from "@/components/Toast/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: "https://us.posthog.com",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
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
