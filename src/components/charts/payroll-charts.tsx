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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PayrollItem } from "@/models/payroll-model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface PayrollTrendChartProps {
    payrolls: PayrollItem[];
}

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const chartConfig = {
    amount: {
        label: "Payroll",
        color: "#E5E7EB",
    },
} satisfies ChartConfig;

export function PayrollTrendChart({ payrolls }: PayrollTrendChartProps) {
    const currentYear = new Date().getFullYear().toString();

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [filter, setFilter] = useState<"monthly" | "yearly">("monthly");

    const monthlyData = useMemo(() => {
        return MONTHS.map((month, index) => ({
            month,
            amount: payrolls.filter(
                (item) =>
                    item.month === index &&
                    item.year === selectedYear
            ).length,
        }));
    }, [payrolls, selectedYear]);

    const yearlyData = useMemo(() => {
        const grouped = payrolls.reduce<Record<string, number>>(
            (acc, payroll) => {
                acc[payroll.year] = (acc[payroll.year] ?? 0) + 1;
                return acc;
            },
            {}
        );

        return Object.entries(grouped)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([year, count]) => ({
                month: year,
                amount: count,
            }));
    }, [payrolls]);

    const chartData = useMemo(() => {
        return filter === "monthly"
            ? monthlyData
            : yearlyData;
    }, [filter, monthlyData, yearlyData]);

    const activeIndex =
        filter === "monthly"
            ? payrolls
                .filter((p) => p.year === selectedYear)
                .sort((a, b) => a.month - b.month)
                .at(-1)?.month ?? -1
            : chartData.length - 1;

    return (
        <Tabs value={filter}
            onValueChange={(v) => setFilter(v as "monthly" | "yearly")}>
            <Card className="rounded-xl shadow-none">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold">
                        Payroll Trends
                    </CardTitle>
                    <div className="flex items-center gap-3">
                        {filter === "monthly" && (
                            <Select
                                value={selectedYear}
                                onValueChange={setSelectedYear}
                            >
                                <SelectTrigger className="w-28">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {[...new Set(payrolls.map((p) => p.year))]
                                        .sort()
                                        .reverse()
                                        .map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year}
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )}

                        <TabsList>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly">Yearly</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>

                <CardContent>
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
                                        formatter={(value) => [
                                            `${value} Payroll ${Number(value) === 1 ? "" : "s"}`,
                                            "Created",
                                        ]}
                                    />
                                }
                            />

                            <Bar
                                dataKey="amount"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={42}
                            >
                                {/* <LabelList
                                    dataKey="amount"
                                    position="top"
                                    className="fill-black text-xs font-semibold"
                                /> */}

                                {chartData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            index === activeIndex
                                                ? "#000"
                                                : "#E5E7EB"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </Tabs>
    );
}