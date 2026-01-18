import Breadcrumb from "../../components/main/Breadcrumb";
import AboutPhilz from "./AboutPhilz";
import PhilzStats from "./PhilzStats";
import ServicesSlide from "./ServicesSlide";

export const metadata = {
  title: "About Us | Philz Properties",
  description:
    "Learn more about Philz Properties, our mission, values, and commitment to helping people find premium homes and investment opportunities.",
};


export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="About Us"
        //   parent={{
        //     label: "Parent",
        //     href: "/parent",
        //   }}
        current="Contact"
        backgroundImage="/breadcrumb/about.jpg"
      />
      <div className="max-w-7xl mx-auto px-5 xl:px-0 py-20">
        <AboutPhilz />
      </div>
      {/* <ServicesSlide /> */}
      <PhilzStats />
    </>
  );
}
