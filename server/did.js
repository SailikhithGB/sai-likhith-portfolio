import { Router } from 'express';

export const didRouter = Router();

// Issue decentralized identity (stub)
didRouter.post('/issue', (req, res) => {
	const { userId } = req.body || {};
	const did = `did:example:${(userId || 'anon')}-${Date.now()}`;
	const vc = { id: `vc:${did}`, subject: did, issuedAt: Date.now() };
	res.json({ did, vc });
});

// Resolve DID (stub)
didRouter.get('/resolve/:did', (req, res) => {
	const { did } = req.params;
	res.json({ did, doc: { id: did, publicKey: 'stub-public-key' } });
});