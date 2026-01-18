import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function IntroCoverScene({ data }) {
    // data.phase controls what we show
    // 0: Cover only
    // 1: Title appears
    // 2: Subtitle + Scroll Hint appears

    const { phase, title, subtitle } = data;

    const handleScrollClick = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full h-full bg-slate-900 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-in-out"
                style={{
                    backgroundImage: 'url(/images/cover_winter.png)',
                    transform: phase >= 1 ? 'scale(1.05)' : 'scale(1)',
                    filter: 'brightness(0.9)'
                }}
            />

            {/* Gradient Overlay for Readability */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60 transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} />

            {/* Content Container */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 transition-transform duration-1000 ${phase === 3 ? '-translate-y-20 opacity-0' : 'translate-y-0'}`}>

                {/* Title */}
                <h1
                    className={`font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight transform transition-all duration-1000 ease-out drop-shadow-md
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
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white flex flex-col items-center gap-2 transition-all duration-1000 delay-700 cursor-pointer z-50 group
                ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                aria-label="Commencer l'histoire"
            >
                <span className="text-xs uppercase tracking-widest font-medium group-hover:tracking-[0.2em] transition-all duration-300">Découvrir</span>
                <ChevronDown className="animate-bounce w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>
        </div>
    );
}
