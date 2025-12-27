import { ConversationState, MemoryItem } from "./types";

const CONVERSATIONS_KEY = "assistant.conversations.v1";

function safeParse<T>(raw: string | null, fallback: T): T {
	try {
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

export function listConversations(): ConversationState[] {
	return safeParse<ConversationState[]>(localStorage.getItem(CONVERSATIONS_KEY), []);
}

export function saveConversations(conversations: ConversationState[]) {
	localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
}

export function upsertConversation(updated: ConversationState) {
	const conversations = listConversations();
	const idx = conversations.findIndex((c) => c.id === updated.id);
	if (idx >= 0) {
		conversations[idx] = updated;
	} else {
		conversations.unshift(updated);
	}
	saveConversations(conversations);
}

export function getConversation(id: string): ConversationState | null {
	return listConversations().find((c) => c.id === id) ?? null;
}

export function removeConversation(id: string) {
	const conversations = listConversations().filter((c) => c.id !== id);
	saveConversations(conversations);
}

export function searchMemories(conversation: ConversationState, query: string, limit = 5): MemoryItem[] {
	const normalized = query.toLowerCase();
	return conversation.memories
		.map((m) => ({
			memory: m,
			score:
				(m.text.toLowerCase().includes(normalized) ? 1 : 0) +
				m.tags.reduce((acc, t) => acc + (t.toLowerCase().includes(normalized) ? 0.5 : 0), 0),
		}))
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score || (b.memory.lastAccessedAt ?? 0) - (a.memory.lastAccessedAt ?? 0))
		.slice(0, limit)
		.map((x) => x.memory);
}