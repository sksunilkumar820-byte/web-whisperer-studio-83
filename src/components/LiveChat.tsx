import { useState } from "react";
import { Button } from "@/components/ui/button";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-accent shadow-elegant hover:shadow-hover p-0 flex items-center justify-center"
        aria-label="Open live chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-card border border-border rounded-2xl shadow-elegant flex flex-col animate-scale-in">
          <div className="gradient-primary p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">W</span>
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground">Workwhirl Support</h3>
                <p className="text-xs text-primary-foreground/80">We typically reply in minutes</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-muted/20">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground text-sm font-bold">W</span>
                </div>
                <div className="bg-card p-3 rounded-lg shadow-soft max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hello! Welcome to Workwhirl. How can we help you today?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="btn-primary px-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
