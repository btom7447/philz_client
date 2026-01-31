import FaqSection from "@/components/main/FaqSection";
import Breadcrumb from "../../components/main/Breadcrumb";
import SalesBanner from "@/components/main/SalesBanner";

export const metadata = {
  title: "FAQs | Philz Properties",
  description:
    "Find answers to frequently asked questions about buying, renting, and listing properties on Philz Properties.",
};

export default function FaqsPage() {
  return (
    <>
      <Breadcrumb
        title="FAQs"
        //   parent={{
        //     label: "Parent",
        //     href: "/parent",
        //   }}
        current="FAQs"
        backgroundImage="/breadcrumb/page.jpg"
      />
      <div className="max-w-7xl mx-auto py-10 px-5 xl:px-0">
        <FaqSection />
      </div>
      <SalesBanner />
    </>
  );
}
