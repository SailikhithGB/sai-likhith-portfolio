import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { AssistantAgent } from "@/assistant/agent";
import { speak, createSpeechRecognition, isSpeechRecognitionSupported } from "@/assistant/speech";
import type { ChatMessage } from "@/assistant/types";
import { Mic, MicOff, Send, Sparkles, Volume2 } from "lucide-react";

const MessageBubble = ({ message }: { message: ChatMessage }) => {
	const isUser = message.role === "user";
	return (
		<div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
			style={{ animation: "slide-in 0.4s ease-out" }}
		>
			<div
				className={cn(
					"max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow",
					isUser ? "bg-cyber-blue/20 border border-cyber-blue/40 text-white" : "bg-white/5 border border-white/10 text-gray-200"
				)}
			>
				{message.content}
			</div>
		</div>
	);
};

export default function AssistantPage() {
	const [agent] = useState(() => new AssistantAgent());
	const [input, setInput] = useState("");
	const [listening, setListening] = useState(false);
	const [_, force] = useState(0);
	const recRef = useRef<SpeechRecognition | null>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const messages = agent.state.messages;
	const canStt = isSpeechRecognitionSupported();

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	useEffect(() => {
		if (!recRef.current && canStt) {
			recRef.current = createSpeechRecognition();
			if (recRef.current) {
				recRef.current.onresult = (event: SpeechRecognitionEvent) => {
					const transcript = event.results[0][0].transcript;
					setInput(transcript);
				};
				recRef.current.onend = () => setListening(false);
			}
		}
	}, [canStt]);

	async function send() {
		const trimmed = input.trim();
		if (!trimmed) return;
		setInput("");
		await agent.handleUserInput(trimmed);
		force((x) => x + 1);
		const last = agent.state.messages[agent.state.messages.length - 1];
		if (last?.meta && typeof last.meta["speak"] === "string") speak(String(last.meta["speak"]));
	}

	function startStopListening() {
		if (!canStt || !recRef.current) return;
		if (listening) {
			recRef.current.stop();
			setListening(false);
		} else {
			setListening(true);
			recRef.current.start();
		}
	}

	return (
		<div className="min-h-screen bg-black text-white">
			<Navigation />
			<main className="pt-24 pb-16">
				<div className="max-w-5xl mx-auto px-4">
					<div className="flex items-center gap-2 mb-6">
						<h1 className="text-3xl font-bold gradient-text">Assistant</h1>
						<Sparkles className="text-cyber-pink" />
					</div>

					<Card className="bg-gradient-to-b from-white/5 to-transparent border-white/10">
						<CardHeader>
							<CardTitle>Chat with Nova</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-4 h-[60vh] overflow-y-auto pr-1">
								{messages.length === 0 && (
									<div className="text-gray-400 text-sm">
										Say hi, ask me to open a site, set a reminder, or search the web.
									</div>
								)}
								{messages.map((m) => (
									<MessageBubble key={m.id} message={m} />
								))}
								<div ref={bottomRef} />
							</div>

							<div className="mt-4 flex items-center gap-2">
								<Input
									placeholder="Type your message..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									className="bg-white/5 border-white/10"
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									}}
								/>
								<Button onClick={send} className="bg-cyber-blue/30 hover:bg-cyber-blue/40 border border-cyber-blue/50">
									<Send className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									onClick={startStopListening}
									className="border-white/20 hover:bg-white/10"
								>
									{listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
								</Button>
								<Button
									variant="ghost"
									onClick={() => {
										const last = agent.state.messages[agent.state.messages.length - 1];
										if (last) speak(last.content);
									}}
									className="text-gray-300 hover:text-white"
								>
									<Volume2 className="w-4 h-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}