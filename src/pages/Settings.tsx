import React from 'react';
import { SettingsProvider, useSettings } from '../lib/state/SettingsContext';

function SettingsInner() {
  const { flags, setFlags, language, setLanguage, fidelity, setFidelity } = useSettings();
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="text-lg font-semibold">Settings</div>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.lowDataMode} onChange={(e) => setFlags({ lowDataMode: e.target.checked })} />
          <span>Low Data Mode</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.adaptiveFidelity} onChange={(e) => setFlags({ adaptiveFidelity: e.target.checked })} />
          <span>Adaptive Fidelity</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.offlineFirst} onChange={(e) => setFlags({ offlineFirst: e.target.checked })} />
          <span>Offline First</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.autoTranslate} onChange={(e) => setFlags({ autoTranslate: e.target.checked })} />
          <span>Auto Translate</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.emotionAssistant} onChange={(e) => setFlags({ emotionAssistant: e.target.checked })} />
          <span>Emotion Assistant</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={flags.monetizationOptIn} onChange={(e) => setFlags({ monetizationOptIn: e.target.checked })} />
          <span>Monetization Opt-In</span>
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Language</label>
        <select className="border rounded px-2 py-1" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="hi">हिन्दी</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Fidelity</label>
        <select className="border rounded px-2 py-1" value={fidelity} onChange={(e) => setFidelity(e.target.value as any)}>
          <option value="ultra-low">Ultra Low</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

const Settings: React.FC = () => (
  <SettingsProvider>
    <SettingsInner />
  </SettingsProvider>
);

export default Settings;