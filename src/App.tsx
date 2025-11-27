import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CareersPage from "./pages/CareersPage";
import ServicePage from "./pages/ServicePage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import InquiriesPage from "./pages/admin/InquiriesPage";
import CaseStudiesManagePage from "./pages/admin/CaseStudiesManagePage";
import TestimonialsPage from "./pages/admin/TestimonialsPage";
import BlogPage from "./pages/admin/BlogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="inquiries" element={<InquiriesPage />} />
              <Route path="case-studies" element={<CaseStudiesManagePage />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="blog" element={<BlogPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
