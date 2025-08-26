import { SERVER_WS_URL } from "../config";

export type SignalMessage = {
  type: string;
  from?: string;
  to?: string;
  data?: any;
};

type Listener = (msg: SignalMessage) => void;

export class SignalClient {
  private socket?: WebSocket;
  private listeners: Set<Listener> = new Set();
  private url: string;

  constructor(url: string = SERVER_WS_URL) {
    this.url = url;
  }

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) return;
    this.socket = new WebSocket(this.url);
    this.socket.onmessage = (ev) => {
      try {
        const msg: SignalMessage = JSON.parse(ev.data);
        this.listeners.forEach((l) => l(msg));
      } catch {}
    };
  }

  on(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  send(message: SignalMessage) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connect();
      setTimeout(() => this.send(message), 100);
      return;
    }
    this.socket.send(JSON.stringify(message));
  }
}