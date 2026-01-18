"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle, Smile, Briefcase } from "lucide-react";
import StatCard from "@/components/hero/StatCard";
import { philzStats } from "../lib/philzStats";

export default function PhilzStats() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const uiStats = [
    {
      icon: <CheckCircle className="w-20 h-20" strokeWidth={1} />,
      data: philzStats.premiumProperties,
      dotPosition: "top" as const,
    },
    {
      icon: <Smile className="w-20 h-20" strokeWidth={1} />,
      data: philzStats.happyCustomers,
      dotPosition: "bottom-left" as const,
    },
    {
      icon: <Briefcase className="w-20 h-20" strokeWidth={1} />,
      data: philzStats.yearsInBusiness,
      dotPosition: "top-left" as const,
    },
  ];

  return (
    <section ref={ref} className="bg-purple-700 w-full px-10 py-20">
      <div className="flex flex-wrap justify-center items-center xl:justify-around gap-10">
        {uiStats.map((stat, idx) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={idx * 200}>
            <StatCard
              icon={stat.icon}
              value={
                inView ? (
                  <CountUp
                    end={stat.data.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.data.suffix}
                  />
                ) : (
                  "0"
                )
              }
              label={stat.data.label}
              dotPosition={stat.dotPosition}
              about={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}