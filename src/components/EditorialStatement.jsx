import React from 'react';

export default function EditorialStatement({ data }) {
    const { mode, sentence, subSentence, transitionLabel } = data;

    // mode: 'contrast' (dark/bold) or 'nuance' (light/reflective)

    const isContrast = mode === 'contrast';

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center px-6 transition-colors duration-700
            ${isContrast ? 'bg-slate-900 text-white' : 'bg-[#fdfbf6] text-brand-ink'}`}>

            <div className="max-w-4xl text-center z-10">
                <h2 className={`font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8
                    ${isContrast ? 'tracking-tight' : 'italic font-light'}`}>
                    {sentence}
                </h2>

                {subSentence && (
                    <p className={`text-xl md:text-2xl opacity-0 animate-fade-in-up delay-300
                         ${isContrast ? 'text-white/80' : 'text-brand-ink/80'}`}>
                        {subSentence}
                    </p>
                )}
            </div>

            {transitionLabel && (
                <div className="absolute bottom-12 opacity-0 animate-fade-in delay-700 flex flex-col items-center gap-2">
                    <div className="w-[1px] h-12 bg-current opacity-30"></div>
                    <span className="text-xs uppercase tracking-widest font-medium opacity-60">
                        {transitionLabel}
                    </span>
                </div>
            )}
        </div>
    );
}
