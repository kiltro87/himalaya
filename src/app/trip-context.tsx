
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
// Import types and the new tripConfig object
import { ItineraryDay } from '@/lib/types';
import { tripConfig } from '@/lib/trip-config';

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
    // Use the itinerary from the imported tripConfig object
    const itinerary = tripConfig.itinerary;
    const adjustedDayNumber = Math.max(1, Math.min(dayNumber, itinerary.length));
    const day = itinerary.find(d => d.day === adjustedDayNumber);
    if (!day) {
        // As a fallback, return the first day if no match is found.
        // This should not happen with adjustedDayNumber, but it's a safe fallback.
        return itinerary[0];
    }
    return day;
  };

  const [currentDay, setCurrentDay] = useState<ItineraryDay>(() => findDayByNumber(initialDayNumber));

  return (
    <TripContext.Provider value={{ currentDay, setCurrentDay }}>
      {children}
    </TripContext.Provider>
  );
};
