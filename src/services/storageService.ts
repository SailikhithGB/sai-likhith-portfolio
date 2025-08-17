import localforage from 'localforage';
import { Conversation, Message, UserContext, Reminder, AssistantState } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class StorageService {
  private conversationStore: LocalForage;
  private userStore: LocalForage;
  private reminderStore: LocalForage;

  constructor() {
    // Initialize separate stores for different data types
    this.conversationStore = localforage.createInstance({
      name: 'ai-assistant',
      storeName: 'conversations'
    });

    this.userStore = localforage.createInstance({
      name: 'ai-assistant',
      storeName: 'user-data'
    });

    this.reminderStore = localforage.createInstance({
      name: 'ai-assistant',
      storeName: 'reminders'
    });
  }

  // Conversation Management
  async saveConversation(conversation: Conversation): Promise<void> {
    try {
      await this.conversationStore.setItem(conversation.id, conversation);
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw new Error('Failed to save conversation');
    }
  }

  async getConversation(id: string): Promise<Conversation | null> {
    try {
      return await this.conversationStore.getItem<Conversation>(id);
    } catch (error) {
      console.error('Error retrieving conversation:', error);
      return null;
    }
  }

  async getAllConversations(): Promise<Conversation[]> {
    try {
      const conversations: Conversation[] = [];
      await this.conversationStore.iterate<Conversation, void>((value) => {
        conversations.push(value);
      });
      
      // Sort by most recent first
      return conversations.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } catch (error) {
      console.error('Error retrieving conversations:', error);
      return [];
    }
  }

  async deleteConversation(id: string): Promise<void> {
    try {
      await this.conversationStore.removeItem(id);
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw new Error('Failed to delete conversation');
    }
  }

  async createNewConversation(): Promise<Conversation> {
    const conversation: Conversation = {
      id: uuidv4(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };

    await this.saveConversation(conversation);
    return conversation;
  }

  async addMessageToConversation(conversationId: string, message: Message): Promise<void> {
    try {
      const conversation = await this.getConversation(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      conversation.messages.push(message);
      conversation.updatedAt = new Date();

      // Auto-generate title if this is the first user message
      if (conversation.messages.length === 2 && message.role === 'assistant') {
        // We have user message + assistant response, generate title
        const firstUserMessage = conversation.messages.find(m => m.role === 'user');
        if (firstUserMessage && conversation.title === 'New Conversation') {
          conversation.title = this.generateConversationTitle(firstUserMessage.content);
        }
      }

      await this.saveConversation(conversation);
    } catch (error) {
      console.error('Error adding message to conversation:', error);
      throw new Error('Failed to add message');
    }
  }

  private generateConversationTitle(firstMessage: string): string {
    // Simple title generation based on first message
    const words = firstMessage.split(' ').slice(0, 4);
    let title = words.join(' ');
    
    if (title.length > 30) {
      title = title.substring(0, 27) + '...';
    }
    
    return title || 'New Conversation';
  }

  // User Context Management
  async saveUserContext(context: UserContext): Promise<void> {
    try {
      await this.userStore.setItem('user-context', context);
    } catch (error) {
      console.error('Error saving user context:', error);
      throw new Error('Failed to save user context');
    }
  }

  async getUserContext(): Promise<UserContext> {
    try {
      const context = await this.userStore.getItem<UserContext>('user-context');
      return context || this.getDefaultUserContext();
    } catch (error) {
      console.error('Error retrieving user context:', error);
      return this.getDefaultUserContext();
    }
  }

  private getDefaultUserContext(): UserContext {
    return {
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
    };
  }

  // Reminders Management
  async saveReminder(reminder: Reminder): Promise<void> {
    try {
      await this.reminderStore.setItem(reminder.id, reminder);
    } catch (error) {
      console.error('Error saving reminder:', error);
      throw new Error('Failed to save reminder');
    }
  }

  async getReminder(id: string): Promise<Reminder | null> {
    try {
      return await this.reminderStore.getItem<Reminder>(id);
    } catch (error) {
      console.error('Error retrieving reminder:', error);
      return null;
    }
  }

  async getAllReminders(): Promise<Reminder[]> {
    try {
      const reminders: Reminder[] = [];
      await this.reminderStore.iterate<Reminder, void>((value) => {
        reminders.push(value);
      });
      
      // Sort by due date
      return reminders.sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } catch (error) {
      console.error('Error retrieving reminders:', error);
      return [];
    }
  }

  async deleteReminder(id: string): Promise<void> {
    try {
      await this.reminderStore.removeItem(id);
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw new Error('Failed to delete reminder');
    }
  }

  async createReminder(title: string, description: string, dueDate: Date): Promise<Reminder> {
    const reminder: Reminder = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      completed: false
    };

    await this.saveReminder(reminder);
    return reminder;
  }

  // Search functionality
  async searchConversations(query: string): Promise<Conversation[]> {
    try {
      const allConversations = await this.getAllConversations();
      const searchTerm = query.toLowerCase();

      return allConversations.filter(conversation => {
        // Search in title
        if (conversation.title.toLowerCase().includes(searchTerm)) {
          return true;
        }

        // Search in messages
        return conversation.messages.some(message => 
          message.content.toLowerCase().includes(searchTerm)
        );
      });
    } catch (error) {
      console.error('Error searching conversations:', error);
      return [];
    }
  }

  // Data export/import
  async exportData(): Promise<string> {
    try {
      const conversations = await this.getAllConversations();
      const userContext = await this.getUserContext();
      const reminders = await this.getAllReminders();

      const exportData = {
        conversations,
        userContext,
        reminders,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate data structure
      if (!data.conversations || !data.userContext || !data.reminders) {
        throw new Error('Invalid import data format');
      }

      // Import conversations
      for (const conversation of data.conversations) {
        await this.saveConversation(conversation);
      }

      // Import user context
      await this.saveUserContext(data.userContext);

      // Import reminders
      for (const reminder of data.reminders) {
        await this.saveReminder(reminder);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await Promise.all([
        this.conversationStore.clear(),
        this.userStore.clear(),
        this.reminderStore.clear()
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }
}

export const storageService = new StorageService();