import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Eye,
  Volume2,
  VolumeX,
  Hand,
  Maximize,
  Minimize,
  Settings,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Layers,
  Zap,
  Brain,
  Wifi,
  Signal
} from 'lucide-react';

import { useCommunication } from '@/contexts/CommunicationContext';
import { useAI } from '@/contexts/AIContext';

// 3D Holographic Avatar Component
const HolographicAvatar: React.FC<{ position: [number, number, number]; color: string; name: string; isActive: boolean }> = ({ 
  position, 
  color, 
  name, 
  isActive 
}) => {
  const meshRef = useRef<any>();

  useEffect(() => {
    if (meshRef.current && isActive) {
      const animate = () => {
        meshRef.current.rotation.y += 0.01;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isActive]);

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial color={color} transparent opacity={isActive ? 0.8 : 0.4} />
      </Sphere>
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      {isActive && (
        <Sphere args={[0.7, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.1} wireframe />
        </Sphere>
      )}
    </group>
  );
};

// Holographic Message Bubble
const MessageBubble: React.FC<{ position: [number, number, number]; message: string; sender: string }> = ({ 
  position, 
  message, 
  sender 
}) => {
  return (
    <group position={position}>
      <Box args={[2, 0.5, 0.1]}>
        <meshStandardMaterial color="#4338ca" transparent opacity={0.7} />
      </Box>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {message}
      </Text>
      <Text
        position={[0, -0.3, 0.1]}
        fontSize={0.1}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {sender}
      </Text>
    </group>
  );
};

const HolographicMessaging: React.FC = () => {
  const communication = useCommunication();
  const ai = useAI();

  const [holographicSettings, setHolographicSettings] = useState({
    spatialAudio: true,
    gestureRecognition: true,
    adaptiveFidelity: true,
    immersionLevel: 75,
    spatialRange: 10,
    audioQuality: 'high' as 'low' | 'medium' | 'high',
    renderQuality: 'ultra' as 'low' | 'medium' | 'high' | 'ultra',
  });

  const [activeParticipants, setActiveParticipants] = useState([
    { id: '1', name: 'Alex Chen', color: '#3b82f6', position: [-2, 0, 0] as [number, number, number], isActive: true },
    { id: '2', name: 'Maya Rodriguez', color: '#10b981', position: [2, 0, 0] as [number, number, number], isActive: false },
    { id: '3', name: 'Current User', color: '#8b5cf6', position: [0, 0, -2] as [number, number, number], isActive: true },
  ]);

  const [holographicMessages, setHolographicMessages] = useState([
    { id: '1', message: 'Welcome to holographic space!', sender: 'Alex Chen', position: [-1, 1, 0] as [number, number, number] },
    { id: '2', message: 'This is amazing! I can see you in 3D!', sender: 'Maya Rodriguez', position: [1, 1, 0] as [number, number, number] },
  ]);

  const [deviceCapabilities, setDeviceCapabilities] = useState({
    webxr: false,
    webgl2: true,
    spatialAudio: true,
    handTracking: false,
    eyeTracking: false,
    hapticFeedback: false,
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    latency: '12ms',
    bandwidth: '2.3 Mbps',
    cpuUsage: 45,
    gpuUsage: 67,
    memoryUsage: 234,
  });

  useEffect(() => {
    // Check device capabilities
    setDeviceCapabilities({
      webxr: 'xr' in navigator,
      webgl2: !!document.createElement('canvas').getContext('webgl2'),
      spatialAudio: 'spatialNavigator' in window || 'webkitSpatialNavigator' in window,
      handTracking: false, // Would check for WebXR hand tracking
      eyeTracking: false,  // Would check for WebXR eye tracking
      hapticFeedback: 'vibrate' in navigator,
    });

    // Simulate performance updates
    const interval = setInterval(() => {
      setPerformanceMetrics(prev => ({
        fps: Math.floor(Math.random() * 10) + 55,
        latency: `${Math.floor(Math.random() * 20) + 8}ms`,
        bandwidth: `${(Math.random() * 2 + 1.5).toFixed(1)} Mbps`,
        cpuUsage: Math.floor(Math.random() * 20) + 35,
        gpuUsage: Math.floor(Math.random() * 30) + 50,
        memoryUsage: Math.floor(Math.random() * 100) + 200,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const sendHolographicMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      sender: 'Current User',
      position: [Math.random() * 4 - 2, Math.random() * 2 + 0.5, Math.random() * 2] as [number, number, number],
    };
    
    setHolographicMessages(prev => [...prev, newMessage]);
    
    // Simulate AI compression for holographic data
    ai.compressData(message, holographicSettings.renderQuality === 'ultra' ? 'lossless' : 'high');
  };

  const toggleParticipantActive = (participantId: string) => {
    setActiveParticipants(prev =>
      prev.map(p => p.id === participantId ? { ...p, isActive: !p.isActive } : p)
    );
  };

  const adjustFidelity = () => {
    if (communication.networkQuality === 'poor') {
      setHolographicSettings(prev => ({
        ...prev,
        renderQuality: 'low',
        audioQuality: 'medium',
        immersionLevel: 50,
      }));
    } else if (communication.networkQuality === 'excellent') {
      setHolographicSettings(prev => ({
        ...prev,
        renderQuality: 'ultra',
        audioQuality: 'high',
        immersionLevel: 100,
      }));
    }
  };

  useEffect(() => {
    if (holographicSettings.adaptiveFidelity) {
      adjustFidelity();
    }
  }, [communication.networkQuality, holographicSettings.adaptiveFidelity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-blue-600/10" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/nexus" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Holographic Messaging
                </h1>
                <p className="text-slate-400">3D spatial communication with immersive presence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {activeParticipants.filter(p => p.isActive).length} Active
              </Badge>
              <Badge className={`${
                deviceCapabilities.webxr ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {deviceCapabilities.webxr ? 'VR Ready' : 'Browser Mode'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Holographic View */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 h-[600px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Holographic Space
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Signal className="w-4 h-4" />
                      <span className="text-sm">{performanceMetrics.fps} FPS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span className="text-sm">{performanceMetrics.latency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm capitalize">{holographicSettings.renderQuality}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Maximize className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                <Canvas
                  className="w-full h-full"
                  camera={{ position: [0, 0, 5], fov: 75 }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <pointLight position={[-10, -10, -10]} color="#4338ca" intensity={0.5} />
                  
                  {/* Holographic Avatars */}
                  {activeParticipants.map(participant => (
                    <HolographicAvatar
                      key={participant.id}
                      position={participant.position}
                      color={participant.color}
                      name={participant.name}
                      isActive={participant.isActive}
                    />
                  ))}
                  
                  {/* Message Bubbles */}
                  {holographicMessages.map(message => (
                    <MessageBubble
                      key={message.id}
                      position={message.position}
                      message={message.message}
                      sender={message.sender}
                    />
                  ))}
                  
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    maxDistance={20}
                    minDistance={2}
                  />
                </Canvas>
              </CardContent>
            </Card>

            {/* Message Input */}
            <Card className="bg-slate-800/50 border-slate-700 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a holographic message..."
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          sendHolographicMessage(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Hand className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeParticipants.map(participant => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: participant.color }}
                      />
                      <span className="text-sm">{participant.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={participant.isActive}
                        onCheckedChange={() => toggleParticipantActive(participant.id)}
                        size="sm"
                      />
                      <Button size="sm" variant="ghost">
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Holographic Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Spatial Audio</span>
                    <Switch
                      checked={holographicSettings.spatialAudio}
                      onCheckedChange={(checked) =>
                        setHolographicSettings(prev => ({ ...prev, spatialAudio: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gesture Recognition</span>
                    <Switch
                      checked={holographicSettings.gestureRecognition}
                      onCheckedChange={(checked) =>
                        setHolographicSettings(prev => ({ ...prev, gestureRecognition: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Adaptive Fidelity</span>
                    <Switch
                      checked={holographicSettings.adaptiveFidelity}
                      onCheckedChange={(checked) =>
                        setHolographicSettings(prev => ({ ...prev, adaptiveFidelity: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      Immersion Level: {holographicSettings.immersionLevel}%
                    </label>
                    <Slider
                      value={[holographicSettings.immersionLevel]}
                      onValueChange={([value]) =>
                        setHolographicSettings(prev => ({ ...prev, immersionLevel: value }))
                      }
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      Spatial Range: {holographicSettings.spatialRange}m
                    </label>
                    <Slider
                      value={[holographicSettings.spatialRange]}
                      onValueChange={([value]) =>
                        setHolographicSettings(prev => ({ ...prev, spatialRange: value }))
                      }
                      max={20}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Monitor */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CPU Usage:</span>
                    <span>{performanceMetrics.cpuUsage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GPU Usage:</span>
                    <span>{performanceMetrics.gpuUsage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Memory:</span>
                    <span>{performanceMetrics.memoryUsage}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bandwidth:</span>
                    <span>{performanceMetrics.bandwidth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Capabilities */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Device Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(deviceCapabilities).map(([capability, supported]) => (
                    <div key={capability} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${supported ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="capitalize">{capability.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolographicMessaging;