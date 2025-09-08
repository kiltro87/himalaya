
"use client";

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ItineraryDay } from "@/lib/types";

interface MapClientMiniProps {
  currentDay: ItineraryDay;
  mapboxApiKey: string;
}

const MapClientMini = ({ currentDay, mapboxApiKey }: MapClientMiniProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  mapboxgl.accessToken = mapboxApiKey;

  // --- Intelligent Center and Zoom Logic ---
  const getMapState = () => {
    // Default to Barcelona, a more relevant fallback for this trip
    let center: [number, number] = [2.1734, 41.3851]; 
    let zoom = 10;

    if (currentDay.coords) {
      // Use day's specific coordinates if available (Lon, Lat)
      center = [currentDay.coords[1], currentDay.coords[0]];
      zoom = currentDay.zoom || 11;
    } else if (currentDay.places && currentDay.places.length > 0) {
      // Find the first place with coordinates to use as center
      const firstPlaceWithCoords = currentDay.places.find(p => p.coords);
      if (firstPlaceWithCoords && firstPlaceWithCoords.coords) {
        center = [firstPlaceWithCoords.coords[1], firstPlaceWithCoords.coords[0]];
        zoom = currentDay.zoom || 12; // Zoom in a bit more if centering on a specific place
      }
    }
    return { center, zoom };
  };

  // --- Effect for Initializing the Map --- 
  useEffect(() => {
    if (map.current || !mapContainer.current || !mapboxgl.accessToken) return;

    const { center, zoom } = getMapState();

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center,
      zoom: zoom,
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount

  // --- Effect for Updating Map when currentDay changes ---
  useEffect(() => {
    if (!map.current) return; 

    // 1. Clear old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // 2. Update center and zoom
    const { center, zoom } = getMapState();
    map.current.flyTo({ center, zoom });

    // 3. Add new markers
    const locations = currentDay.places.filter(place => place.coords);
    const newMarkers: mapboxgl.Marker[] = [];
    locations.forEach((loc) => {
      if (loc.coords) {
        const marker = new mapboxgl.Marker({ color: '#4C86F9' })
          .setLngLat([loc.coords[1], loc.coords[0]])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${loc.name}</h6><p>${loc.description || ''}</p>`))
          .addTo(map.current!);
        newMarkers.push(marker);
      }
    });
    markersRef.current = newMarkers;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]); // Re-run whenever the currentDay changes

  return (
    <div ref={mapContainer} className="h-full w-full bg-muted rounded-xl overflow-hidden" />
  );
};

export default MapClientMini;
