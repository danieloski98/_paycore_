import React from 'react'

const SettingHeader = () => {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <section className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your company profile, payroll rules, and compliance records.
                </p>
            </section>
        </div>
    )
}

export default SettingHeader