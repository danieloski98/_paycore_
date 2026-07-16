"use client";

import {
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const tabs = [
    {
        value: "general",
        label: "General",
    },
    {
        value: "department",
        label: "Department",
    },
    {
        value: "security",
        label: "Security",
    },
];

export default function SettingsNav() {
    return (
        <TabsList
            variant="line"
            className="bg-transparent w-full justify-start border-b rounded-none p-0 h-auto"
        >
            <div className="w-1/3 flex">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="border-b-2 border-transparent"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </div>
        </TabsList>
    );
}