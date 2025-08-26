import * as ed25519 from '@noble/ed25519';
import { base58btc } from 'multiformats/bases/base58';

function prefixEd25519PubKey(raw: Uint8Array): Uint8Array {
  // multicodec 0xED 0x01 for Ed25519 public key
  const prefix = new Uint8Array([0xed, 0x01]);
  const out = new Uint8Array(prefix.length + raw.length);
  out.set(prefix, 0);
  out.set(raw, prefix.length);
  return out;
}

export async function createDidKey(): Promise<{ did: string; publicKey: Uint8Array; secretKey: Uint8Array }>{
  const secretKey = ed25519.utils.randomPrivateKey();
  const publicKey = await ed25519.getPublicKeyAsync(secretKey);
  const prefixed = prefixEd25519PubKey(publicKey);
  const did = `did:key:z${base58btc.encode(prefixed)}`;
  return { did, publicKey, secretKey };
}

export function saveIdentity(id: { did: string; publicKey: Uint8Array; secretKey: Uint8Array }) {
  localStorage.setItem('identity', JSON.stringify({ did: id.did, publicKey: Array.from(id.publicKey), secretKey: Array.from(id.secretKey) }));
}

export function loadIdentity(): { did: string; publicKey: Uint8Array; secretKey: Uint8Array } | null {
  const raw = localStorage.getItem('identity');
  if (!raw) return null;
  const obj = JSON.parse(raw);
  return { did: obj.did, publicKey: new Uint8Array(obj.publicKey), secretKey: new Uint8Array(obj.secretKey) };
}