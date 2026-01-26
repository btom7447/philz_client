import HeroSection from "@/components/hero/HeroSection";
import RecentProperties from "@/components/hero/RecentPropereties";
import SalesBanner from "@/components/main/SalesBanner";
import TestimonialSection from "@/components/main/TestimonialSection";

export const metadata = {
  title: "Philz Properties | Explore Unique Properties",
  description:
    "Explore trusted properties for sale and rent. Find apartments, houses, and offices with Philz Properties. Your next home awaits.",
  keywords: [
    "real estate",
    "property for sale",
    "property for rent",
    "apartments",
    "houses",
    "Philz Properties",
  ],
  robots: "index, follow",
  authors: [{ name: "Philz Properties", url: "https://philzproperties.com" }],
};

export default function HomePage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-5 xl:px-0 ">
        <HeroSection />
        <RecentProperties />
      </div>
      <TestimonialSection />
      <SalesBanner />
    </>
  );
}