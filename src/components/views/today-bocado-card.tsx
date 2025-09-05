
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItineraryDay } from "@/lib/types";
import { Utensils } from "lucide-react";

interface TodayBocadoCardProps {
    currentDay: ItineraryDay;
}

export function TodayBocadoCard({ currentDay }: TodayBocadoCardProps) {
  return (
    <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Utensils className="size-6 text-primary" />
            <CardTitle>Bocado del Día</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{currentDay.bocado}</p>
        </CardContent>
    </Card>
  );
}
