import React, { useEffect, useState } from 'react';

export default function QuotesScene({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % data.length);
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {data.map((quote, idx) => (
                <div
                    key={idx}
                    className={`absolute flex flex-col items-center text-center max-w-2xl transition-all duration-1000 ease-in-out transform ${idx === activeIndex
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                        }`}
                >
                    <div className="text-6xl text-brand-accent mb-6 opacity-20 font-serif">“</div>
                    <p className="text-2xl md:text-4xl font-serif text-brand-ink leading-relaxed italic mb-8">
                        {quote.text}
                    </p>
                    <div className="w-16 h-px bg-brand-accent mb-6"></div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-ink/60">
                        {quote.author}
                    </p>
                </div>
            ))}
        </div>
    );
}
