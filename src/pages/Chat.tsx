import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SettingsProvider, useSettings } from '../lib/state/SettingsContext';
import { createDidKey, loadIdentity, saveIdentity } from '../lib/identity/did';
import { analyzeEmotion } from '../lib/ai/emotion';
import { translate } from '../lib/ai/translation';
import { SignalClient } from '../lib/network/SignalClient';
import { TransportManager } from '../lib/transport/TransportManager';
import { decrypt, encrypt, exportPublicKeyJwk, generateEphemeralKeyPair, deriveAesKey } from '../lib/crypto/qkd';

function ChatInner() {
  const { language, flags } = useSettings();
  const [localId, setLocalId] = useState<string>('');
  const [peerId, setPeerId] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const keysRef = useRef<{ aesKey?: CryptoKey }>({});
  const tmRef = useRef<TransportManager>();
  const signal = useMemo(() => new SignalClient(), []);

  useEffect(() => {
    let id = loadIdentity();
    if (!id) {
      createDidKey().then((i) => {
        saveIdentity(i);
        setLocalId(i.did);
      });
    } else {
      setLocalId(id.did);
    }
  }, []);

  useEffect(() => {
    if (!localId) return;
    tmRef.current = new TransportManager(localId, signal, {
      onMessage: async (_from, data) => {
        if (keysRef.current.aesKey) {
          const pt = await decrypt(keysRef.current.aesKey, new Uint8Array(data));
          const text = new TextDecoder().decode(pt);
          setLog((l) => [
            ...l,
            `Peer: ${flags.autoTranslate ? translate(text, language) : text}`,
          ]);
        } else {
          setLog((l) => [...l, `Peer (unsecured): ${new TextDecoder().decode(data)}`]);
        }
      },
    });
  }, [localId, language, flags.autoTranslate]);

  async function startQkd() {
    const kp = await generateEphemeralKeyPair();
    const jwk = await exportPublicKeyJwk(kp);
    signal.send({ type: 'QKD_OFFER', from: localId, to: peerId, data: jwk });
    const unsub = signal.on(async (msg) => {
      if (msg.type === 'QKD_ANSWER' && msg.from === peerId && msg.to === localId) {
        const { aesKey } = await deriveAesKey(kp.privateKey, msg.data);
        keysRef.current.aesKey = aesKey;
        setLog((l) => [...l, 'QKD: session key established']);
        unsub();
      }
    });
  }

  useEffect(() => {
    const off = signal.on(async (msg) => {
      if (msg.type === 'QKD_OFFER' && msg.to === localId) {
        const kp = await generateEphemeralKeyPair();
        const jwk = await exportPublicKeyJwk(kp);
        signal.send({ type: 'QKD_ANSWER', from: localId, to: msg.from, data: jwk });
        const { aesKey } = await deriveAesKey(kp.privateKey, msg.data);
        keysRef.current.aesKey = aesKey;
        setLog((l) => [...l, 'QKD: session key established']);
      }
    });
    return off;
  }, [localId]);

  async function send() {
    if (!tmRef.current || !peerId || !input) return;
    const emo = analyzeEmotion(input);
    const enriched = `${input} [${emo.label}${emo.intensity > 0 ? `:${Math.round(emo.intensity * 100)}%` : ''}]`;
    const finalText = flags.autoTranslate ? translate(enriched, language) : enriched;
    const data = new TextEncoder().encode(finalText);
    const toSend = keysRef.current.aesKey ? await encrypt(keysRef.current.aesKey, data) : data;
    tmRef.current.send(peerId, toSend);
    setLog((l) => [...l, `You: ${finalText}`]);
    setInput('');
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="text-sm opacity-70">Your DID: {localId || '...'} </div>
      <div className="flex gap-2">
        <input className="border rounded px-2 py-1 flex-1" placeholder="Peer DID" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => tmRef.current?.connectTo(peerId)}>Connect</button>
        <button className="px-3 py-1 bg-emerald-600 text-white rounded" onClick={startQkd}>Secure</button>
      </div>
      <div className="flex gap-2">
        <input className="border rounded px-2 py-1 flex-1" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="px-3 py-1 bg-gray-900 text-white rounded" onClick={send}>Send</button>
      </div>
      <div className="border rounded p-2 h-80 overflow-auto bg-black/5">
        {log.map((l, i) => (
          <div key={i} className="text-sm py-0.5">{l}</div>
        ))}
      </div>
    </div>
  );
}

const Chat: React.FC = () => (
  <SettingsProvider>
    <ChatInner />
  </SettingsProvider>
);

export default Chat;