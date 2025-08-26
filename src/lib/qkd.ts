export function attachQKD(socket: any) {
	function encryptMessage(payload: unknown) {
		const key = socket?.data?.sessionKey || 'client-key';
		const json = JSON.stringify(payload ?? {});
		const truncated = json.length > 512 ? json.slice(0, 512) : json;
		const xor = [...truncated].map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (key.length + i) % 255)).join('');
		return btoa(xor);
	}
	function decryptMessage(cipherText: string) {
		try {
			const key = socket?.data?.sessionKey || 'client-key';
			const decoded = atob(cipherText);
			const unxor = [...decoded].map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (key.length + i) % 255)).join('');
			return JSON.parse(unxor);
		} catch {
			return null;
		}
	}
	return { encryptMessage, decryptMessage };
}