import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft,
  Brain,
  Heart,
  Globe,
  MessageSquare,
  Mic,
  Volume2,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  Settings,
  RefreshCw,
  Send,
  Languages,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Activity
} from 'lucide-react';

import { useCommunication } from '@/contexts/CommunicationContext';
import { useAI } from '@/contexts/AIContext';

// Emotion visualization component
const EmotionRadar: React.FC<{ emotions: any; size?: number }> = ({ emotions, size = 120 }) => {
  if (!emotions) return null;

  const emotionColors = {
    joy: '#10b981',
    sadness: '#3b82f6', 
    anger: '#ef4444',
    fear: '#f59e0b',
    surprise: '#8b5cf6',
    neutral: '#6b7280'
  };

  const points = Object.entries(emotions)
    .filter(([key]) => key !== 'confidence')
    .map(([emotion, value], index) => {
      const angle = (index * 60 - 90) * (Math.PI / 180); // 6 emotions, 60 degrees each
      const radius = (value as number) * (size / 2 - 10);
      const x = size / 2 + radius * Math.cos(angle);
      const y = size / 2 + radius * Math.sin(angle);
      return { x, y, emotion, value, color: emotionColors[emotion as keyof typeof emotionColors] };
    });

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Background circles */}
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={(size / 2 - 10) * level}
          fill="none"
          stroke="#374151"
          strokeWidth="1"
          opacity={0.3}
        />
      ))}
      
      {/* Emotion lines */}
      {points.map((point, i) => (
        <line
          key={i}
          x1={size / 2}
          y1={size / 2}
          x2={point.x}
          y2={point.y}
          stroke={point.color}
          strokeWidth="2"
        />
      ))}
      
      {/* Emotion points */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill={point.color}
        />
      ))}
      
      {/* Labels */}
      {points.map((point, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const labelRadius = size / 2 + 15;
        const labelX = size / 2 + labelRadius * Math.cos(angle);
        const labelY = size / 2 + labelRadius * Math.sin(angle);
        
        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-slate-400"
          >
            {point.emotion}
          </text>
        );
      })}
    </svg>
  );
};

