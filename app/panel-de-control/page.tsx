
import { Header } from "@/components/header";
import { BarChart } from "lucide-react";
import { tripConfig } from "@/lib/trip-config";
import { DashboardContent } from "@/components/views/dashboard-content";

export default function ControlPanelPage() {
  const { budget } = tripConfig;
  
  const budgetDistributionData = budget.categories.map(cat => ({
      name: cat.name,
      value: cat.budget
  }));

  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header 
        icon={<BarChart size={48} className="text-primary" />}
        title="Panel de Control"
        subtitle="Estadísticas y Progreso del Viaje"
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <DashboardContent
                budgetConfig={budget}
                packingConfig={tripConfig.packing}
                itineraryLength={tripConfig.itinerary.length}
                budgetDistributionData={budgetDistributionData}
            />
        </div>
      </main>
    </div>
  );
}
