import React, { useState, useEffect } from 'react';
import { useAssistant } from '../../contexts/AssistantContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Settings, 
  Key, 
  Volume2, 
  Brain, 
  User,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { voiceService } from '../../services/voiceService';

interface SettingsDialogProps {
  children?: React.ReactNode;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ children }) => {
  const { state, updateUserSettings, setApiKey } = useAssistant();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Local state for settings
  const [localSettings, setLocalSettings] = useState(state.userContext);

  useEffect(() => {
    setLocalSettings(state.userContext);
  }, [state.userContext]);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = voiceService.getAvailableVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    
    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSaveSettings = async () => {
    try {
      await updateUserSettings(localSettings);
      
      if (apiKey.trim()) {
        setApiKey(apiKey.trim());
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleVoiceSettingChange = (key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        voice: {
          ...prev.preferences.voice,
          [key]: value
        }
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handlePersonalInfoChange = (key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value
      }
    }));
  };

  const testVoice = () => {
    if (localSettings.preferences.voice.enabled) {
      voiceService.updateSettings(localSettings.preferences.voice);
      voiceService.speak("Hello! This is how I sound with your current voice settings.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/90 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>ARIA Settings</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure your AI assistant preferences and capabilities.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="api" className="data-[state=active]:bg-cyber-blue">
              <Key className="w-4 h-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-cyber-green">
              <Volume2 className="w-4 h-4 mr-2" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-cyber-purple">
              <Brain className="w-4 h-4 mr-2" />
              AI Model
            </TabsTrigger>
            <TabsTrigger value="personal" className="data-[state=active]:bg-pink-500">
              <User className="w-4 h-4 mr-2" />
              Personal
            </TabsTrigger>
          </TabsList>

          {/* API Configuration */}
          <TabsContent value="api" className="space-y-4">
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">OpenAI API Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your OpenAI API key to enable AI responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white">API Key</Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="sk-..."
                      className="bg-white/10 border-white/20 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Get your API key from{' '}
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyber-blue hover:underline"
                    >
                      OpenAI Platform
                    </a>
                  </p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white">Connection Status</p>
                    <p className="text-xs text-gray-400">
                      {state.isConnected ? 'Connected and ready' : 'Not connected'}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${state.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voice Settings */}
          <TabsContent value="voice" className="space-y-4">
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Voice Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure speech recognition and text-to-speech settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Voice Features</Label>
                    <p className="text-xs text-gray-400">Enable speech recognition and text-to-speech</p>
                  </div>
                  <Switch
                    checked={localSettings.preferences.voice.enabled}
                    onCheckedChange={(checked) => handleVoiceSettingChange('enabled', checked)}
                  />
                </div>

                {localSettings.preferences.voice.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-white">Voice</Label>
                      <Select
                        value={localSettings.preferences.voice.voice?.name || ''}
                        onValueChange={(value) => {
                          const selectedVoice = voices.find(v => v.name === value);
                          handleVoiceSettingChange('voice', selectedVoice);
                        }}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Speaking Rate: {localSettings.preferences.voice.rate}</Label>
                      <Slider
                        value={[localSettings.preferences.voice.rate]}
                        onValueChange={([value]) => handleVoiceSettingChange('rate', value)}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Pitch: {localSettings.preferences.voice.pitch}</Label>
                      <Slider
                        value={[localSettings.preferences.voice.pitch]}
                        onValueChange={([value]) => handleVoiceSettingChange('pitch', value)}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Volume: {localSettings.preferences.voice.volume}</Label>
                      <Slider
                        value={[localSettings.preferences.voice.volume]}
                        onValueChange={([value]) => handleVoiceSettingChange('volume', value)}
                        min={0.0}
                        max={1.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <Button onClick={testVoice} className="w-full">
                      Test Voice Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Model Settings */}
          <TabsContent value="ai" className="space-y-4">
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">AI Model Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure AI model parameters and behavior.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">AI Model</Label>
                  <Select
                    value={localSettings.preferences.model}
                    onValueChange={(value: any) => handlePreferenceChange('model', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster, Cheaper)</SelectItem>
                      <SelectItem value="gpt-4">GPT-4 (Smarter, More Expensive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Max Tokens: {localSettings.preferences.maxTokens}</Label>
                  <Slider
                    value={[localSettings.preferences.maxTokens]}
                    onValueChange={([value]) => handlePreferenceChange('maxTokens', value)}
                    min={100}
                    max={4000}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400">
                    Higher values allow longer responses but cost more
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Temperature: {localSettings.preferences.temperature}</Label>
                  <Slider
                    value={[localSettings.preferences.temperature]}
                    onValueChange={([value]) => handlePreferenceChange('temperature', value)}
                    min={0.0}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400">
                    Lower values make responses more focused, higher values more creative
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-4">
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Help ARIA provide more personalized responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Name</Label>
                  <Input
                    value={localSettings.name || ''}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Location</Label>
                  <Input
                    value={localSettings.personalInfo.location || ''}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    placeholder="Your location"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Occupation</Label>
                  <Input
                    value={localSettings.personalInfo.occupation || ''}
                    onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                    placeholder="Your occupation"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Interests (comma-separated)</Label>
                  <Input
                    value={localSettings.personalInfo.interests?.join(', ') || ''}
                    onChange={(e) => handlePersonalInfoChange('interests', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="programming, music, art, etc."
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-cyber-blue to-cyber-green">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};