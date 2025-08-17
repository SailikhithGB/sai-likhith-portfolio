
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AssistantProvider } from "./contexts/AssistantContext";
import { ChatInterface } from "./components/chat/ChatInterface";
import { SettingsDialog } from "./components/settings/SettingsDialog";
import { Button } from "./components/ui/button";
import { Settings, Github, ExternalLink } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AssistantProvider>
        <div className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-blue/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyber-purple/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyber-green/20 via-transparent to-transparent"></div>
          
          {/* Floating Background Elements */}
          <div className="floating-icon absolute top-20 left-10 text-4xl opacity-20">🤖</div>
          <div className="floating-icon absolute top-40 right-20 text-3xl opacity-20" style={{ animationDelay: '2s' }}>⚡</div>
          <div className="floating-icon absolute bottom-40 left-20 text-3xl opacity-20" style={{ animationDelay: '4s' }}>🧠</div>
          <div className="floating-icon absolute bottom-20 right-10 text-2xl opacity-20" style={{ animationDelay: '1s' }}>💬</div>

          {/* Settings Button */}
          <div className="absolute top-4 right-4 z-50">
            <SettingsDialog>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 p-0 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <Settings className="h-4 w-4 text-white" />
              </Button>
            </SettingsDialog>
          </div>

          {/* Footer Links */}
          <div className="absolute bottom-4 left-4 z-50 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-xs text-white"
              onClick={() => window.open('https://github.com/sailikhithking', '_blank')}
            >
              <Github className="h-3 w-3 mr-1" />
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-xs text-white"
              onClick={() => window.open('https://sailikhithgb.lovable.app', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Portfolio
            </Button>
          </div>

          {/* Main Chat Interface */}
          <div className="relative z-10 h-full">
            <ChatInterface />
          </div>
        </div>
        
        <Toaster />
        <Sonner />
      </AssistantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
