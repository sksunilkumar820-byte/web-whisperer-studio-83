import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LogoOptions from "@/components/LogoOptions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <LogoOptions />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;