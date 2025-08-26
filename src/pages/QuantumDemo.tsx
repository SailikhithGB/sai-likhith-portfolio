import { useEffect, useState } from "react";
import { useQuantumChannel } from "@/hooks/useQuantumChannel";

export default function QuantumDemo() {
	const channel = useQuantumChannel();
	const [targetId, setTargetId] = useState("");
	const [log, setLog] = useState<string[]>([]);
	useEffect(() => {
		channel.onSignal((from, data) => {
			setLog((l) => [
				`<- from ${from}: ${JSON.stringify(data)}`,
				...l,
			]);
		});
	}, []);
	return (
		<div style={{ padding: 16 }}>
			<h2>Quantum Channel Demo</h2>
			<p>Your ID: {channel.clientId ?? "..."}</p>
			<label>
				Peer ID:
				<input value={targetId} onChange={(e) => setTargetId(e.target.value)} style={{ marginLeft: 8 }} />
			</label>
			<div style={{ marginTop: 8 }}>
				<button onClick={() => channel.sendSignal(targetId, { t: Date.now(), msg: "hello" })} disabled={!targetId}>
					Send Hello
				</button>
			</div>
			<div style={{ marginTop: 16 }}>
				<label>Fidelity:
					<select value={channel.fidelity} onChange={(e) => channel.setFidelity(e.target.value as any)} style={{ marginLeft: 8 }}>
						<option value="low">low</option>
						<option value="medium">medium</option>
						<option value="high">high</option>
					</select>
				</label>
			</div>
			<pre style={{ marginTop: 16 }}>{log.join("\n")}</pre>
		</div>
	);
}