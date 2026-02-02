import TourDashboard from "@/components/admin/tour/TourDashboard";

export const metadata = {
  title: "Tours | Admin | Philz Properties",
  description:
    "Admin dashboard to manage and review all property tour requests. Approve, reject, or delete tours and filter by type.",
};

export default function ToursPage() {
  return (
    <>
      <TourDashboard />
    </>
  );
}
