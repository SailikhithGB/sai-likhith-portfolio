import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Mic, Volume2, Brain, Globe, Shield, Palette, Zap } from 'lucide-react';

const Settings = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(0.7);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('en-US');
  const [aiModel, setAiModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [darkMode, setDarkMode] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const voices = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
  ];

  const aiModels = [
    { value: 'gpt-4', label: 'GPT-4 (Most Capable)' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Fast)' },
    { value: 'claude-3', label: 'Claude 3 (Creative)' },
    { value: 'gemini-pro', label: 'Gemini Pro (Balanced)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Settings
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Customize your AI assistant experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Voice Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Mic className="w-5 h-5" />
                  Voice Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure voice recognition and text-to-speech
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Voice Recognition</p>
                    <p className="text-xs text-gray-400">Enable speech-to-text</p>
                  </div>
                  <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Text-to-Speech</p>
                    <p className="text-xs text-gray-400">Enable AI voice responses</p>
                  </div>
                  <Switch checked={ttsEnabled} onCheckedChange={setTtsEnabled} />
                </div>

                {ttsEnabled && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Voice Language</span>
                      </div>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
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

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Volume</span>
                        <span className="text-xs text-gray-400">{Math.round(voiceVolume * 100)}%</span>
                      </div>
                      <Slider
                        value={[voiceVolume]}
                        onValueChange={(value) => setVoiceVolume(value[0])}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Speed</span>
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
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5" />
                  AI Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Adjust AI model and response settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">AI Model</label>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {aiModels.map((model) => (
                        <SelectItem key={model.value} value={model.value} className="text-white">
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Creativity (Temperature)</span>
                    <span className="text-xs text-gray-400">{temperature}</span>
                  </div>
                  <Slider
                    value={[temperature]}
                    onValueChange={(value) => setTemperature(value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Max Response Length</span>
                    <span className="text-xs text-gray-400">{maxTokens} tokens</span>
                  </div>
                  <Slider
                    value={[maxTokens]}
                    onValueChange={(value) => setMaxTokens(value[0])}
                    max={2000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interface Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Palette className="w-5 h-5" />
                  Interface
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize the user interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-xs text-gray-400">Use dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Animations</p>
                    <p className="text-xs text-gray-400">Enable smooth animations</p>
                  </div>
                  <Switch checked={animations} onCheckedChange={setAnimations} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Notifications</p>
                    <p className="text-xs text-gray-400">Show system notifications</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Auto-save</p>
                    <p className="text-xs text-gray-400">Automatically save conversations</p>
                  </div>
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5" />
                  System
                </CardTitle>
                <CardDescription className="text-gray-400">
                  System and performance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">API Key</label>
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Server URL</label>
                  <Input
                    placeholder="https://api.openai.com/v1"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Debug Mode</p>
                    <p className="text-xs text-gray-400">Show detailed logs</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Offline Mode</p>
                    <p className="text-xs text-gray-400">Work without internet</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Save Settings
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Reset to Defaults
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Export Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;