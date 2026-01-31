"use client";

import "./globals.css";
import "aos/dist/aos.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "react-international-phone/style.css";
import "leaflet/dist/leaflet.css";
import { lora, roboto, babylonica } from "./utils/fonts";
import { Toaster } from "sonner";
import Header from "components/main/Header";
import Footer from "components/main/Footer";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import CompareWidget from "@/components/main/CompareWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only show header/footer if NOT under /admin
const showHeaderFooter = !(
  pathname.startsWith("/admin") ||
  pathname.startsWith("/user") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/signup") ||
  pathname.startsWith("/forgot-password")
);

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${roboto.variable} ${babylonica.variable} antialiased`}
      >
        <Providers>
          {showHeaderFooter && <Header />}
          <div
            className={`bg-purple-50 overflow-hidden ${!showHeaderFooter ? "pt-0" : "pt-19 xl:pt-25"}`}
          >
            {children}
          </div>
          {showHeaderFooter && <Footer />}
          <CompareWidget />
          <Toaster position="top-right" richColors />
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}