import Sidebar from "./sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
