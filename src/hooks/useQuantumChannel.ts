import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { generateKeyPair } from "@/lib/quantum";

export type QuantumChannel = {
	clientId?: string;
	sendSignal: (toClientId: string, data: any) => void;
	onSignal: (handler: (fromClientId: string, data: any) => void) => void;
	fidelity: "low" | "medium" | "high";
	setFidelity: (f: "low" | "medium" | "high") => void;
};

export function useQuantumChannel(): QuantumChannel {
	const socketRef = useRef<Socket | null>(null);
	const [clientId, setClientId] = useState<string | undefined>();
	const [fidelity, setFidelity] = useState<"low" | "medium" | "high">("low");

	useEffect(() => {
		const socket = io("/", { path: "/socket.io" });
		socketRef.current = socket;
		const keyPair = generateKeyPair();

		socket.on("connect", () => {
			// noop
		});
		socket.on("welcome", ({ clientId: id }) => {
			setClientId(id);
			socket.emit("registerPublicKey", { publicKeyBase64: keyPair.publicKeyBase64 });
		});
		return () => {
			socket.disconnect();
			socketRef.current = null;
		};
	}, []);

	const listeners = useRef<((from: string, data: any) => void)[]>([]);
	useEffect(() => {
		const s = socketRef.current;
		if (!s) return;
		const handler = ({ fromClientId, data }: any) => {
			listeners.current.forEach((h) => h(fromClientId, data));
		};
		s.on("signal", handler);
		return () => {
			s.off("signal", handler);
		};
	}, [socketRef.current]);

	const api = useMemo<QuantumChannel>(() => ({
		clientId,
		sendSignal: (toClientId: string, data: any) => {
			const s = socketRef.current;
			if (!s) return;
			s.emit("signal", { toClientId, data });
		},
		onSignal: (handler) => {
			listeners.current.push(handler);
		},
		fidelity,
		setFidelity,
	}), [clientId, fidelity]);

	return api;
}