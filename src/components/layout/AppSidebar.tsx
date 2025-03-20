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
   title: "Ports",
    icon: Box,
    url: "/ports",
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
    title: "Employee ",
    icon: Users,
    url: "/employees",
  },
  {
    title: "Department",
    icon: Truck,
    url: "/department",
  },
  { 
    title: "Role",
    icon: CreditCard,
    url: "/role",
  },
  {
    title: "Customer Management",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Enquiries ",
    icon: Mail,
    url: "/enquiries",
  },
  {
    title: " Actions",
    icon: Mail,
    url: "/actions",
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
    title: "Quotation Notes",
    icon: FileText,
    url: "quotation-notes",
  },
  {
    title: "Quotation T&C",
    icon: FileText,
    url: "/quotation-tc",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
  },
  {
    title: "Commertial Invoices",
    icon: DollarSign,
    url: "/invoices",
  },
  {title: "Proforma Invoice",
    icon: DollarSign,
    url: "/proforma",
  },
  {
    title: "Proforma Notes",
    icon: FileText,
    url: "/proforma-notes",
  },
  {
    title: "Proforma T&C",
    icon: FileText,
    url: "/proforma-tc",
  },
  {
    title: "Letter of Credit",
    icon: ClipboardList,
    url: "/commercial-docs",
  },
  {
    title: "Packing",
    icon: Box,
    url: "/packing",
  },
  // {
  //   title: "Tracking",
  //   icon: Map,
  //   url: "/tracking",
  // },
  
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-900 border-r border-gray-700 w-[250px]">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-gray-100">TradePro</span>
          </div>
        </div>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-gray-400 text-xs font-medium uppercase tracking-wider px-4 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="group transition-colors hover:bg-gray-800 rounded-lg"
                  >
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white"
                    >
                      <item.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <div className="mt-auto border-t border-gray-800 pt-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="group transition-colors hover:bg-gray-800 rounded-lg"
                  >
                    <a 
                      href="/settings" 
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white"
                    >
                      <Settings className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                      <span className="text-sm font-medium">Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>                                                    
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}