
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItineraryDay } from "@/lib/types";
import { Zap } from "lucide-react";

interface TodayPlanCardProps {
    currentDay: ItineraryDay;
}

export function TodayPlanCard({ currentDay }: TodayPlanCardProps) {
  return (
    <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Zap className="size-6 text-primary" />
            <CardTitle>Plan del Día</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{currentDay.planA}</p>
        </CardContent>
    </Card>
  );
}
