"use client";

import { IProperty } from "@/app/types/Properties";

interface Props {
  property: IProperty;
}

export default function PropertyMap({ property }: Props) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
        {/* You can replace this with a map component later */}
        Map placeholder for {property.address.city}, {property.address.state}
      </div>
    </section>
  );
}