import Breadcrumb from "../../components/main/Breadcrumb";

export const metadata = {
  title: "Book Tour | Philz Properties",
  description:
    "Schedule a property tour with Philz Properties and explore your next home or investment opportunity. Choose a virtual or in-person tour and let our team guide you through the process.",
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="Book Tour"
        current="Tour"
        backgroundImage="/breadcrumb/tour.jpg"
      />

      <div className="max-w-7xl mx-auto px-5 xl:px-0 py-20 grid lg:grid-cols-2 gap-16">
      </div>

    </>
  );
}