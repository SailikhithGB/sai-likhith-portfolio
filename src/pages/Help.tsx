import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Book, Video, MessageCircle, Search, Mic, Brain, Zap, Globe, Clock } from 'lucide-react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: Book },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'voice', label: 'Voice Commands', icon: Mic },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: MessageCircle },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Advanced AI that understands context and provides human-like responses',
      status: 'Active'
    },
    {
      icon: Mic,
      title: 'Voice Recognition & TTS',
      description: 'Speak naturally and hear AI responses with high-quality text-to-speech',
      status: 'Active'
    },
    {
      icon: Search,
      title: 'Web Search',
      description: 'Search the internet for real-time information and answers',
      status: 'Coming Soon'
    },
    {
      icon: Clock,
      title: 'Smart Reminders',
      description: 'Set reminders and get intelligent notifications',
      status: 'Coming Soon'
    },
    {
      icon: Globe,
      title: 'System Integration',
      description: 'Control your system and launch applications with voice commands',
      status: 'Coming Soon'
    },
    {
      icon: Zap,
      title: 'App Automation',
      description: 'Automate repetitive tasks across your applications',
      status: 'Coming Soon'
    }
  ];

  const voiceCommands = [
    {
      category: 'Basic Commands',
      commands: [
        { command: 'Hello', description: 'Greet the AI assistant' },
        { command: 'What time is it?', description: 'Get current time' },
        { command: 'What\'s the date?', description: 'Get current date' },
        { command: 'Stop listening', description: 'Turn off voice recognition' }
      ]
    },
    {
      category: 'Information',
      commands: [
        { command: 'Search for...', description: 'Search the web for information' },
        { command: 'What\'s the weather?', description: 'Get weather information' },
        { command: 'Tell me a joke', description: 'Get a random joke' },
        { command: 'What can you do?', description: 'Learn about AI capabilities' }
      ]
    },
    {
      category: 'Productivity',
      commands: [
        { command: 'Set a reminder', description: 'Create a new reminder' },
        { command: 'Open [app name]', description: 'Launch an application' },
        { command: 'Take a note', description: 'Create a quick note' },
        { command: 'Start timer', description: 'Start a countdown timer' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I start using the AI assistant?',
      answer: 'Simply type your message in the chat interface or click the microphone button to start voice recognition. The AI will respond to your queries and help you with various tasks.'
    },
    {
      question: 'What languages does the AI support?',
      answer: 'Currently, the AI assistant supports English (US and UK), Spanish, French, and German. More languages will be added in future updates.'
    },
    {
      question: 'Can I use the AI assistant offline?',
      answer: 'Some basic features work offline, but for full functionality including web search and advanced AI responses, an internet connection is required.'
    },
    {
      question: 'How do I customize the AI\'s voice?',
      answer: 'Go to Settings > Voice Settings to adjust the voice language, speed, and volume. You can also enable or disable text-to-speech entirely.'
    },
    {
      question: 'Is my conversation data private?',
      answer: 'Yes, your conversations are private and not shared with third parties. You can enable auto-save to store conversations locally on your device.'
    },
    {
      question: 'How do I reset the AI assistant?',
      answer: 'You can clear conversation history in the chat interface or reset all settings to defaults in the Settings page.'
    }
  ];

  const troubleshooting = [
    {
      issue: 'Voice recognition not working',
      solutions: [
        'Check if your microphone is properly connected and working',
        'Ensure you have granted microphone permissions to the browser',
        'Try refreshing the page and restarting voice recognition',
        'Check if your browser supports speech recognition (Chrome, Edge, Safari)'
      ]
    },
    {
      issue: 'AI responses are slow',
      solutions: [
        'Check your internet connection speed',
        'Try reducing the AI model complexity in settings',
        'Clear your browser cache and cookies',
        'Restart the application'
      ]
    },
    {
      issue: 'Text-to-speech not working',
      solutions: [
        'Ensure TTS is enabled in voice settings',
        'Check your system volume and audio output',
        'Try selecting a different voice language',
        'Restart your browser'
      ]
    },
    {
      issue: 'Interface not loading properly',
      solutions: [
        'Clear browser cache and cookies',
        'Try a different browser (Chrome recommended)',
        'Check if JavaScript is enabled',
        'Disable browser extensions that might interfere'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Help & Support
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about your AI assistant
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white h-16">
              <Video className="w-5 h-5 mr-2" />
              Watch Tutorial
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16">
              <Book className="w-5 h-5 mr-2" />
              Documentation
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Getting Started */}
            {activeTab === 'getting-started' && (
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Welcome to Your AI Assistant</CardTitle>
                    <CardDescription className="text-gray-400">
                      Get started with your intelligent companion in just a few steps
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Step 1: Start Chatting</h3>
                        <p className="text-gray-300">
                          Type your first message in the chat interface. Try asking "Hello" or "What can you do?"
                        </p>
                        
                        <h3 className="text-lg font-semibold text-white">Step 2: Enable Voice</h3>
                        <p className="text-gray-300">
                          Click the microphone button to start voice recognition. Speak naturally and the AI will respond.
                        </p>
                        
                        <h3 className="text-lg font-semibold text-white">Step 3: Customize Settings</h3>
                        <p className="text-gray-300">
                          Visit the Settings page to adjust voice preferences, AI model, and interface options.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Tips</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Use natural language - no need for specific commands</li>
                          <li>• The AI remembers conversation context</li>
                          <li>• Try voice commands for hands-free operation</li>
                          <li>• Explore different AI models for various tasks</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Features */}
            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <Badge 
                            variant={feature.status === 'Active' ? 'default' : 'secondary'}
                            className={feature.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}
                          >
                            {feature.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Voice Commands */}
            {activeTab === 'voice' && (
              <div className="space-y-6">
                {voiceCommands.map((category, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.commands.map((cmd, cmdIndex) => (
                          <div key={cmdIndex} className="bg-white/5 rounded-lg p-3">
                            <p className="text-blue-400 font-medium text-sm">"{cmd.command}"</p>
                            <p className="text-gray-300 text-xs mt-1">{cmd.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Troubleshooting */}
            {activeTab === 'troubleshooting' && (
              <div className="space-y-6">
                {troubleshooting.map((item, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">{item.issue}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.solutions.map((solution, solIndex) => (
                          <li key={solIndex} className="flex items-start gap-2 text-gray-300">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;