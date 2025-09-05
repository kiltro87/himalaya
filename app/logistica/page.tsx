
import { Header } from "@/components/header";
import { Briefcase, Plane, Hotel } from "lucide-react";
import { AccommodationsView } from "@/components/views/accommodations-view";
import { FlightsView } from "@/components/views/flights-view";
import { ServicesView } from "@/components/views/services-view";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const sections = [
  {
    id: "hotels",
    title: "Hoteles",
    icon: <Hotel className="size-6 text-primary" />,
    component: <AccommodationsView />,
  },
  {
    id: "flights",
    title: "Vuelos",
    icon: <Plane className="size-6 text-primary" />,
    component: <FlightsView />,
  },
  {
    id: "services",
    title: "Servicios y Agencias",
    icon: <Briefcase className="size-6 text-primary" />,
    component: <ServicesView />,
  }
];

export default function LogisticsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header 
        icon={<Briefcase size={48} className="text-primary" />}
        title="Logística"
        subtitle="Reservas, vuelos y contactos"
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
           <Accordion type="multiple" defaultValue={["hotels", "flights", "services"]} className="space-y-6">
              {sections.map(section => (
                <AccordionItem value={section.id} key={section.id} className="border-none">
                   <Card>
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold">
                            {section.icon}
                            {section.title}
                        </CardTitle>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent>
                        {section.component}
                      </CardContent>
                    </AccordionContent>
                   </Card>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
