
import { tripConfig } from "@/lib/trip-config";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import { parseISO } from "date-fns/parseISO";
import { isBefore } from "date-fns/isBefore";
import { isAfter } from "date-fns/isAfter";

/**
 * Calculates the current day number of the trip.
 * @returns The current day number (e.g., 1, 2, ...).
 */
export const getTripDay = (): number => {
    // In a real application, you'd use the current date.
    // For this demo, we can simulate a specific day.
    const today = new Date();
    // Forcing a specific day of the trip for demonstration.
    // Let's simulate being on Day 1 of the trip.
    // const simulatedDate = new Date("2025-10-09T12:00:00Z");
    // const today = simulatedDate;

    // Ensure the time part is ignored by setting it to the start of the day
    today.setHours(0, 0, 0, 0); 
    const tripStartDate = parseISO(tripConfig.trip.startDate);
    tripStartDate.setHours(0,0,0,0);
    const tripEndDate = parseISO(tripConfig.trip.endDate);
    tripEndDate.setHours(0,0,0,0);

    // If today is before the trip starts, show Day 1
    if (isBefore(today, tripStartDate)) {
        return 1;
    }

    // If today is after the trip ends, show the last day
    if (isAfter(today, tripEndDate)) {
        return tripConfig.trip.duration;
    }

    // Calculate the difference in days and add 1 (since day 1 is the start date)
    const dayNumber = differenceInCalendarDays(today, tripStartDate) + 1;
    return dayNumber;
};
