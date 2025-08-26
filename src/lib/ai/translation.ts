import { LanguageCode } from "../config";

type Tone = 'formal' | 'casual' | 'friendly';

const miniDict: Record<string, Record<LanguageCode, string>> = {
  hello: { en: 'hello', es: 'hola', hi: 'namaste', fr: 'bonjour', zh: 'nihao' },
  thanks: { en: 'thanks', es: 'gracias', hi: 'dhanyavaad', fr: 'merci', zh: 'xiexie' },
  friend: { en: 'friend', es: 'amigo', hi: 'dost', fr: 'ami', zh: 'pengyou' },
};

export function translate(text: string, to: LanguageCode, tone: Tone = 'friendly'): string {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const translated = words.map((w) => miniDict[w]?.[to] ?? w);
  const joined = translated.join(' ');
  if (tone === 'formal') return joined + (to === 'en' ? '.' : '');
  if (tone === 'casual') return joined;
  return joined + (to === 'en' ? ' 🙂' : '');
}