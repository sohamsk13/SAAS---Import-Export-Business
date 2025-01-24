import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Package, FileText, DollarSign } from "lucide-react";

export default function Index() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <SidebarTrigger />
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your business.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Customers"
                value="120"
                icon={Users}
                description="+4 this month"
              />
              <StatsCard
                title="Active Products"
                value="45"
                icon={Package}
                description="Across 5 categories"
              />
              <StatsCard
                title="Pending Quotations"
                value="8"
                icon={FileText}
                description="3 require action"
              />
              <StatsCard
                title="Revenue (MTD)"
                value="$24,500"
                icon={DollarSign}
                description="+12% from last month"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    No recent activity to display.
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Create New Quotation
                  </button>
                  <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md">
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}