import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Settings, 
  Brain, 
  Clock, 
  Sparkles,
  Volume2,
  VolumeX,
  Loader2,
  MessageSquare,
  Zap,
  Lightbulb,
  Calendar,
  Search,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { aiService, type MemoryItem, type Skill } from '@/lib/aiService';
import AISettings from './AISettings';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'voice' | 'system';
  metadata?: {
    skill?: string;
    confidence?: number;
    processingTime?: number;
  };
}



const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. I can help you with various tasks like searching the web, setting reminders, controlling your system, and much more. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text',
      metadata: { skill: 'greeting' }
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    voiceEnabled: true,
    autoSpeak: false,
    theme: 'dark',
    language: 'en'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [skills] = useState<Skill[]>([
    {
      id: 'search',
      name: 'Web Search',
      description: 'Search the internet for information',
      icon: <Search className="w-4 h-4" />,
      enabled: true,
      handler: async (input: string) => {
        const response = await aiService.processMessage(input);
        return response.content;
      }
    },
    {
      id: 'reminder',
      name: 'Reminders',
      description: 'Set and manage reminders',
      icon: <Clock className="w-4 h-4" />,
      enabled: true,
      handler: async (input: string) => {
        const response = await aiService.processMessage(input);
        return response.content;
      }
    },
    {
      id: 'system',
      name: 'System Control',
      description: 'Control system settings and apps',
      icon: <Command className="w-4 h-4" />,
      enabled: true,
      handler: async (input: string) => {
        const response = await aiService.processMessage(input);
        return response.content;
      }
    },
    {
      id: 'creative',
      name: 'Creative Assistant',
      description: 'Help with creative tasks and brainstorming',
      icon: <Lightbulb className="w-4 h-4" />,
      enabled: true,
      handler: async (input: string) => {
        const response = await aiService.processMessage(input);
        return response.content;
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Speech recognition failed. Please try again.');
      };
    }

    synthesisRef.current = window.speechSynthesis;
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech synthesis
  const speak = useCallback((text: string) => {
    if (!userPreferences.voiceEnabled || !synthesisRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthesisRef.current.speak(utterance);
  }, [userPreferences.voiceEnabled]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  // Process message with AI
  const processMessage = async (userInput: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Use the AI service to process the message
      const response = await aiService.processMessage(userInput);
      
      // Update memory from the service
      setMemory(aiService.getMemory());
      
      return response.content;
    } catch (error) {
      console.error('Error processing message:', error);
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle sending message
  const handleSendMessage = async (messageContent: string = input) => {
    if (!messageContent.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process with AI
    const aiResponse = await processMessage(messageContent);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text',
      metadata: { processingTime: Date.now() - userMessage.timestamp.getTime() }
    };

    setMessages(prev => [...prev, assistantMessage]);

    // Auto-speak if enabled
    if (userPreferences.autoSpeak) {
      speak(aiResponse);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle voice
  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      setUserPreferences(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-cyan-400">
              <AvatarImage src="/ai-avatar.png" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500">
                <Bot className="w-5 h-5 text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
            <p className="text-xs text-gray-400">Powered by Advanced AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            <Brain className="w-3 h-3 mr-1" />
            Memory: {memory.length} items
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVoice}
            className="text-gray-400 hover:text-white"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <Avatar className="w-8 h-8 border border-cyan-400/30">
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card className={`max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-blue-600/20 border-blue-500/30' 
                    : 'bg-white/5 border-white/10'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm text-white">{message.content}</p>
                    {message.metadata?.skill && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                          {message.metadata.skill}
                        </Badge>
                        {message.metadata.processingTime && (
                          <span className="text-xs text-gray-400">
                            {message.metadata.processingTime}ms
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 border border-blue-400/30">
                    <AvatarImage src="/user-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-500">
                      <User className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <Avatar className="w-8 h-8 border border-cyan-400/30">
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500">
                  <Bot className="w-4 h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    <span className="text-sm text-gray-400">Processing...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Skills Bar */}
      <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-400">Available Skills:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className={`text-xs cursor-pointer transition-all ${
                skill.enabled 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20' 
                  : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
              }`}
            >
              {skill.icon}
              <span className="ml-1">{skill.name}</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or ask me anything..."
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-cyan-400/20"
              disabled={isProcessing}
            />
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            className={`${
              isListening 
                ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            disabled={isProcessing}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isProcessing}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings Modal */}
      <AISettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={(newSettings) => {
          setUserPreferences(prev => ({
            ...prev,
            voiceEnabled: newSettings.voice.enabled,
            autoSpeak: newSettings.voice.autoSpeak
          }));
        }}
      />
    </div>
  );
};

export default AIAssistant;