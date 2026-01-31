"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftRight, ChevronDown, X } from "lucide-react";
import { IProperty } from "@/app/types/Properties";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCompareIds,
  filterCompareProperties,
  toggleCompare,
} from "@/app/utils/compareUtils";

export default function CompareWidget() {
  const [compareProperties, setCompareProperties] = useState<IProperty[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const updateCompare = async () => {
    try {
      const res = await fetch("/api/properties");
      const json = await res.json();
      const allProperties: IProperty[] = Array.isArray(json.properties)
        ? json.properties
        : [];
      const selected = filterCompareProperties(allProperties);
      setCompareProperties(selected);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateCompare();

    const onCompareUpdate = () => updateCompare();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "compare") updateCompare();
    };

    window.addEventListener("compareUpdate", onCompareUpdate);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("compareUpdate", onCompareUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (compareProperties.length === 0) return null;

  const removeProperty = (id: string) => {
    toggleCompare(id);
    updateCompare();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-1/2 -translate-y-1/2 right-5 z-50"
      >
        {/* Container with animated width */}
        <motion.div
          animate={{ width: isOpen ? 250 : 80 }} // w-50 ~ 200px, w-20 ~ 80px
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-purple-100"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <ArrowLeftRight size={20} strokeWidth={1} />
              <span>{compareProperties.length}/3</span>
            </div>
            <ChevronDown
              size={20}
              strokeWidth={1}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>

          {/* Expanded content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              className="p-3 space-y-3"
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {compareProperties.map((property) => (
                <motion.div
                  key={property._id}
                  className="flex items-center gap-3 relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100">
                    {property.images?.[0]?.url ? (
                      <Image
                        src={optimizeCloudinary(property.images[0].url, 200)}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs flex items-center justify-center h-full w-full">
                        No Image
                      </span>
                    )}
                  </div>
                  <span className="truncate text-gray-700 text-sm flex-1">
                    {property.title}
                  </span>

                  <button
                    onClick={() => removeProperty(property._id)}
                    className=" text-gray-500 hover:text-red-600 cursor-pointer"
                  >
                    <X size={16} strokeWidth={1} />
                  </button>
                </motion.div>
              ))}

              <Link href="/compare">
                <button className="w-full mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors cursor-pointer">
                  Compare Properties
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}