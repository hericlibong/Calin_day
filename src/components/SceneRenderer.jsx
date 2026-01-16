import React from 'react';
import HeroFigures from './HeroFigures';
import CoverScene from './CoverScene';
import Definitions from './viz/Definitions';
import SimpleBarChart from './viz/SimpleBarChart';
import TypographyScene from './viz/TypographyScene';
import DotPlot from './viz/DotPlot';
import QuotesScene from './viz/QuotesScene';

export default function SceneRenderer({ activeStepIndex, data, scrollProgress }) {
    const step = data[activeStepIndex] || {};
    // Normalized data structure: visual.type, visual.data, visual.options
    // But we need to handle legacy/mixed if any, though we rewrote data.json.
    // The 'step' object here is the full step object.

    const vizType = step.visual?.type || step.vizType;
    const vizData = step.visual?.data || step.data || step;
    const vizOptions = step.visual?.options || {};

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
                {vizType === 'cover' ? (
                    <CoverScene />
                ) : vizType === 'hero_figures' ? (
                    <HeroFigures data={step} />
                ) : vizType === 'definitions' ? (
                    <Definitions data={vizData} />
                ) : vizType === 'barSimple' ? (
                    <SimpleBarChart data={vizData} options={vizOptions} />
                ) : vizType === 'stackNumbers' || vizType === 'bigNumber' ? (
                    <TypographyScene type={vizType} data={vizData} />
                ) : vizType === 'lineOrDot' ? (
                    <DotPlot data={vizData} options={vizOptions} />
                ) : vizType === 'quoteScene' ? (
                    <QuotesScene data={vizData} />
                ) : (
                    <div className="p-8 text-center opacity-50">
                        Visualisation en cours... ({vizType})
                    </div>
                )}
            </div>
        </div>
    );
}
