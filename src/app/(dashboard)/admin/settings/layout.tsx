"use client";

import { Tabs } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

import SettingHeader from "./_components/settings-header";
import SettingsNav from "./_components/settings-nav";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const current =
        pathname.split("/").pop() ?? "general";

    return (
        <div className="space-y-8 p-6">
            <SettingHeader />
            <Tabs
                value={current}
                onValueChange={(value) =>
                    router.push(`/admin/settings/${value}`)
                }
            >
                <SettingsNav />
            </Tabs>

            {children}

        </div>
    );
}