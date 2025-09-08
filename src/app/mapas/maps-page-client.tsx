
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the MapClient component with SSR turned off inside a Client Component.
const MapClient = dynamic(
  () => import('@/components/views/map-client'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />
  }
);

interface MapsPageClientProps {
  mapboxApiKey: string;
}

export function MapsPageClient({ mapboxApiKey }: MapsPageClientProps) {
  return <MapClient mapboxApiKey={mapboxApiKey} />;
}
