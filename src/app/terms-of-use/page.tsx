import Breadcrumb from "../../components/main/Breadcrumb";

export const metadata = {
  title: "Terms of Use | Philz Properties",
  description:
    "Read the terms and conditions governing the use of Philz Properties, including user responsibilities and platform policies.",
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
