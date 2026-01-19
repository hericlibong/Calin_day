import React from 'react';

export default function ThreeThresholdsScene({ data }) {
    const { items, beat, beatText } = data;

    // beat is 0, 1, 2, or 3
    // Beat 0: Pre-state. Items visible but inactive/dimmed? Or simply hidden?
    // User says: "pré-état très simple : même fond, même composition, puis le premier texte (12%) et le cercle 12% apparaissent au premier scroll-stop."
    // This implies at beat 0, the circles might be visible but "empty" or "ghostly" or essentially the layout is there but no data yet.
    // Or simpler: Beat 0 = Just title (if any) or silence.
    // Let's make Beat 0 show the placeholders (circles) but very faint, and no beatText.

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex flex-col items-center justify-center px-4 overflow-hidden">

            {/* Beat Text (Editorial Narrative) */}
            <div className={`absolute top-[15%] md:top-[20%] max-w-2xl px-6 text-center z-20 transition-all duration-700 ${beat === 0 ? 'opacity-0' : 'opacity-100'}`}>
                <p
                    key={beat}
                    className="font-serif text-2xl md:text-3xl lg:text-4xl text-brand-dark leading-tight font-medium animate-fade-in-up"
                >
                    {beatText}
                </p>
            </div>

            {/* Circles Container */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 w-full max-w-6xl items-center justify-center mt-32 md:mt-24">
                {items.map((item, idx) => {
                    const itemBeat = idx + 1; // 1, 2, 3
                    const isActive = beat === itemBeat;
                    const isPassed = beat > itemBeat;
                    const isVisible = beat >= itemBeat;

                    // At beat 0, everyone is invisible/faint
                    // User said: "premier texte (12%) et le cercle 12% apparaissent au premier scroll-stop"
                    // So at beat 0, maybe they are NOT visible at all? Or just empty placeholders?
                    // Let's make them opacity-0 at beat 0 for dramatic entry at beat 1.

                    const isShown = beat > 0 && isVisible;

                    // Size and Stylings
                    const sizeClass = 'w-40 h-40 md:w-56 md:h-56';

                    let colorClass = '';
                    if (idx === 0) colorClass = 'border-sky-300 text-sky-900 bg-sky-50';
                    if (idx === 1) colorClass = 'border-sky-500 text-sky-950 bg-sky-50';
                    if (idx === 2) colorClass = 'border-red-500 text-red-700 bg-red-50';

                    return (
                        <div
                            key={idx}
                            className={`flex flex-col items-center transition-all duration-1000 ease-out transform
                            ${isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            ${isPassed ? 'opacity-40 scale-95 grayscale-[30%]' : ''}
                            ${isActive ? 'scale-105 z-10' : ''}`}
                        >
                            {/* Circle Visual */}
                            <div className={`${sizeClass} rounded-full border-4 flex flex-col items-center justify-center relative mb-6 shadow-sm ${colorClass} transition-colors duration-700`}>
                                <span className="block text-4xl md:text-5xl font-bold font-serif mb-1">
                                    {item.val}%
                                </span>
                                <span className="block text-xs uppercase tracking-widest font-medium opacity-80">
                                    {item.fraction}
                                </span>
                            </div>

                            {/* Label & Def */}
                            <div className={`text-center max-w-[200px] transition-opacity duration-500 ${isShown ? 'opacity-100' : 'opacity-0'}`}>
                                <h3 className="text-lg font-bold text-brand-dark mb-1 leading-tight">{item.label}</h3>
                                <p className="text-xs md:text-sm text-brand-ink/70 leading-snug">
                                    {item.def}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
