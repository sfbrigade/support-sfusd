import type { Metadata } from "next";
import { fredoka, inter, lato } from "@/lib/fonts";
import "@/styles/globals.css";
import Providers from "./providers";
import RootLayout from "@/layouts/RootLayout";

export const metadata: Metadata = {
  title: "Support SF Schools",
  description:
    "Find public schools near you that need support from the local community.",
  icons: {
    icon: "https://www.supportsfschools.org/logo_icon.ico",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${fredoka.variable} ${lato.variable} ${inter.variable}`}
    >
      <head>
      </head>
      <body className={`scroll-smooth ${inter.className}`}>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
