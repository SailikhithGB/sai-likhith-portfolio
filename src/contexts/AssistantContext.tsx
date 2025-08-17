import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AssistantState, Message, Conversation, UserContext, Reminder, AICapability } from '../types';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import { voiceService } from '../services/voiceService';
import { v4 as uuidv4 } from 'uuid';

// Action types
type AssistantAction =
  | { type: 'SET_LOADING'; payload: { isThinking?: boolean; isListening?: boolean; isSpeaking?: boolean } }
  | { type: 'SET_CONNECTION'; payload: boolean }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation | undefined }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_USER_CONTEXT'; payload: Partial<UserContext> }
  | { type: 'SET_REMINDERS'; payload: Reminder[] }
  | { type: 'ADD_REMINDER'; payload: Reminder }
  | { type: 'REMOVE_REMINDER'; payload: string }
  | { type: 'SET_CAPABILITIES'; payload: AICapability[] }
  | { type: 'INITIALIZE_STATE'; payload: Partial<AssistantState> };

// Initial state
const initialState: AssistantState = {
  isListening: false,
  isSpeaking: false,
  isThinking: false,
  isConnected: false,
  currentConversation: undefined,
  userContext: {
    preferences: {
      voice: {
        enabled: true,
        language: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 0.8
      },
      theme: 'dark',
      model: 'gpt-3.5-turbo',
      maxTokens: 2000,
      temperature: 0.7
    },
    personalInfo: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      interests: [],
    }
  },
  capabilities: [],
  reminders: []
};

// Reducer
function assistantReducer(state: AssistantState, action: AssistantAction): AssistantState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isThinking: action.payload.isThinking ?? state.isThinking,
        isListening: action.payload.isListening ?? state.isListening,
        isSpeaking: action.payload.isSpeaking ?? state.isSpeaking,
      };
    case 'SET_CONNECTION':
      return { ...state, isConnected: action.payload };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    case 'ADD_MESSAGE':
      if (!state.currentConversation) return state;
      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, action.payload],
          updatedAt: new Date()
        }
      };
    case 'UPDATE_USER_CONTEXT':
      return {
        ...state,
        userContext: {
          ...state.userContext,
          ...action.payload,
          preferences: {
            ...state.userContext.preferences,
            ...action.payload.preferences
          },
          personalInfo: {
            ...state.userContext.personalInfo,
            ...action.payload.personalInfo
          }
        }
      };
    case 'SET_REMINDERS':
      return { ...state, reminders: action.payload };
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    case 'REMOVE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter(r => r.id !== action.payload)
      };
    case 'SET_CAPABILITIES':
      return { ...state, capabilities: action.payload };
    case 'INITIALIZE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Context
interface AssistantContextType {
  state: AssistantState;
  dispatch: React.Dispatch<AssistantAction>;
  // Actions
  sendMessage: (content: string) => Promise<void>;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string, expression?: 'happy' | 'sad' | 'excited' | 'calm') => Promise<void>;
  stopSpeaking: () => void;
  createNewConversation: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  updateUserSettings: (settings: Partial<UserContext>) => Promise<void>;
  addReminder: (title: string, description: string, dueDate: Date) => Promise<void>;
  removeReminder: (id: string) => Promise<void>;
  setApiKey: (apiKey: string) => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

