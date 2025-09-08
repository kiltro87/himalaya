
"use client";

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { tripConfig } from "@/lib/trip-config";

interface MapClientProps {
  mapboxApiKey: string;
}

const MapClient = ({ mapboxApiKey }: MapClientProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = mapboxApiKey;

  useEffect(() => {
    if (map.current || !mapContainer.current || !mapboxgl.accessToken) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [84.1240, 28.3949], // Center on Nepal
      zoom: 6,
    });

    // Corrected logic: Iterate over each day in the itinerary, not each place.
    const dailyLocations = tripConfig.itinerary.filter(day => day.coords);

    dailyLocations.forEach((day) => {
      if (day.coords) {
        const [lat, lon] = day.coords;
        new mapboxgl.Marker({ color: '#285A98' })
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h6>Día ${day.day}: ${day.location}</h6><p>${day.title}</p>`))
          .addTo(map.current!);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // mapboxApiKey is used before useEffect, so it's not a dependency

  return (
    <div ref={mapContainer} className="h-full w-full bg-muted" />
  );
};

export default MapClient;
