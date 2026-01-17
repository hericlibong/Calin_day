import React, { useState, useEffect } from 'react';
import scrollama from 'scrollama';
import StepsColumn from './StepsColumn';
import SceneRenderer from './SceneRenderer';
import { useScrollProgress } from '../hooks/useScrollProgress';

// Import data directly
import storyData from '../data/data.json';

export default function ScrollytellingContainer() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const scrollProgress = useScrollProgress();

    useEffect(() => {
        // Instantiate scrollama
        const scroller = scrollama();

        scroller
            .setup({
                step: '.step',
                offset: 0.5,
                debug: false,
            })
            .onStepEnter((response) => {
                // response = { element, index, direction }
                setActiveStepIndex(response.index);
            });

        return () => {
            scroller.destroy();
        };
    }, []);

    // Check if the current step is a fullscreen layout
    const activeStep = storyData.steps[activeStepIndex] || {};
    const isFullscreen = activeStep.layout === 'fullscreen';

    return (
        <div className="relative w-full">
            {/* Viz Panel - Adapts width based on layout */}
            <div className={`sticky top-0 h-screen transition-all duration-500 ease-in-out ${isFullscreen ? 'w-full z-0' : 'w-full lg:w-1/2 lg:float-right lg:z-0'}`}>
                <SceneRenderer
                    activeStepIndex={activeStepIndex}
                    data={storyData.steps}
                    scrollProgress={scrollProgress}
                />
            </div>

            {/* Narrative Column - Overlay */}
            <div className={`relative w-full transition-all duration-500 ${isFullscreen ? 'z-10 pointer-events-none' : 'lg:w-1/2 z-10'}`}>
                <StepsColumn steps={storyData.steps} />
            </div>
        </div>
    );
}
