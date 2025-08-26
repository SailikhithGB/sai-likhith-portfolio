import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import CryptoJS from 'crypto-js';

interface QuantumKey {
  keyId: string;
  publicKey: string;
  privateKey?: string;
  sharedSecret?: string;
  expiresAt: number;
  strength: 'quantum' | 'classical';
}

interface QuantumChannel {
  channelId: string;
  participants: string[];
  keyId: string;
  isActive: boolean;
  securityLevel: 'military' | 'enterprise' | 'standard';
  encryptionAlgorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'Post-Quantum';
}

interface QuantumState {
  keys: Map<string, QuantumKey>;
  channels: Map<string, QuantumChannel>;
  keyGenerationInProgress: boolean;
  quantumRandomness: boolean;
  securityAuditLog: Array<{
    timestamp: number;
    event: string;
    severity: 'info' | 'warning' | 'critical';
    details: string;
  }>;
  threatDetection: {
    suspiciousActivity: boolean;
    quantumComputerThreat: boolean;
    keyCompromiseRisk: number; // 0-1
  };
}

type QuantumAction =
  | { type: 'ADD_KEY'; payload: QuantumKey }
  | { type: 'REMOVE_KEY'; payload: string }
  | { type: 'CREATE_CHANNEL'; payload: QuantumChannel }
  | { type: 'CLOSE_CHANNEL'; payload: string }
  | { type: 'SET_KEY_GENERATION_STATUS'; payload: boolean }
  | { type: 'TOGGLE_QUANTUM_RANDOMNESS' }
  | { type: 'ADD_SECURITY_LOG'; payload: { event: string; severity: 'info' | 'warning' | 'critical'; details: string } }
  | { type: 'UPDATE_THREAT_DETECTION'; payload: Partial<QuantumState['threatDetection']> };

const initialState: QuantumState = {
  keys: new Map(),
  channels: new Map(),
  keyGenerationInProgress: false,
  quantumRandomness: true,
  securityAuditLog: [],
  threatDetection: {
    suspiciousActivity: false,
    quantumComputerThreat: false,
    keyCompromiseRisk: 0,
  },
};

const quantumReducer = (state: QuantumState, action: QuantumAction): QuantumState => {
  switch (action.type) {
    case 'ADD_KEY':
      const newKeys = new Map(state.keys);
      newKeys.set(action.payload.keyId, action.payload);
      return { ...state, keys: newKeys };
    case 'REMOVE_KEY':
      const updatedKeys = new Map(state.keys);
      updatedKeys.delete(action.payload);
      return { ...state, keys: updatedKeys };
    case 'CREATE_CHANNEL':
      const newChannels = new Map(state.channels);
      newChannels.set(action.payload.channelId, action.payload);
      return { ...state, channels: newChannels };
    case 'CLOSE_CHANNEL':
      const updatedChannels = new Map(state.channels);
      updatedChannels.delete(action.payload);
      return { ...state, channels: updatedChannels };
    case 'SET_KEY_GENERATION_STATUS':
      return { ...state, keyGenerationInProgress: action.payload };
    case 'TOGGLE_QUANTUM_RANDOMNESS':
      return { ...state, quantumRandomness: !state.quantumRandomness };
    case 'ADD_SECURITY_LOG':
      return {
        ...state,
        securityAuditLog: [
          ...state.securityAuditLog,
          {
            timestamp: Date.now(),
            ...action.payload,
          },
        ].slice(-100), // Keep only last 100 logs
      };
    case 'UPDATE_THREAT_DETECTION':
      return {
        ...state,
        threatDetection: { ...state.threatDetection, ...action.payload },
      };
    default:
      return state;
  }
};

interface QuantumContextType extends QuantumState {
  dispatch: React.Dispatch<QuantumAction>;
  generateQuantumKey: (userId: string, strength?: 'quantum' | 'classical') => Promise<QuantumKey>;
  establishSecureChannel: (participants: string[], securityLevel?: 'military' | 'enterprise' | 'standard') => Promise<QuantumChannel>;
  encryptMessage: (message: string, channelId: string) => Promise<string>;
  decryptMessage: (encryptedMessage: string, channelId: string) => Promise<string>;
  rotateKeys: (channelId: string) => Promise<void>;
  validateIntegrity: (message: string, signature: string, channelId: string) => boolean;
  detectQuantumThreat: () => void;
  performSecurityAudit: () => Promise<{ passed: boolean; issues: string[] }>;
}

const QuantumContext = createContext<QuantumContextType | undefined>(undefined);

export const useQuantum = () => {
  const context = useContext(QuantumContext);
  if (!context) {
    throw new Error('useQuantum must be used within a QuantumProvider');
  }
  return context;
};

interface QuantumProviderProps {
  children: ReactNode;
}

