import SalesBanner from "@/components/main/SalesBanner";
import Breadcrumb from "../../components/main/Breadcrumb";
import CompareTable from "@/components/main/CompareTable"; 

export const metadata = {
  title: "Compare Properties | Philz Properties",
  description:
    "Compare up to 3 properties side by side with Philz Properties. View property details including price, size, amenities, and more to make an informed decision.",
};

export default function ComparePage() {
  return (
    <>
      <Breadcrumb
        title="Compare Properties"
        current="Compare"
        backgroundImage="/breadcrumb/compare.jpg"
      />

      <CompareTable />
      <SalesBanner />
    </>
  );
}