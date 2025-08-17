import React from 'react';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Brain, 
  Mic, 
  Volume2, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  Search, 
  Clock, 
  Command,
  ArrowLeft,
  Settings,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const AIAssistantPage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Memory & Context",
      description: "Remembers conversations and learns from interactions"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Input",
      description: "Speak naturally with advanced speech recognition"
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Text-to-Speech",
      description: "Natural voice responses with customizable settings"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Web Search",
      description: "Search the internet for real-time information"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Reminders",
      description: "Set and manage reminders with intelligent scheduling"
    },
    {
      icon: <Command className="w-6 h-6" />,
      title: "System Control",
      description: "Control applications and system settings"
    }
  ];

  const skills = [
    {
      name: "Conversational AI",
      description: "Natural language processing and understanding",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    {
      name: "Voice Recognition",
      description: "Advanced speech-to-text capabilities",
      color: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    {
      name: "Memory Management",
      description: "Persistent conversation memory and learning",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    },
    {
      name: "Task Automation",
      description: "Automate repetitive tasks and workflows",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
                  <p className="text-sm text-gray-400">Your intelligent digital companion</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* AI Assistant */}
        <div className="flex-1">
          <AIAssistant />
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-black/10 backdrop-blur-sm border-l border-white/10 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Features */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-cyan-400 mt-0.5">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{feature.title}</h4>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  AI Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <Badge variant="outline" className={`text-xs ${skill.color}`}>
                      {skill.name}
                    </Badge>
                    <p className="text-xs text-gray-400">{skill.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search the web
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Set a reminder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Command className="w-4 h-4 mr-2" />
                  System control
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Creative help
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Voice Recognition</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Speech Synthesis</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Memory System</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Learning
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Processing</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Optimized
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;