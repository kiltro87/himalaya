
"use client";

import { useState, useEffect } from "react";
import { getTripDay } from "@/lib/date-utils";
import { TodayView } from "@/components/views/today-view";
import { DaySimulator } from "@/components/day-simulator";

export default function Home() {
  const [currentDay, setCurrentDay] = useState(getTripDay());

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
  };
  
  return (
    <div>
      <TodayView currentDayNumber={currentDay} />
      <DaySimulator currentDay={currentDay} onDayChange={handleDayChange} />
    </div>
  );
}
