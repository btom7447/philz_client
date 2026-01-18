import Breadcrumb from "../../components/main/Breadcrumb";

export const metadata = {
  title: "Privacy Policy | Philz Properties",
  description:
    "Understand how Philz Properties collects, uses, and protects your personal information in accordance with privacy regulations.",
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
