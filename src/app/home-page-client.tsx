
"use client";

import { TodayView } from "@/components/views/today-view";
import { DaySimulator } from "@/components/day-simulator";
import { TripProvider } from "./trip-context";

interface HomePageClientProps {
  initialDayNumber: number;
  mapboxApiKey: string;
  openWeatherApiKey: string;
}

export function HomePageClient({ 
  initialDayNumber, 
  mapboxApiKey, 
  openWeatherApiKey 
}: HomePageClientProps) {

  // The TripProvider will now manage the state of the current day.
  // All child components will consume the context from the provider.
  return (
    <TripProvider initialDayNumber={initialDayNumber}>
      <div>
        {/* TodayView will get the current day from the context */}
        <TodayView 
          mapboxApiKey={mapboxApiKey} 
          openWeatherApiKey={openWeatherApiKey}
        />
        {/* DaySimulator will get and set the current day from the context */}
        <DaySimulator />
      </div>
    </TripProvider>
  );
}
