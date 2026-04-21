import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Eagerly load the homepage shell
import Index from "./pages/Index";

// Lazy load all other routes
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const BlogListPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const ApplicationsPage = lazy(() => import("./pages/admin/ApplicationsPage"));
const InquiriesPage = lazy(() => import("./pages/admin/InquiriesPage"));
const CaseStudiesManagePage = lazy(() => import("./pages/admin/CaseStudiesManagePage"));
const TestimonialsPage = lazy(() => import("./pages/admin/TestimonialsPage"));
const AdminBlogPage = lazy(() => import("./pages/admin/BlogPage"));
const CVSubmissionsDebugPage = lazy(() => import("./pages/admin/CVSubmissionsDebugPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <AuthProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/services/:serviceId" element={<ServicePage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/blog" element={<BlogListPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
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
                    <Route path="blog" element={<AdminBlogPage />} />
                    <Route path="cv-debug" element={<CVSubmissionsDebugPage />} />
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
