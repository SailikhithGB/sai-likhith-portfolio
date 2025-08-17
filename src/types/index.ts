export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  type?: 'text' | 'voice' | 'image' | 'file';
  metadata?: {
    tokens?: number;
    model?: string;
    confidence?: number;
    duration?: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  summary?: string;
}

export interface UserContext {
  name?: string;
  preferences: {
    voice: {
      enabled: boolean;
      language: string;
      rate: number;
      pitch: number;
      volume: number;
    };
    theme: 'light' | 'dark' | 'auto';
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'local';
    maxTokens: number;
    temperature: number;
  };
  personalInfo: {
    location?: string;
    timezone?: string;
    interests?: string[];
    occupation?: string;
  };
}

export interface AICapability {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'entertainment' | 'system' | 'communication' | 'creative';
  enabled: boolean;
  handler: (input: string, context?: any) => Promise<string>;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
}

export interface SystemInfo {
  platform: string;
  architecture: string;
  memory: {
    total: number;
    available: number;
  };
  battery?: {
    level: number;
    charging: boolean;
  };
}

export interface VoiceSettings {
  enabled: boolean;
  autoSpeak: boolean;
  language: string;
  voice?: SpeechSynthesisVoice;
  rate: number;
  pitch: number;
  volume: number;
}

export interface AssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  isConnected: boolean;
  currentConversation?: Conversation;
  userContext: UserContext;
  capabilities: AICapability[];
  reminders: Reminder[];
}