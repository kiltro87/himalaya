
import { tripConfig } from "@/lib/trip-config";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plane, ArrowRight, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const monthMap: { [key: string]: number } = {
  'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
  'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
};

const parseDate = (dateString: string, year: number): Date => {
    const parts = dateString.toLowerCase().split(' '); // e.g., ['9', 'de', 'octubre', '22:45']
    if (parts.length < 4) return new Date(0); // Invalid date string format

    const day = parseInt(parts[0], 10);
    const monthStr = parts[2];
    const month = monthMap[monthStr];
    const timeParts = parts[3].split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    if (isNaN(day) || month === undefined || isNaN(hours) || isNaN(minutes)) {
        return new Date(0); // Return an invalid date if parsing fails
    }

    return new Date(year, month, day, hours, minutes);
};

export function FlightsView() {
  const { flights, trip } = tripConfig;

  // Sort flights based on the departure time of the first segment
  const sortedFlights = [...flights].sort((a, b) => {
    const dateA = a.segments.length > 0 ? parseDate(a.segments[0].fromDateTime, trip.year) : new Date(0);
    const dateB = b.segments.length > 0 ? parseDate(b.segments[0].fromDateTime, trip.year) : new Date(0);
    
    // Check for invalid dates
    if (dateA.getTime() === 0) return 1;
    if (dateB.getTime() === 0) return -1;
    
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      {sortedFlights.map((flight, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Plane className="text-primary" />
              <span>{flight.title}</span>
            </CardTitle>
            <CardDescription>{flight.airline}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {flight.segments.map((segment, segIndex) => (
                <li key={segIndex} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg">{segment.from}</div>
                    <ArrowRight className="text-muted-foreground" />
                    <div className="font-bold text-lg">{segment.to}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{segment.fromDateTime}</span>
                    <span>{segment.toDateTime}</span>
                  </div>
                  {segment.layover && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                      <Clock className="size-4" />
                      <span>{segment.layover}</span>
                    </div>
                  )}
                  {segIndex < flight.segments.length - 1 && <Separator className="my-4"/>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
