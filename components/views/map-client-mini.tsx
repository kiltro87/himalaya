
"use client";

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ItineraryDay } from "@/lib/types";

// Set the access token on the mapboxgl object
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

const MapClientMini = ({ currentDay }: { currentDay: ItineraryDay }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const locations = currentDay.places.filter(place => place.coords);
  const center: [number, number] = currentDay.coords ? [currentDay.coords[1], currentDay.coords[0]] : [84.1240, 28.3949]; // Lon, Lat
  const zoom = 11;

  useEffect(() => {
    if (map.current || !mapContainer.current || !mapboxgl.accessToken) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center,
      zoom: zoom,
    });

    locations.forEach((loc) => {
      if (loc.coords) {
        new mapboxgl.Marker({ color: '#4C86F9' })
          .setLngLat([loc.coords[1], loc.coords[0]])
          .setPopup(new mapboxgl.Popup().setHTML(`<h6>${loc.name}</h6><p>${loc.description}</p>`))
          .addTo(map.current!);
      }
    });

    // Cleanup function to remove map instance on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Remove dependencies to avoid re-initializing map

  return (
    <div ref={mapContainer} className="h-full w-full bg-muted rounded-xl overflow-hidden" />
  );
};

export default MapClientMini;
