
import PersonalInfo from '@/components/employee/settings/personal-info'
import Security from '@/components/employee/settings/security'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="p-6">
        {/* Personal Information Section */}
        <PersonalInfo />
        <Security />
      </div>
    </div>
  )
}
