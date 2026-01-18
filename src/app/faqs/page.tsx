import Breadcrumb from "../../components/main/Breadcrumb";

export const metadata = {
  title: "FAQs | Philz Properties",
  description:
    "Find answers to frequently asked questions about buying, renting, and listing properties on Philz Properties.",
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="Contact Us"
        //   parent={{
        //     label: "Parent",
        //     href: "/parent",
        //   }}
        current="Contact"
        backgroundImage="/breadcrumb/page.jpg"
      />
      <div className="px-5 xl:px-0 ">

      </div>
    </>
  );
}
