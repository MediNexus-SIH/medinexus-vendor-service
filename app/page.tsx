import { OverviewCards } from "@/components/overview-cards"
import { Layout } from "@/components/layout"

export default function DashboardPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <OverviewCards />
      </div>
    </Layout>
  )
}

