
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tripConfig } from "@/lib/trip-config";
import { ItineraryDay } from "@/lib/types";
import { Wallet } from "lucide-react";
import { Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const PieChart = dynamic(() => import('recharts').then(recharts => recharts.PieChart), { ssr: false });

interface TodayBudgetCardProps {
    currentDay: ItineraryDay;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFBB28', '#FF8042', '#AF19FF'];

export function TodayBudgetCard({ currentDay }: TodayBudgetCardProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dailyExpenses = tripConfig.budget.categories.flatMap(cat => 
        cat.expenses.map(exp => ({...exp, categoryName: cat.name}))
    );

    const topExpenses = [...dailyExpenses]
        .sort((a,b) => b.amount - a.amount)
        .slice(0, 5)
        .map(e => ({ name: e.concept, value: e.amount }));

    const totalEstimate = topExpenses.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="col-span-1 row-span-1 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wallet className="text-primary" />
                    <span>Presupuesto</span>
                </CardTitle>
                <CardDescription>
                    {isClient ? (
                        <>
                            Estimación de gastos: <span className="font-bold">{tripConfig.budget.currency_symbol}{totalEstimate.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </>
                    ) : (
                        <Skeleton className="h-5 w-48" />
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 h-48">
                {isClient ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={topExpenses}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {topExpenses.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${tripConfig.budget.currency_symbol}${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]}/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <Skeleton className="h-full w-full" />
                )}
            </CardContent>
        </Card>
    );
}
