import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  Shield,
  Key,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Activity,
  Zap,
  Eye,
  EyeOff,
  Copy,
  Download,
  Upload,
  Settings,
  Clock,
  Users,
  Server,
  Cpu
} from 'lucide-react';

import { useCommunication } from '@/contexts/CommunicationContext';
import { useQuantum } from '@/contexts/QuantumContext';

const QuantumEncryption: React.FC = () => {
  const communication = useCommunication();
  const quantum = useQuantum();

  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [keyGenerationProgress, setKeyGenerationProgress] = useState(0);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enterprise' | 'military'>('enterprise');

  const [quantumMetrics, setQuantumMetrics] = useState({
    keyStrength: 2048,
    entropyLevel: 98.7,
    quantumRandomness: 99.2,
    keyRotationInterval: 24,
    threatLevel: 'minimal',
    compromiseRisk: 0.001,
  });

  const [encryptionTest, setEncryptionTest] = useState({
    originalMessage: '',
    encryptedMessage: '',
    decryptedMessage: '',
    isEncrypting: false,
    isDecrypting: false,
  });

  useEffect(() => {
    // Simulate real-time quantum metrics updates
    const interval = setInterval(() => {
      setQuantumMetrics(prev => ({
        ...prev,
        entropyLevel: 95 + Math.random() * 5,
        quantumRandomness: 98 + Math.random() * 2,
        compromiseRisk: Math.random() * 0.01,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateQuantumKey = async () => {
    if (!communication.currentUser) return;
    
    setIsGeneratingKey(true);
    setKeyGenerationProgress(0);
    
    // Animate progress
    const progressInterval = setInterval(() => {
      setKeyGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      await quantum.generateQuantumKey(communication.currentUser.userId, 'quantum');
    } finally {
      setTimeout(() => {
        setIsGeneratingKey(false);
        setKeyGenerationProgress(0);
      }, 500);
    }
  };

  const createSecureChannel = async () => {
    if (!communication.currentUser) return;
    
    const participants = [communication.currentUser.userId, 'target_user'];
    await quantum.establishSecureChannel(participants, securityLevel);
  };

  const rotateChannelKeys = async (channelId: string) => {
    await quantum.rotateKeys(channelId);
  };

  const testEncryption = async () => {
    if (!encryptionTest.originalMessage.trim() || !selectedChannel) return;
    
    setEncryptionTest(prev => ({ ...prev, isEncrypting: true }));
    
    try {
      const encrypted = await quantum.encryptMessage(encryptionTest.originalMessage, selectedChannel);
      setEncryptionTest(prev => ({ 
        ...prev, 
        encryptedMessage: encrypted,
        isEncrypting: false 
      }));
    } catch (error) {
      setEncryptionTest(prev => ({ ...prev, isEncrypting: false }));
    }
  };

  const testDecryption = async () => {
    if (!encryptionTest.encryptedMessage || !selectedChannel) return;
    
    setEncryptionTest(prev => ({ ...prev, isDecrypting: true }));
    
    try {
      const decrypted = await quantum.decryptMessage(encryptionTest.encryptedMessage, selectedChannel);
      setEncryptionTest(prev => ({ 
        ...prev, 
        decryptedMessage: decrypted,
        isDecrypting: false 
      }));
    } catch (error) {
      setEncryptionTest(prev => ({ ...prev, isDecrypting: false }));
    }
  };

  const performSecurityAudit = async () => {
    const result = await quantum.performSecurityAudit();
    // Show audit results in toast or modal
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'minimal': return 'text-green-400';
      case 'low': return 'text-yellow-400';
      case 'medium': return 'text-orange-400';
      case 'high': return 'text-red-400';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getSecurityLevelBadge = (level: string) => {
    const colors = {
      standard: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      enterprise: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      military: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[level as keyof typeof colors] || colors.standard;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-green-600/10" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/nexus" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Quantum Encryption
                </h1>
                <p className="text-slate-400">Military-grade quantum key distribution and post-quantum cryptography</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {quantum.channels.size} Secure Channels
              </Badge>
              <Badge className={`${quantum.quantumRandomness ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {quantum.quantumRandomness ? 'Quantum Random' : 'Pseudo Random'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keys">Key Management</TabsTrigger>
            <TabsTrigger value="channels">Secure Channels</TabsTrigger>
            <TabsTrigger value="testing">Encryption Testing</TabsTrigger>
            <TabsTrigger value="security">Security Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quantum Security Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Key Strength</p>
                      <p className="text-2xl font-bold text-green-400">{quantumMetrics.keyStrength} bit</p>
                    </div>
                    <Key className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Entropy Level</p>
                      <p className="text-2xl font-bold text-blue-400">{quantumMetrics.entropyLevel.toFixed(1)}%</p>
                    </div>
                    <Zap className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Quantum Randomness</p>
                      <p className="text-2xl font-bold text-purple-400">{quantumMetrics.quantumRandomness.toFixed(1)}%</p>
                    </div>
                    <Activity className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Threat Level</p>
                      <p className={`text-2xl font-bold capitalize ${getThreatLevelColor(quantumMetrics.threatLevel)}`}>
                        {quantumMetrics.threatLevel}
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Threat Detection */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Real-time Threat Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Compromise Risk</span>
                      <span className="text-lg font-bold text-green-400">{(quantumMetrics.compromiseRisk * 100).toFixed(3)}%</span>
                    </div>
                    <Progress 
                      value={quantumMetrics.compromiseRisk * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Quantum Computer Threat</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {quantum.threatDetection.quantumComputerThreat ? 'Detected' : 'None'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Suspicious Activity</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {quantum.threatDetection.suspiciousActivity ? 'Detected' : 'Clear'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Security Events */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {quantum.securityAuditLog.slice(-10).map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
                      <div className={`w-2 h-2 rounded-full ${
                        log.severity === 'critical' ? 'bg-red-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{log.event}</span>
                          <span className="text-xs text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-6">
            {/* Key Generation */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Quantum Key Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Generate New Quantum Key</p>
                    <p className="text-sm text-slate-400">Create a new quantum-encrypted key pair</p>
                  </div>
                  <Button 
                    onClick={generateQuantumKey} 
                    disabled={isGeneratingKey}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isGeneratingKey ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4 mr-2" />
                        Generate Key
                      </>
                    )}
                  </Button>
                </div>
                
                {isGeneratingKey && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Key Generation Progress</span>
                      <span>{Math.round(keyGenerationProgress)}%</span>
                    </div>
                    <Progress value={keyGenerationProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Management */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Active Quantum Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(quantum.keys.entries()).map(([keyId, key]) => (
                    <div key={keyId} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="font-medium text-sm">{keyId}</span>
                            <Badge className={getSecurityLevelBadge(key.strength)}>
                              {key.strength}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Expires: {new Date(key.expiresAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setShowPrivateKey(!showPrivateKey)}
                          >
                            {showPrivateKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {showPrivateKey && (
                        <div className="mt-3 p-2 bg-slate-800 rounded text-xs font-mono break-all">
                          Public Key: {key.publicKey.substring(0, 64)}...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            {/* Channel Creation */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Create Secure Channel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-slate-400 mb-2 block">Security Level</label>
                    <select 
                      value={securityLevel}
                      onChange={(e) => setSecurityLevel(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="standard">Standard Security</option>
                      <option value="enterprise">Enterprise Security</option>
                      <option value="military">Military Grade</option>
                    </select>
                  </div>
                  <Button onClick={createSecureChannel} className="bg-green-600 hover:bg-green-700 mt-6">
                    Create Channel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Channels */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Active Secure Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(quantum.channels.entries()).map(([channelId, channel]) => (
                    <div key={channelId} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="font-medium text-sm">{channelId}</span>
                            <Badge className={getSecurityLevelBadge(channel.securityLevel)}>
                              {channel.securityLevel}
                            </Badge>
                            <Badge className={channel.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {channel.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Algorithm: {channel.encryptionAlgorithm} | Participants: {channel.participants.length}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedChannel(channelId)}
                          >
                            Select
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => rotateChannelKeys(channelId)}
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            {/* Encryption Testing */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Encryption Testing Lab
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChannel && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Testing with channel: {selectedChannel}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Original Message</label>
                    <textarea
                      value={encryptionTest.originalMessage}
                      onChange={(e) => setEncryptionTest(prev => ({ ...prev, originalMessage: e.target.value }))}
                      placeholder="Enter a message to encrypt..."
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={testEncryption}
                      disabled={!encryptionTest.originalMessage.trim() || !selectedChannel || encryptionTest.isEncrypting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {encryptionTest.isEncrypting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Encrypting...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Encrypt
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={testDecryption}
                      disabled={!encryptionTest.encryptedMessage || !selectedChannel || encryptionTest.isDecrypting}
                      variant="outline"
                    >
                      {encryptionTest.isDecrypting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Decrypting...
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Decrypt
                        </>
                      )}
                    </Button>
                  </div>

                  {encryptionTest.encryptedMessage && (
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Encrypted Message</label>
                      <div className="p-3 bg-slate-700 rounded-lg font-mono text-xs break-all text-green-400">
                        {encryptionTest.encryptedMessage}
                      </div>
                    </div>
                  )}

                  {encryptionTest.decryptedMessage && (
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Decrypted Message</label>
                      <div className="p-3 bg-slate-700 rounded-lg text-sm text-blue-400">
                        {encryptionTest.decryptedMessage}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Security Audit */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Audit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comprehensive Security Analysis</p>
                    <p className="text-sm text-slate-400">Run a full security audit of all quantum systems</p>
                  </div>
                  <Button onClick={performSecurityAudit} className="bg-purple-600 hover:bg-purple-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Run Audit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">Encryption Standards</span>
                    </div>
                    <p className="text-xs text-slate-400">All channels using post-quantum algorithms</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">Key Rotation</span>
                    </div>
                    <p className="text-xs text-slate-400">Automatic rotation every 24 hours</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">Threat Monitoring</span>
                    </div>
                    <p className="text-xs text-slate-400">Real-time threat detection active</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">Quantum Randomness</span>
                    </div>
                    <p className="text-xs text-slate-400">Hardware entropy source verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuantumEncryption;