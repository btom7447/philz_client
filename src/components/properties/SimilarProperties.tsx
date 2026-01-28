"use client";

import { IProperty } from "@/app/types/Properties";

interface Props {
  property: IProperty;
}

export default function SimilarProperties({ property }: Props) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-4">Similar Properties</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Placeholder: you can replace this with real similar properties */}
        <div className="bg-gray-100 h-40 flex items-center justify-center">
          Similar 1
        </div>
        <div className="bg-gray-100 h-40 flex items-center justify-center">
          Similar 2
        </div>
        <div className="bg-gray-100 h-40 flex items-center justify-center">
          Similar 3
        </div>
        <div className="bg-gray-100 h-40 flex items-center justify-center">
          Similar 4
        </div>
      </div>
    </section>
  );
}
