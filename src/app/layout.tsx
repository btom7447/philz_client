"use client";

import "./globals.css";
import "aos/dist/aos.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "react-international-phone/style.css";
import "leaflet/dist/leaflet.css";
import { lora, roboto, babylonica } from "./utils/fonts";
import { Toaster } from "sonner";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only show header/footer if NOT under /admin
  const showHeaderFooter = !pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${roboto.variable} ${babylonica.variable} antialiased`}
      >
        {showHeaderFooter && <Header />}
        <div className={`bg-purple-50 overflow-hidden ${!showHeaderFooter ? "pt-0" : "pt-25"}`}>{children}</div>
        {showHeaderFooter && <Footer />}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}