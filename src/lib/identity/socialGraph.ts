export interface Profile {
  did: string;
  displayName?: string;
  avatarUrl?: string;
  language?: string;
}

export interface SocialGraphState {
  follows: Record<string, Profile>;
  blocked: Record<string, boolean>;
}

const STORAGE_KEY = 'social_graph_v1';

function load(): SocialGraphState {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { follows: {}, blocked: {} };
}

function save(state: SocialGraphState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function follow(profile: Profile) {
  const s = load();
  s.follows[profile.did] = profile;
  save(s);
}

export function unfollow(did: string) {
  const s = load();
  delete s.follows[did];
  save(s);
}

export function block(did: string) {
  const s = load();
  s.blocked[did] = true;
  save(s);
}

export function listFollows(): Profile[] {
  return Object.values(load().follows);
}