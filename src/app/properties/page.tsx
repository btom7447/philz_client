import Breadcrumb from "../../components/main/Breadcrumb";

export const metadata = {
  title: "Properties | Philz Properties",
  description:
    "Browse all available properties on Philz Properties. Explore apartments, houses, and commercial listings carefully curated to match your needs.",
};


export default function PropertiesPage() {
  return (
    <>
      <Breadcrumb
        title="Properties"
        //   parent={{
        //     label: "Parent",
        //     href: "/parent",
        //   }}
        current="Contact"
        backgroundImage="/breadcrumb/listing.jpg"
      />
      <div className="px-5 xl:px-0 ">
        {/* <PropertiesPage /> */}
      </div>
    </>
  );
}
