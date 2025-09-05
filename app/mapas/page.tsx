
'use client';

import { Header } from "@/components/header";
import { MapPin } from "lucide-react";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the MapClient component with SSR turned off.
// This is crucial for map libraries that interact with the window object.
const MapClient = dynamic(
  () => import('@/components/views/map-client'),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" /> 
  }
);

export default function MapsPage() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header 
        icon={<MapPin size={48} />}
        title="Mapas"
        subtitle="Navegación Interactiva"
      />
      <main className="flex-1">
        <MapClient />
      </main>
    </div>
  );
}
