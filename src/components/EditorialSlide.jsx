import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function EditorialSlide({ data }) {
    const { image, title, body } = data;

    // Helper to process newlines into paragraphs
    const paragraphs = body ? body.split('\n\n') : [];

    return (
        <div className="relative w-full h-full bg-slate-100 overflow-hidden text-brand-ink">
            {/* Background Image with Blur/Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    filter: 'blur(8px) brightness(1.1)',
                    transform: 'scale(1.1)'
                }}
            />
            {/* Overlay for legibility */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12 py-12 overflow-y-auto">
                <div className="max-w-3xl w-full">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-brand-dark leading-tight tracking-tight">
                        {title}
                    </h2>

                    <div className="space-y-6 text-lg md:text-xl leading-relaxed font-serif text-brand-ink/90">
                        {paragraphs.map((para, idx) => (
                            <p key={idx} className={idx === 0 ? "font-medium" : "font-light"}>
                                {para}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Scroll Hint */}
                <div className="mt-12 md:mt-16 flex flex-col items-center gap-2 animate-pulse text-brand-ink/50">
                    <span className="text-xs uppercase tracking-widest font-medium">Faire défiler</span>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
