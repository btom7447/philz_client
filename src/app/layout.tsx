import "./globals.css";
import "aos/dist/aos.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "react-international-phone/style.css";
import "leaflet/dist/leaflet.css";
import { lora, roboto, babylonica } from "./utils/fonts";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

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
      <body
        className={`${lora.variable} ${roboto.variable} ${babylonica.variable} antialiased`}
      >
        <Header />
        <div className="bg-purple-50 pt-25">{children}</div>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}