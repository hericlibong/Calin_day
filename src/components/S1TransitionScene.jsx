import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function S1TransitionScene({ data, scrollProgress = 0 }) {
    const { image } = data;

    // Use scrollProgress ONLY for subtle animation of the BACKGROUND IMAGE.
    // The text is now strictly in the foreground (StepsColumn), handled by native scrolling.

    // Slight zoom effect to give life to the "sticky" moment
    const scale = 1 + (scrollProgress * 0.05);

    // Opacity: Fade in initially, stay visible mainly.
    // As it is sticky, we want it to be there. 
    // The previous scene (Intro Text B) triggers this.
    // The next scene (S1 Editorial) will handle its own entry.
    // Let's just keep it simple: fully visible with zoom.

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex flex-col items-center justify-center overflow-hidden">

            {/* Sticky Background Image */}
            <div
                className="relative w-full h-full flex items-center justify-center p-8 md:p-0"
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 100ms linear',
                    willChange: 'transform'
                }}
            >
                <div className="relative w-full max-w-xl aspect-square md:aspect-[4/3]">
                    <img
                        src={image}
                        alt="Transition"
                        className="w-full h-full object-contain mix-blend-multiply opacity-90"
                    />
                </div>
            </div>

            {/* Scroll Hint (Fixed at bottom of this frame) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 animate-pulse">
                <ChevronDown className="w-5 h-5" />
            </div>
        </div>
    );
}
