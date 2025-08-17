export type Role = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
	id: string;
	role: Role;
	content: string;
	timestamp: number; // epoch ms
	meta?: Record<string, unknown>;
}

export interface ConversationState {
	id: string;
	title: string;
	messages: ChatMessage[];
	createdAt: number;
	updatedAt: number;
	memories: MemoryItem[];
}

export interface MemoryItem {
	id: string;
	text: string;
	tags: string[];
	importance: number; // 0..1
	createdAt: number;
	lastAccessedAt?: number;
}

export interface AssistantConfig {
	name: string;
	persona: string;
	llmProvider: "openai" | "none";
	voice: string | null;
	enableTts: boolean;
	enableStt: boolean;
}

export interface SkillContext {
	conversation: ConversationState;
	updateConversation: (updater: (draft: ConversationState) => ConversationState) => void;
	persistMemory: (memory: MemoryItem) => void;
	recall: (query: string, limit?: number) => MemoryItem[];
}

export interface SkillResult {
	title: string;
	summary: string;
	data?: unknown;
	followUps?: string[];
	speak?: string; // optional text for TTS
}

export interface SkillDefinition<Args = unknown> {
	id: string;
	description: string;
	match: (input: string) => { score: number; args?: Args } | null;
	run: (args: Args, ctx: SkillContext) => Promise<SkillResult>;
}