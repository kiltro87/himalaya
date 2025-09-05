
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { tripConfig } from '@/lib/trip-config';
import { getTripDay } from '@/lib/date-utils';


interface DaySimulatorProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

export function DaySimulator({ currentDay, onDayChange }: DaySimulatorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDaySelect = (value: string) => {
    const day = parseInt(value, 10);
    onDayChange(day);
  };
  
  const handleReset = () => {
    onDayChange(getTripDay()); // Reset to the actual current day
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
            <Select onValueChange={handleDaySelect} defaultValue={String(currentDay)}>
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
