
import { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AIChatInterface from '@/components/AIChatInterface';
import VoiceControl from '@/components/VoiceControl';
import AIStatus from '@/components/AIStatus';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Settings, Brain, Zap, MessageCircle } from 'lucide-react';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isAIActive, setIsAIActive] = useState(true);
  const [currentMode, setCurrentMode] = useState('chat'); // chat, voice, settings

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* AI Assistant Main Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Assistant
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your intelligent companion for productivity, creativity, and assistance
            </p>
          </div>

          {/* AI Status Bar */}
          <AIStatus isActive={isAIActive} />

          {/* Main Interface Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Chat Interface - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <AIChatInterface 
                isActive={isAIActive}
                isListening={isListening}
                onVoiceToggle={() => setIsListening(!isListening)}
              />
            </div>

            {/* Sidebar - Voice Control & Quick Actions */}
            <div className="space-y-6">
              {/* Voice Control Panel */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Control
                </h3>
                <VoiceControl 
                  isListening={isListening}
                  onToggleListening={() => setIsListening(!isListening)}
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => {/* TODO: Implement search */}}
                  >
                    🔍 Web Search
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-green-500/30 text-green-400 hover:bg-green-500/20"
                    onClick={() => {/* TODO: Implement reminders */}}
                  >
                    ⏰ Set Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                    onClick={() => {/* TODO: Implement system control */}}
                  >
                    🖥️ System Control
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                    onClick={() => {/* TODO: Implement app launcher */}}
                  >
                    🚀 Launch App
                  </Button>
                </div>
              </div>

              {/* AI Capabilities */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Capabilities
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Natural Language Processing
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Voice Recognition & TTS
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Context Memory
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Multi-modal Responses
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    System Integration
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    App Automation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
