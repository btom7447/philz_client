"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I schedule a property viewing?",
    answer:
      "Scheduling a property viewing is simple and flexible. Each property listing includes a dedicated option to book an inspection, where you can select a preferred date and time based on availability. Alternatively, you may contact the assigned agent directly using the contact details provided on the listing. Once your request is submitted, the agent will confirm the viewing and share any additional information you may need before your visit.",
  },
  {
    id: 2,
    question: "Are all properties verified?",
    answer:
      "Yes, all properties listed on our platform go through a structured verification process before they are published. This includes confirming ownership or agency authorization, reviewing property details for accuracy, and ensuring that images and descriptions reflect the current state of the property. While we take verification seriously, we still encourage buyers and renters to conduct personal inspections and due diligence before making any final commitments.",
  },
  {
    id: 3,
    question: "Can I list my property on this platform?",
    answer:
      "Yes, property owners, landlords, and registered agents are welcome to list their properties on our platform. To get started, you’ll need to create an account and complete a short verification process to confirm your identity and property ownership or representation rights. Once approved, you can upload property details, images, pricing information, and manage your listings directly from your dashboard.",
  },
  {
    id: 4,
    question: "Do prices include additional fees?",
    answer:
      "The prices displayed on property listings typically reflect the base cost of the property and may not include additional expenses such as legal fees, agency commissions, service charges, taxes, or maintenance costs. These fees can vary depending on the property type and location. We strongly recommend discussing the full breakdown of costs with the assigned agent or property owner to avoid surprises during the transaction process.",
  },
  {
    id: 5,
    question: "What locations do you currently cover?",
    answer:
      "We currently list properties across major cities and high-demand areas, as well as selected surrounding neighborhoods. Our coverage continues to grow as we onboard new agents and property owners, allowing us to expand into additional regions over time. If a specific location is not yet available, feel free to check back regularly as new listings are added frequently.",
  },
  {
    id: 6,
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available to assist you with general inquiries, technical issues, or concerns related to listings and accounts. You can reach us through the contact form on our website, which allows you to describe your issue in detail, or by using the official support email provided in the website footer. We aim to respond to all support requests as quickly as possible during business hours.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className=""
      data-aos="fade-up"
    >
      <div className="space-y-5 my-10">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={faq.id}
              className={`rounded-lg border transition-colors overflow-hidden ${
                isOpen ? "border-purple-700" : "border-gray-400"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full flex items-center justify-between gap-4 p-5 text-left text-lg font-medium rounded-t-lg transition-colors cursor-pointer ${
                  isOpen
                    ? "bg-purple-100 text-purple-700"
                    : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>{faq.question}</span>

                <ChevronDown
                  className={`h-8 w-8 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-purple-700" : "text-gray-400"
                  }`}
                  strokeWidth={1}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-90 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 text-gray-600 text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}