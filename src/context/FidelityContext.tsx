import React, { createContext, useContext, useMemo, useState } from 'react';

type Fidelity = 'ultra-low' | 'low' | 'medium' | 'high';

type FidelityState = {
	fidelity: Fidelity;
	setFidelity: (f: Fidelity) => void;
	autoAdapt: boolean;
	setAutoAdapt: (v: boolean) => void;
	features: Record<string, boolean>;
	toggleFeature: (k: string) => void;
};

const FidelityCtx = createContext<FidelityState | null>(null);

export function FidelityProvider({ children }: { children: React.ReactNode }) {
	const [fidelity, setFidelity] = useState<Fidelity>('low');
	const [autoAdapt, setAutoAdapt] = useState<boolean>(true);
	const [features, setFeatures] = useState<Record<string, boolean>>({
		qkd: true,
		aiCompression: true,
		translation: true,
		emotion: true,
		p2pMesh: true,
		holographic: false,
		immersive: false,
	});

	function toggleFeature(k: string) {
		setFeatures((prev) => ({ ...prev, [k]: !prev[k] }));
	}

	const value = useMemo(() => ({ fidelity, setFidelity, autoAdapt, setAutoAdapt, features, toggleFeature }), [fidelity, autoAdapt, features]);
	return <FidelityCtx.Provider value={value}>{children}</FidelityCtx.Provider>;
}

export function useFidelity() {
	const ctx = useContext(FidelityCtx);
	if (!ctx) throw new Error('useFidelity must be used within FidelityProvider');
	return ctx;
}