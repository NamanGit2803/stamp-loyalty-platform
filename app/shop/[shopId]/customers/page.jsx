import CustomersList from "@/components/dashboard/customers-list"
import DashboardLayout from "@/components/dashboard/layout"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <CustomersList />
    </DashboardLayout>
  )
}
