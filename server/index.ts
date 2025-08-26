import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Placeholder: crypto middleware hook (e.g., simulated QKD handshake payload validation)
app.use((req, _res, next) => {
	(req as any).qkdContext = { sessionId: req.headers["x-session-id"] || null };
	next();
});

app.get("/health", (_req, res) => {
	res.json({ ok: true });
});

const server = http.createServer(app);

// WebSocket signaling server for WebRTC/mesh
const wss = new WebSocketServer({ server, path: "/signal" });

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		// Echo style signaling relay with room concept in message payload
		try {
			const data = JSON.parse(message.toString());
			const payload = JSON.stringify({ type: data.type, from: data.from, to: data.to, data: data.data });
			wss.clients.forEach((client: any) => {
				if (client !== ws && client.readyState === 1) {
					client.send(payload);
				}
			});
		} catch {
			// ignore
		}
	});
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});