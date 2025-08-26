import React from 'react';
import { useFidelity } from '../context/FidelityContext';

export function FeatureToggles() {
	const { fidelity, setFidelity, autoAdapt, setAutoAdapt, features, toggleFeature } = useFidelity();
	return (
		<div style={{ display: 'grid', gap: 8 }}>
			<div>
				<label>
					Auto adapt
					<input type="checkbox" checked={autoAdapt} onChange={(e) => setAutoAdapt(e.target.checked)} />
				</label>
			</div>
			<div>
				<select value={fidelity} onChange={(e) => setFidelity(e.target.value as any)}>
					<option value="ultra-low">ultra-low</option>
					<option value="low">low</option>
					<option value="medium">medium</option>
					<option value="high">high</option>
				</select>
			</div>
			<div>
				{Object.keys(features).map((k) => (
					<label key={k} style={{ display: 'block' }}>
						{k}
						<input type="checkbox" checked={features[k]} onChange={() => toggleFeature(k)} />
					</label>
				))}
			</div>
		</div>
	);
}