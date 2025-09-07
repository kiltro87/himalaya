"use client"

import { tripConfig } from "@/lib/trip-config";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

// Helper function to format dates with Spanish locale
const formatDate = (date: string | Date) => {
  // For date-fns v3.6.0, we need to pass the locale as part of the options object
  return format(new Date(date), 'PPP', { locale: es } as any);
};

export function AccommodationsView() {
  const { accommodations } = tripConfig;
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {accommodations.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden">
          {!imageErrors[hotel.id] && (
            <Image
                src={hotel.image}
                alt={hotel.name}
                width={800}
                height={400}
                className="aspect-[2/1] w-full object-cover"
                data-ai-hint="hotel room"
                onError={() => handleImageError(hotel.id)}
            />
           )}
          <CardHeader>
            <CardTitle>{hotel.name}</CardTitle>
            <CardDescription>{hotel.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{hotel.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            {hotel.reservations.map(res => (
                <div key={res.id} className="w-full rounded-lg border bg-muted/50 p-3 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold">Check-in:</span>
                        <span>{formatDate(res.checkIn)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Check-out:</span>
                        <span>{formatDate(res.checkOut)}</span>
                    </div>
                     <div className="mt-2 flex justify-between border-t pt-2">
                        <span className="font-semibold">Confirmación:</span>
                        <span className="font-mono">{res.confirmationCode}</span>
                    </div>
                </div>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
