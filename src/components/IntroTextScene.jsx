import React from 'react';

export default function IntroTextScene({ data }) {
    const { paragraphs } = data;

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-2xl px-6 md:px-0 py-12 md:py-24 relative z-10">

                {/* Simple graphical avatar/icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                    {paragraphs && paragraphs.map((para, idx) => (
                        <p key={idx} className={idx === 0 ? "font-medium text-brand-dark" : "font-light"}>
                            {para}
                        </p>
                    ))}
                </div>

                {/* Decorative End Mark */}
                <div className="flex justify-center mt-12 opacity-30">
                    <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                </div>
            </div>
        </div>
    );
}
