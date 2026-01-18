"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

type Pin = {
  label: string;
  lat: number;
  lng: number;
  type?: string;
};

interface MapProps {
  pins: Pin[];
  center?: { lat: number; lng: number };
  height?: string | number;
  className?: string;
}

export default function LeafletMap({
  pins,
  center,
  height = "400px",
  className = "w-full",
}: MapProps) {
  const defaultCenter =
    center ||
    (pins[0]
      ? { lat: pins[0].lat, lng: pins[0].lng }
      : { lat: 6.5244, lng: 3.3792 });

  const [interactive, setInteractive] = useState(false);
  const [activePin, setActivePin] = useState<number | null>(null);

  const purpleIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "/map/map_pin.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -32],
      }),
    [],
  );

  const MapEvents = () => {
    const map = useMap();
    if (interactive) {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    }
    return null;
  };

  const handlePinClick = (idx: number, pin: Pin, mapInstance: L.Map) => {
    setActivePin(idx); // always activate clicked pin
    mapInstance.setView([pin.lat, pin.lng], 20, { animate: true });
    setInteractive(true);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <MapContainer
        center={defaultCenter}
        zoom={14} // default zoom
        className={`${className} h-full z-0`}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <MapEvents />

        {pins.map((pin, idx) => (
          <Marker
            key={idx}
            position={[pin.lat, pin.lng]}
            icon={purpleIcon}
            eventHandlers={{
              click: (e) => handlePinClick(idx, pin, e.target._map),
            }}
          >
            {/* Default popup showing label */}
            <Popup>{pin.label}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Fixed Google Maps button */}
      {activePin !== null && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${pins[activePin].lat},${pins[activePin].lng}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 absolute top-0 right-0 z-20 px-10 py-3 bg-purple-700 text-xl font-light text-white rounded-lg shadow-lg hover:bg-purple-800 transition"
        >
          <ExternalLink className="w-8 h-8" strokeWidth={1} />
          Open in Google Maps
        </a>
      )}

      {/* Overlay to hint "click to interact" */}
      {!interactive && (
        <div
          className="absolute inset-0 bg-transparent cursor-pointer z-10"
          onClick={() => setInteractive(true)}
        />
      )}
    </div>
  );
}
