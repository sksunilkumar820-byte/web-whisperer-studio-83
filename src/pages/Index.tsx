import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import LiveChat from "@/components/LiveChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Statistics />
      <Services />
      <Industries />
      <About />
      <Blog />
      <Newsletter />
      <Contact />
      <Footer />
      <CookieConsent />
      <LiveChat />
    </div>
  );
};

export default Index;