export function isSpeechRecognitionSupported(): boolean {
	return typeof window !== "undefined" && !!((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition);
}

export function createSpeechRecognition(): SpeechRecognition | null {
	const AnyWindow = window as any;
	const Recognition = AnyWindow.SpeechRecognition || AnyWindow.webkitSpeechRecognition;
	if (!Recognition) return null;
	const rec: SpeechRecognition = new Recognition();
	rec.continuous = false;
	rec.lang = navigator.language || "en-US";
	rec.interimResults = false;
	rec.maxAlternatives = 1;
	return rec;
}

export function speak(text: string, voiceName?: string) {
	if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
	const utter = new SpeechSynthesisUtterance(text);
	utter.rate = 1.0;
	utter.pitch = 1.0;
	utter.volume = 1.0;
	if (voiceName) {
		const voice = window.speechSynthesis.getVoices().find((v) => v.name === voiceName);
		if (voice) utter.voice = voice;
	}
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(utter);
}