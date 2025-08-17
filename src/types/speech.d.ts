declare interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

declare interface SpeechRecognitionResult {
	readonly 0: SpeechRecognitionAlternative;
	readonly length: number;
	readonly isFinal: boolean;
}

declare interface SpeechRecognitionResultList {
	readonly length: number;
	readonly 0: SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

declare interface SpeechRecognitionEvent extends Event {
	readonly results: SpeechRecognitionResultList;
}

declare interface SpeechRecognition extends EventTarget {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	maxAlternatives: number;
	onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
	onend: ((this: SpeechRecognition, ev: Event) => any) | null;
	start(): void;
	stop(): void;
}

declare var SpeechRecognition: {
	new (): SpeechRecognition;
};

declare var webkitSpeechRecognition: {
	new (): SpeechRecognition;
};