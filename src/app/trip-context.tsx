
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
// Import types and data from their correct sources
import { ItineraryDay } from '@/lib/types';
import { TRIP_ITINERARY } from '@/lib/trip-config'; // CORRECT: Import data directly

interface TripContextType {
  currentDay: ItineraryDay;
  setCurrentDay: (day: ItineraryDay) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
  initialDayNumber: number;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children, initialDayNumber }) => {
  const findDayByNumber = (dayNumber: number): ItineraryDay => {
    // This check is now safe because TRIP_ITINERARY is imported directly
    const adjustedDayNumber = Math.max(1, Math.min(dayNumber, TRIP_ITINERARY.length));
    return TRIP_ITINERARY[adjustedDayNumber - 1];
  };

  const [currentDay, setCurrentDay] = useState<ItineraryDay>(() => findDayByNumber(initialDayNumber));

  return (
    <TripContext.Provider value={{ currentDay, setCurrentDay }}>
      {children}
    </TripContext.Provider>
  );
};
