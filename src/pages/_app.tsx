import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../layouts/RootLayout";
import { Fredoka, Lato } from "next/font/google";
import Head from "next/head";
import { MapProvider } from "../contexts/MapContext";
import posthog from "posthog-js";
import { useEffect } from "react";
import { PostHogProvider } from "posthog-js/react";
import { ToastProvider } from "@/components/Toast/ToastContext";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: 'https://us.posthog.com',
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Support SF Schools</title>
      </Head>
      <MapProvider>
        <ToastProvider>
          <Layout>
            <div className={`${fredoka.variable} ${lato.variable} h-full`}>
              <PostHogProvider client={posthog}>
                <Component {...pageProps} />
              </PostHogProvider>
            </div>
          </Layout>
        </ToastProvider>
      </MapProvider>
    </>
  );
}

export default MyApp;
