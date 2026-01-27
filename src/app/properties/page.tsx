import { Suspense } from "react";
import PropertiesPageClient from ".";
import Breadcrumb from "../../components/main/Breadcrumb";
import { ClipLoader } from "react-spinners";

export const metadata = {
  title: "Properties | Philz Properties",
  description:
    "Browse all available properties on Philz Properties. Explore apartments, houses, and commercial listings carefully curated to match your needs.",
};

// Force the page to be dynamic to avoid prerendering issues
export const dynamic = "force-dynamic";

export default function PropertiesPage() {
  return (
    <>
      <Breadcrumb
        title="Properties"
        current="Properties"
        backgroundImage="/breadcrumb/listing.jpg"
      />

      <div className="px-5 xl:px-0">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-96">
              <ClipLoader size={40} color="#6b21a8" />
            </div>
          }
        >
          <PropertiesPageClient />
        </Suspense>
      </div>
    </>
  );
}