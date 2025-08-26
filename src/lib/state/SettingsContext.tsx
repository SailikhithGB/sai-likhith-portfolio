import React, { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_FEATURE_FLAGS, FeatureFlags, DEFAULT_LANGUAGE, LanguageCode, DEFAULT_FIDELITY, FidelityMode } from '../config';

interface SettingsState {
  flags: FeatureFlags;
  setFlags: (f: Partial<FeatureFlags>) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  fidelity: FidelityMode;
  setFidelity: (m: FidelityMode) => void;
}

const Ctx = createContext<SettingsState | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlagsState] = useState<FeatureFlags>(() => {
    const raw = localStorage.getItem('flags');
    return raw ? JSON.parse(raw) : DEFAULT_FEATURE_FLAGS;
  });
  const [language, setLanguageState] = useState<LanguageCode>(() => (localStorage.getItem('lang') as any) || DEFAULT_LANGUAGE);
  const [fidelity, setFidelityState] = useState<FidelityMode>(() => (localStorage.getItem('fidelity') as FidelityMode) || DEFAULT_FIDELITY);

  const setFlags = (f: Partial<FeatureFlags>) => {
    const next = { ...flags, ...f };
    setFlagsState(next);
    localStorage.setItem('flags', JSON.stringify(next));
  };

  const setLanguage = (l: LanguageCode) => {
    setLanguageState(l);
    localStorage.setItem('lang', l);
  };

  const setFidelity = (m: FidelityMode) => {
    setFidelityState(m);
    localStorage.setItem('fidelity', m);
  };

  const value = useMemo(() => ({ flags, setFlags, language, setLanguage, fidelity, setFidelity }), [flags, language, fidelity]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('SettingsContext not found');
  return ctx;
}