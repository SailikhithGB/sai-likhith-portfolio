
import React, { useEffect } from "react";
import { FeatureToggles } from "@/components/FeatureToggles";
import { registerServiceWorker } from "@/lib/offline";

export default function Index() {
	useEffect(() => {
		registerServiceWorker();
	}, []);
	return (
		<div style={{ padding: 16 }}>
			<h1>Next-Gen Communication Platform</h1>
			<p>Low-data, privacy-first, adaptive communication.</p>
			<a href="/features">Feature Toggles</a>
			<div style={{ marginTop: 16 }}>
				<FeatureToggles />
			</div>
		</div>
	);
}
