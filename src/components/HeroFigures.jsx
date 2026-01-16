import React, { useEffect, useState } from 'react';
import SourceBadge from './SourceBadge';

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function for smooth animation
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

export default function HeroFigures({ data }) {
    const { figures, ref_status, ref_label } = data;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
            {/* Background Texture - Subtle noise/grain could be added here via CSS or SVG */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl z-10">
                {figures.map((fig, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                        <div className="text-8xl md:text-9xl font-serif font-black text-brand-accent tabular-nums leading-none mb-2 tracking-tighter">
                            <CountUp end={fig.val} />
                            <span className="text-4xl md:text-5xl font-sans font-light opacity-60 ml-1">{fig.suffix}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-ink uppercase tracking-wider">
                            {fig.label}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-12 opacity-60">
                <SourceBadge status={ref_status} label={ref_label} />
            </div>
        </div>
    );
}
