import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-lg">
              Last updated: January 2024
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Workwhirl website and services, you accept and agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do not use 
                our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Services Description</h2>
              <p>
                Workwhirl provides staffing solutions, executive search, talent advisory, and related 
                HR consulting services. We connect businesses with qualified candidates and provide 
                workforce management solutions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
              <p>
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Not use our services for any unlawful purpose</li>
                <li>Respect the confidentiality of information shared with you</li>
                <li>Not attempt to interfere with the proper functioning of our website</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the 
                property of Workwhirl or its content suppliers and is protected by intellectual 
                property laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Limitation of Liability</h2>
              <p>
                Workwhirl shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of or inability to use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Modifications</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting to the website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <p>
                <a href="mailto:contact@workwhirl.com" className="text-primary hover:underline">
                  contact@workwhirl.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
