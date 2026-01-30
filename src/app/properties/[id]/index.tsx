"use client";

import { IProperty } from "@/app/types/Properties";
import PropertyMajorDetails from "@/components/properties/PropertyMajorDetails";
import { PropertyScheduleVisit } from "@/components/properties/ScheduleVisitForm";
import PropertyCarousel from "@/components/properties/PropertyCarousel";
import PropertyFloorPlan from "@/components/properties/PropertyFloorPlan";
import SimilarProperties from "@/components/properties/SimilarProperties";
import SalesBanner from "@/components/main/SalesBanner";
import MapWrapper from "@/app/contact/MapWrapper";
import PropertyVideos from "@/components/properties/PropertyVideo";

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
      {/* Floor Plan */}
      {property?.floorPlans && <PropertyFloorPlan property={property} />}
      {/* Video */}
      {property?.videos && <PropertyVideos property={property} />}

      {/* <div className="max-w-7xl mx-auto py-10 px-5 xl:px-0 flex flex-col gap-6">
        <div className="flex-1 px-5 xl:px-0 border-l-2 border-purple-700 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Property on map</h2>
        </div>
      </div> */}

      <MapWrapper
        pins={[
          {
            label: property.title,
            lat: property.location.coordinates[0],
            lng: property.location.coordinates[1],
          },
        ]}
        height="50dvh"
      />

      {/* Similar Properties */}
      <div className="max-w-7xl mx-auto py-10 px-5 xl:px-0 ">
        <SimilarProperties property={property} />
      </div>
      <SalesBanner />
    </div>
  );
}
