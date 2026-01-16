import React from 'react';
import SourceBadge from './SourceBadge';

export default function StepsColumn({ steps }) {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto pointer-events-none">
            <div className="pb-[40vh]" /> {/* Top Spacer */}

            {steps.map((step, index) => (
                <div
                    key={step.id}
                    data-step={index}
                    className="step min-h-[80vh] flex flex-col justify-center p-6 transition-opacity duration-500 pointer-events-auto"
                >
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100">
                        <h3 className="not-sr-only text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Étape {index + 1}
                        </h3>
                        <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-4">
                            {step.text}
                        </p>

                        {step.ref_status && (
                            <div className="mt-2">
                                <SourceBadge status={step.ref_status} label={step.ref_label} />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div className="pb-[40vh]" /> {/* Bottom Spacer */}
        </div>
    );
}
