import { AICapability, Reminder, SystemInfo } from '../types';
import { storageService } from './storageService';
import { v4 as uuidv4 } from 'uuid';

export class TaskService {
  private capabilities: Map<string, AICapability> = new Map();

  constructor() {
    this.initializeCapabilities();
  }

  private initializeCapabilities() {
    const capabilities: AICapability[] = [
      {
        id: 'reminder',
        name: 'Reminder Management',
        description: 'Create, manage, and track reminders',
        icon: '⏰',
        category: 'productivity',
        enabled: true,
        handler: this.handleReminder.bind(this)
      },
      {
        id: 'search',
        name: 'Web Search',
        description: 'Search for information on the web',
        icon: '🔍',
        category: 'productivity',
        enabled: true,
        handler: this.handleSearch.bind(this)
      },
      {
        id: 'system',
        name: 'System Information',
        description: 'Get system and browser information',
        icon: '💻',
        category: 'system',
        enabled: true,
        handler: this.handleSystemInfo.bind(this)
      },
      {
        id: 'weather',
        name: 'Weather Information',
        description: 'Get weather information for locations',
        icon: '🌤️',
        category: 'productivity',
        enabled: true,
        handler: this.handleWeather.bind(this)
      },
      {
        id: 'time',
        name: 'Time & Date',
        description: 'Get current time, date, and timezone information',
        icon: '🕒',
        category: 'productivity',
        enabled: true,
        handler: this.handleTime.bind(this)
      },
      {
        id: 'calculator',
        name: 'Calculator',
        description: 'Perform mathematical calculations',
        icon: '🧮',
        category: 'productivity',
        enabled: true,
        handler: this.handleCalculation.bind(this)
      },
      {
        id: 'creative',
        name: 'Creative Writing',
        description: 'Help with creative writing, stories, and brainstorming',
        icon: '✍️',
        category: 'creative',
        enabled: true,
        handler: this.handleCreative.bind(this)
      }
    ];

    capabilities.forEach(cap => {
      this.capabilities.set(cap.id, cap);
    });
  }

  public getCapabilities(): AICapability[] {
    return Array.from(this.capabilities.values());
  }

  public async processTask(input: string, context?: any): Promise<string> {
    const lowerInput = input.toLowerCase();

    // Determine which capability to use based on input
    if (this.isReminderRequest(lowerInput)) {
      return await this.handleReminder(input, context);
    } else if (this.isSearchRequest(lowerInput)) {
      return await this.handleSearch(input, context);
    } else if (this.isSystemRequest(lowerInput)) {
      return await this.handleSystemInfo(input, context);
    } else if (this.isWeatherRequest(lowerInput)) {
      return await this.handleWeather(input, context);
    } else if (this.isTimeRequest(lowerInput)) {
      return await this.handleTime(input, context);
    } else if (this.isCalculationRequest(lowerInput)) {
      return await this.handleCalculation(input, context);
    }

    // Default to creative/conversational
    return await this.handleCreative(input, context);
  }

  // Detection methods
  private isReminderRequest(input: string): boolean {
    const reminderKeywords = ['remind', 'reminder', 'schedule', 'appointment', 'meeting', 'todo', 'task'];
    return reminderKeywords.some(keyword => input.includes(keyword));
  }

  private isSearchRequest(input: string): boolean {
    const searchKeywords = ['search', 'find', 'look up', 'google', 'what is', 'who is', 'where is', 'how to'];
    return searchKeywords.some(keyword => input.includes(keyword));
  }

  private isSystemRequest(input: string): boolean {
    const systemKeywords = ['system', 'computer', 'browser', 'memory', 'performance', 'specs'];
    return systemKeywords.some(keyword => input.includes(keyword));
  }

  private isWeatherRequest(input: string): boolean {
    const weatherKeywords = ['weather', 'temperature', 'forecast', 'rain', 'sunny', 'cloudy', 'storm'];
    return weatherKeywords.some(keyword => input.includes(keyword));
  }

