import HeroSection from "@/components/hero/HeroSection";

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
    <div className="pt-30 lg:pt-40 max-w-7xl mx-auto px-5 xl:px-0 ">
      <HeroSection />
    </div>
  );
}