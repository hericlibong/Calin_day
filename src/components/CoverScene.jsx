import React from 'react';

export default function CoverScene() {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
            {/* Background Ambience (Minimal Winter) */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg to-white opacity-80 pointer-events-none" />

            <div className="relative z-10 max-w-2xl px-4">
                <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-ink mb-6 tracking-tight leading-tight">
                    Le Temps des Solitudes
                </h1>

                <p className="text-xl md:text-2xl font-sans font-light text-brand-ink/80 mb-12">
                    Le 21 janvier, on célèbre le câlin. <br className="hidden md:block" />
                    Mais pour des millions, le contact manque.
                </p>

                {/* Scroll Cue */}
                <div className="animate-bounce flex flex-col items-center opacity-50 mt-12">
                    <span className="text-xs uppercase tracking-widest mb-2 font-sans">Faites défiler</span>
                    <svg
                        className="w-6 h-6 text-brand-ink"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
