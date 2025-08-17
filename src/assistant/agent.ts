import { v4 as uuidv4 } from "uuid";
import { AssistantConfig, ChatMessage, ConversationState, MemoryItem, SkillContext } from "./types";
import { getConversation, upsertConversation } from "./storage";
import { runWithBestSkill } from "./skills";
import { builtinSkills } from "./skills";
import { chatComplete, isOpenAIConfigured } from "./llm";

export class AssistantAgent {
	private config: AssistantConfig;
	private conversation: ConversationState;

	constructor(config?: Partial<AssistantConfig>, conversationId?: string) {
		this.config = {
			name: config?.name ?? "Nova",
			persona:
				config?.persona ??
				"You are Nova, a friendly, efficient AI assistant. Be concise, warm, and proactive. Use plain language and anticipate needs.",
			llmProvider: config?.llmProvider ?? "none",
			voice: config?.voice ?? null,
			enableTts: config?.enableTts ?? true,
			enableStt: config?.enableStt ?? true,
		};

		const existing = conversationId ? getConversation(conversationId) : null;
		this.conversation =
			existing ?? {
				id: conversationId ?? uuidv4(),
				title: "New Chat",
				messages: [],
				createdAt: Date.now(),
				updatedAt: Date.now(),
				memories: [],
			};
	}

	get state(): ConversationState {
		return this.conversation;
	}

	private commit() {
		this.conversation.updatedAt = Date.now();
		upsertConversation(this.conversation);
	}

	appendMessage(message: Omit<ChatMessage, "id" | "timestamp">) {
		this.conversation.messages.push({ id: uuidv4(), timestamp: Date.now(), ...message });
		this.commit();
	}

	persistMemory(memory: Omit<MemoryItem, "createdAt">) {
		this.conversation.memories.push({ ...memory, createdAt: Date.now() });
		this.commit();
	}

	recall(query: string, limit = 5): MemoryItem[] {
		const normalized = query.toLowerCase();
		return this.conversation.memories
			.map((m) => ({
				memory: m,
				score:
					(m.text.toLowerCase().includes(normalized) ? 1 : 0) +
					m.tags.reduce((acc, t) => acc + (t.toLowerCase().includes(normalized) ? 0.5 : 0), 0),
			}))
			.filter((x) => x.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, limit)
			.map((x) => x.memory);
	}

	private getSkillContext(): SkillContext {
		return {
			conversation: this.conversation,
			updateConversation: (updater) => {
				const updated = updater(this.conversation);
				this.conversation = updated;
				this.commit();
				return updated;
			},
			persistMemory: (memory) => this.persistMemory(memory),
			recall: (q, l) => this.recall(q, l),
		};
	}

	async handleUserInput(input: string): Promise<ChatMessage> {
		this.appendMessage({ role: "user", content: input });
		let responseText = "";

		// Evaluate best skill
		let bestScore = 0;
		let best = null as any;
		for (const s of builtinSkills) {
			const m = s.match(input);
			if (m && typeof m.score === "number" && m.score > bestScore) {
				bestScore = m.score;
				best = { s, args: m.args };
			}
		}

		const openaiReady = this.config.llmProvider === "openai" && isOpenAIConfigured();
		if (openaiReady && (!best || bestScore < 0.72)) {
			try {
				const history = this.conversation.messages.slice(-8).map((m) => ({ role: m.role as any, content: m.content }));
				const system = { role: "system", content: this.config.persona } as const;
				responseText = await chatComplete([system, ...history, { role: "user", content: input }]);
			} catch (err) {
				// Fallback to skill if LLM fails
				if (best) {
					const r = await best.s.run(best.args ?? {}, this.getSkillContext());
					responseText = r.summary;
				}
			}
		} else if (best) {
			const r = await best.s.run(best.args ?? {}, this.getSkillContext());
			responseText = r.summary;
		} else {
			responseText = "I’m not sure yet, but I can learn this.";
		}

		const assistantMessage: ChatMessage = {
			id: uuidv4(),
			role: "assistant",
			content: responseText,
			timestamp: Date.now(),
		};
		this.conversation.messages.push(assistantMessage);
		this.commit();
		return assistantMessage;
	}
}