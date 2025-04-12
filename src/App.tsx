
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Tour from "./pages/Tour";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AnimatedTransition from "./components/AnimatedTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<AnimatedTransition><Index /></AnimatedTransition>} />
          <Route path="/tour" element={<AnimatedTransition><Tour /></AnimatedTransition>} />
          <Route path="/about" element={<AnimatedTransition><About /></AnimatedTransition>} />
          <Route path="*" element={<AnimatedTransition><NotFound /></AnimatedTransition>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