  private isTimeRequest(input: string): boolean {
    const timeKeywords = ['time', 'date', 'clock', 'timezone', 'what time', 'what date'];
    return timeKeywords.some(keyword => input.includes(keyword));
  }

  private isCalculationRequest(input: string): boolean {
    const mathPattern = /[\d+\-*/()=]/;
    const mathKeywords = ['calculate', 'compute', 'math', 'plus', 'minus', 'multiply', 'divide'];
    return mathPattern.test(input) || mathKeywords.some(keyword => input.includes(keyword));
  }

  // Handler methods
  private async handleReminder(input: string, context?: any): Promise<string> {
    try {
      // Extract reminder details from input
      const reminderInfo = this.parseReminderRequest(input);
      
      if (reminderInfo) {
        const reminder = await storageService.createReminder(
          reminderInfo.title,
          reminderInfo.description || '',
          reminderInfo.dueDate
        );
        
        return `✅ I've created a reminder for "${reminderInfo.title}" on ${reminderInfo.dueDate.toLocaleDateString()} at ${reminderInfo.dueDate.toLocaleTimeString()}.`;
      } else {
        return "I'd be happy to help you create a reminder! Please tell me what you'd like to be reminded about and when. For example: 'Remind me to call mom tomorrow at 2 PM' or 'Set a reminder for my dentist appointment on Friday at 10 AM'.";
      }
    } catch (error) {
      return "I had trouble creating that reminder. Could you please rephrase your request with more specific details about what and when you'd like to be reminded?";
    }
  }

  private parseReminderRequest(input: string): { title: string; description?: string; dueDate: Date } | null {
    // Simple parsing logic - in a real app, you'd use more sophisticated NLP
    const timePatterns = [
      /tomorrow at (\d{1,2}):?(\d{2})?\s*(am|pm)?/i,
      /(\d{1,2}):?(\d{2})?\s*(am|pm)/i,
      /in (\d+) (hour|minute|day)s?/i
    ];

    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1); // Default to tomorrow
    dueDate.setHours(9, 0, 0, 0); // Default to 9 AM

    // Extract title (everything before time indicators)
    const title = input
      .replace(/remind me to|reminder|set a reminder for|schedule/i, '')
      .replace(/tomorrow at.*|in \d+.*|at \d+.*/i, '')
      .trim();

    if (!title) return null;

