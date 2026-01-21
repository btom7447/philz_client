"use client";

import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { IProperty } from "./PropertiesList";

// Pin icon
const homeIcon = new L.Icon({
  iconUrl: "/map/property_pin.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

interface Props {
  properties: IProperty[];
  selectedPropertyId: string | null;
}

// FlyToProperty component
const FlyToProperty = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  // Validate coordinates
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 0.6 });
  }, [lat, lng, map]);

  return null;
};

// Fit bounds to all properties
const FitBoundsToProperties = ({ properties }: { properties: IProperty[] }) => {
  const map = useMap();

  useEffect(() => {
    const coords = properties
      .map((p) => p.location?.coordinates)
      .filter(
        (c): c is [number, number] =>
          Array.isArray(c) && c.length === 2 && !isNaN(c[0]) && !isNaN(c[1]),
      )
      .map((c) => [c[1], c[0]] as [number, number]);

    if (coords.length === 0) return;

    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [properties, map]);

  return null;
};

const PropertiesDashboardMap: FC<Props> = ({
  properties,
  selectedPropertyId,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Track window width to only render map on desktop
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1150); // 2xl
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!isDesktop) return null; // completely skip rendering on mobile

  const selected = properties.find(
    (p) =>
      p._id === selectedPropertyId &&
      p.location?.coordinates?.length === 2 &&
      !isNaN(p.location.coordinates[0]) &&
      !isNaN(p.location.coordinates[1]),
  );

  return (
    <div className="w-full h-full min-w-105">
      <MapContainer
        center={[6.5244, 3.3792]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Zoom to all properties */}
        <FitBoundsToProperties properties={properties} />

        {/* Fly to selected */}
        {selected && (
          <FlyToProperty
            lat={selected.location.coordinates[1]}
            lng={selected.location.coordinates[0]}
          />
        )}

        {properties.map((p) =>
          p.location?.coordinates?.length === 2 &&
          !isNaN(p.location.coordinates[0]) &&
          !isNaN(p.location.coordinates[1]) ? (
            <Marker
              key={p._id}
              icon={homeIcon}
              position={[p.location.coordinates[1], p.location.coordinates[0]]}
            >
              <Popup>
                <strong>{p.title}</strong>
                <br />
                {p.address.city}
                <br />${p.price.toLocaleString()}
              </Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
    </div>
  );
};

export default PropertiesDashboardMap;
