import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function S1TransitionScene({ data }) {
    const { image, text } = data;

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex flex-col items-center justify-center overflow-hidden">

            {/* Image Container */}
            <div className="relative w-full max-w-lg aspect-square md:aspect-[4/3] mb-8 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
                <img
                    src={image}
                    alt="Transition"
                    className="w-full h-full object-contain mix-blend-multiply opacity-90"
                />
            </div>

            {/* Optional Text */}
            {text && (
                <p className="font-serif text-xl md:text-2xl text-brand-dark italic mb-8 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '600ms' }}>
                    {text}
                </p>
            )}

            {/* Scroll Hint */}
            <div className="flex flex-col items-center gap-2 text-brand-ink/30 animate-pulse delay-1000">
                <ChevronDown className="w-5 h-5" />
            </div>
        </div>
    );
}
