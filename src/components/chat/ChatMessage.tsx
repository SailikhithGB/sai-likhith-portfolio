import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Copy, Volume2, VolumeX } from 'lucide-react';
import { useAssistant } from '../../contexts/AssistantContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLatest }) => {
  const { speak, stopSpeaking, state } = useAssistant();
  const messageRef = useRef<HTMLDivElement>(null);
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  // Auto-scroll to latest message
  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLatest]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const handleSpeak = async () => {
    try {
      if (state.isSpeaking) {
        stopSpeaking();
      } else {
        await speak(message.content);
      }
    } catch (error) {
      console.error('Failed to speak message:', error);
    }
  };

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} group hover:bg-white/5 transition-colors`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
        <Avatar className="h-8 w-8">
          {isUser ? (
            <>
              <AvatarFallback className="bg-gradient-to-r from-cyber-blue to-cyber-green text-black text-sm font-bold">
                U
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/ai-avatar.png" alt="ARIA" />
              <AvatarFallback className="bg-gradient-to-r from-cyber-purple to-cyber-blue text-white text-sm font-bold">
                AI
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        {/* Message Bubble */}
        <div
          className={`
            inline-block p-3 rounded-2xl max-w-full break-words
            ${isUser 
              ? 'bg-gradient-to-r from-cyber-blue to-cyber-green text-black ml-auto' 
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
            }
          `}
        >
          {/* Message Text */}
          <div className="prose prose-invert max-w-none">
            {isAssistant ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom styling for markdown elements
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  code: ({ children }) => (
                    <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-black/30 p-3 rounded-lg overflow-x-auto text-xs font-mono mb-2">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-cyber-blue pl-3 italic text-gray-300 mb-2">
                      {children}
                    </blockquote>
                  ),
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-cyber-blue">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-cyber-green">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-cyber-purple">{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="text-sm leading-relaxed">{message.content}</p>
            )}
          </div>
        </div>

        {/* Message Actions */}
        <div className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
          
          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0 hover:bg-white/10"
          >
            <Copy className="h-3 w-3" />
          </Button>

          {/* Speak Button (only for assistant messages) */}
          {isAssistant && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpeak}
              className="h-6 w-6 p-0 hover:bg-white/10"
              disabled={!state.userContext.preferences.voice.enabled}
            >
              {state.isSpeaking ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>

        {/* Typing indicator for assistant messages */}
        {isAssistant && message.content === '' && (
          <div className="flex items-center space-x-1 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-gray-400 ml-2">ARIA is thinking...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};