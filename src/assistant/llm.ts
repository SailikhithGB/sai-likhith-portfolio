export interface LlmMessage { role: "system" | "user" | "assistant"; content: string }

export function isOpenAIConfigured(): boolean {
	return typeof import.meta !== "undefined" && !!import.meta.env.VITE_OPENAI_API_KEY;
}

export async function chatComplete(messages: LlmMessage[], model = "gpt-4o-mini"): Promise<string> {
	const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
	if (!apiKey) throw new Error("OpenAI API key missing");
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			messages,
			temperature: 0.7,
			max_tokens: 400,
		}),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`OpenAI error: ${res.status} ${text}`);
	}
	const json = await res.json();
	const content = json?.choices?.[0]?.message?.content ?? "";
	return content;
}