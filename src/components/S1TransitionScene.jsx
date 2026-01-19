import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function S1TransitionScene({ data, scrollProgress = 0 }) {
    const { image, text } = data;

    // Opacity interpolation logic
    // We want the image to fade in, stay visible, then fade out.
    // Range 0.0 - 0.2: Fade In
    // Range 0.2 - 0.8: Visible
    // Range 0.8 - 1.0: Fade Out

    let opacity = 0;
    if (scrollProgress < 0.2) {
        opacity = scrollProgress / 0.2; // 0 to 1
    } else if (scrollProgress < 0.8) {
        opacity = 1;
    } else {
        opacity = 1 - ((scrollProgress - 0.8) / 0.2); // 1 to 0
    }

    // Subtle scale effect (zoom in slightly)
    // 1.0 -> 1.05 over the full scroll
    const scale = 1 + (scrollProgress * 0.05);

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex flex-col items-center justify-center overflow-hidden">

            {/* Sticky/Fixed container for the transition elements */}
            <div
                className="relative w-full h-full flex flex-col items-center justify-center"
                style={{
                    opacity: opacity,
                    transform: `scale(${scale})`,
                    transition: 'opacity 100ms linear, transform 100ms linear', // Smooth out micro-steps
                    willChange: 'opacity, transform'
                }}
            >
                {/* Image Container */}
                <div className="relative w-full max-w-lg aspect-square md:aspect-[4/3] mb-8">
                    <img
                        src={image}
                        alt="Transition"
                        className="w-full h-full object-contain mix-blend-multiply opacity-90"
                    />
                </div>

                {/* Text */}
                {text && (
                    <p className="font-serif text-xl md:text-2xl text-brand-dark italic mb-8 text-center px-4">
                        {text}
                    </p>
                )}
            </div>

            {/* Scroll Hint (Always visible or fades too? Let's keep it subtle independent or same fade) */}
            <div
                className="absolute bottom-12 flex flex-col items-center gap-2 text-brand-ink/30 animate-pulse"
                style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }} // Fade out quickly as we scroll down
            >
                <ChevronDown className="w-5 h-5" />
            </div>
        </div>
    );
}
