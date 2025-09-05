
"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

const COLORS = [
  '#0088FE', // Azul brillante
  '#00C49F', // Verde menta
  '#FFBB28', // Amarillo ámbar
  '#FF8042', // Naranja coral
  '#AF19FF', // Púrpura eléctrico
  '#FF4274', // Rosa sandía
  '#82ca9d', // Verde salvia
  '#A28DFF', // Lavanda
  '#FFC0CB', // Rosa pastel
];

interface DistributionChartProps {
    data: { name: string; value: number }[];
    currencySymbol: string;
}

export function DistributionChart({ data, currencySymbol }: DistributionChartProps) {
    if (data.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No hay datos para mostrar
            </div>
        )
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={50}
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
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`]}
                contentStyle={{
                    background: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)"
                }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
        </PieChart>
      </ResponsiveContainer>
    );
}
