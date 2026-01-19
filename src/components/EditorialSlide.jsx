import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function EditorialSlide({ data }) {
    const { title, body } = data;

    // Helper to process newlines into paragraphs
    const paragraphs = body ? body.split('\n\n') : [];

    // Use strictly the same background as IntroTextScene (#fdfbf6)
    // Use the same max-width container (max-w-2xl)
    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex items-center justify-center overflow-hidden">
            {/* Same container styles as IntroTextScene */}
            <div className="w-full max-w-2xl px-6 md:px-0 relative z-10">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-brand-dark leading-tight tracking-tight text-center">
                    {title}
                </h2>

                <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                    {paragraphs.map((para, idx) => (
                        <p key={idx} className={idx === 0 ? "font-medium text-brand-dark" : "font-light"}>
                            {para}
                        </p>
                    ))}
                </div>

                {/* Scroll Hint */}
                <div className="mt-16 flex flex-col items-center gap-2 text-brand-ink/30 animate-pulse">
                    <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
