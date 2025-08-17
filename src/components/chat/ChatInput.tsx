import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useAssistant } from '../../contexts/AssistantContext';
import { SettingsDialog } from '../settings/SettingsDialog';
import { 
  Send, 
  Mic, 
  MicOff, 
  Square, 
  Settings,
  Paperclip,
  Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const { state, startListening, stopListening, stopSpeaking } = useAssistant();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Focus on textarea when not disabled
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (state.isListening) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
  };

  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        {/* Voice Status Indicator */}
        <AnimatePresence>
          {(state.isListening || state.isSpeaking || state.isThinking) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 flex items-center justify-center"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center space-x-2">
                {state.isListening && (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white">Listening...</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceToggle}
                      className="h-6 w-6 p-0 ml-2"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  </>
                )}
                {state.isSpeaking && (
                  <>
                    <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                    <span className="text-sm text-white">Speaking...</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleStopSpeaking}
                      className="h-6 w-6 p-0 ml-2"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  </>
                )}
                {state.isThinking && (
                  <>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-white">Thinking...</span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-white/10"
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                disabled 
                  ? 'Please configure your OpenAI API key to start chatting...' 
                  : 'Type a message or click the microphone to speak...'
              }
              disabled={disabled}
              className="
                min-h-[40px] max-h-[120px] resize-none
                bg-white/10 backdrop-blur-sm border-white/20 
                text-white placeholder-gray-400
                focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue
                pr-12
              "
              rows={1}
            />
            
            {/* Emoji Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-white/10"
              disabled={disabled}
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          {/* Voice Button */}
          <Button
            variant={state.isListening ? "default" : "ghost"}
            size="sm"
            onClick={handleVoiceToggle}
            disabled={disabled || !state.userContext.preferences.voice.enabled}
            className={`
              h-10 w-10 p-0 transition-all duration-200
              ${state.isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'hover:bg-white/10'
              }
            `}
          >
            {state.isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="
              h-10 w-10 p-0 
              bg-gradient-to-r from-cyber-blue to-cyber-green
              hover:from-cyber-blue/80 hover:to-cyber-green/80
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            <Send className="h-4 w-4" />
          </Button>

          {/* Settings Button */}
          <SettingsDialog>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SettingsDialog>
        </div>

        {/* Quick Actions */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSendMessage("What can you help me with?")}
            disabled={disabled}
            className="text-xs h-6 px-2 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            What can you do?
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSendMessage("Set a reminder for tomorrow at 9 AM")}
            disabled={disabled}
            className="text-xs h-6 px-2 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            Set reminder
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSendMessage("Help me brainstorm ideas")}
            disabled={disabled}
            className="text-xs h-6 px-2 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            Brainstorm
          </Button>
        </div>

        {/* Connection Status */}
        {!state.isConnected && (
          <div className="mt-2 text-center">
            <span className="text-xs text-orange-400">
              ⚠️ AI service not configured. Please set your OpenAI API key in settings.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};