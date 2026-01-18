import { Babylonica, Lora, Roboto } from "next/font/google";

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const babylonica = Babylonica({
  variable: "--font-babylonica",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});