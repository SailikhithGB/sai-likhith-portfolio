import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Zap, 
  Brain, 
  Network, 
  Layers,
  Activity,
  Users,
  Database,
  Wifi,
  Lock,
  Eye,
  MessageSquare,
  BarChart3,
  Settings,
  Star,
  Globe,
  Cpu,
  HardDrive
} from 'lucide-react';

import { useCommunication } from '@/contexts/CommunicationContext';
import { useQuantum } from '@/contexts/QuantumContext';
import { useAI } from '@/contexts/AIContext';

const NexusHub: React.FC = () => {
  const communication = useCommunication();
  const quantum = useQuantum();
  const ai = useAI();

  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 0,
    dataTransferred: '0 MB',
    compressionRatio: '0%',
    quantumChannels: 0,
    aiProcessing: false,
  });

  const [systemStatus, setSystemStatus] = useState({
    quantum: 'operational',
    ai: 'operational', 
    holographic: 'operational',
    mesh: 'operational',
    blockchain: 'operational',
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        dataTransferred: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
        compressionRatio: `${(Math.random() * 30 + 70).toFixed(0)}%`,
        quantumChannels: quantum.channels.size,
        aiProcessing: Math.random() > 0.7,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [quantum.channels.size]);

  const connectToNexus = () => {
    const user = {
      userId: `user_${Date.now()}`,
      username: 'Anonymous User',
      status: 'online' as const,
    };
    communication.connectToNexus(user);
  };

  const features = [
    {
      id: 'holographic',
      title: 'Holographic Messaging',
      description: 'Experience 3D holographic communication with spatial audio and gesture recognition',
      icon: Eye,
      status: 'operational',
      path: '/nexus/holographic',
      color: 'from-blue-500 to-cyan-500',
      stats: { 'Active Holograms': '24', 'Spatial Accuracy': '99.2%', 'Latency': '12ms' }
    },
    {
      id: 'quantum',
      title: 'Quantum Encryption',
      description: 'Military-grade quantum key distribution with post-quantum cryptography',
      icon: Shield,
      status: 'operational',
      path: '/nexus/quantum',
      color: 'from-green-500 to-emerald-500',
      stats: { 'Active Keys': `${quantum.keys.size}`, 'Security Level': 'Military', 'Threat Score': '0.02%' }
    },
    {
      id: 'ai-contextual',
      title: 'AI Contextual Communication',
      description: 'Emotionally intelligent messaging with real-time translation and cultural adaptation',
      icon: Brain,
      status: 'operational',
      path: '/nexus/ai-contextual',
      color: 'from-purple-500 to-pink-500',
      stats: { 'Languages': `${ai.translation.supportedLanguages.length}`, 'Emotion Accuracy': '94.7%', 'Cultural Adapt': '89%' }
    },
    {
      id: 'decentralized',
      title: 'Decentralized Social Graph',
      description: 'Blockchain-based identity verification with user-controlled data sovereignty',
      icon: Network,
      status: 'operational',
      path: '/nexus/decentralized',
      color: 'from-orange-500 to-red-500',
      stats: { 'Network Nodes': '1,247', 'Trust Score': '0.94', 'Data Sovereignty': '100%' }
    },
    {
      id: 'immersive',
      title: 'Immersive Communication',
      description: 'AR/VR environments with adaptive fidelity and brain-wave interfaces',
      icon: Layers,
      status: 'operational',
      path: '/nexus/immersive',
      color: 'from-indigo-500 to-purple-500',
      stats: { 'VR Sessions': '342', 'Adaptive Fidelity': 'Auto', 'Immersion Score': '97%' }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              NEXUS COMMUNICATION HUB
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              The world's most advanced privacy-first communication platform. Experience quantum-encrypted, 
              AI-powered, holographic messaging with unprecedented security and efficiency.
            </p>
            
            {/* Connection Status */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${communication.isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm">
                  {communication.isConnected ? 'Connected to Nexus' : 'Disconnected'}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                <span className="text-sm capitalize">{communication.networkQuality}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{realTimeStats.activeUsers} users online</span>
              </div>
            </div>

            {!communication.isConnected && (
              <Button onClick={connectToNexus} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Connect to Nexus Network
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="modules" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="modules">Communication Modules</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
            <TabsTrigger value="security">Security Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-8">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group cursor-pointer overflow-hidden">
                    <Link to={feature.path}>
                      <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <feature.icon className="w-8 h-8 text-slate-300 group-hover:text-white transition-colors" />
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(feature.status)}`} />
                            <Badge variant="secondary" className="text-xs">
                              {feature.status}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-slate-400">{key}:</span>
                              <span className="text-white font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Real-time System Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Real-time System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Data Compression</span>
                      <span className="text-lg font-bold text-green-400">{realTimeStats.compressionRatio}</span>
                    </div>
                    <Progress 
                      value={parseInt(realTimeStats.compressionRatio)} 
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Data Transferred</span>
                      <span className="text-lg font-bold text-blue-400">{realTimeStats.dataTransferred}</span>
                    </div>
                    <div className="text-xs text-slate-500">Real-time bandwidth usage</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Quantum Channels</span>
                      <span className="text-lg font-bold text-purple-400">{realTimeStats.quantumChannels}</span>
                    </div>
                    <div className="text-xs text-slate-500">Active secure channels</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Data Saved</p>
                      <p className="text-2xl font-bold text-green-400">2.3 GB</p>
                    </div>
                    <HardDrive className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">AI Processing</p>
                      <p className="text-2xl font-bold text-purple-400">94.7%</p>
                    </div>
                    <Cpu className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Security Score</p>
                      <p className="text-2xl font-bold text-blue-400">99.8%</p>
                    </div>
                    <Shield className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Global Reach</p>
                      <p className="text-2xl font-bold text-orange-400">127 Countries</p>
                    </div>
                    <Globe className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Communication Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Bandwidth Optimization</span>
                      <span className="text-sm">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Latency Reduction</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Message Delivery Success</span>
                      <span className="text-sm">99.6%</span>
                    </div>
                    <Progress value={99.6} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Quantum Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Key Generation</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {quantum.keyGenerationInProgress ? 'Active' : 'Standby'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Threat Detection</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Monitoring
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quantum Randomness</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {quantum.quantumRandomness ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Security Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quantum.securityAuditLog.slice(-5).map((log, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          log.severity === 'critical' ? 'bg-red-500' :
                          log.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <span className="flex-1">{log.event}</span>
                        <span className="text-slate-400 text-xs">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Platform Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Low-Data Mode</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mesh Networking</span>
                    <Badge className={communication.meshNetworkEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {communication.meshNetworkEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Emotional Intelligence</span>
                    <Badge className={ai.emotionalIntelligence.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {ai.emotionalIntelligence.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Privacy Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Data Sovereignty</span>
                    <Badge className="bg-blue-500/20 text-blue-400">Full Control</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Anonymous Mode</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quantum Encryption Level</span>
                    <Badge className="bg-purple-500/20 text-purple-400">Military</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NexusHub;