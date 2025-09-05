
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tripConfig } from "@/lib/trip-config";
import { ItineraryDay } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Image from "next/image";
import { PersonalizedTipsCard } from "./personalized-tips-card";
import { WeatherCard } from "./weather-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TodayPlanCard } from "./today-plan-card";
import { TodayBocadoCard } from "./today-bocado-card";
import { TodayBudgetCard } from "./today-budget-card";

const TodayMapCard = dynamic(() => import('./today-map-card').then(mod => mod.TodayMapCard), {
  loading: () => <Skeleton className="h-full w-full rounded-xl" />,
  ssr: false,
});


interface TodayViewProps {
  currentDayNumber: number;
}

export function TodayView({ currentDayNumber }: TodayViewProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentDay, setCurrentDay] = useState<ItineraryDay | null>(null);
  const [subtitle, setSubtitle] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setSubtitle(`${day}/${month}/${year}`);
    setIsClient(true);
  }, []);

  useEffect(() => {
    const dayData = tripConfig.itinerary.find(d => d.day === currentDayNumber);
    setCurrentDay(dayData || null);
    setImageError(false);
  }, [currentDayNumber]);

  if (!isClient || !currentDay) {
    return (
       <div className="flex min-h-screen w-full flex-col">
        <Header 
          icon={<Home size={48} />}
          title="Hoy"
          subtitle="..."
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto w-full max-w-none lg:max-w-6xl xl:max-w-7xl space-y-6">
                <Skeleton className="h-64 w-full" />
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                    <div className="col-span-1">
                        <Skeleton className="h-full w-full" />
                    </div>
                 </div>
            </div>
        </main>
      </div>
    );
  }

  const isNepal = currentDay.phase === 'nepal';
  const phaseTextClasses = isNepal ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400";


  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header 
        icon={<Home size={48} className="text-primary"/>}
        title="Hoy"
        subtitle={subtitle}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto grid w-full max-w-none gap-6 lg:max-w-6xl xl:max-w-7xl">
            <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {!imageError && (
                        <div className="relative h-64 w-full md:h-auto">
                            <Image 
                                src={currentDay.image}
                                alt={currentDay.title}
                                fill
                                className="object-cover"
                                data-ai-hint={`${currentDay.country} ${currentDay.location}`}
                                onError={() => setImageError(true)}
                                priority
                            />
                        </div>
                    )}
                    <div className={cn("flex flex-col p-6", imageError && "md:col-span-2")}>
                        <CardHeader className="p-0">
                            <div className="mb-2 flex items-center justify-between">
                                <p className={cn("font-semibold uppercase", phaseTextClasses)}>{currentDay.country}</p>
                                <div className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                                    Día {currentDay.day}
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-bold">{currentDay.location}</CardTitle>
                            <p className="text-lg text-muted-foreground">{currentDay.title}</p>
                        </CardHeader>
                        <CardContent className="p-0 pt-4 flex-1">
                            <p>{currentDay.description}</p>
                        </CardContent>
                    </div>
                </div>
            </Card>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <TodayPlanCard currentDay={currentDay} />
                <WeatherCard location={currentDay.location} />
                <TodayBocadoCard currentDay={currentDay} />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <TodayBudgetCard currentDay={currentDay} />
                    <PersonalizedTipsCard currentDay={currentDay} />
                </div>
                <div className="md:col-span-1 min-h-[400px]">
                   <TodayMapCard currentDay={currentDay} />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
