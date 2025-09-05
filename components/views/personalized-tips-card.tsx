
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ItineraryDay, PersonalizedTravelTipsOutput } from "@/lib/types";
import { getPersonalizedTips } from "@/app/actions";
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  itineraryDay: z.string().min(10, { message: "Please provide more details about your itinerary for the day." }),
  userPreferences: z.string().min(10, { message: "Please tell us more about your preferences." }),
});

type FormValues = z.infer<typeof formSchema>;

interface PersonalizedTipsCardProps {
    currentDay: ItineraryDay;
}

export function PersonalizedTipsCard({ currentDay }: PersonalizedTipsCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PersonalizedTravelTipsOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itineraryDay: `${currentDay.title}: ${currentDay.description}`,
      userPreferences: "Me gusta la fotografía, la comida local y evitar las grandes multitudes.",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const response = await getPersonalizedTips(data);
    if (response.success) {
      setResult(response.data!);
    } else {
      const formErrors = response.error?.formErrors;
      setError(Array.isArray(formErrors) && formErrors.length > 0 ? formErrors[0] : "An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Wand2 className="size-8 text-primary" />
            <div>
                <CardTitle className="text-2xl font-bold">Asistente de Viaje AI</CardTitle>
                <CardDescription>Obtén consejos personalizados para tu día.</CardDescription>
            </div>
        </div>
      </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col flex-1">
            <CardContent className="flex-1 space-y-6">
                <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 h-full">
                    <FormField
                    control={form.control}
                    name="itineraryDay"
                    render={({ field }) => (
                        <FormItem className="h-full flex flex-col">
                        <FormLabel>Itinerario del Día</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe your plan for today..." {...field} className="flex-1 resize-none" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="userPreferences"
                    render={({ field }) => (
                        <FormItem className="h-full flex flex-col">
                        <FormLabel>Tus Preferencias</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What do you enjoy? (e.g., food, activities, pace)" {...field} className="flex-1 resize-none" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </CardContent>
             <CardFooter>
                 <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                        </>
                    ) : (
                       <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Obtener Consejos
                       </>
                    )}
                 </Button>
            </CardFooter>
          </form>
        </Form>
      {(error || result) && (
        <CardFooter className="flex-col items-start gap-4">
          {error && (
              <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
          {result && (
              <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-4">
                  <div>
                      <h4 className="font-semibold">Consejo de Viaje:</h4>
                      <p className="text-sm text-muted-foreground">{result.travelTip}</p>
                  </div>
                  <div>
                      <h4 className="font-semibold">Sugerencia Gastronómica:</h4>
                      <p className="text-sm text-muted-foreground">{result.foodSuggestion}</p>
                  </div>
                  <div>
                      <h4 className="font-semibold">Actividad Alternativa (Plan B):</h4>
                      <p className="text-sm text-muted-foreground">{result.alternativeActivity}</p>
                  </div>
              </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
