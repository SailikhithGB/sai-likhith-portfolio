export type EmotionLabel = 'joy' | 'sadness' | 'anger' | 'fear' | 'neutral';

const lexicon: Record<string, EmotionLabel> = {
  happy: 'joy', joy: 'joy', love: 'joy', great: 'joy', awesome: 'joy',
  sad: 'sadness', upset: 'sadness', crying: 'sadness',
  angry: 'anger', mad: 'anger', hate: 'anger',
  fear: 'fear', scared: 'fear', afraid: 'fear',
};

export function analyzeEmotion(text: string): { label: EmotionLabel; intensity: number } {
  const tokens = text.toLowerCase().split(/\W+/).filter(Boolean);
  let counts: Record<EmotionLabel, number> = { joy: 0, sadness: 0, anger: 0, fear: 0, neutral: 0 };
  for (const t of tokens) {
    const lab = lexicon[t];
    if (lab) counts[lab] += 1;
  }
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const total = tokens.length || 1;
  if (!best || best[1] === 0) return { label: 'neutral', intensity: 0 };
  return { label: best[0] as EmotionLabel, intensity: Math.min(1, best[1] / total) };
}