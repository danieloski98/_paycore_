"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const monthlyData = [
    { month: "Jan", amount: 2.2 },
    { month: "Feb", amount: 3.1 },
    { month: "Mar", amount: 2.5 },
    { month: "Apr", amount: 3.8 },
    { month: "May", amount: 3.6 },
    { month: "Jun", amount: 4.2 },
    { month: "Jul", amount: 1.8 },
];

const yearlyData = [
    { month: "2020", amount: 18 },
    { month: "2021", amount: 24 },
    { month: "2022", amount: 28 },
    { month: "2023", amount: 34 },
    { month: "2024", amount: 41 },
];

const chartConfig = {
    amount: {
        label: "Payroll",
        color: "#E5E7EB",
    },
} satisfies ChartConfig;

export function PayrollTrendChart() {
    const [filter, setFilter] = useState<"monthly" | "yearly">("monthly");

    const chartData = useMemo(() => {
        return filter === "monthly" ? monthlyData : yearlyData;
    }, [filter]);

    const activeIndex =
        filter === "monthly"
            ? chartData.length - 2 // June
            : chartData.length - 1;

    return (
        <Tabs value={filter}
            onValueChange={(v) => setFilter(v as "monthly" | "yearly")}>
            <Card className="rounded-xl shadow-none">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold">
                        Payroll Trends
                    </CardTitle>
                    <TabsList className="h-9">
                        <TabsTrigger value="monthly">
                            Monthly
                        </TabsTrigger>

                        <TabsTrigger value="yearly">
                            Yearly
                        </TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent>
                    <TabsContent value="yearly">
                        <ChartContainer
                            config={chartConfig}
                            className="h-80 w-full"
                        >
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 30,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />

                                <YAxis hide />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value: any) => [
                                                `₦${value}M`,
                                                "Payroll",
                                            ]}
                                        />
                                    }
                                />

                                <Bar
                                    dataKey="amount"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={42}
                                >
                                    <LabelList
                                        position="top"
                                        // formatter={(v: number) => `₦${v}M`}
                                        className="fill-black text-xs font-semibold"
                                    />

                                    {chartData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                index === activeIndex
                                                    ? "#000000"
                                                    : "#E5E7EB"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </TabsContent>
                    <TabsContent value="monthly">
                        <ChartContainer
                            config={chartConfig}
                            className="h-80 w-full"
                        >
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 30,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />

                                <YAxis hide />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value: any) => [
                                                `₦${value}M`,
                                                "Payroll",
                                            ]}
                                        />
                                    }
                                />

                                <Bar
                                    dataKey="amount"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={42}
                                >
                                    <LabelList
                                        position="top"
                                        // formatter={(v: number) => `₦${v}M`}
                                        className="fill-black text-xs font-semibold"
                                    />

                                    {chartData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                index === activeIndex
                                                    ? "#000000"
                                                    : "#E5E7EB"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}