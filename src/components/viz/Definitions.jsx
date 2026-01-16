import React from 'react';

export default function Definitions({ data }) {
    const { left, right } = data;

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 gap-8 md:gap-16">

            {/* ISOLEMENT */}
            <div className="flex-1 flex flex-col items-center text-center max-w-sm">
                <div className="text-4xl mb-4 text-brand-accent">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-ink mb-2 uppercase tracking-wide">
                    {left.term}
                </h3>
                <p className="text-brand-ink/70 leading-relaxed">
                    {left.def}
                </p>
            </div>

            {/* SEPARATOR */}
            <div className="w-24 h-px bg-brand-ink/20 md:w-px md:h-24"></div>

            {/* SOLITUDE */}
            <div className="flex-1 flex flex-col items-center text-center max-w-sm">
                <div className="text-4xl mb-4 text-brand-ink/40">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-ink mb-2 uppercase tracking-wide">
                    {right.term}
                </h3>
                <p className="text-brand-ink/70 leading-relaxed">
                    {right.def}
                </p>
            </div>

        </div>
    );
}
