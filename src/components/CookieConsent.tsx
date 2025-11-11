import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elegant p-6 animate-slide-up">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-foreground text-sm md:text-base">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            for more information.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={declineCookies}
            className="border-border hover:bg-muted"
          >
            Decline
          </Button>
          <Button
            onClick={acceptCookies}
            className="btn-primary"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
