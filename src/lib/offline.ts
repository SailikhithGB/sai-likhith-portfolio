export type OfflineMessage = {
	id: string;
	cipherText: string;
	ts: number;
};

const DB_NAME = 'nextgen-comm';
const STORE_MESSAGES = 'messages';

export async function openDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
				db.createObjectStore(STORE_MESSAGES, { keyPath: 'id' });
			}
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}

export async function saveOfflineMessage(message: OfflineMessage) {
	const db = await openDb();
	return new Promise<void>((resolve, reject) => {
		const tx = db.transaction(STORE_MESSAGES, 'readwrite');
		tx.objectStore(STORE_MESSAGES).put(message);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

export async function loadOfflineMessages(): Promise<OfflineMessage[]> {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_MESSAGES, 'readonly');
		const req = tx.objectStore(STORE_MESSAGES).getAll();
		req.onsuccess = () => resolve(req.result as OfflineMessage[]);
		req.onerror = () => reject(req.error);
	});
}

export function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').catch(() => {});
	}
}