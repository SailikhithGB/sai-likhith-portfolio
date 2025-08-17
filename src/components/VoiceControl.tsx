import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mic, MicOff, Volume2, VolumeX, Settings, Activity } from 'lucide-react';

interface VoiceControlProps {
  isListening: boolean;
  onToggleListening: () => void;
}

const VoiceControl = ({ isListening, onToggleListening }: VoiceControlProps) => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for browser support
    const checkSupport = () => {
      const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      const hasSpeechSynthesis = 'speechSynthesis' in window;
      setIsSupported(hasSpeechRecognition && hasSpeechSynthesis);
      
      if (hasSpeechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            handleVoiceCommand(finalTranscript);
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsProcessing(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsProcessing(false);
        };
      }
      
      if (hasSpeechSynthesis) {
        synthesisRef.current = window.speechSynthesis;
      }
    };
    
    checkSupport();
  }, []);

  useEffect(() => {
    if (isListening && isSupported && recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsProcessing(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsProcessing(false);
      }
    } else if (!isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsProcessing(false);
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
  }, [isListening, isSupported]);

  const handleVoiceCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simulate AI processing
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = '';
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      response = "Hello! I heard you say hello. How can I help you today?";
    } else if (lowerCommand.includes('time')) {
      const now = new Date();
      response = `The current time is ${now.toLocaleTimeString()}`;
    } else if (lowerCommand.includes('date')) {
      const now = new Date();
      response = `Today's date is ${now.toLocaleDateString()}`;
    } else if (lowerCommand.includes('weather')) {
      response = "I can check the weather for you. Which city would you like to know about?";
    } else if (lowerCommand.includes('search')) {
      response = "I can help you search the web. What would you like to search for?";
    } else if (lowerCommand.includes('reminder')) {
      response = "I can set a reminder for you. What would you like to be reminded about?";
    } else if (lowerCommand.includes('stop listening') || lowerCommand.includes('stop')) {
      response = "Stopping voice recognition. You can type your messages instead.";
      onToggleListening();
    } else {
      response = `I heard you say: "${command}". How can I help you with that?`;
    }
    
    // Speak the response if TTS is enabled
    if (isTTSEnabled && synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = voiceSpeed;
      utterance.volume = volume;
      synthesisRef.current.speak(utterance);
    }
    
    setIsProcessing(false);
  };

  const speakText = (text: string) => {
    if (synthesisRef.current && isTTSEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed;
      utterance.volume = volume;
      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <MicOff className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-sm text-gray-300 mb-2">Voice features not supported</p>
        <p className="text-xs text-gray-400">
          Your browser doesn't support speech recognition or text-to-speech.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Voice Recognition Status */}
      <div className="text-center">
        <Button
          onClick={onToggleListening}
          size="lg"
          className={`w-20 h-20 rounded-full ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isProcessing}
        >
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
        <p className="text-sm text-gray-300 mt-2">
          {isListening ? 'Listening...' : 'Click to start listening'}
        </p>
        {isProcessing && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Activity className="w-4 h-4 animate-pulse text-blue-400" />
            <span className="text-xs text-blue-400">Processing...</span>
          </div>
        )}
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">You said:</p>
          <p className="text-sm text-white">{transcript}</p>
        </div>
      )}

      {/* TTS Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Text-to-Speech</span>
          <Switch
            checked={isTTSEnabled}
            onCheckedChange={setIsTTSEnabled}
          />
        </div>
        
        {isTTSEnabled && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Volume</span>
                <span className="text-xs text-gray-400">{Math.round(volume * 100)}%</span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Speed</span>
                <span className="text-xs text-gray-400">{voiceSpeed}x</span>
              </div>
              <Slider
                value={[voiceSpeed]}
                onValueChange={(value) => setVoiceSpeed(value[0])}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>

      {/* Test TTS */}
      {isTTSEnabled && (
        <div className="flex gap-2">
          <Button
            onClick={() => speakText("Hello! This is a test of the text-to-speech system.")}
            variant="outline"
            size="sm"
            className="flex-1 text-xs border-green-500/30 text-green-400 hover:bg-green-500/20"
          >
            <Volume2 className="w-3 h-3 mr-1" />
            Test TTS
          </Button>
          <Button
            onClick={stopSpeaking}
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            <VolumeX className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="bg-white/5 rounded-lg p-3">
        <p className="text-xs text-gray-400 mb-2">Voice Commands:</p>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• "What time is it?"</li>
          <li>• "Check the weather"</li>
          <li>• "Search for..."</li>
          <li>• "Set a reminder"</li>
          <li>• "Stop listening"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceControl;