
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Original Portfolio Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// New Communication Platform Pages
import NexusHub from "./pages/communication/NexusHub";
import HolographicMessaging from "./pages/communication/HolographicMessaging";
import QuantumEncryption from "./pages/communication/QuantumEncryption";
import AIContextualComm from "./pages/communication/AIContextualComm";
import DecentralizedSocial from "./pages/communication/DecentralizedSocial";
import ImmersiveModes from "./pages/communication/ImmersiveModes";

// Context Providers
import { CommunicationProvider } from "./contexts/CommunicationContext";
import { QuantumProvider } from "./contexts/QuantumContext";
import { AIProvider } from "./contexts/AIContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CommunicationProvider>
      <QuantumProvider>
        <AIProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Portfolio Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/press" element={<Press />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Nexus Communication Platform Routes */}
                <Route path="/nexus" element={<NexusHub />} />
                <Route path="/nexus/holographic" element={<HolographicMessaging />} />
                <Route path="/nexus/quantum" element={<QuantumEncryption />} />
                <Route path="/nexus/ai-contextual" element={<AIContextualComm />} />
                <Route path="/nexus/decentralized" element={<DecentralizedSocial />} />
                <Route path="/nexus/immersive" element={<ImmersiveModes />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AIProvider>
      </QuantumProvider>
    </CommunicationProvider>
  </QueryClientProvider>
);

export default App;