// Provider component
export const AssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assistantReducer, initialState);

  // Initialize the assistant
  useEffect(() => {
    initializeAssistant();
  }, []);

  // Set up voice service callbacks
  useEffect(() => {
    voiceService.onListeningStart = () => {
      dispatch({ type: 'SET_LOADING', payload: { isListening: true } });
    };

    voiceService.onListeningEnd = () => {
      dispatch({ type: 'SET_LOADING', payload: { isListening: false } });
    };

    voiceService.onResult = (transcript: string, isFinal: boolean) => {
      if (isFinal) {
        sendMessage(transcript);
      }
    };

    voiceService.onError = (error: string) => {
      console.error('Voice error:', error);
      dispatch({ type: 'SET_LOADING', payload: { isListening: false } });
    };

    voiceService.onSpeakStart = () => {
      dispatch({ type: 'SET_LOADING', payload: { isSpeaking: true } });
    };

    voiceService.onSpeakEnd = () => {
      dispatch({ type: 'SET_LOADING', payload: { isSpeaking: false } });
    };

    return () => {
      voiceService.cleanup();
    };
  }, []);

  const initializeAssistant = async () => {
    try {
      // Load user context
      const userContext = await storageService.getUserContext();
      
      // Load reminders
      const reminders = await storageService.getAllReminders();
      
      // Initialize capabilities
      const capabilities = getDefaultCapabilities();
      
      // Check AI service connection
      const isConnected = aiService.isConfigured();

      dispatch({
        type: 'INITIALIZE_STATE',
        payload: {
          userContext,
          reminders,
          capabilities,
          isConnected
        }
      });

      // Update voice service settings
      voiceService.updateSettings(userContext.preferences.voice);

    } catch (error) {
      console.error('Failed to initialize assistant:', error);
    }
  };

  const sendMessage = async (content: string): Promise<void> => {
    try {
      // Ensure we have a current conversation
      if (!state.currentConversation) {
        await createNewConversation();
      }

      if (!state.currentConversation) {
        throw new Error('Failed to create conversation');
      }

      // Create user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      // Add user message to conversation
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      await storageService.addMessageToConversation(state.currentConversation.id, userMessage);

      // Set thinking state
      dispatch({ type: 'SET_LOADING', payload: { isThinking: true } });

      // Get AI response
      const response = await aiService.generateResponse(
        [...state.currentConversation.messages, userMessage],
        state.userContext
      );

      // Create assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      // Add assistant message to conversation
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      await storageService.addMessageToConversation(state.currentConversation.id, assistantMessage);

      // Speak the response if voice is enabled and auto-speak is on
      if (state.userContext.preferences.voice.enabled) {
        await speak(response);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { isThinking: false } });
    }
  };

  const startListening = () => {
    voiceService.startListening();
  };

  const stopListening = () => {
    voiceService.stopListening();
  };

  const speak = async (text: string, expression?: 'happy' | 'sad' | 'excited' | 'calm'): Promise<void> => {
    try {
      if (expression) {
        await voiceService.speakWithExpression(text, expression);
      } else {
        await voiceService.speak(text);
      }
    } catch (error) {
      console.error('Error speaking:', error);
    }
  };

  const stopSpeaking = () => {
    voiceService.stopSpeaking();
  };

  const createNewConversation = async (): Promise<void> => {
    try {
      const conversation = await storageService.createNewConversation();
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const loadConversation = async (id: string): Promise<void> => {
    try {
      const conversation = await storageService.getConversation(id);
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation || undefined });
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const updateUserSettings = async (settings: Partial<UserContext>): Promise<void> => {
    try {
      const updatedContext = {
        ...state.userContext,
        ...settings,
        preferences: {
          ...state.userContext.preferences,
          ...settings.preferences
        },
        personalInfo: {
          ...state.userContext.personalInfo,
          ...settings.personalInfo
        }
      };

      dispatch({ type: 'UPDATE_USER_CONTEXT', payload: settings });
      await storageService.saveUserContext(updatedContext);

      // Update voice settings if changed
      if (settings.preferences?.voice) {
        voiceService.updateSettings(settings.preferences.voice);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const addReminder = async (title: string, description: string, dueDate: Date): Promise<void> => {
    try {
      const reminder = await storageService.createReminder(title, description, dueDate);
      dispatch({ type: 'ADD_REMINDER', payload: reminder });
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const removeReminder = async (id: string): Promise<void> => {
    try {
      await storageService.deleteReminder(id);
      dispatch({ type: 'REMOVE_REMINDER', payload: id });
    } catch (error) {
      console.error('Error removing reminder:', error);
    }
  };

  const setApiKey = (apiKey: string): void => {
    aiService.setApiKey(apiKey);
    dispatch({ type: 'SET_CONNECTION', payload: true });
  };

  const contextValue: AssistantContextType = {
    state,
    dispatch,
    sendMessage,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    createNewConversation,
    loadConversation,
    updateUserSettings,
    addReminder,
    removeReminder,
    setApiKey
  };

  return (
    <AssistantContext.Provider value={contextValue}>
      {children}
    </AssistantContext.Provider>
  );
};

// Hook to use the assistant context
export const useAssistant = (): AssistantContextType => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

// Default capabilities
function getDefaultCapabilities(): AICapability[] {
  return [
    {
      id: 'conversation',
      name: 'Conversation',
      description: 'Natural conversation and Q&A',
      icon: '💬',
      category: 'communication',
      enabled: true,
      handler: async (input: string) => input
    },
    {
      id: 'reminders',
      name: 'Reminders',
      description: 'Create and manage reminders',
      icon: '⏰',
      category: 'productivity',
      enabled: true,
      handler: async (input: string) => input
    },
    {
      id: 'search',
      name: 'Web Search',
      description: 'Search the web for information',
      icon: '🔍',
      category: 'productivity',
      enabled: true,
      handler: async (input: string) => input
    },
    {
      id: 'creative',
      name: 'Creative Writing',
      description: 'Help with creative writing and brainstorming',
      icon: '✍️',
      category: 'creative',
      enabled: true,
      handler: async (input: string) => input
    }
  ];
}