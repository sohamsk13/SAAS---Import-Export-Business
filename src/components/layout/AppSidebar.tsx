import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  Settings,
  Building2,
  FileText,
  ShoppingCart,
  Package,
  Briefcase,
  Ship,
  DollarSign,
  UserCheck,
  Mail,
  ClipboardList,
  FileSearch,
  Box,
  CreditCard,
  Truck,
  Map
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Tenant Management",
    icon: Building2,
    url: "/tenants",
  },
  {
    title: "Board Management",
    icon: Briefcase,
    url: "/board",
  },
  {
    title: "CHA Management",
    icon: UserCheck,
    url: "/cha",
  },
  {
    title: "Freight & Charges",
    icon: Ship,
    url: "/freight",
  },
  {
    title: "Employee Management",
    icon: Users,
    url: "/employees",
  },
  {
    title: "Customer Management",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Enquiries & Actions",
    icon: Mail,
    url: "/enquiries",
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
  },
  {
    title: "Quotations",
    icon: FileText,
    url: "/quotations",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
  },
  {
    title: "Invoices",
    icon: DollarSign,
    url: "/invoices",
  },
  {
    title: "Commercial Docs",
    icon: ClipboardList,
    url: "/commercial-docs",
  },
  {
    title: "Packing",
    icon: Box,
    url: "/packing",
  },
  {
    title: "Tracking",
    icon: Map,
    url: "/tracking",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2 px-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">TradePro</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}