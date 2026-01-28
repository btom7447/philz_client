"use client";

import { IProperty } from "@/app/types/Properties";
import PropertyMajorDetails from "@/components/properties/PropertyMajorDetails";
import { PropertyScheduleVisit } from "@/components/properties/ScheduleVisitForm";
import PropertyCarousel from "@/components/properties/PropertyCarousel";
// import PropertyFloorPlan from "@/components/properties/PropertyFloorPlan";
// import PropertyVideo from "@/components/properties/PropertyVideo";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";
import SalesBanner from "@/components/main/SalesBanner";

interface Props {
  property: IProperty;
}

export default function PropertyDetailsClient({ property }: Props) {
  console.log("Property data", property)
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="max-w-7xl mx-auto py-10 px-5 xl:px-0 flex flex-col gap-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
          <PropertyMajorDetails property={property} />
          <PropertyScheduleVisit property={property} />
        </div>
      </div>

      {/* Carousel */}
      {property.images && property.images.length > 0 && (
        <PropertyCarousel property={property} />
      )}

      <div>
        {/* Floor Plan */}
        {/* {property?.floorPlans && <PropertyFloorPlan property={property} />} */}

        {/* Video */}
        {/* {property?.videos && <PropertyVideo property={property} />} */}
      </div>
      {/* Map */}
      {property.address && <PropertyMap property={property} />}
      <div>
        {/* Similar Properties */}
        <SimilarProperties property={property} />
      </div>
      <SalesBanner />
    </div>
  );
}
