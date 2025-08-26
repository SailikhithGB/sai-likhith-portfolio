export type KeyPair = {
	publicKeyBase64: string;
	secretKeyBase64: string;
};

export function generateKeyPair(): KeyPair {
	const keyPair = crypto.getRandomValues(new Uint8Array(64));
	// Placeholder: replace with WebCrypto/X25519. Keep types stable.
	const pub = keyPair.slice(0, 32);
	const sec = keyPair.slice(32);
	return {
		publicKeyBase64: btoa(String.fromCharCode(...pub)),
		secretKeyBase64: btoa(String.fromCharCode(...sec)),
	};
}

export function deriveSharedSecret(_theirPublicKeyBase64: string, _mySecretKeyBase64: string): Uint8Array {
	// TODO: replace with proper X25519 using WebCrypto or wasm
	return crypto.getRandomValues(new Uint8Array(32));
}