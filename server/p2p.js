export function createP2P(io) {
	io.of('/mesh').on('connection', (socket) => {
		socket.on('join', (roomId) => {
			socket.join(roomId);
			io.of('/mesh').to(roomId).emit('presence', { id: socket.id, joined: true });
		});
		socket.on('relay', ({ roomId, payload }) => {
			// Low-data-first: small payloads only; in production, chunk or use data channels
			io.of('/mesh').to(roomId).emit('relay', { from: socket.id, payload });
		});
	});
}