export type FidelityMode = 'ultra-low' | 'low' | 'medium' | 'high';

export const DEFAULT_FIDELITY: FidelityMode = 'low';
export const LOW_DATA_DEFAULT = true;

const defaultServerHttp = typeof window !== 'undefined' ? `${window.location.protocol}//localhost:8080` : 'http://localhost:8080';
const defaultServerWs = defaultServerHttp.replace('http', 'ws');

export const SERVER_HTTP_URL = (import.meta as any).env?.VITE_SERVER_URL ?? defaultServerHttp;
export const SERVER_WS_URL = (import.meta as any).env?.VITE_SERVER_WS ?? defaultServerWs + '/signal';

export type LanguageCode = 'en' | 'es' | 'hi' | 'fr' | 'zh';
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export interface FeatureFlags {
  lowDataMode: boolean;
  adaptiveFidelity: boolean;
  offlineFirst: boolean;
  autoTranslate: boolean;
  emotionAssistant: boolean;
  monetizationOptIn: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  lowDataMode: LOW_DATA_DEFAULT,
  adaptiveFidelity: true,
  offlineFirst: true,
  autoTranslate: true,
  emotionAssistant: true,
  monetizationOptIn: false,
};