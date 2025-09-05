
"use client";

import { useState, useEffect } from "react";
import { BudgetConfig, Expense, PackingConfig } from "@/lib/types";
import * as budgetService from "@/services/budget-service";
import * as packingService from "@/services/packing-service";
import { processQueue } from "@/services/sync-service";
import { getTripDay } from "@/lib/date-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Coins, Package } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const DistributionChart = dynamic(() => import('@/components/views/distribution-chart').then(mod => mod.DistributionChart), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
  ssr: false
});

const BudgetView = dynamic(() => import('@/components/views/budget-view').then(mod => mod.BudgetView), {
  loading: () => <Skeleton className="h-40 w-full" />,
  ssr: false
});

const PackingView = dynamic(() => import('@/components/views/packing-view').then(mod => mod.PackingView), {
  loading: () => <Skeleton className="h-40 w-full" />,
  ssr: false
});

const CurrencyConverterView = dynamic(() => import('@/components/views/currency-converter-view').then(mod => mod.CurrencyConverterView), {
  loading: () => <Skeleton className="h-40 w-full" />,
  ssr: false
});

interface DashboardContentProps {
  budgetConfig: BudgetConfig;
  packingConfig: PackingConfig;
  itineraryLength: number;
  budgetDistributionData: { name: string; value: number }[];
}

function StatisticsCard({ title, value, footer }: { title: string; value: string; footer?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {footer && <p className="text-xs text-muted-foreground">{footer}</p>}
      </CardContent>
    </Card>
  );
}

export function DashboardContent({ budgetConfig, packingConfig, itineraryLength, budgetDistributionData }: DashboardContentProps) {
  const [packingState, setPackingState] = useState<{ [key: string]: boolean }>({});
  const [userExpenses, setUserExpenses] = useState<Expense[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      await processQueue();

      const [expenses, savedPackingState] = await Promise.all([
        budgetService.getSpentExpenses(),
        packingService.getPackingState()
      ]);
      
      setUserExpenses(expenses);
      setPackingState(savedPackingState || {});
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setCurrentDay(getTripDay());
    
    const handleOnline = async () => {
        console.log("App is back online. Processing queue...");
        const success = await processQueue();
        if (success) {
            // If the queue was processed, we should refetch data to get the latest state
            await loadData();
        }
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalBudget = budgetConfig.categories.reduce((acc, cat) => acc + cat.budget, 0);
  const totalSpent = userExpenses.reduce((acc, exp) => acc + exp.amount, 0);

  const allItems = packingConfig.categories.flatMap(cat => cat.items);
  const totalItems = allItems.length;
  const packedItems = Object.values(packingState).filter(Boolean).length;
  const packingProgress = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  
  const daysRemaining = Math.max(0, itineraryLength - currentDay);

  const spentBudgetData = budgetConfig.categories
    .map(cat => ({
        name: cat.name,
        value: userExpenses
            .filter(e => e.categoryId === cat.id)
            .reduce((acc, exp) => acc + exp.amount, 0)
    }))
    .filter(cat => cat.value > 0);
  
  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
         <StatisticsCard title="Días Restantes" value={`${daysRemaining} / ${itineraryLength}`} footer="del viaje" />
         <StatisticsCard title="Progreso de Equipaje" value={`${packingProgress}%`} footer={`${packedItems} de ${totalItems} items`} />
         <StatisticsCard title="Presupuesto Gastado" value={`${budgetConfig.currency_symbol}${totalSpent.toLocaleString()}`} footer={`de ${budgetConfig.currency_symbol}${totalBudget.toLocaleString()}`} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
              <CardHeader>
                  <CardTitle className="font-bold">Distribución del Presupuesto</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-full">
                  <DistributionChart data={budgetDistributionData} currencySymbol={budgetConfig.currency_symbol} />
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="font-bold">Distribución de Gastos</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-full">
                  <DistributionChart data={spentBudgetData} currencySymbol={budgetConfig.currency_symbol} />
              </CardContent>
          </Card>
      </div>
      
      <Accordion type="multiple" className="space-y-6" defaultValue={["budget"]}>
        <AccordionItem value="budget" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Coins className="size-6 text-primary" /> Detalle de Gastos</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent>
                    <BudgetView 
                      expenses={userExpenses} 
                      onExpensesChange={setUserExpenses} 
                    />
                  </CardContent>
                </AccordionContent>
            </Card>
        </AccordionItem>
        <AccordionItem value="packing" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Package className="size-6 text-primary" /> Equipaje</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent>
                    <PackingView 
                      packingState={packingState} 
                      onPackingChange={setPackingState} 
                    />
                  </CardContent>
                </AccordionContent>
            </Card>
        </AccordionItem>
         <AccordionItem value="currency" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Coins className="size-6 text-primary" /> Conversor de Divisas</CardTitle>
              </AccordionTrigger>
              <AccordionContent><CardContent><CurrencyConverterView /></CardContent></AccordionContent>
            </Card>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-bold">Distribución del Presupuesto</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
               <Skeleton className="h-full w-full" />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="font-bold">Distribución de Gastos</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
                <Skeleton className="h-full w-full" />
            </CardContent>
        </Card>
      </div>
       <Accordion type="multiple" className="space-y-6" defaultValue={["budget"]}>
        <AccordionItem value="budget" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Coins className="size-6 text-primary" /> Detalle de Gastos</CardTitle>
              </AccordionTrigger>
              <AccordionContent><CardContent><Skeleton className="h-40 w-full" /></CardContent></AccordionContent>
            </Card>
        </AccordionItem>
        <AccordionItem value="packing" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Package className="size-6 text-primary" /> Equipaje</CardTitle>
              </AccordionTrigger>
              <AccordionContent><CardContent><Skeleton className="h-40 w-full" /></CardContent></AccordionContent>
            </Card>
        </AccordionItem>
         <AccordionItem value="currency" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                  <CardTitle className="flex w-full items-center gap-4 text-2xl font-bold"><Coins className="size-6 text-primary" /> Conversor de Divisas</CardTitle>
              </AccordionTrigger>
              <AccordionContent><CardContent><Skeleton className="h-20 w-full" /></CardContent></AccordionContent>
            </Card>
        </AccordionItem>
      </Accordion>
    </>
  )
}

function StatisticsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground"><Skeleton className="h-5 w-24" /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Skeleton className="h-7 w-20" /></div>
        <div className="text-xs text-muted-foreground mt-1"><Skeleton className="h-4 w-28" /></div>
      </CardContent>
    </Card>
  );
}
