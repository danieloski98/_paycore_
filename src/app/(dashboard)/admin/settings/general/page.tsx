
import CompanyProfile from '@/components/admin/settings/general/company-profile'
import CompanyUser from '@/components/admin/settings/general/company-user'

const General = () => {

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Company Profile */}
      <div className="lg:col-span-2 space-y-6">
       <CompanyProfile />
      </div>

      {/* Sidebar */}
      <CompanyUser />
    </div>
  )
}

export default General