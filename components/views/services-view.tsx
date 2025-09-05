
import { tripConfig } from "@/lib/trip-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ShieldCheck, Phone, Info, Globe, Building } from "lucide-react";

const iconMap = {
  tour_operator: <Briefcase />,
  insurance: <ShieldCheck />,
  emergency: <Phone />,
  default: <Info />
};

export function ServicesView() {
  const { services } = tripConfig;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Agencies */}
      {services.agencies.map((agency) => (
        <Card key={agency.id} className="flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-full text-primary">{iconMap.tour_operator}</div>
                <CardTitle>{agency.name}</CardTitle>
             </div>
            <CardDescription>{agency.tour}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <p className="text-sm text-muted-foreground">{agency.description}</p>
            <div className="flex items-center gap-2 text-sm">
                <Building className="size-4"/>
                <span>{agency.contact}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Globe className="size-4"/>
                <a href={agency.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Visitar web
                </a>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Insurance */}
      <Card className="flex flex-col">
        <CardHeader>
           <div className="flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-full text-primary">{iconMap.insurance}</div>
                <CardTitle>{services.insurance.name}</CardTitle>
           </div>
          <CardDescription className={services.insurance.status === 'pending' ? 'text-amber-500' : 'text-green-500'}>
            {services.insurance.status === 'pending' ? 'Pendiente' : 'Confirmado'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{services.insurance.description}</p>
        </CardContent>
      </Card>
      
      {/* Emergency */}
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-full text-primary">{iconMap.emergency}</div>
                <CardTitle>{services.emergency.name}</CardTitle>
          </div>
          <CardDescription>Contactos clave para tu seguridad</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 text-sm">
          <p><strong className="font-semibold">Embajada:</strong> {services.emergency.embassy}</p>
          <p><strong className="font-semibold">Clínica:</strong> {services.emergency.hospital}</p>
          <p><strong className="font-semibold">Zona Horaria:</strong> {services.emergency.timezone}</p>
        </CardContent>
      </Card>
    </div>
  );
}
