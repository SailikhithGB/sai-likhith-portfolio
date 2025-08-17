import { VoiceSettings } from '../types';

export class VoiceService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private settings: VoiceSettings;

  // Event callbacks
  public onListeningStart?: () => void;
  public onListeningEnd?: () => void;
  public onResult?: (transcript: string, isFinal: boolean) => void;
  public onError?: (error: string) => void;
  public onSpeakStart?: () => void;
  public onSpeakEnd?: () => void;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.settings = this.getDefaultSettings();
    this.initializeSpeechRecognition();
    this.loadVoices();
  }

  private getDefaultSettings(): VoiceSettings {
    return {
      enabled: true,
      autoSpeak: false,
      language: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 0.8
    };
  }

  private initializeSpeechRecognition(): void {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.settings.language;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.onListeningStart?.();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onListeningEnd?.();
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          this.onResult?.(finalTranscript, true);
        } else if (interimTranscript) {
          this.onResult?.(interimTranscript, false);
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        this.onError?.(event.error);
        this.isListening = false;
      };
    }
  }

  private loadVoices(): void {
    const loadVoicesImpl = () => {
      this.voices = this.synthesis.getVoices();
      
      // Find a good default voice
      if (!this.settings.voice && this.voices.length > 0) {
        // Prefer English voices
        const englishVoices = this.voices.filter(voice => 
          voice.lang.startsWith('en')
        );
        
        if (englishVoices.length > 0) {
          // Prefer female voices as they tend to sound more natural
          const femaleVoice = englishVoices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('susan')
          );
          
          this.settings.voice = femaleVoice || englishVoices[0];
        } else {
          this.settings.voice = this.voices[0];
        }
      }
    };

    loadVoicesImpl();

    // Chrome loads voices asynchronously
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoicesImpl;
    }
  }

  // Speech Recognition Methods
  public startListening(): void {
    if (!this.recognition) {
      this.onError?.('Speech recognition not supported');
      return;
    }

    if (this.isListening) {
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      this.onError?.('Failed to start listening');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  // Text-to-Speech Methods
  public speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      this.stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      if (this.settings.voice) {
        utterance.voice = this.settings.voice;
      }
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;
      utterance.volume = this.settings.volume;
      utterance.lang = this.settings.language;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.onSpeakStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.onSpeakEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        this.onSpeakEnd?.();
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.synthesis.speak(utterance);
    });
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Settings Management
  public updateSettings(newSettings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    
    if (this.recognition && newSettings.language) {
      this.recognition.lang = newSettings.language;
    }
  }

  public getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return [...this.voices];
  }

  public getAvailableLanguages(): string[] {
    const languages = new Set<string>();
    this.voices.forEach(voice => {
      languages.add(voice.lang);
    });
    return Array.from(languages).sort();
  }

  // Utility Methods
  public isSupported(): { recognition: boolean; synthesis: boolean } {
    return {
      recognition: this.recognition !== null,
      synthesis: 'speechSynthesis' in window
    };
  }

  public async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  }

  // Advanced Features
  public speakWithExpression(text: string, expression: 'happy' | 'sad' | 'excited' | 'calm' = 'calm'): Promise<void> {
    // Adjust voice parameters based on expression
    const originalSettings = { ...this.settings };
    
    switch (expression) {
      case 'happy':
        this.settings.rate = Math.min(1.2, originalSettings.rate * 1.1);
        this.settings.pitch = Math.min(2.0, originalSettings.pitch * 1.1);
        break;
      case 'sad':
        this.settings.rate = Math.max(0.5, originalSettings.rate * 0.8);
        this.settings.pitch = Math.max(0.5, originalSettings.pitch * 0.9);
        break;
      case 'excited':
        this.settings.rate = Math.min(1.5, originalSettings.rate * 1.2);
        this.settings.pitch = Math.min(2.0, originalSettings.pitch * 1.2);
        break;
      case 'calm':
        this.settings.rate = originalSettings.rate * 0.95;
        this.settings.pitch = originalSettings.pitch * 0.98;
        break;
    }

    return this.speak(text).finally(() => {
      // Restore original settings
      this.settings = originalSettings;
    });
  }

  public getVoiceByName(name: string): SpeechSynthesisVoice | undefined {
    return this.voices.find(voice => voice.name === name);
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.settings.voice = voice;
  }

  // Cleanup
  public cleanup(): void {
    this.stopListening();
    this.stopSpeaking();
  }
}

export const voiceService = new VoiceService();