import { SkillDefinition, SkillResult, SkillContext } from "./types";

// Utility to create simple fuzzy match
function includesAny(text: string, keywords: string[]): boolean {
	const lower = text.toLowerCase();
	return keywords.some((k) => lower.includes(k));
}

// 1) Reminder skill (simple local storage per conversation)
interface ReminderArgs { when: string | null; text: string }

const reminderSkill: SkillDefinition<ReminderArgs> = {
	id: "reminder",
	description: "Create a local reminder with optional time expression (natural language).",
	match: (input) => {
		if (!includesAny(input, ["remind", "reminder"])) return null;
		const match = input.match(/remind me (?:to )?(.*?)(?: at | on | in | tomorrow | next | at\s+\d|$)/i);
		const text = match?.[1]?.trim() || input.replace(/remind( me)?/i, "").trim();
		return { score: 0.9, args: { when: null, text } };
	},
	run: async (args, ctx) => {
		const id = `rem-${Date.now()}`;
		ctx.persistMemory({ id, text: `Reminder: ${args.text}`, tags: ["reminder"], importance: 0.6, createdAt: Date.now() });
		const result: SkillResult = {
			title: "Reminder set",
			summary: `Okay, I'll remember: ${args.text}`,
			speak: `Reminder noted: ${args.text}`,
		};
		return result;
	},
};

// 2) Open link/app skill (browser)
interface OpenArgs { url: string }

const openSkill: SkillDefinition<OpenArgs> = {
	id: "open",
	description: "Open a URL in a new tab.",
	match: (input) => {
		if (!includesAny(input, ["open", "launch", "go to"])) return null;
		const urlMatch = input.match(/(?:open|go to|launch)\s+(https?:[^\s]+|[\w.-]+\.[a-z]{2,}(?:\/[^\s]*)?)/i);
		if (!urlMatch) return null;
		let url = urlMatch[1];
		if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
		return { score: 0.85, args: { url } };
	},
	run: async (args) => {
		window.open(args.url, "_blank");
		return {
			title: "Opening",
			summary: `Opened ${args.url}`,
			speak: `Opening ${args.url}`,
		};
	},
};

// 3) Web search placeholder (no external API key)
interface SearchArgs { query: string }

const searchSkill: SkillDefinition<SearchArgs> = {
	id: "search",
	description: "Perform a web search using default engine.",
	match: (input) => {
		if (!includesAny(input, ["search", "look up", "google"])) return null;
		const q = input.replace(/^(search|google|look up)\s*/i, "").trim();
		return { score: 0.8, args: { query: q } };
	},
	run: async ({ query }) => {
		const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
		window.open(url, "_blank");
		return { title: "Searching", summary: `Searching for: ${query}`, speak: `Searching for ${query}` };
	},
};

// 4) Small talk fallback
const smallTalk: SkillDefinition<{ text: string }> = {
	id: "small-talk",
	description: "Friendly, human-like small talk responses.",
	match: (input) => {
		if (includesAny(input, ["hi", "hello", "hey", "how are you", "what's up"])) {
			return { score: 0.5, args: { text: input } };
		}
		return null;
	},
	run: async () => {
		const replies = [
			"Hey! Great to see you. What can I do for you today?",
			"Hi there! Ready when you are.",
			"Hello! How can I help?",
			"Hey! I’ve got coffee and CPU cycles—what’s the plan?",
		];
		const reply = replies[Math.floor(Math.random() * replies.length)];
		return { title: "", summary: reply, speak: reply };
	},
};

export const builtinSkills: SkillDefinition[] = [reminderSkill, openSkill, searchSkill, smallTalk];

export function pickBestSkill(input: string): SkillDefinition | null {
	const scored = builtinSkills
		.map((s) => ({ s, m: s.match(input) }))
		.filter((x) => x.m && typeof x.m.score === "number") as { s: SkillDefinition; m: { score: number } }[];
	if (scored.length === 0) return null;
	return scored.sort((a, b) => (b.m.score ?? 0) - (a.m.score ?? 0))[0].s;
}

export async function runWithBestSkill(input: string, ctx: SkillContext): Promise<SkillResult> {
	const best = pickBestSkill(input);
	if (!best) {
		return { title: "", summary: "I’m not sure yet, but I can learn this.", speak: "I'm not sure yet, but I can learn this." };
	}
	const match = best.match(input);
	return best.run((match?.args ?? {}) as unknown, ctx);
}