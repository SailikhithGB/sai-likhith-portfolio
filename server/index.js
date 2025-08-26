import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { createQKDMiddleware } from './qkd.js';
import { didRouter } from './did.js';
import { createAIModules } from './ai/index.js';
import { createP2P } from './p2p.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health + basic info
app.get('/health', (_req, res) => {
	res.json({ status: 'ok', ts: Date.now() });
});

// Placeholder DID endpoints
app.use('/did', didRouter);

// Attach AI modules (compression, translation, emotion) as service endpoints
const ai = createAIModules();
app.post('/ai/compress', async (req, res) => {
	try {
		const { payload } = req.body || {};
		const result = await ai.compressPayloadLowDataFirst(payload);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: 'compression_failed' });
	}
});
app.post('/ai/translate', async (req, res) => {
	try {
		const { text, sourceLang, targetLang } = req.body || {};
		const result = await ai.translateWithCulturalNuance(text, sourceLang, targetLang);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: 'translation_failed' });
	}
});
app.post('/ai/emotion', async (req, res) => {
	try {
		const { text } = req.body || {};
		const result = await ai.analyzeEmotion(text);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: 'emotion_failed' });
	}
});

const server = http.createServer(app);
const io = new SocketIOServer(server, {
	cors: { origin: '*'}
});

// Quantum key distribution middleware (placeholder enforcing session keys)
io.use(createQKDMiddleware());

// WebRTC signaling + low-data mesh stubs
createP2P(io);

io.on('connection', (socket) => {
	// Minimal signaling namespace
	socket.on('signal:offer', ({ to, offer }) => {
		io.to(to).emit('signal:offer', { from: socket.id, offer });
	});
	socket.on('signal:answer', ({ to, answer }) => {
		io.to(to).emit('signal:answer', { from: socket.id, answer });
	});
	socket.on('signal:candidate', ({ to, candidate }) => {
		io.to(to).emit('signal:candidate', { from: socket.id, candidate });
	});
});

server.listen(PORT, () => {
	console.log(`[server] listening on :${PORT}`);
});