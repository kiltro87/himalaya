
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
// Import the centralized tripConfig object
import { tripConfig } from '@/lib/trip-config';
import { getTripDay } from '@/lib/date-utils';
import { useTripContext } from '@/app/trip-context'; 

export function DaySimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentDay, setCurrentDay } = useTripContext(); 

  const handleDaySelect = (value: string) => {
    const dayNumber = parseInt(value, 10);
    // Use tripConfig.itinerary instead of the old TRIP_ITINERARY
    const newDay = tripConfig.itinerary.find(d => d.day === dayNumber);
    if (newDay) {
      setCurrentDay(newDay);
    }
  };
  
  const handleReset = () => {
    const actualDayNumber = getTripDay();
    // Use tripConfig.itinerary instead of the old TRIP_ITINERARY
    const actualDay = tripConfig.itinerary.find(d => d.day === actualDayNumber);
    if (actualDay) {
        setCurrentDay(actualDay);
    }
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="icon" className="fixed bottom-24 right-4 z-40 h-14 w-14 rounded-full bg-purple-600 shadow-lg hover:bg-purple-700 md:bottom-6">
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Day Simulator</SheetTitle>
        </SheetHeader>
        <div className="mt-8 grid gap-6">
            <p className="text-muted-foreground">Select a day to simulate the "Today" view.</p>
            <Select onValueChange={handleDaySelect} defaultValue={String(currentDay.day)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                    {tripConfig.itinerary.map(day => (
                        <SelectItem key={day.id} value={String(day.day)}>
                            Day {day.day}: {day.location}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleReset}>Reset to Actual Day</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
