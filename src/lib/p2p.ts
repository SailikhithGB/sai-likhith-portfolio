import { io, Socket } from 'socket.io-client';

export type MeshClient = {
	join: (roomId: string) => void;
	onPresence: (cb: (p: { id: string; joined: boolean }) => void) => void;
	onRelay: (cb: (m: { from: string; payload: unknown }) => void) => void;
	relay: (roomId: string, payload: unknown) => void;
};

export function createMeshClient(serverUrl: string): MeshClient {
	const ns = io(`${serverUrl}/mesh`, { transports: ['websocket'] });
	return {
		join(roomId) {
			ns.emit('join', roomId);
		},
		onPresence(cb) {
			ns.on('presence', cb);
		},
		onRelay(cb) {
			ns.on('relay', cb);
		},
		relay(roomId, payload) {
			ns.emit('relay', { roomId, payload });
		},
	};
}