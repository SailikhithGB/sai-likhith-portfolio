import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Volume2, 
  Brain, 
  Sparkles, 
  Zap, 
  Clock, 
  Search, 
  Command, 
  Lightbulb,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '@/lib/aiService';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: any) => void;
}

const AISettings: React.FC<AISettingsProps> = ({ isOpen, onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState({
    voice: {
      enabled: true,
      autoSpeak: false,
      volume: 0.8,
      rate: 0.9,
      pitch: 1.1,
      voice: 'en-US'
    },
    memory: {
      enabled: true,
      maxItems: 100,
      autoCleanup: true,
      importanceThreshold: 3
    },
    skills: {
      search: true,
      reminder: true,
      system: true,
      creative: true,
      conversation: true
    },
    personality: {
      style: 'helpful',
      formality: 'casual',
      humor: 'moderate'
    }
  });

  const voices = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'en-AU', label: 'English (Australia)' },
    { value: 'en-CA', label: 'English (Canada)' }
  ];

  const personalityStyles = [
    { value: 'helpful', label: 'Helpful & Supportive' },
    { value: 'professional', label: 'Professional & Formal' },
    { value: 'friendly', label: 'Friendly & Casual' },
    { value: 'creative', label: 'Creative & Inspiring' }
  ];

  const formalityLevels = [
    { value: 'formal', label: 'Very Formal' },
    { value: 'semi-formal', label: 'Semi-Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'very-casual', label: 'Very Casual' }
  ];

  const humorLevels = [
    { value: 'none', label: 'No Humor' },
    { value: 'subtle', label: 'Subtle' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'playful', label: 'Playful' }
  ];

  const skills = [
    {
      id: 'search',
      name: 'Web Search',
      description: 'Search the internet for information',
      icon: <Search className="w-4 h-4" />,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 'reminder',
      name: 'Smart Reminders',
      description: 'Set and manage intelligent reminders',
      icon: <Clock className="w-4 h-4" />,
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      id: 'system',
      name: 'System Control',
      description: 'Control system settings and applications',
      icon: <Command className="w-4 h-4" />,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'creative',
      name: 'Creative Assistant',
      description: 'Help with creative tasks and brainstorming',
      icon: <Lightbulb className="w-4 h-4" />,
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
    {
      id: 'conversation',
      name: 'Conversational AI',
      description: 'Natural conversation and emotional intelligence',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    }
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Update AI service preferences
    aiService.updatePreferences({
      voiceEnabled: settings.voice.enabled,
      autoSpeak: settings.voice.autoSpeak,
      theme: 'dark',
      language: settings.voice.voice,
      personality: settings.personality.style
    });

    // Toggle skills based on settings
    Object.entries(settings.skills).forEach(([skillId, enabled]) => {
      if (enabled !== aiService.getSkills().find(s => s.id === skillId)?.enabled) {
        aiService.toggleSkill(skillId);
      }
    });

    onSettingsChange(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      voice: {
        enabled: true,
        autoSpeak: false,
        volume: 0.8,
        rate: 0.9,
        pitch: 1.1,
        voice: 'en-US'
      },
      memory: {
        enabled: true,
        maxItems: 100,
        autoCleanup: true,
        importanceThreshold: 3
      },
      skills: {
        search: true,
        reminder: true,
        system: true,
        creative: true,
        conversation: true
      },
      personality: {
        style: 'helpful',
        formality: 'casual',
        humor: 'moderate'
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">AI Assistant Settings</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Voice Settings */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-cyan-400" />
                    Voice Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-enabled" className="text-white">Enable Voice</Label>
                    <Switch
                      id="voice-enabled"
                      checked={settings.voice.enabled}
                      onCheckedChange={(checked) => handleSettingChange('voice', 'enabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-speak" className="text-white">Auto-Speak Responses</Label>
                    <Switch
                      id="auto-speak"
                      checked={settings.voice.autoSpeak}
                      onCheckedChange={(checked) => handleSettingChange('voice', 'autoSpeak', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Volume</Label>
                    <Slider
                      value={[settings.voice.volume * 100]}
                      onValueChange={([value]) => handleSettingChange('voice', 'volume', value / 100)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Speech Rate</Label>
                    <Slider
                      value={[settings.voice.rate * 100]}
                      onValueChange={([value]) => handleSettingChange('voice', 'rate', value / 100)}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Voice</Label>
                    <Select value={settings.voice.voice} onValueChange={(value) => handleSettingChange('voice', 'voice', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {voices.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value} className="text-white">
                            {voice.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Settings */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    Memory Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="memory-enabled" className="text-white">Enable Memory</Label>
                    <Switch
                      id="memory-enabled"
                      checked={settings.memory.enabled}
                      onCheckedChange={(checked) => handleSettingChange('memory', 'enabled', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Max Memory Items: {settings.memory.maxItems}</Label>
                    <Slider
                      value={[settings.memory.maxItems]}
                      onValueChange={([value]) => handleSettingChange('memory', 'maxItems', value)}
                      max={200}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-cleanup" className="text-white">Auto Cleanup</Label>
                    <Switch
                      id="auto-cleanup"
                      checked={settings.memory.autoCleanup}
                      onCheckedChange={(checked) => handleSettingChange('memory', 'autoCleanup', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Settings */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    Skills Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400">
                          {skill.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{skill.name}</h4>
                          <p className="text-xs text-gray-400">{skill.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.skills[skill.id as keyof typeof settings.skills] as boolean}
                        onCheckedChange={(checked) => handleSettingChange('skills', skill.id, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Personality Settings */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Personality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Style</Label>
                    <Select value={settings.personality.style} onValueChange={(value) => handleSettingChange('personality', 'style', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {personalityStyles.map((style) => (
                          <SelectItem key={style.value} value={style.value} className="text-white">
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Formality Level</Label>
                    <Select value={settings.personality.formality} onValueChange={(value) => handleSettingChange('personality', 'formality', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {formalityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value} className="text-white">
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Humor Level</Label>
                    <Select value={settings.personality.humor} onValueChange={(value) => handleSettingChange('personality', 'humor', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {humorLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value} className="text-white">
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <Button variant="outline" onClick={handleReset} className="border-white/20 text-white hover:bg-white/10">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AISettings;