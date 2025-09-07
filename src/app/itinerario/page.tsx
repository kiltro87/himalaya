
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { tripConfig } from "@/lib/trip-config";
import { ItineraryDay, WeatherInfoOutput } from "@/lib/types";
import { cn } from "@/lib/utils";
import { List, Calendar, ChevronRight, Thermometer, WifiOff, MapPin } from "lucide-react";
import { ItineraryDetailModal } from "@/components/views/itinerary-detail-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { es } from "date-fns/locale/es";
import { fetchWeather } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

function WeatherDisplay({ location }: { location: string }) {
  const [weather, setWeather] = useState<WeatherInfoOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      if (!location) {
          setLoading(false);
          return;
      };
      
      setLoading(true);
      setError(null);

      try {
        const cachedData = localStorage.getItem(`weather_${location}`);
        const now = new Date().getTime();
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (now - timestamp < 3600 * 1000) { // 1 hour cache
            setWeather(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read weather from cache", e)
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setError("Offline");
        setLoading(false);
        return;
      }
      
      const result = await fetchWeather(location);
      if (result.success && result.data) {
        setWeather(result.data);
         try {
          const cacheItem = { data: result.data, timestamp: new Date().getTime() };
          localStorage.setItem(`weather_${location}`, JSON.stringify(cacheItem));
        } catch (e) {
            console.error("Failed to write weather to cache", e);
        }
      } else {
        setError(result.error as string || "Error");
      }
      setLoading(false);
    }
    loadWeather();
  }, [location]);

  if (loading) return <Skeleton className="h-5 w-20" />;

  if (error) return (
    <div className="flex items-center gap-1 text-muted-foreground">
        <WifiOff className="size-4" />
        <span className="text-xs">{error}</span>
    </div>
  );

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1">
       <span>{weather.icon}</span>
       <span>{Math.round(weather.temperature)}°C</span>
    </div>
  );
}


function ItineraryCard({ item, onClick, isLast }: { item: ItineraryDay, onClick: () => void, isLast: boolean }) {
  const [imageError, setImageError] = useState(false);
  const phaseBadgeClass = item.phase === 'nepal'
    ? "bg-blue-100 text-blue-800 border-blue-200"
    : item.phase === 'bhutan'
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-gray-100 text-gray-800 border-gray-200";

  const itemDate = parseISO(tripConfig.trip.startDate);
  itemDate.setDate(itemDate.getDate() + item.day - 1);
  
  return (
    <div className="relative flex gap-6">
        <div className="flex flex-col items-center">
            <div className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {item.day}
            </div>
            {!isLast && <div className="h-full w-0.5 bg-border" />}
        </div>
        
        <Card className="w-full cursor-pointer overflow-hidden transition-shadow hover:shadow-lg" onClick={onClick}>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {!imageError && (
                  <div className="relative h-48 w-full md:h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={`${item.country} ${item.location}`}
                        onError={() => setImageError(true)}
                      />
                  </div>
                )}
                <div className={cn("flex flex-col p-4", imageError ? "md:col-span-3" : "md:col-span-2")}>
                    <div className="flex items-start justify-between">
                         <div>
                            <Badge variant="outline" className={cn("border", phaseBadgeClass)}>{item.country}</Badge>
                            <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                         </div>
                         <ChevronRight className="size-6 text-muted-foreground"/>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="size-4" />
                        {item.location}
                    </p>
                    <div className="mt-4 flex-1">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>{format(itemDate, "eeee, d LLL", { locale: es })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Thermometer className="size-4" />
                            <WeatherDisplay location={item.location} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
}

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState<ItineraryDay | null>(null);
  const [sortedItinerary, setSortedItinerary] = useState<ItineraryDay[]>([]);

  useEffect(() => {
    const sorted = [...tripConfig.itinerary].sort((a, b) => a.day - b.day);
    setSortedItinerary(sorted);
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Header 
          icon={<List size={48} className="text-primary"/>}
          title="Itinerario"
          subtitle="18 Días de Aventura"
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto w-full max-w-4xl">
              <div className="flex flex-col gap-6">
                {sortedItinerary.map((item, index) => (
                  item.day && <ItineraryCard key={item.id} item={item} onClick={() => setSelectedDay(item)} isLast={index === sortedItinerary.length - 1} />
                ))}
              </div>
          </div>
        </main>
      </div>
      {selectedDay && <ItineraryDetailModal day={selectedDay} onClose={() => setSelectedDay(null)} />}
    </>
  );
}
