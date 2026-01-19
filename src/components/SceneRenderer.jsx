import React from 'react';
import HeroFigures from './HeroFigures';
import CoverScene from './CoverScene';
import IntroCoverScene from './IntroCoverScene';
import IntroTextScene from './IntroTextScene';
import EditorialStatement from './EditorialStatement';
import EditorialSlide from './EditorialSlide';
import S1TransitionScene from './S1TransitionScene';
import ThreeThresholdsScene from './ThreeThresholdsScene';
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

    // Determine background: specialized scenes handle their own background
    const isFullscreenScene = ['intro_cover', 'intro_text', 'intro_transition', 's1_editorial', 's1_transition', 's1_thresholds'].includes(vizType);

    return (
        <div className={`relative w-full h-full overflow-hidden transition-colors duration-700 ${isFullscreenScene ? '' : 'bg-brand-bg'}`}>
            {/* Background Layer (Global Parallax Texture) */}
            {!isFullscreenScene && (
                <div
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"
                    style={bgStyle}
                />
            )}

            {/* Foreground Layer (Viz) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out">
                {vizType === 'cover' ? (
                    <CoverScene />
                ) : vizType === 'intro_cover' ? (
                    <IntroCoverScene data={vizData} />
                ) : vizType === 'intro_transition' ? (
                    <IntroCoverScene data={{ ...vizData, isTransition: true }} />
                ) : vizType === 'intro_text' ? (
                    <IntroTextScene data={vizData} />
                ) : vizType === 's1_editorial' ? (
                    <S1TransitionScene data={{ ...vizData, mode: 'static' }} />
                ) : vizType === 's1_transition' ? (
                    <S1TransitionScene data={vizData} scrollProgress={scrollProgress} />
                ) : vizType === 's1_thresholds' ? (
                    <ThreeThresholdsScene data={vizData} />
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
