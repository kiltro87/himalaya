
"use client";

import { useState, useEffect } from "react";
import { fetchWeather } from "@/app/actions";
import { WeatherInfoOutput } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, WifiOff, Sunrise, Sunset, Wind, Droplets } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherCardProps {
  location: string;
}

export function WeatherCard({ location }: WeatherCardProps) {
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
      const cacheKey = `weather_${location}`;

      // 1. Try to load from cache
      try {
        const cachedData = localStorage.getItem(cacheKey);
        const now = new Date().getTime();
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (now - timestamp < 3600 * 1000) { // 1 hour cache
            // console.log(`Using cached weather for ${location}`);
            setWeather(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read weather from cache", e)
      }
      
      // 2. Check for internet connection
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setError("Offline. Mostrando últimos datos disponibles.");
        // We can still use stale cache data if offline
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setWeather(JSON.parse(cachedData).data);
        }
        setLoading(false);
        return;
      }
      
      // 3. Fetch from API
      const result = await fetchWeather(location);

      // Log the result that arrives at the client
      // console.log(`Weather result for ${location} in client:`, result);

      if (result.success && result.data) {
        setWeather(result.data);
         try {
          const cacheItem = { data: result.data, timestamp: new Date().getTime() };
          localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
        } catch (e) {
            console.error("Failed to write weather to cache", e);
        }
      } else {
        setError(result.error as string || "Error");
        // If the fetch fails, invalidate the cache to avoid showing stale/bad data
        localStorage.removeItem(cacheKey);
      }
      setLoading(false);
    }

    loadWeather();
  }, [location]);

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
          <Thermometer className="size-6 text-primary" />
          <CardTitle>Tiempo Actual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-32" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !weather) { // Only show full error if no data is available at all
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                <Thermometer className="size-6 text-primary" />
                <CardTitle>Tiempo Actual</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground pt-4">
                    <WifiOff className="size-5" />
                    <p>{error}</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  if (!weather) return null; // Should not happen if logic is correct

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
        <Thermometer className="size-6 text-primary" />
        <CardTitle>Tiempo en {weather.location}</CardTitle>
      </CardHeader>
      <CardContent>
          <div>
            <p className="text-4xl font-bold">
              {weather.icon} {Math.round(weather.temperature)}°C
            </p>
            <p className="text-muted-foreground capitalize">
                {weather.description} (Sensación: {Math.round(weather.feelsLike)}°C)
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
                <Sunrise className="size-5 text-muted-foreground" />
                <div>
                    <p className="font-semibold">{weather.sunrise}</p>
                    <p className="text-xs text-muted-foreground">Amanecer</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Sunset className="size-5 text-muted-foreground" />
                 <div>
                    <p className="font-semibold">{weather.sunset}</p>
                    <p className="text-xs text-muted-foreground">Atardecer</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Wind className="size-5 text-muted-foreground" />
                 <div>
                    <p className="font-semibold">{weather.windSpeed} km/h</p>
                    <p className="text-xs text-muted-foreground">Viento</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Droplets className="size-5 text-muted-foreground" />
                 <div>
                    <p className="font-semibold">{weather.humidity}%</p>
                    <p className="text-xs text-muted-foreground">Humedad</p>
                </div>
            </div>
          </div>
          {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
