"use client";

import { motion } from "framer-motion";

interface Service {
  title: string;
  highlight: string;
  description: string;
}

interface ServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Building",
    highlight: "Modern. Functional. Enduring.",
    description:
      "We design and construct high-quality buildings that blend modern aesthetics with long-term structural integrity.",
  },
  {
    title: "Selling",
    highlight: "Premium & Affordable Properties.",
    description:
      "Carefully verified properties in strategic locations, delivered through a transparent and stress-free selling process.",
  },
  {
    title: "Management",
    highlight: "Peace of Mind. Sustainable Value.",
    description:
      "Professional tenant handling, maintenance oversight, and asset protection that preserves long-term value.",
  },
  {
    title: "Investment Advisory",
    highlight: "Smart Decisions. Profitable Outcomes.",
    description:
      "Data-driven insights and strategic guidance to help investors maximize real estate returns with confidence.",
  },
  {
    title: "Inspection & Verification",
    highlight: "Transparent. Secure. Trusted.",
    description:
      "Thorough inspections and verification to ensure every property meets legal, structural, and quality standards.",
  },
];

export default function Services({
  services = defaultServices,
}: ServicesProps) {
  return (
    <section className="w-full pb-10">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        {/* Section header */}
        <div className="mb-14" data-aos="fade-down">
          <h1 className="text-4xl font-lora font-light text-black leading-tight">
            What We Do <br />
            <span className="text-5xl md:text-6xl font-semibold text-purple-800">
              Our Services
            </span>
          </h1>
        </div>

        {/* Services grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="
                group relative
                bg-white
                rounded-lg
                border border-gray-400
                p-5
                transition
                hover:border-l-purple-700
                hover:shadow-sm
                overflow-hidden
              "
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 h-full w-1 bg-purple-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition" />

              <h3 className="text-2xl font-lora font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-purple-600 font-medium text-lg mb-4">
                {service.highlight}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