export const QuantumProvider: React.FC<QuantumProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quantumReducer, initialState);

  const generateQuantumRandomBytes = (length: number): string => {
    if (state.quantumRandomness && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    return CryptoJS.lib.WordArray.random(length).toString();
  };

  const generateQuantumKey = async (userId: string, strength: 'quantum' | 'classical' = 'quantum'): Promise<QuantumKey> => {
    dispatch({ type: 'SET_KEY_GENERATION_STATUS', payload: true });
    
    try {
      // Simulate quantum key generation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const keyId = `qkey_${userId}_${Date.now()}`;
      const publicKey = generateQuantumRandomBytes(32);
      const privateKey = generateQuantumRandomBytes(32);
      const sharedSecret = generateQuantumRandomBytes(32);
      
      const quantumKey: QuantumKey = {
        keyId,
        publicKey,
        privateKey,
        sharedSecret,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        strength,
      };
      
      dispatch({ type: 'ADD_KEY', payload: quantumKey });
      dispatch({
        type: 'ADD_SECURITY_LOG',
        payload: {
          event: 'Quantum key generated',
          severity: 'info',
          details: `New ${strength} key generated for user ${userId}`,
        },
      });
      
      return quantumKey;
    } finally {
      dispatch({ type: 'SET_KEY_GENERATION_STATUS', payload: false });
    }
  };

  const establishSecureChannel = async (
    participants: string[],
    securityLevel: 'military' | 'enterprise' | 'standard' = 'standard'
  ): Promise<QuantumChannel> => {
    const channelId = `qchannel_${participants.join('_')}_${Date.now()}`;
    
    // Generate a quantum key for this channel
    const keyStrength = securityLevel === 'military' ? 'quantum' : 'classical';
    const channelKey = await generateQuantumKey(`channel_${channelId}`, keyStrength);
    
    const encryptionAlgorithm = 
      securityLevel === 'military' ? 'Post-Quantum' :
      securityLevel === 'enterprise' ? 'ChaCha20-Poly1305' : 'AES-256-GCM';
    
    const channel: QuantumChannel = {
      channelId,
      participants,
      keyId: channelKey.keyId,
      isActive: true,
      securityLevel,
      encryptionAlgorithm,
    };
    
    dispatch({ type: 'CREATE_CHANNEL', payload: channel });
    dispatch({
      type: 'ADD_SECURITY_LOG',
      payload: {
        event: 'Secure channel established',
        severity: 'info',
        details: `${securityLevel} level channel created with ${participants.length} participants`,
      },
    });
    
    return channel;
  };

  const encryptMessage = async (message: string, channelId: string): Promise<string> => {
    const channel = state.channels.get(channelId);
    if (!channel) throw new Error('Channel not found');
    
    const key = state.keys.get(channel.keyId);
    if (!key || !key.sharedSecret) throw new Error('Encryption key not found');
    
    try {
      let encrypted: string;
      
      switch (channel.encryptionAlgorithm) {
        case 'AES-256-GCM':
          encrypted = CryptoJS.AES.encrypt(message, key.sharedSecret).toString();
          break;
        case 'ChaCha20-Poly1305':
          // Simulate ChaCha20-Poly1305 with AES for demo
          encrypted = CryptoJS.AES.encrypt(message, key.sharedSecret + '_chacha').toString();
          break;
        case 'Post-Quantum':
          // Simulate post-quantum encryption
          encrypted = CryptoJS.AES.encrypt(
            CryptoJS.AES.encrypt(message, key.sharedSecret).toString(),
            key.sharedSecret + '_pq'
          ).toString();
          break;
        default:
          encrypted = CryptoJS.AES.encrypt(message, key.sharedSecret).toString();
      }
      
      dispatch({
        type: 'ADD_SECURITY_LOG',
        payload: {
          event: 'Message encrypted',
          severity: 'info',
          details: `Message encrypted using ${channel.encryptionAlgorithm}`,
        },
      });
      
      return encrypted;
    } catch (error) {
      dispatch({
        type: 'ADD_SECURITY_LOG',
        payload: {
          event: 'Encryption failed',
          severity: 'critical',
          details: `Failed to encrypt message: ${error}`,
        },
      });
      throw new Error('Encryption failed');
    }
  };

  const decryptMessage = async (encryptedMessage: string, channelId: string): Promise<string> => {
    const channel = state.channels.get(channelId);
    if (!channel) throw new Error('Channel not found');
    
    const key = state.keys.get(channel.keyId);
    if (!key || !key.sharedSecret) throw new Error('Decryption key not found');
    
    try {
      let decrypted: string;
      
      switch (channel.encryptionAlgorithm) {
        case 'AES-256-GCM':
          decrypted = CryptoJS.AES.decrypt(encryptedMessage, key.sharedSecret).toString(CryptoJS.enc.Utf8);
          break;
        case 'ChaCha20-Poly1305':
          decrypted = CryptoJS.AES.decrypt(encryptedMessage, key.sharedSecret + '_chacha').toString(CryptoJS.enc.Utf8);
          break;
        case 'Post-Quantum':
          const firstDecrypt = CryptoJS.AES.decrypt(encryptedMessage, key.sharedSecret + '_pq').toString(CryptoJS.enc.Utf8);
          decrypted = CryptoJS.AES.decrypt(firstDecrypt, key.sharedSecret).toString(CryptoJS.enc.Utf8);
          break;
        default:
          decrypted = CryptoJS.AES.decrypt(encryptedMessage, key.sharedSecret).toString(CryptoJS.enc.Utf8);
      }
      
      if (!decrypted) throw new Error('Decryption produced empty result');
      
      return decrypted;
    } catch (error) {
      dispatch({
        type: 'ADD_SECURITY_LOG',
        payload: {
          event: 'Decryption failed',
          severity: 'critical',
          details: `Failed to decrypt message: ${error}`,
        },
      });
      throw new Error('Decryption failed');
    }
  };

  const rotateKeys = async (channelId: string): Promise<void> => {
    const channel = state.channels.get(channelId);
    if (!channel) throw new Error('Channel not found');
    
    // Remove old key
    dispatch({ type: 'REMOVE_KEY', payload: channel.keyId });
    
    // Generate new key
    const keyStrength = channel.securityLevel === 'military' ? 'quantum' : 'classical';
    const newKey = await generateQuantumKey(`channel_${channelId}_rotated`, keyStrength);
    
    // Update channel with new key
    const updatedChannel = { ...channel, keyId: newKey.keyId };
    dispatch({ type: 'CREATE_CHANNEL', payload: updatedChannel });
    
    dispatch({
      type: 'ADD_SECURITY_LOG',
      payload: {
        event: 'Key rotation completed',
        severity: 'info',
        details: `Channel ${channelId} keys rotated successfully`,
      },
    });
  };

  const validateIntegrity = (message: string, signature: string, channelId: string): boolean => {
    const channel = state.channels.get(channelId);
    if (!channel) return false;
    
    const key = state.keys.get(channel.keyId);
    if (!key || !key.sharedSecret) return false;
    
    const expectedSignature = CryptoJS.HmacSHA256(message, key.sharedSecret).toString();
    return expectedSignature === signature;
  };

  const detectQuantumThreat = () => {
    // Simulate quantum threat detection
    const threats = {
      suspiciousActivity: Math.random() < 0.1, // 10% chance
      quantumComputerThreat: Math.random() < 0.05, // 5% chance
      keyCompromiseRisk: Math.random() * 0.3, // 0-30% risk
    };
    
    dispatch({ type: 'UPDATE_THREAT_DETECTION', payload: threats });
    
    if (threats.suspiciousActivity || threats.quantumComputerThreat || threats.keyCompromiseRisk > 0.2) {
      dispatch({
        type: 'ADD_SECURITY_LOG',
        payload: {
          event: 'Quantum threat detected',
          severity: 'warning',
          details: `Threat analysis: ${JSON.stringify(threats)}`,
        },
      });
    }
  };

  const performSecurityAudit = async (): Promise<{ passed: boolean; issues: string[] }> => {
    const issues: string[] = [];
    
    // Check key expiration
    for (const [keyId, key] of state.keys) {
      if (key.expiresAt < Date.now()) {
        issues.push(`Key ${keyId} has expired`);
      }
    }
    
    // Check for weak encryption
    for (const [channelId, channel] of state.channels) {
      if (channel.securityLevel === 'standard' && channel.participants.length > 2) {
        issues.push(`Channel ${channelId} uses standard security for multi-party communication`);
      }
    }
    
    // Check threat levels
    if (state.threatDetection.keyCompromiseRisk > 0.5) {
      issues.push('High key compromise risk detected');
    }
    
    const passed = issues.length === 0;
    
    dispatch({
      type: 'ADD_SECURITY_LOG',
      payload: {
        event: 'Security audit completed',
        severity: passed ? 'info' : 'warning',
        details: `Audit ${passed ? 'passed' : 'failed'} with ${issues.length} issues`,
      },
    });
    
    return { passed, issues };
  };

  const contextValue: QuantumContextType = {
    ...state,
    dispatch,
    generateQuantumKey,
    establishSecureChannel,
    encryptMessage,
    decryptMessage,
    rotateKeys,
    validateIntegrity,
    detectQuantumThreat,
    performSecurityAudit,
  };

  return (
    <QuantumContext.Provider value={contextValue}>
      {children}
    </QuantumContext.Provider>
  );
};