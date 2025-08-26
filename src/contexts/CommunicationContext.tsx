import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface User {
  userId: string;
  username: string;
  avatar?: string;
  publicKey?: string;
  trustScore?: number;
  status: 'online' | 'offline' | 'away';
}

interface CommunicationState {
  socket: Socket | null;
  currentUser: User | null;
  connectedUsers: User[];
  isConnected: boolean;
  dataUsage: {
    sent: number;
    received: number;
    compressed: number;
    saved: number;
  };
  networkQuality: 'excellent' | 'good' | 'poor' | 'offline';
  meshNetworkEnabled: boolean;
}

type CommunicationAction =
  | { type: 'SET_SOCKET'; payload: Socket }
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'SET_CONNECTED_USERS'; payload: User[] }
  | { type: 'ADD_CONNECTED_USER'; payload: User }
  | { type: 'REMOVE_CONNECTED_USER'; payload: string }
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'UPDATE_DATA_USAGE'; payload: Partial<CommunicationState['dataUsage']> }
  | { type: 'SET_NETWORK_QUALITY'; payload: CommunicationState['networkQuality'] }
  | { type: 'TOGGLE_MESH_NETWORK' };

const initialState: CommunicationState = {
  socket: null,
  currentUser: null,
  connectedUsers: [],
  isConnected: false,
  dataUsage: {
    sent: 0,
    received: 0,
    compressed: 0,
    saved: 0,
  },
  networkQuality: 'offline',
  meshNetworkEnabled: true,
};

const communicationReducer = (state: CommunicationState, action: CommunicationAction): CommunicationState => {
  switch (action.type) {
    case 'SET_SOCKET':
      return { ...state, socket: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_CONNECTED_USERS':
      return { ...state, connectedUsers: action.payload };
    case 'ADD_CONNECTED_USER':
      return {
        ...state,
        connectedUsers: [...state.connectedUsers.filter(u => u.userId !== action.payload.userId), action.payload],
      };
    case 'REMOVE_CONNECTED_USER':
      return {
        ...state,
        connectedUsers: state.connectedUsers.filter(u => u.userId !== action.payload),
      };
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };
    case 'UPDATE_DATA_USAGE':
      return {
        ...state,
        dataUsage: { ...state.dataUsage, ...action.payload },
      };
    case 'SET_NETWORK_QUALITY':
      return { ...state, networkQuality: action.payload };
    case 'TOGGLE_MESH_NETWORK':
      return { ...state, meshNetworkEnabled: !state.meshNetworkEnabled };
    default:
      return state;
  }
};

interface CommunicationContextType extends CommunicationState {
  dispatch: React.Dispatch<CommunicationAction>;
  connectToNexus: (user: User) => void;
  disconnectFromNexus: () => void;
  sendMessage: (targetUserId: string, message: string, encrypted?: boolean) => void;
  measureNetworkQuality: () => void;
  optimizeConnection: () => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (!context) {
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
};

interface CommunicationProviderProps {
  children: ReactNode;
}

export const CommunicationProvider: React.FC<CommunicationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(communicationReducer, initialState);

  const connectToNexus = (user: User) => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    const socket = io(socketUrl);

    socket.on('connect', () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
      dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'excellent' });
      socket.emit('user-join', user);
    });

    socket.on('disconnect', () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
      dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'offline' });
    });

    socket.on('user-joined', (userData: User) => {
      dispatch({ type: 'ADD_CONNECTED_USER', payload: userData });
    });

    socket.on('user-left', (userData: User) => {
      dispatch({ type: 'REMOVE_CONNECTED_USER', payload: userData.userId });
    });

    socket.on('quantum-key-generated', (data: { publicKey: string }) => {
      if (state.currentUser) {
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: { ...state.currentUser, publicKey: data.publicKey },
        });
      }
    });

    dispatch({ type: 'SET_SOCKET', payload: socket });
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const disconnectFromNexus = () => {
    if (state.socket) {
      state.socket.disconnect();
      dispatch({ type: 'SET_SOCKET', payload: null });
      dispatch({ type: 'SET_CURRENT_USER', payload: null });
      dispatch({ type: 'SET_CONNECTED_USERS', payload: [] });
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
    }
  };

  const sendMessage = (targetUserId: string, message: string, encrypted = true) => {
    if (state.socket && state.currentUser) {
      const messageSize = new Blob([message]).size;
      
      if (encrypted) {
        // Simulate quantum encrypted message
        state.socket.emit('send-quantum-message', {
          targetUserId,
          message,
          keyId: `${state.currentUser.userId}-${targetUserId}`,
        });
      } else {
        // Regular message
        state.socket.emit('send-message', {
          targetUserId,
          message,
        });
      }

      // Update data usage
      dispatch({
        type: 'UPDATE_DATA_USAGE',
        payload: {
          sent: state.dataUsage.sent + messageSize,
          compressed: state.dataUsage.compressed + messageSize * 0.8, // 80% compression
          saved: state.dataUsage.saved + messageSize * 0.2,
        },
      });
    }
  };

  const measureNetworkQuality = () => {
    if (!state.socket || !state.isConnected) {
      dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'offline' });
      return;
    }

    const startTime = Date.now();
    state.socket.emit('ping', startTime);
    
    state.socket.once('pong', (timestamp: number) => {
      const latency = Date.now() - timestamp;
      
      if (latency < 50) {
        dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'excellent' });
      } else if (latency < 150) {
        dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'good' });
      } else {
        dispatch({ type: 'SET_NETWORK_QUALITY', payload: 'poor' });
      }
    });
  };

  const optimizeConnection = () => {
    // Implement connection optimization logic
    if (state.networkQuality === 'poor' && !state.meshNetworkEnabled) {
      dispatch({ type: 'TOGGLE_MESH_NETWORK' });
    }
  };

  useEffect(() => {
    const interval = setInterval(measureNetworkQuality, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [state.socket, state.isConnected]);

  useEffect(() => {
    optimizeConnection();
  }, [state.networkQuality]);

  const contextValue: CommunicationContextType = {
    ...state,
    dispatch,
    connectToNexus,
    disconnectFromNexus,
    sendMessage,
    measureNetworkQuality,
    optimizeConnection,
  };

  return (
    <CommunicationContext.Provider value={contextValue}>
      {children}
    </CommunicationContext.Provider>
  );
};