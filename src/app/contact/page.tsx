import SalesBanner from "@/components/main/SalesBanner";
import Breadcrumb from "../../components/main/Breadcrumb";
import ContactForm from "./ContactForm";
import GetInTouch from "./GetInTouch";
import MapWrapper from "./MapWrapper";

export const metadata = {
  title: "Contact Us | Philz Properties",
  description:
    "Get in touch with Philz Properties for inquiries, support, or partnership opportunities. We’re here to help you find the right property.",
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="Contact Us"
        current="Contact"
        backgroundImage="/breadcrumb/contact.jpg"
      />

      <div className="max-w-7xl mx-auto px-5 xl:px-0 py-20 grid lg:grid-cols-2 gap-16">
        <GetInTouch />
        <ContactForm />
      </div>

      {/* Client-only map */}
      <MapWrapper
        pins={[
          {
            label: "Head Office",
            lat: 5.021140992759621,
            lng: 7.949140611081943,
          },
        ]}
        height="50dvh"
      />

      <SalesBanner />
    </>
  );
}