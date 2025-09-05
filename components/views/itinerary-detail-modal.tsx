
"use client";

import { ItineraryDay } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Utensils, Lightbulb, Hotel, Plane, Footprints, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ItineraryDetailModalProps {
  day: ItineraryDay;
  onClose: () => void;
}

export function ItineraryDetailModal({ day, onClose }: ItineraryDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
       {!imageError && (
        <div className="relative h-64 w-full">
            <Image
              src={day.image}
              alt={day.title}
              fill
              className="object-cover"
              data-ai-hint={`${day.country} ${day.location}`}
              onError={() => setImageError(true)}
            />
            <div className="absolute right-4 top-4">
              <Badge>Día {day.day}</Badge>
            </div>
          </div>
        )}
        <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">{day.title}</DialogTitle>
              <DialogDescription className="text-lg">
                {day.location}, {day.country}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <MapPin className="text-primary size-5" />
                    Lugares
                </h3>
                <div className="space-y-2 pl-4">
                {day.places.map(place => (
                    <div key={place.name} className="flex items-start gap-4">
                        <span className="text-xl">{place.icon}</span>
                        <div>
                            <p className="font-semibold">{place.name}</p>
                            <p className="text-sm text-muted-foreground">{place.description}</p>
                        </div>
                    </div>
                ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Plane className="text-primary size-5" />
                    Plan del Día (Plan A)
                </h3>
                <p className="text-muted-foreground">{day.planA}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Footprints className="text-primary size-5" />
                    Plan Alternativo (Plan B)
                </h3>
                <p className="text-muted-foreground">{day.planB}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="text-primary size-5" />
                    Consejo del Día
                </h3>
                <p className="text-muted-foreground">{day.consejo}</p>
              </div>
               <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Utensils className="text-primary size-5" />
                    Bocado del Día
                </h3>
                <p className="text-muted-foreground">{day.bocado}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Hotel className="text-primary size-5" />
                    Alojamiento
                </h3>
                <div className="rounded-lg border bg-muted/50 p-3">
                    <p className="font-bold">{day.accommodation.name}</p>
                </div>
              </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
