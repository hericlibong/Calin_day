import React from 'react';
import SourceBadge from './SourceBadge';

export default function StepsColumn({ steps }) {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto pointer-events-none">
            <div className="pb-[40vh]" /> {/* Top Spacer */}

            {steps.map((step, index) => {
                const isFullscreen = step.layout === 'fullscreen';
                const isIntroTextA = step.visual?.type === 'intro_text' && step.visual?.data?.stepType === 'A';
                const isTransition = step.id === 's1_transition';
                const isS1Editorial = step.visual?.type === 's1_editorial';

                return (
                    <div
                        key={step.id}
                        data-step={index}
                        className={`step flex flex-col justify-center p-6 transition-opacity duration-500 
                        ${(isFullscreen && !isIntroTextA && !isTransition && !isS1Editorial) ? 'min-h-screen pointer-events-none' : 'min-h-[80vh] pointer-events-auto'}
                        ${isTransition ? 'min-h-[120vh]' : ''}
                        ${isS1Editorial ? 'min-h-screen z-20 relative' : ''}`}
                    >
                        {/* Standard Card Layout */}
                        {!isFullscreen && (
                            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-slate-100">
                                {step.title && step.title !== "Ouverture" && (
                                    <h3 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">{step.title}</h3>
                                )}
                                <p className="text-lg md:text-xl font-medium text-brand-ink leading-relaxed mb-6">
                                    {step.body || step.text}
                                </p>
                                {(step.integrity || step.ref_status) && step.id !== 'cover' && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <SourceBadge integrity={step.integrity} status={step.ref_status} label={step.ref ? step.ref.label : step.ref_label} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Intro Text A (Author) */}
                        {isIntroTextA && (
                            <div className="w-[90vw] max-w-2xl -ml-[calc(45vw-50%)] md:-ml-[calc(32rem-50%)] relative z-10 my-24 md:my-32 text-center">
                                {/* Breakout layout logic approx */}
                                <div className="flex flex-col items-center mb-10">
                                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-2 border-white">
                                        <img src={step.visual.data.avatar || "/images/author.png"} alt={step.visual.data.authorName} className="w-full h-full object-cover" />
                                    </div>
                                    <h2 className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-2">{step.visual.data.authorName}</h2>
                                    <h3 className="font-serif text-3xl text-brand-dark italic">{step.visual.data.introTitle}</h3>
                                </div>
                                <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif text-center">
                                    {step.visual.data.paragraphs && step.visual.data.paragraphs.map((para, idx) => (
                                        <p key={idx} className={idx === 0 ? "font-medium text-brand-dark" : "font-light"}>{para}</p>
                                    ))}
                                    {step.visual.data.listItems && (
                                        <ul className="list-disc list-inside mt-4 text-left max-w-md mx-auto">
                                            {step.visual.data.listItems.map((item, idx) => (
                                                <li key={idx} className="font-light">{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {step.visual.data.closing && (
                                        <p className="font-medium text-brand-dark mt-4">{step.visual.data.closing}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Transition Text */}
                        {isTransition && (
                            <div className="w-[90vw] max-w-xl -ml-[calc(45vw-50%)] md:-ml-[calc(28rem-50%)] relative z-10 flex flex-col items-center justify-center text-center">
                                {step.body && step.body.split('\n').map((line, i) => (
                                    <p key={i} className="font-serif text-2xl md:text-3xl text-brand-dark italic mb-4 leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* S1 Editorial - Solid Scroll Cover */}
                        {isS1Editorial && (
                            <div className="w-screen ml-[calc(-50vw+50%)] min-h-screen flex flex-col items-center justify-center bg-[#fdfbf6] shadow-xl relative z-20">
                                <div className="max-w-2xl px-6 w-full">
                                    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-brand-dark leading-tight tracking-tight text-center">
                                        {step.visual.data.title}
                                    </h2>
                                    <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                                        {step.visual.data.body && step.visual.data.body.split('\n\n').map((para, idx) => (
                                            <p key={idx} className={idx === 0 ? "font-medium text-brand-dark" : "font-light"}>
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Invisible trigger for OTHER fullscreen steps */}
                        {(isFullscreen && !isIntroTextA && !isTransition && !isS1Editorial) && (
                            <div className="w-full h-full" />
                        )}
                    </div>
                );
            })}

            <div className="pb-[40vh]" /> {/* Bottom Spacer */}
        </div>
    );
}
