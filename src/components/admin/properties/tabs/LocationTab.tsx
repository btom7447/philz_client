"use client";

import { FC, useMemo, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../propertySchema";
import FormInput from "../../main/FormInput";

import dynamic from "next/dynamic";
import { useMap } from "react-leaflet"; // normal import
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically import components only (client-side)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

interface Props {
  form: UseFormReturn<PropertyFormValues>;
}

// DynamicMarker to recenter map when coordinates change
const DynamicMarker: FC<{ lat: number; lng: number; icon: L.Icon }> = ({
  lat,
  lng,
  icon,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);

  return <Marker position={[lat, lng]} icon={icon} />;
};

const LocationTab: FC<Props> = ({ form }) => {
  const { register, watch } = form;

  // Watch latitude and longitude as strings
  const latitudeStr = watch("location.latitude") || "";
  const longitudeStr = watch("location.longitude") || "";

  // Convert to numbers
  const latitude = Number(latitudeStr);
  const longitude = Number(longitudeStr);

  const hasValidCoordinates =
    !isNaN(latitude) && !isNaN(longitude) && latitudeStr && longitudeStr;

  // Default center (Office Location)
  const defaultCenter: [number, number] = [
    5.021140992759621, 7.949140611081943,
  ];

  // Marker icon
  const markerIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/map/property_pin.png",
        iconSize: [32, 35],
        iconAnchor: [16, 32],
      }),
    [],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Form inputs */}
      <div className="flex-1 flex flex-col gap-4 h-full">
        <FormInput label="City" {...register("address.city")} />
        <FormInput label="State" {...register("address.state")} />
        <FormInput
          type="text"
          label="Latitude"
          {...register("location.latitude")}
        />
        <FormInput
          type="text"
          label="Longitude"
          {...register("location.longitude")}
        />
      </div>

      {/* Map */}
      <div className="flex-1 rounded-lg overflow-hidden">
        <div className="w-full min-h-75 lg:h-full">
          <MapContainer
            center={hasValidCoordinates ? [latitude, longitude] : defaultCenter}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hasValidCoordinates && (
              <DynamicMarker lat={latitude} lng={longitude} icon={markerIcon} />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
