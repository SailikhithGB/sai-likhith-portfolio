import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAssistant } from '../../contexts/AssistantContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { 
  MessageCircle, 
  Sparkles, 
  Zap, 
  Heart,
  Brain
} from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { state, sendMessage, createNewConversation } = useAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = state.currentConversation?.messages || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // Create initial conversation if none exists
  useEffect(() => {
    if (!state.currentConversation) {
      createNewConversation();
    }
  }, [state.currentConversation, createNewConversation]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* AI Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              {state.isConnected && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              )}
            </div>
            
            {/* Title */}
            <div>
              <h1 className="text-lg font-bold text-white">ARIA</h1>
              <p className="text-xs text-gray-400">
                {state.isConnected ? 'Advanced Responsive Intelligence Assistant' : 'Not connected'}
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-2">
            {state.isListening && (
              <div className="flex items-center space-x-1 bg-red-500/20 border border-red-500/30 rounded-full px-2 py-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-300">Listening</span>
              </div>
            )}
            {state.isSpeaking && (
              <div className="flex items-center space-x-1 bg-cyber-blue/20 border border-cyber-blue/30 rounded-full px-2 py-1">
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                <span className="text-xs text-cyber-blue">Speaking</span>
              </div>
            )}
            {state.isThinking && (
              <div className="flex items-center space-x-1 bg-cyber-green/20 border border-cyber-green/30 rounded-full px-2 py-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyber-green rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-cyber-green">Thinking</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4"
              >
                {/* Welcome Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green p-1">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-cyber-green animate-pulse" />
                  </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  Hello! I'm ARIA
                </h2>
                <p className="text-gray-400 text-center max-w-md mb-8">
                  Your Advanced Responsive Intelligence Assistant. I'm here to help you with conversations, 
                  tasks, creative projects, and much more. How can I assist you today?
                </p>

                {/* Capability Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleSendMessage("What can you help me with?")}
                  >
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-cyber-blue" />
                    <h3 className="text-sm font-semibold text-white mb-1">Conversation</h3>
                    <p className="text-xs text-gray-400">Natural chat and Q&A</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleSendMessage("Help me brainstorm creative ideas")}
                  >
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-cyber-green" />
                    <h3 className="text-sm font-semibold text-white mb-1">Creative</h3>
                    <p className="text-xs text-gray-400">Writing and brainstorming</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleSendMessage("Set a reminder for me")}
                  >
                    <Zap className="w-8 h-8 mx-auto mb-2 text-cyber-purple" />
                    <h3 className="text-sm font-semibold text-white mb-1">Productivity</h3>
                    <p className="text-xs text-gray-400">Tasks and reminders</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleSendMessage("Tell me something interesting")}
                  >
                    <Heart className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                    <h3 className="text-sm font-semibold text-white mb-1">Friendly</h3>
                    <p className="text-xs text-gray-400">Casual conversation</p>
                  </motion.div>
                </div>

                {/* Quick Start Suggestions */}
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("What's the weather like today?")}
                    className="text-xs hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
                  >
                    Ask about weather
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("Help me write a professional email")}
                    className="text-xs hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
                  >
                    Write an email
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("Explain quantum computing in simple terms")}
                    className="text-xs hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
                  >
                    Learn something new
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Messages List */
              <div className="py-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isLatest={index === messages.length - 1}
                  />
                ))}
                
                {/* Thinking Indicator */}
                {state.isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 p-4"
                  >
                    <div className="flex-shrink-0 mr-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 max-w-3xl">
                      <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-400">ARIA is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!state.isConnected}
        />
      </div>
    </div>
  );
};