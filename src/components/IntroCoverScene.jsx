import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function IntroCoverScene({ data }) {
    // data.phase controls what we show
    // 0: Cover only
    // 1: Title appears
    // 2: Subtitle + Scroll Hint appears
    // isTransition: triggers the transition out effect

    const { phase, title, subtitle, isTransition } = data;
    const [transitionActive, setTransitionActive] = useState(false);

    useEffect(() => {
        if (isTransition) {
            // Trigger transition animation on mount of this step
            setTransitionActive(true);
        } else {
            setTransitionActive(false);
        }
    }, [isTransition]);

    const handleScrollClick = () => {
        // Scroll to the next full viewport height relative to current position
        const nextScroll = window.scrollY + window.innerHeight;
        window.scrollTo({ top: nextScroll, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full h-full bg-slate-900 overflow-hidden">
            {/* Background Image */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] ease-in-out
                ${transitionActive ? 'scale-110 blur-xl opacity-0' : 'scale-100 opacity-100'}`}
                style={{
                    backgroundImage: 'url(/images/cover_winter.png)',
                    transform: phase >= 1 && !transitionActive ? 'scale(1.05)' : 'scale(1)',
                    filter: transitionActive ? 'brightness(2)' : 'brightness(0.9)'
                }}
            />

            {/* Gradient Overlay for Readability */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60 transition-opacity duration-1000 
            ${phase >= 1 && !transitionActive ? 'opacity-100' : 'opacity-0'}`} />

            {/* White Fade Out Overlay (Transition Scene) */}
            <div className={`absolute inset-0 bg-[#fdfbf6] pointer-events-none transition-opacity duration-[1000ms] ease-in-out
            ${transitionActive ? 'opacity-100' : 'opacity-0'}`} />

            {/* Content Container */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 transition-all duration-700 
            ${(phase === 3 || transitionActive) ? '-translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>

                {/* Title */}
                <h1
                    className={`font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight transform transition-all duration-1000 ease-out drop-shadow-lg
                    ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {title || "Le Temps des Solitudes"}
                </h1>

                {/* Separator / Decoration */}
                <div
                    className={`w-24 h-1 bg-white/50 rounded-full mt-8 mb-8 transition-all duration-1000 delay-300 drop-shadow-sm
                    ${phase >= 2 ? 'opacity-100 w-24' : 'opacity-0 w-0'}`}
                />

                {/* Subtitle */}
                <p
                    className={`text-lg md:text-2xl text-white/95 font-light max-w-2xl leading-relaxed transition-all duration-1000 delay-500 drop-shadow-md
                    ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    {subtitle}
                </p>

            </div>

            {/* Scroll Hint / Button */}
            <button
                onClick={handleScrollClick}
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white flex flex-col items-center gap-2 transition-all duration-500 cursor-pointer z-50 group
                ${phase >= 2 && !transitionActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                aria-label="Commencer l'histoire"
            >
                <span className="text-xs uppercase tracking-widest font-medium group-hover:tracking-[0.2em] transition-all duration-300 drop-shadow-md">Découvrir</span>
                <ChevronDown className="animate-bounce w-6 h-6 group-hover:scale-125 transition-transform drop-shadow-md" />
            </button>
        </div>
    );
}
