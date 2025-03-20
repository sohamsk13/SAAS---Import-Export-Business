import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TenantForm from "./pages/TenantForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import CHAForm from "./pages/CHAForm";
import  CustomerForm  from "./pages/CustomerForm.jsx";
import  FrieghtForm from "./pages/FreightForm.jsx";
import EmployeeManagement from "./pages/EmployeeManagement.jsx";
import ProductForm  from "./pages/ProductForm";
import EnquiriesActionsPage from "./pages/EnquiriesActionsPage";
import QuotationsPage from "./pages/QuotationsPage";
import OrdersPage from "./pages/OrdersPage";
import InvoicesPage from "./pages/InvoicesPage";
import CommercialDocsPage from "./pages/CommercialDocsPage";
import PackingPage from "./pages/PackingPage";
import TrackingPage from "./pages/TrackingPage";
import BoardRegistrationForm from "./pages/BoardRegistrationForm";
import TenantPortsManagement from "./pages/TenantPortsManagement";
import ActionForm from "./pages/ActionForm";
import Proforma from "./pages/Proforma";
import ProformaNotes from "./pages/ProformaNotes";
import ProformaTC from "./pages/ProformaTC";
import IntegrationManagement from "./pages/IntegrationManagement";
import Department from "./pages/Department";
import Role from "./pages/Role";
import Notes from "./pages/Notes";
import QuotationTC from "./pages/QuotationTC";
import LC from "./pages/LC";


const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/tenants" element={<TenantForm />} />
          <Route path="/cha" element={<CHAForm />} />
          <Route path="/customers" element={<CustomerForm />} />
          <Route path="/freight" element={<FrieghtForm />} />
          <Route path="/employees" element={<EmployeeManagement/>} />
          <Route path="/products" element={<ProductForm />} />
          <Route path="/enquiries" element={<EnquiriesActionsPage />} />
          <Route path="/quotations" element={<QuotationsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/commercial-docs" element={<CommercialDocsPage />} />
          <Route path="/packing" element={<PackingPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/board" element={<BoardRegistrationForm />} />
          <Route path="/ports" element={<TenantPortsManagement />} />
          <Route path="/actions" element={<ActionForm />} />
          <Route path="/proforma" element={<Proforma />} />
          <Route path="/proforma-notes" element={<ProformaNotes />} />
          <Route path="/proforma-tc" element={<ProformaTC/>} />
          <Route path="/settings" element={<IntegrationManagement />} />
          <Route path="/department" element={<Department />} />
          <Route path="/role" element={<Role />} />
          <Route path= "quotation-notes" element={<Notes />} />
          <Route path="/quotation-tc" element={<QuotationTC />} />
          <Route path="/commercial-docs" element={<LC />} />
                    
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
