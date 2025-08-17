import { useState, useEffect } from 'react';
import { Brain, Wifi, WifiOff, Activity, Zap } from 'lucide-react';

interface AIStatusProps {
  isActive: boolean;
}

const AIStatus = ({ isActive }: AIStatusProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        {/* AI Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            {isActive && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75"></div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Brain className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-sm font-medium text-white">
              AI Assistant {isActive ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isActive ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span className="text-xs text-gray-400">
              {isActive ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* System Info */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>CPU: {Math.floor(Math.random() * 20 + 10)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Memory: {Math.floor(Math.random() * 30 + 40)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Uptime: {formatUptime(uptime)}</span>
          </div>
        </div>

        {/* Current Time */}
        <div className="text-xs text-gray-400">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-3 w-full bg-white/10 rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-500 ${
            isActive 
              ? 'bg-gradient-to-r from-green-500 to-blue-500' 
              : 'bg-red-500'
          }`}
          style={{ width: isActive ? '100%' : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default AIStatus;