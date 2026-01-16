import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import HeroFigures from './HeroFigures';

const VizPlaceholder = ({ type, data, stepId }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className={`text-6xl mb-4 transition-transform duration-700 ${type === 'hero_figures' ? 'scale-110' : 'scale-100'}`}>
            {type === 'hero_figures' && '🫂'}
            {type === 'bubbles' && '🫧'}
            {type === 'chart_age' && '📊'}
            {type === 'portrait' && '👤'}
            {type === 'network_void' && '🕸️'}
            {type === 'bar_poverty' && '📉'}
            {type === 'conclusion' && '❤️'}
            {type === 'credits' && '📝'}
        </div>
        <h2 className="text-2xl font-serif font-bold text-brand-ink mb-2 capitalize">
            {type && type.replace('_', ' ')}
        </h2>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Visualisation pour l'étape {stepId}
        </p>
    </div>
);

// Example to show D3 integration capability
const D3Bubbles = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous

        const width = 400;
        const height = 400;

        // Dummy simulation
        const nodes = Array.from({ length: 20 }, (_, i) => ({ id: i, r: Math.random() * 20 + 10 }));

        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(5))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(d => d.r + 2));

        const circles = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", d => d.r)
            .attr("fill", "#d90429")
            .attr("opacity", 0.7);

        simulation.on("tick", () => {
            circles
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return () => simulation.stop();
    }, []);

    return <svg ref={svgRef} viewBox="0 0 400 400" className="w-full h-full max-w-md mx-auto" />;
};

export default function SceneRenderer({ activeStepIndex, data, scrollProgress }) {
    const step = data[activeStepIndex] || {};
    const { vizType, id } = step;

    // Parallax effect on the background of the scene
    const bgStyle = {
        transform: `translateY(${scrollProgress * 50}px)`,
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-brand-bg transition-colors duration-700">
            {/* Background Layer (Global Parallax Texture) */}
            <div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"
                style={bgStyle}
            />

            {/* Foreground Layer (Viz) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out">
                {vizType === 'hero_figures' ? (
                    <HeroFigures data={step} />
                ) : vizType === 'bubbles' ? (
                    <D3Bubbles data={step} />
                ) : (
                    <VizPlaceholder type={vizType} data={step} stepId={id} />
                )}
            </div>
        </div>
    );
}
