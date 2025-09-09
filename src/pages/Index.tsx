import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Statistics />
      <Services />
      <Industries />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;