const AIContextualComm: React.FC = () => {
  const communication = useCommunication();
  const ai = useAI();

  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [predictiveText, setPredictiveText] = useState<string[]>([]);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'ai' | 'other';
    timestamp: number;
    emotions?: any;
    translation?: any;
    suggestions?: string[];
  }>>([
    {
      id: '1',
      text: 'Hello! How are you feeling today?',
      sender: 'other',
      timestamp: Date.now() - 60000,
      emotions: { joy: 0.7, neutral: 0.3, sadness: 0, anger: 0, fear: 0, surprise: 0, confidence: 0.9 }
    }
  ]);

  const [aiSettings, setAiSettings] = useState({
    emotionalAnalysis: true,
    realTimeTranslation: true,
    culturalAdaptation: true,
    predictiveText: true,
    sentimentModeration: true,
    personalizedLearning: true,
    voiceToText: false,
    contextAwareness: true,
  });

  const [currentStats, setCurrentStats] = useState({
    emotionAccuracy: 94.7,
    translationQuality: 96.2,
    culturalSensitivity: 89.3,
    responseTime: 45,
    learningProgress: 78,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        emotionAccuracy: 90 + Math.random() * 10,
        translationQuality: 90 + Math.random() * 10,
        culturalSensitivity: 85 + Math.random() * 15,
        responseTime: 20 + Math.random() * 50,
        learningProgress: Math.min(100, prev.learningProgress + Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const analyzeMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const emotions = await ai.analyzeEmotion(text);
      return emotions;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const translateMessage = async (text: string, targetLang: string) => {
    setIsTranslating(true);
    try {
      const translation = await ai.translateText(text, targetLang, ai.translation.preserveCulturalContext);
      return translation;
    } finally {
      setIsTranslating(false);
    }
  };

  const generatePredictions = async (text: string) => {
    if (text.length > 3 && aiSettings.predictiveText) {
      const predictions = await ai.getPredictiveText(text, ai.contextualAwareness.conversationContext);
      setPredictiveText(predictions);
    } else {
      setPredictiveText([]);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const messageId = Date.now().toString();
    const emotions = await analyzeMessage(currentMessage);
    
    const newMessage = {
      id: messageId,
      text: currentMessage,
      sender: 'user' as const,
      timestamp: Date.now(),
      emotions,
      suggestions: ai.emotionalIntelligence.suggestions.slice(-3),
    };

    setConversationHistory(prev => [...prev, newMessage]);
    
    // Add to conversation context for AI learning
    ai.dispatch({ type: 'ADD_CONVERSATION_CONTEXT', payload: currentMessage });
    
    // Learn from the conversation
    ai.learnFromConversation([currentMessage], 'neutral');
    
    setCurrentMessage('');
    setPredictiveText([]);
    
    // Generate AI response (simulated)
    setTimeout(async () => {
      const aiResponse = await ai.generateContextualResponse(
        currentMessage, 
        ai.contextualAwareness.conversationContext
      );
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai' as const,
        timestamp: Date.now(),
        emotions: await ai.analyzeEmotion(aiResponse),
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleInputChange = (text: string) => {
    setCurrentMessage(text);
    generatePredictions(text);
  };

  const applyPrediction = (prediction: string) => {
    setCurrentMessage(prediction);
    setPredictiveText([]);
    textareaRef.current?.focus();
  };

  const getEmotionIcon = (dominantEmotion: string) => {
    switch (dominantEmotion) {
      case 'joy': return <Smile className="w-4 h-4 text-green-400" />;
      case 'sadness': return <Frown className="w-4 h-4 text-blue-400" />;
      case 'anger': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'fear': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'surprise': return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <Meh className="w-4 h-4 text-gray-400" />;
    }
  };

  const getDominantEmotion = (emotions: any) => {
    if (!emotions) return 'neutral';
    return Object.entries(emotions)
      .filter(([key]) => key !== 'confidence')
      .reduce((max, [emotion, value]) => 
        (value as number) > (emotions[max] || 0) ? emotion : max, 'neutral'
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/nexus" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Contextual Communication
                </h1>
                <p className="text-slate-400">Emotionally intelligent messaging with real-time translation and cultural adaptation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {ai.translation.supportedLanguages.length} Languages
              </Badge>
              <Badge className={`${ai.emotionalIntelligence.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {ai.emotionalIntelligence.enabled ? 'AI Active' : 'AI Disabled'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Enhanced Conversation
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">{currentStats.responseTime}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">{currentStats.emotionAccuracy.toFixed(1)}% accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      <span className="text-sm">{ai.translation.currentLanguage.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {conversationHistory.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : message.sender === 'ai'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {message.emotions && getEmotionIcon(getDominantEmotion(message.emotions))}
                          <span className="text-xs opacity-75">
                            {message.sender === 'user' ? 'You' : message.sender === 'ai' ? 'AI Assistant' : 'Contact'}
                          </span>
                          <span className="text-xs opacity-50">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <p className="text-sm">{message.text}</p>
                        
                        {message.emotions && (
                          <div className="mt-2 text-xs opacity-75">
                            Emotion: {getDominantEmotion(message.emotions)} 
                            ({(message.emotions[getDominantEmotion(message.emotions)] * 100).toFixed(0)}%)
                          </div>
                        )}
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 p-2 bg-black/20 rounded text-xs">
                            <div className="flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3 h-3" />
                              AI Suggestions:
                            </div>
                            {message.suggestions.map((suggestion, i) => (
                              <div key={i} className="opacity-75">• {suggestion}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-700">
                {predictiveText.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {predictiveText.map((prediction, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        onClick={() => applyPrediction(prediction)}
                        className="text-xs"
                      >
                        {prediction}
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={currentMessage}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Type your message... AI will analyze emotion and provide suggestions"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={sendMessage}
                      disabled={!currentMessage.trim() || isAnalyzing}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Control Panel */}
          <div className="space-y-6">
            {/* Emotional Analysis */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Emotion Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ai.emotionalIntelligence.currentProfile && (
                  <EmotionRadar emotions={ai.emotionalIntelligence.currentProfile} />
                )}
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence:</span>
                    <span>{((ai.emotionalIntelligence.currentProfile?.confidence || 0) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dominant Emotion:</span>
                    <span className="capitalize">
                      {ai.emotionalIntelligence.currentProfile ? 
                        getDominantEmotion(ai.emotionalIntelligence.currentProfile) : 'None'}
                    </span>
                  </div>
                </div>

                {ai.emotionalIntelligence.suggestions.length > 0 && (
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">AI Suggestions:</div>
                    <div className="text-xs text-slate-400 space-y-1">
                      {ai.emotionalIntelligence.suggestions.slice(-2).map((suggestion, i) => (
                        <div key={i}>• {suggestion}</div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Translation Controls */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Translation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Target Language</label>
                    <select 
                      value={ai.translation.currentLanguage}
                      onChange={(e) => ai.dispatch({ type: 'SET_TRANSLATION_LANGUAGE', payload: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                    >
                      {ai.translation.supportedLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cultural Preservation</span>
                    <Switch
                      checked={ai.translation.preserveCulturalContext}
                      onCheckedChange={() => ai.dispatch({ type: 'TOGGLE_CULTURAL_PRESERVATION' })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Translate</span>
                    <Switch
                      checked={ai.translation.enabled}
                      onCheckedChange={() => setAiSettings(prev => ({ ...prev, realTimeTranslation: !prev.realTimeTranslation }))}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Translation Quality:</span>
                    <span>{currentStats.translationQuality.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cultural Sensitivity:</span>
                    <span>{currentStats.culturalSensitivity.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(aiSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setAiSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">Emotion Accuracy</span>
                      <span className="text-sm">{currentStats.emotionAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={currentStats.emotionAccuracy} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">Learning Progress</span>
                      <span className="text-sm">{currentStats.learningProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={currentStats.learningProgress} className="h-2" />
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Response Time:</span>
                      <span>{currentStats.responseTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Conversations Learned:</span>
                      <span>{ai.learning.behaviorPatterns.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Memory Size:</span>
                      <span>{ai.learning.conversationMemory.size}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContextualComm;