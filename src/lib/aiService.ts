// AI Service for handling advanced assistant functionality

export interface MemoryItem {
  id: string;
  type: 'conversation' | 'preference' | 'fact' | 'reminder' | 'task';
  content: string;
  timestamp: Date;
  importance: number; // 1-10
  tags: string[];
  metadata?: {
    emotion?: string;
    context?: string;
    relatedItems?: string[];
  };
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  enabled: boolean;
  handler: (input: string, context: any) => Promise<SkillResponse>;
}

export interface SkillResponse {
  content: string;
  confidence: number;
  metadata?: {
    action?: string;
    data?: any;
    followUp?: string;
  };
}

export interface ConversationContext {
  userPreferences: {
    voiceEnabled: boolean;
    autoSpeak: boolean;
    theme: string;
    language: string;
    personality: string;
  };
  recentMessages: string[];
  activeTasks: string[];
  userMood: string;
  timeOfDay: string;
}

class AIService {
  private memory: MemoryItem[] = [];
  private skills: Skill[] = [];
  private context: ConversationContext;

  constructor() {
    this.context = {
      userPreferences: {
        voiceEnabled: true,
        autoSpeak: false,
        theme: 'dark',
        language: 'en',
        personality: 'helpful'
      },
      recentMessages: [],
      activeTasks: [],
      userMood: 'neutral',
      timeOfDay: this.getTimeOfDay()
    };

    this.initializeSkills();
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  }

  private initializeSkills(): void {
    this.skills = [
      {
        id: 'search',
        name: 'Web Search',
        description: 'Search the internet for information',
        keywords: ['search', 'find', 'what is', 'how to', 'information about', 'look up'],
        enabled: true,
        handler: async (input: string, context: any): Promise<SkillResponse> => {
          // Simulate web search with enhanced response
          await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
          
          const searchTerms = input.toLowerCase().replace(/search|find|what is|how to|information about|look up/gi, '').trim();
          
          return {
            content: `I found some information about "${searchTerms}": This is a simulated search result that would normally connect to a real search API. I can help you find specific details, compare information, or explore related topics.`,
            confidence: 0.85,
            metadata: {
              action: 'search',
              data: { query: searchTerms },
              followUp: 'Would you like me to search for more specific information about this topic?'
            }
          };
        }
      },
      {
        id: 'reminder',
        name: 'Smart Reminders',
        description: 'Set and manage intelligent reminders',
        keywords: ['remind', 'reminder', 'schedule', 'set alarm', 'notify', 'remember'],
        enabled: true,
        handler: async (input: string, context: any): Promise<SkillResponse> => {
          const reminder = {
            id: Date.now().toString(),
            type: 'reminder' as const,
            content: input,
            timestamp: new Date(),
            importance: this.calculateImportance(input),
            tags: ['reminder', 'task'],
            metadata: {
              emotion: this.analyzeEmotion(input),
              context: context.timeOfDay
            }
          };
          
          this.addToMemory(reminder);
          
          return {
            content: `I've set a reminder for: "${input}". I'll notify you when it's time! The reminder has been stored with ${reminder.importance}/10 importance.`,
            confidence: 0.9,
            metadata: {
              action: 'set_reminder',
              data: reminder,
              followUp: 'Would you like me to set additional reminders or modify this one?'
            }
          };
        }
      },
      {
        id: 'system',
        name: 'System Control',
        description: 'Control system settings and applications',
        keywords: ['open', 'launch', 'start', 'close', 'system', 'settings', 'control'],
        enabled: true,
        handler: async (input: string, context: any): Promise<SkillResponse> => {
          return {
            content: `I understand you want to control your system. In a real implementation, I would be able to launch applications, adjust settings, and perform system operations. For now, this is a simulation of system control capabilities.`,
            confidence: 0.8,
            metadata: {
              action: 'system_control',
              data: { command: input },
              followUp: 'What specific system action would you like me to help you with?'
            }
          };
        }
      },
      {
        id: 'creative',
        name: 'Creative Assistant',
        description: 'Help with creative tasks and brainstorming',
        keywords: ['creative', 'idea', 'brainstorm', 'design', 'art', 'write', 'compose'],
        enabled: true,
        handler: async (input: string, context: any): Promise<SkillResponse> => {
          const creativeResponses = [
            "That's an interesting creative challenge! Let me help you explore this idea further. I can assist with brainstorming, design concepts, or creative problem-solving.",
            "I love creative projects! Here's what I think about your request: This sounds like an exciting opportunity to explore new possibilities.",
            "Great creative direction! Let me brainstorm some possibilities for you. I can help with ideation, concept development, and creative strategy.",
            "This sounds exciting! Let me help you develop this creative concept. I can assist with planning, execution, and refinement."
          ];
          
          const response = creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
          
          return {
            content: response + " In a real implementation, I would provide detailed creative assistance with specific tools and resources.",
            confidence: 0.75,
            metadata: {
              action: 'creative_assistance',
              data: { type: 'brainstorming' },
              followUp: 'Would you like me to help you develop this idea further or explore other creative possibilities?'
            }
          };
        }
      },
      {
        id: 'conversation',
        name: 'Conversational AI',
        description: 'Natural conversation and emotional intelligence',
        keywords: ['hello', 'hi', 'how are you', 'talk', 'chat', 'conversation'],
        enabled: true,
        handler: async (input: string, context: any): Promise<SkillResponse> => {
          const timeGreeting = this.getTimeGreeting();
          const moodResponse = this.getMoodResponse();
          
          const responses = [
            `${timeGreeting}! I'm doing great, thank you for asking. ${moodResponse} How can I assist you today?`,
            `Hello there! I'm here and ready to help. ${moodResponse} What would you like to work on?`,
            `Hi! It's wonderful to chat with you. ${moodResponse} I'm ready to assist with whatever you need.`,
            `${timeGreeting}! I'm feeling quite helpful today. ${moodResponse} What can I do for you?`
          ];
          
          return {
            content: responses[Math.floor(Math.random() * responses.length)],
            confidence: 0.95,
            metadata: {
              action: 'conversation',
              data: { timeOfDay: context.timeOfDay, userMood: context.userMood },
              followUp: 'Is there anything specific you\'d like to accomplish today?'
            }
          };
        }
      }
    ];
  }

