import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../layouts/RootLayout";
import { Fredoka, Lato } from "next/font/google";
import Head from "next/head";
import { MapProvider } from "../contexts/MapContext";
import posthog from 'posthog-js';
import { useEffect } from "react";
import { PostHogProvider } from 'posthog-js/react'
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
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24',
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>Support SF Schools</title>
      </Head>
      <MapProvider>
        <ToastProvider>
          <Layout>
            <div className={`${fredoka.variable} ${lato.variable} h-full`}>
                <Component {...pageProps} />
            </div>
          </Layout>
        </ToastProvider>
       
      </MapProvider>
    </>
  );
}

export default MyApp;
