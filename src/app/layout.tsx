import "./globals.css";
import "aos/dist/aos.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "react-international-phone/style.css";
import { lora, roboto } from "./utils/fonts";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Header from "@/components/main/Header";

export const metadata: Metadata = {
  title: "Philz Properties",
  description:
    "Expert real estate services, creating sustainable communities, trusted investment opportunities, and value-driven property solutions tailored to your goals.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${lora.variable} ${roboto.variable} antialiased`}>
        <Header />
        <div className="bg-gray-100/80">
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}