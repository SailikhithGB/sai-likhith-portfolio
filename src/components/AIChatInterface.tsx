import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, MicOff, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice' | 'system';
}

interface AIChatInterfaceProps {
  isActive: boolean;
  isListening: boolean;
  onVoiceToggle: () => void;
}

const AIChatInterface = ({ isActive, isListening, onVoiceToggle }: AIChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. I can help you with various tasks like searching the web, setting reminders, controlling your system, and much more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addMessage = (content: string, sender: 'user' | 'ai', type: 'text' | 'voice' | 'system' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate contextual response based on user input
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "Hello! It's great to meet you. I'm here to help with any tasks you need assistance with. What would you like to work on today?";
    } else if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
      response = "I can help you search the web for information. Just tell me what you're looking for, and I'll find the most relevant results for you.";
    } else if (lowerMessage.includes('reminder') || lowerMessage.includes('remind')) {
      response = "I'd be happy to help you set a reminder! Just let me know what you'd like to be reminded about and when. For example: 'Remind me to call mom tomorrow at 3 PM'.";
    } else if (lowerMessage.includes('weather')) {
      response = "I can check the weather for you! Just tell me which city you'd like the weather information for, and I'll get you the current conditions and forecast.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
      const now = new Date();
      response = `The current time is ${now.toLocaleTimeString()} and today's date is ${now.toLocaleDateString()}.`;
    } else if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
      response = "Here's a programming joke for you: Why do programmers prefer dark mode? Because light attracts bugs! 😄 What else can I help you with?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = "I can help you with many tasks! Here are some examples:\n• Search the web for information\n• Set reminders and alarms\n• Check weather and time\n• Control system settings\n• Launch applications\n• Answer questions and provide explanations\n\nJust ask me what you need!";
    } else {
      response = "That's an interesting question! I'm designed to help with various tasks like web searches, reminders, system control, and general assistance. Could you tell me more specifically what you'd like help with?";
    }
    
    addMessage(response, 'ai', 'text');
    setIsTyping(false);
    setIsProcessing(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user', 'text');
    setInputValue('');
    
    // Simulate AI response
    await simulateAIResponse(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-xs text-gray-400">
              {isActive ? 'Online' : 'Offline'} • {messages.length} messages
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-400">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'voice' && (
                    <Mic className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/20 border border-white/20 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-gray-300">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/20">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or ask me anything..."
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500/50"
              disabled={isProcessing}
            />
            {isProcessing && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          
          <Button
            onClick={onVoiceToggle}
            variant="outline"
            size="icon"
            className={`border-white/20 hover:bg-white/10 ${
              isListening ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'text-white'
            }`}
            disabled={isProcessing}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['Search the web', 'Set a reminder', 'Check weather', 'Tell me a joke'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/20 rounded-full px-3 py-1 text-gray-300 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;