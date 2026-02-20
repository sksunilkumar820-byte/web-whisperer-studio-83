import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import DropCV from "@/components/DropCV";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";

const CareersPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Header />
      <DropCV />
      <Careers />
      <Footer />
    </div>
  );
};

export default CareersPage;
