
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ItineraryDay } from "@/lib/types";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const MapClientMini = dynamic(
  () => import('@/components/views/map-client-mini'),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-xl" /> 
  }
);

interface TodayMapCardProps {
    currentDay: ItineraryDay;
    mapboxApiKey: string;
}

export function TodayMapCard({ currentDay, mapboxApiKey }: TodayMapCardProps) {
  return (
    <Card className="h-full overflow-hidden">
        <CardContent className="p-0 h-full">
            <MapClientMini currentDay={currentDay} mapboxApiKey={mapboxApiKey} />
        </CardContent>
    </Card>
  );
}
