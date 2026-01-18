import React from 'react';
import SourceBadge from './SourceBadge';

export default function StepsColumn({ steps }) {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto pointer-events-none">
            <div className="pb-[40vh]" /> {/* Top Spacer */}

            {steps.map((step, index) => {
                const isFullscreen = step.layout === 'fullscreen';
                return (
                    <div
                        key={step.id}
                        data-step={index}
                        className={`step flex flex-col justify-center p-6 transition-opacity duration-500 
                        ${isFullscreen ? 'min-h-screen pointer-events-none' : 'min-h-[80vh] pointer-events-auto'}`}
                    >
                        {!isFullscreen ? (
                            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-slate-100">
                                {step.title && step.title !== "Ouverture" && (
                                    <h3 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
                                        {step.title}
                                    </h3>
                                )}
                                <p className="text-lg md:text-xl font-medium text-brand-ink leading-relaxed mb-6">
                                    {step.body || step.text}
                                </p>

                                {(step.integrity || step.ref_status) && step.id !== 'cover' && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <SourceBadge
                                            integrity={step.integrity}
                                            status={step.ref_status} // fallback
                                            label={step.ref ? step.ref.label : step.ref_label}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Invisible trigger for fullscreen steps */
                            <div className="w-full h-full" />
                        )}
                    </div>
                );
            })}

            <div className="pb-[40vh]" /> {/* Bottom Spacer */}
        </div>
    );
}
