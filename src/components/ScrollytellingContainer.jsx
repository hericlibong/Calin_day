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

    return (
        <div className="relative w-full">
            {/* Sticky Viz Panel - Background/Right */}
            <div className="sticky top-0 h-screen w-full lg:w-1/2 lg:float-right -z-0 lg:z-0">
                <SceneRenderer
                    activeStepIndex={activeStepIndex}
                    data={storyData.steps}
                    scrollProgress={scrollProgress}
                />
            </div>

            {/* Narrative Column - Left/Overlay */}
            <div className="relative w-full lg:w-1/2 z-10">
                <StepsColumn steps={storyData.steps} />
            </div>
        </div>
    );
}