    return {
      title,
      dueDate
    };
  }

  private async handleSearch(input: string): Promise<string> {
    // Simulate web search (in a real app, you'd use a search API)
    const searchQuery = input.replace(/search for|find|look up|google|what is|who is|where is|how to/i, '').trim();
    
    if (!searchQuery) {
      return "What would you like me to search for? Just tell me your question or topic!";
    }

    // Simulate search results
    const searchResults = [
      `I found several results for "${searchQuery}":`,
      "",
      "🔍 **Search Results** (simulated):",
      `• Top result: Information about ${searchQuery}`,
      `• Related topics and articles about ${searchQuery}`,
      `• Recent news and updates on ${searchQuery}`,
      "",
      "*Note: This is a demonstration. In a full implementation, I would search the web using real APIs and provide actual results with links and summaries.*",
      "",
      "Would you like me to search for something more specific or help you with a different task?"
    ];

    return searchResults.join('\n');
  }

  private async handleSystemInfo(input: string): Promise<string> {
    try {
      const systemInfo = this.getSystemInformation();
      
      return [
        "🖥️ **System Information:**",
        "",
        `**Browser:** ${systemInfo.browser}`,
        `**Platform:** ${systemInfo.platform}`,
        `**Language:** ${systemInfo.language}`,
        `**Screen Resolution:** ${systemInfo.screenResolution}`,
        `**Timezone:** ${systemInfo.timezone}`,
        `**Online Status:** ${systemInfo.online ? '✅ Connected' : '❌ Offline'}`,
        "",
        `**Available Memory:** ${systemInfo.memory}`,
        `**CPU Cores:** ${systemInfo.cores}`,
        "",
        "*Note: Some information may be limited due to browser security restrictions.*"
      ].join('\n');
    } catch (error) {
      return "I encountered an issue getting system information. This might be due to browser security restrictions.";
    }
  }

  private getSystemInformation(): SystemInfo & { browser: string; language: string; screenResolution: string; online: boolean; cores: number } {
    return {
      platform: navigator.platform,
      architecture: navigator.userAgent.includes('x64') ? 'x64' : 'x86',
      memory: {
        total: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown',
        available: 'Unknown'
      },
      browser: this.getBrowserInfo(),
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      online: navigator.onLine,
      cores: navigator.hardwareConcurrency || 'Unknown'
    };
  }

  private getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Google Chrome';
    if (userAgent.includes('Firefox')) return 'Mozilla Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Microsoft Edge';
    return 'Unknown Browser';
  }

  private async handleWeather(input: string): Promise<string> {
    // Simulate weather information (in a real app, you'd use a weather API)
    const location = this.extractLocation(input) || 'your location';
    
    return [
      `🌤️ **Weather for ${location}:**`,
      "",
      "**Current Conditions:**",
      "• Temperature: 72°F (22°C)",
      "• Conditions: Partly Cloudy",
      "• Humidity: 65%",
      "• Wind: 8 mph SW",
      "",
      "**Today's Forecast:**",
      "• High: 78°F (26°C)",
      "• Low: 65°F (18°C)",
      "• Chance of rain: 20%",
      "",
      "*Note: This is simulated weather data. In a full implementation, I would use real weather APIs to provide accurate, up-to-date information for your specific location.*",
      "",
      "Would you like a forecast for a different location or time period?"
    ].join('\n');
  }

  private extractLocation(input: string): string | null {
    // Simple location extraction
    const locationWords = ['in', 'at', 'for'];
    for (const word of locationWords) {
      const index = input.toLowerCase().indexOf(word);
      if (index !== -1) {
        const location = input.substring(index + word.length).trim();
        if (location) return location;
      }
    }
    return null;
  }

  private async handleTime(input: string): Promise<string> {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return [
      "🕒 **Current Time & Date:**",
      "",
      `**Local Time:** ${now.toLocaleTimeString()}`,
      `**Date:** ${now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`,
      `**Timezone:** ${timeZone}`,
      "",
      `**UTC Time:** ${now.toUTCString()}`,
      `**Unix Timestamp:** ${Math.floor(now.getTime() / 1000)}`,
      "",
      "Need the time in a different timezone? Just ask!"
    ].join('\n');
  }

  private async handleCalculation(input: string): Promise<string> {
    try {
      // Simple math evaluation (be careful with eval in production!)
      const mathExpression = input.replace(/calculate|compute|what is|equals?/gi, '').trim();
      
      // Basic safety check
      if (!/^[\d+\-*/().\s]+$/.test(mathExpression)) {
        return "I can help with basic math calculations! Try something like: 'Calculate 15 * 7 + 23' or 'What is 100 / 4?'";
      }

      const result = Function(`"use strict"; return (${mathExpression})`)();
      
      return [
        "🧮 **Calculation Result:**",
        "",
        `**Expression:** ${mathExpression}`,
        `**Result:** ${result}`,
        "",
        "Need help with more complex calculations or conversions? Just ask!"
      ].join('\n');
    } catch (error) {
      return "I had trouble with that calculation. Please check your math expression and try again. I can help with basic arithmetic like addition (+), subtraction (-), multiplication (*), and division (/).";
    }
  }

  private async handleCreative(input: string): Promise<string> {
    // This is a fallback for general conversation
    // In a real implementation, this would be handled by the main AI service
    return input; // Let the main AI handle this
  }

  // Utility methods for reminder management
  public async getAllReminders(): Promise<Reminder[]> {
    return await storageService.getAllReminders();
  }

  public async deleteReminder(id: string): Promise<void> {
    return await storageService.deleteReminder(id);
  }

  public async markReminderComplete(id: string): Promise<void> {
    const reminder = await storageService.getReminder(id);
    if (reminder) {
      reminder.completed = true;
      await storageService.saveReminder(reminder);
    }
  }
}

export const taskService = new TaskService();