  private getTimeGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  }

  private getMoodResponse(): string {
    const responses = [
      "I'm here to make your day better!",
      "I'm excited to help you with your tasks!",
      "I'm ready to tackle any challenges with you!",
      "I'm here to support you in whatever you need!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private calculateImportance(input: string): number {
    const urgentWords = ['urgent', 'important', 'critical', 'asap', 'emergency'];
    const urgentCount = urgentWords.filter(word => input.toLowerCase().includes(word)).length;
    return Math.min(10, 5 + urgentCount * 2);
  }

  private analyzeEmotion(input: string): string {
    const positiveWords = ['happy', 'excited', 'great', 'wonderful', 'amazing'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'worried', 'stressed'];
    
    const positiveCount = positiveWords.filter(word => input.toLowerCase().includes(word)).length;
    const negativeCount = negativeWords.filter(word => input.toLowerCase().includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  public async processMessage(userInput: string): Promise<SkillResponse> {
    // Update context
    this.context.recentMessages.push(userInput);
    if (this.context.recentMessages.length > 10) {
      this.context.recentMessages.shift();
    }
    
    this.context.timeOfDay = this.getTimeOfDay();
    this.context.userMood = this.analyzeEmotion(userInput);

    // Store in memory
    const memoryItem: MemoryItem = {
      id: Date.now().toString(),
      type: 'conversation',
      content: userInput,
      timestamp: new Date(),
      importance: this.calculateImportance(userInput),
      tags: ['conversation', 'user-input'],
      metadata: {
        emotion: this.context.userMood,
        context: this.context.timeOfDay
      }
    };
    this.addToMemory(memoryItem);

    // Find the best skill to handle the input
    const bestSkill = this.findBestSkill(userInput);
    
    if (bestSkill) {
      const response = await bestSkill.handler(userInput, this.context);
      
      // Add context awareness
      const contextualResponse = this.addContextAwareness(response, userInput);
      
      return contextualResponse;
    }

    // Default response if no skill matches
    return {
      content: "I understand what you're saying. How can I help you with this? I'm here to assist with various tasks like searching, setting reminders, or creative projects.",
      confidence: 0.6,
      metadata: {
        action: 'conversation',
        followUp: 'What would you like to accomplish?'
      }
    };
  }

  private findBestSkill(input: string): Skill | null {
    const lowerInput = input.toLowerCase();
    let bestSkill: Skill | null = null;
    let bestScore = 0;

    for (const skill of this.skills) {
      if (!skill.enabled) continue;
      
      const score = skill.keywords.reduce((total, keyword) => {
        if (lowerInput.includes(keyword.toLowerCase())) {
          return total + 1;
        }
        return total;
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestSkill = skill;
      }
    }

    return bestSkill;
  }

  private addContextAwareness(response: SkillResponse, userInput: string): SkillResponse {
    let enhancedContent = response.content;

    // Add memory-based context
    const recentMemory = this.memory.slice(-5);
    const relatedItems = recentMemory.filter(item => 
      item.content.toLowerCase().includes(userInput.toLowerCase().split(' ')[0]) ||
      userInput.toLowerCase().includes(item.content.toLowerCase().split(' ')[0])
    );

    if (relatedItems.length > 0) {
      enhancedContent += " I remember we discussed something similar earlier. Let me build on that context.";
    }

    // Add time-based context
    if (this.context.timeOfDay === 'night' && this.context.recentMessages.length > 5) {
      enhancedContent += " I notice it's getting late - would you like me to help you wrap up for the day?";
    }

    // Add mood-based context
    if (this.context.userMood === 'negative') {
      enhancedContent += " I sense you might be having a challenging time. I'm here to help make things easier.";
    }

    return {
      ...response,
      content: enhancedContent
    };
  }

  public addToMemory(item: MemoryItem): void {
    this.memory.push(item);
    
    // Keep memory size manageable
    if (this.memory.length > 100) {
      // Remove least important items
      this.memory.sort((a, b) => b.importance - a.importance);
      this.memory = this.memory.slice(0, 80);
    }
  }

  public getMemory(): MemoryItem[] {
    return [...this.memory];
  }

  public getContext(): ConversationContext {
    return { ...this.context };
  }

  public updatePreferences(preferences: Partial<ConversationContext['userPreferences']>): void {
    this.context.userPreferences = { ...this.context.userPreferences, ...preferences };
  }

  public getSkills(): Skill[] {
    return this.skills.map(skill => ({ ...skill }));
  }

  public toggleSkill(skillId: string): void {
    const skill = this.skills.find(s => s.id === skillId);
    if (skill) {
      skill.enabled = !skill.enabled;
    }
  }
}

// Create singleton instance
export const aiService = new AIService();