"use client";

import { useState } from "react";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
// import PropertyGrid from "@/components/main/PropertyGrid";

export default function PropertiesPage() {
  const [filters, setFilters] = useState({});

  return (
    <section className="container mx-auto p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Browse Properties</h1>

      {/* Filter component */}
      <PropertiesFilter onChange={setFilters} />

      {/* Property grid with dynamic filters */}
      {/* <PropertyGrid filters={filters} pagination={{ page: 1, pageSize: 12 }} /> */}
    </section>
  );
}
