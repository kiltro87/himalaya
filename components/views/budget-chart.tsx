
"use client"

import { Cell, Legend, ResponsiveContainer } from "recharts";
import { BudgetConfig } from "@/lib/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const PieChart = dynamic(() => import('recharts').then(recharts => recharts.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(recharts => recharts.Pie), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(recharts => recharts.Tooltip), { ssr: false });

const COLORS = [
  '#0088FE', // Azul brillante
  '#00C49F', // Verde menta
  '#FFBB28', // Amarillo ámbar
  '#FF8042', // Naranja coral
  '#AF19FF', // Púrpura eléctrico
  '#FF4274', // Rosa sandía
  '#82ca9d', // Verde salvia
];


interface BudgetChartProps {
    budget: BudgetConfig;
}

export function BudgetChart({ budget }: BudgetChartProps) {
    const data = budget.categories.map(cat => ({
        name: cat.name,
        value: cat.spent
    }));

     if (!data || data.length === 0) {
        return <Skeleton className="h-full w-full" />;
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                innerRadius={60}
                paddingAngle={3}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip 
                formatter={(value: number) => [`${budget.currency_symbol}${value.toLocaleString()}`]}
                contentStyle={{
                    background: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)"
                }}
            />
            <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
}
