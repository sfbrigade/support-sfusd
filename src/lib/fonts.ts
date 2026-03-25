import { Fredoka, Inter, Lato } from "next/font/google";

export const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
