
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
}

export function TodayMapCard({ currentDay }: TodayMapCardProps) {
  return (
    <Card className="h-full overflow-hidden">
        <CardContent className="p-0 h-full">
            <MapClientMini currentDay={currentDay} />
        </CardContent>
    </Card>
  );
}
