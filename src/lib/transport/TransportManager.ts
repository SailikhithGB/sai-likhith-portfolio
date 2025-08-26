import { SignalClient, SignalMessage } from "../network/SignalClient";
import { FidelityMode, DEFAULT_FIDELITY } from "../config";

export type TransportEvents = {
  onMessage?: (from: string, data: Uint8Array) => void;
  onPeerStatus?: (peerId: string, connected: boolean) => void;
  onFidelityChange?: (mode: FidelityMode) => void;
};

export class TransportManager {
  private localId: string;
  private signal: SignalClient;
  private peers: Map<string, RTCPeerConnection> = new Map();
  private channels: Map<string, RTCDataChannel> = new Map();
  private fidelity: FidelityMode = DEFAULT_FIDELITY;
  private events: TransportEvents;

  constructor(localId: string, signal: SignalClient, events: TransportEvents = {}) {
    this.localId = localId;
    this.signal = signal;
    this.events = events;
    this.signal.on((m) => this.onSignal(m));
    this.signal.connect();
    setInterval(() => this.evaluateNetwork(), 4000);
  }

  setFidelity(mode: FidelityMode) {
    this.fidelity = mode;
    this.events.onFidelityChange?.(mode);
  }

  async connectTo(peerId: string) {
    const pc = this.ensurePeer(peerId);
    const ch = pc.createDataChannel('data');
    this.channels.set(peerId, ch);
    ch.binaryType = 'arraybuffer';
    ch.onopen = () => this.events.onPeerStatus?.(peerId, true);
    ch.onclose = () => this.events.onPeerStatus?.(peerId, false);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.signal.send({ type: 'RTC_OFFER', from: this.localId, to: peerId, data: offer });
  }

  send(peerId: string, data: Uint8Array) {
    const ch = this.channels.get(peerId);
    if (ch && ch.readyState === 'open') {
      ch.send(data);
    } else {
      // fallback via signaling if data channel unavailable
      this.signal.send({ type: 'DATA_FALLBACK', from: this.localId, to: peerId, data: Array.from(data) });
    }
  }

  private ensurePeer(peerId: string) {
    if (this.peers.has(peerId)) return this.peers.get(peerId)!;
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    pc.onicecandidate = (e) => {
      if (e.candidate) this.signal.send({ type: 'RTC_ICE', from: this.localId, to: peerId, data: e.candidate });
    };
    pc.ondatachannel = (ev) => {
      const ch = ev.channel;
      ch.binaryType = 'arraybuffer';
      this.channels.set(peerId, ch);
      ch.onmessage = (mev) => {
        const buf = new Uint8Array(mev.data);
        this.events.onMessage?.(peerId, buf);
      };
      ch.onopen = () => this.events.onPeerStatus?.(peerId, true);
      ch.onclose = () => this.events.onPeerStatus?.(peerId, false);
    };
    this.peers.set(peerId, pc);
    return pc;
  }

  private async onSignal(msg: SignalMessage) {
    if (!msg.to || msg.to !== this.localId) return;
    if (msg.type === 'RTC_OFFER') {
      const pc = this.ensurePeer(msg.from!);
      await pc.setRemoteDescription(msg.data);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      this.signal.send({ type: 'RTC_ANSWER', from: this.localId, to: msg.from, data: answer });
    } else if (msg.type === 'RTC_ANSWER') {
      const pc = this.ensurePeer(msg.from!);
      await pc.setRemoteDescription(msg.data);
    } else if (msg.type === 'RTC_ICE') {
      const pc = this.ensurePeer(msg.from!);
      await pc.addIceCandidate(msg.data);
    } else if (msg.type === 'DATA_FALLBACK') {
      const buf = new Uint8Array(msg.data);
      this.events.onMessage?.(msg.from!, buf);
    }
  }

  private evaluateNetwork() {
    // Naive adaptive fidelity: lower if any channel not open; can be extended using getStats
    const anyClosed = Array.from(this.channels.values()).some((c) => c.readyState !== 'open');
    const newMode: FidelityMode = anyClosed ? 'ultra-low' : this.fidelity;
    if (newMode !== this.fidelity) {
      this.fidelity = newMode;
      this.events.onFidelityChange?.(newMode);
    }
  }
}