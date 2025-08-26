import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { randomUUID } from "uuid";
import nacl from "tweetnacl";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
	cors: { origin: "*" },
});

// In-memory identity registry (replace with decentralized DID later)
const clients = new Map(); // clientId -> { socketId, publicKey }

app.get("/health", (_req, res) => res.json({ ok: true }));

// Simple key agreement stub using NaCl box (Curve25519)
function computeSharedKey(theirPublicKeyUint8, mySecretKeyUint8) {
	const shared = nacl.box.before(theirPublicKeyUint8, mySecretKeyUint8);
	return shared; // 32-byte shared key
}

io.on("connection", (socket) => {
	const clientId = randomUUID();
	socket.emit("welcome", { clientId });

	socket.on("registerPublicKey", ({ publicKeyBase64 }) => {
		try {
			clients.set(clientId, {
				socketId: socket.id,
				publicKey: Buffer.from(publicKeyBase64, "base64"),
			});
			socket.emit("registered", { clientId });
		} catch (_e) {
			socket.emit("error", { message: "invalid public key" });
		}
	});

	socket.on("signal", ({ toClientId, data }) => {
		const target = clients.get(toClientId);
		if (target) io.to(target.socketId).emit("signal", { fromClientId: clientId, data });
	});

	socket.on("disconnect", () => {
		clients.delete(clientId);
	});
});

const PORT = process.env.PORT || 8090;
server.listen(PORT, () => {
	console.log(`signaling listening on :${PORT}`);
});