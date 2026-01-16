import React, { useEffect, useState } from 'react';

// Reusing CountUp logic for consistency
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count}</>;
};

export default function TypographyScene({ type, data }) {
    // Scene 4: stackNumbers (Seasons)
    if (type === 'stackNumbers') {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 gap-12">
                {data.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: `${idx * 200}ms` }}>
                        <div className="text-7xl md:text-8xl font-serif font-black text-brand-accent tabular-nums leading-none">
                            <CountUp end={item.value} />
                            <span className="text-4xl opacity-50 ml-2">{item.suffix}</span>
                        </div>
                        <p className="text-xl font-bold text-brand-ink mt-2 max-w-xs uppercase tracking-wide">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    // Scene 8: bigNumber (Non-recours)
    if (type === 'bigNumber') {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-[10rem] md:text-[12rem] font-serif font-black text-brand-ink leading-none mb-6">
                    <CountUp end={data.value} />
                    <span className="text-6xl opacity-40">{data.suffix}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-sans font-light text-brand-ink mb-8 max-w-md">
                    {data.label}
                </h3>

                {data.cta && (
                    <button className="px-8 py-3 bg-brand-accent text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-colors transform hover:-translate-y-1">
                        {data.cta}
                    </button>
                )}
            </div>
        );
    }

    return null;
}
