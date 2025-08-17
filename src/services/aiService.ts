import OpenAI from 'openai';
import { Message, UserContext } from '../types';
import { taskService } from './taskService';

export class AIService {
  private openai: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.initializeAPI();
  }

  private initializeAPI() {
    // Try to get API key from environment or localStorage
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key');
    
    if (apiKey) {
      this.apiKey = apiKey;
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    localStorage.setItem('openai_api_key', apiKey);
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  public isConfigured(): boolean {
    return this.openai !== null && this.apiKey !== null;
  }

  public async generateResponse(
    messages: Message[],
    userContext: UserContext,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    // Check if this is a task that can be handled locally first
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      const taskResponse = await taskService.processTask(lastMessage.content, userContext);
      if (taskResponse && taskResponse !== lastMessage.content) {
        // Task service handled it, return the response
        return taskResponse;
      }
    }

    if (!this.openai) {
      throw new Error('AI service not configured. Please set your OpenAI API key.');
    }

    try {
      const systemMessage = this.buildSystemMessage(userContext);
      const conversationMessages = [
        { role: 'system' as const, content: systemMessage },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      if (onStream) {
        return await this.streamResponse(conversationMessages, userContext, onStream);
      } else {
        return await this.getCompleteResponse(conversationMessages, userContext);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async streamResponse(
    messages: any[],
    userContext: UserContext,
    onStream: (chunk: string) => void
  ): Promise<string> {
    const stream = await this.openai!.chat.completions.create({
      model: userContext.preferences.model === 'gpt-4' ? 'gpt-4-turbo-preview' : 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: userContext.preferences.maxTokens,
      temperature: userContext.preferences.temperature,
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        onStream(content);
      }
    }

    return fullResponse;
  }

  private async getCompleteResponse(
    messages: any[],
    userContext: UserContext
  ): Promise<string> {
    const completion = await this.openai!.chat.completions.create({
      model: userContext.preferences.model === 'gpt-4' ? 'gpt-4-turbo-preview' : 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: userContext.preferences.maxTokens,
      temperature: userContext.preferences.temperature,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  }

  private buildSystemMessage(userContext: UserContext): string {
    const currentTime = new Date().toLocaleString();
    const userInfo = userContext.personalInfo;
    
    return `You are ARIA (Advanced Responsive Intelligence Assistant), a helpful, intelligent, and human-like AI assistant. Here's what you should know:

CURRENT CONTEXT:
- Current time: ${currentTime}
- User's timezone: ${userInfo.timezone || 'Unknown'}
- User's location: ${userInfo.location || 'Unknown'}
- User's interests: ${userInfo.interests?.join(', ') || 'None specified'}
- User's occupation: ${userInfo.occupation || 'Unknown'}

YOUR PERSONALITY:
- Be conversational, warm, and genuinely helpful
- Show curiosity and ask follow-up questions when appropriate
- Remember previous conversations and build on them
- Be proactive in offering assistance
- Use natural language and avoid being overly formal
- Show empathy and understanding

YOUR CAPABILITIES:
- Answer questions and provide explanations
- Help with productivity tasks and reminders
- Assist with creative projects and brainstorming
- Provide recommendations and suggestions
- Help with research and information gathering
- Support learning and skill development
- Engage in casual conversation

COMMUNICATION STYLE:
- Use a friendly, conversational tone
- Be concise but thorough
- Ask clarifying questions when needed
- Provide actionable advice when possible
- Use examples to illustrate points
- Acknowledge when you don't know something

Remember: You're not just answering questions, you're having a conversation with someone who may need help, companionship, or just wants to chat. Be the kind of assistant that people genuinely enjoy talking to.`;
  }

  public async generateTitle(messages: Message[]): Promise<string> {
    if (!this.openai || messages.length === 0) {
      return 'New Conversation';
    }

    try {
      const firstUserMessage = messages.find(m => m.role === 'user')?.content || '';
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Generate a short, descriptive title (3-6 words) for this conversation based on the user\'s first message. Be concise and specific.'
          },
          {
            role: 'user',
            content: firstUserMessage
          }
        ],
        max_tokens: 20,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content?.trim() || 'New Conversation';
    } catch (error) {
      console.error('Error generating title:', error);
      return 'New Conversation';
    }
  }
}

export const aiService = new AIService();