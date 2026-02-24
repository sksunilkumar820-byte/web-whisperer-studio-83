import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load below-fold sections
const Statistics = lazy(() => import("@/components/Statistics"));
const Services = lazy(() => import("@/components/Services"));
const Industries = lazy(() => import("@/components/Industries"));
const About = lazy(() => import("@/components/About"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Blog = lazy(() => import("@/components/Blog"));
const Newsletter = lazy(() => import("@/components/Newsletter"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));
const LiveChat = lazy(() => import("@/components/LiveChat"));

const SectionLoader = () => (
  <div className="py-20 container mx-auto px-6">
    <Skeleton className="h-8 w-64 mx-auto mb-6" />
    <Skeleton className="h-4 w-96 mx-auto mb-12" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Statistics />
        <Services />
        <Industries />
        <About />
        <Testimonials />
        <Blog />
        <Newsletter />
        <Contact />
        <Footer />
        <CookieConsent />
        <LiveChat />
      </Suspense>
    </div>
  );
};

export default Index;
