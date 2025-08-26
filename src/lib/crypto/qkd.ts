export type QkdOffer = {
  type: 'QKD_OFFER';
  from: string;
  to: string;
  publicKeyJwk: JsonWebKey;
};

export type QkdAnswer = {
  type: 'QKD_ANSWER';
  from: string;
  to: string;
  publicKeyJwk: JsonWebKey;
};

export interface SessionKeys {
  aesKey: CryptoKey;
}

export async function generateEphemeralKeyPair() {
  return crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true,
    ['deriveKey']
  );
}

export async function exportPublicKeyJwk(keyPair: CryptoKeyPair) {
  return crypto.subtle.exportKey('jwk', keyPair.publicKey);
}

export async function deriveAesKey(myPriv: CryptoKey, theirPubJwk: JsonWebKey): Promise<SessionKeys> {
  const theirPub = await crypto.subtle.importKey('jwk', theirPubJwk, { name: 'ECDH', namedCurve: 'P-256' }, true, []);
  const aesKey = await crypto.subtle.deriveKey(
    {
      name: 'ECDH',
      public: theirPub,
    },
    myPriv,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  return { aesKey };
}

export async function encrypt(aesKey: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, data));
  const out = new Uint8Array(iv.length + ct.length);
  out.set(iv, 0);
  out.set(ct, iv.length);
  return out;
}

export async function decrypt(aesKey: CryptoKey, payload: Uint8Array): Promise<Uint8Array> {
  const iv = payload.slice(0, 12);
  const ct = payload.slice(12);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ct);
  return new Uint8Array(pt);
}