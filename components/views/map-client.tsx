
"use client";

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { tripConfig } from "@/lib/trip-config";

// Set the access token on the mapboxgl object
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

const MapClient = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current || !mapboxgl.accessToken) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [84.1240, 28.3949], // Center on Nepal
      zoom: 6,
    });

    const locations = tripConfig.itinerary
      .flatMap(day => day.places.map(place => ({ ...place, day: day.day, title: day.title })))
      .filter(place => place.coords);

    locations.forEach((loc) => {
      if (loc.coords) {
        const [lat, lon] = loc.coords;
        new mapboxgl.Marker({ color: '#285A98' })
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h6>${loc.name}</h6><p>Día ${loc.day}: ${loc.title}</p>`))
          .addTo(map.current!);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainer} className="h-full w-full bg-muted" />
  );
};

export default MapClient;
