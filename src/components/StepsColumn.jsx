import React from 'react';
import SourceBadge from './SourceBadge';

export default function StepsColumn({ steps }) {
    return (
        <div className="relative z-10 w-full pointer-events-none">
            <div className="pb-[40vh]" /> {/* Top Spacer */}

            {steps.map((step, index) => {
                const isFullscreen = step.layout === 'fullscreen';
                const isIntroTextA = step.visual?.type === 'intro_text' && step.visual?.data?.stepType === 'A';
                const isTransition = step.id === 's1_transition';
                const isInterlude = step.id === 's1_interlude_image';
                const isS1Editorial = step.visual?.type === 's1_editorial';

                const isTwin = isIntroTextA || isS1Editorial;

                return (
                    <div
                        key={step.id}
                        data-step={index}
                        data-step-id={step.id}
                        className={[
                            "step flex flex-col justify-center transition-opacity duration-500",
                            isTwin ? "p-0" : "p-6",
                            // Fullscreen triggers (invisibles) : uniquement ceux qui n'ont pas de contenu texte dédié
                            (isFullscreen && !isIntroTextA && !isTransition && !isS1Editorial && !isInterlude)
                                ? "min-h-screen pointer-events-none"
                                : "min-h-[80vh] pointer-events-auto",

                            // ✅ JUMEAUX : IntroTextA doit avoir EXACTEMENT les mêmes dimensions/stacking que S1 editorial
                            isIntroTextA ? "min-h-screen z-20 relative" : "",
                            isS1Editorial ? "min-h-[200vh] z-20 relative" : "",

                            isTransition ? "min-h-[120vh]" : "",
                            isInterlude ? "min-h-[200vh] pointer-events-none" : "", // durée du fond sticky interlude
                        ].join(" ")}
                    >
                        {/* Standard Card Layout (colonne narrative classique) */}
                        {!isFullscreen && (
                            <div className="max-w-md mx-auto w-full">
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
                                                status={step.ref_status}
                                                label={step.ref ? step.ref.label : step.ref_label}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ✅ INTRO TEXT A — JUMEAU de S1 EDITORIAL (mêmes classes de bloc plein écran) */}
                        {isIntroTextA && (
                            <div className="w-full min-h-screen flex items-center justify-center bg-[#fdfbf6] relative z-20">
                                <div className="max-w-2xl px-6 w-full">
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-2 border-white">
                                            <img
                                                src={step.visual.data.avatar || "/images/author.png"}
                                                alt={step.visual.data.authorName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h2 className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-2">
                                            {step.visual.data.authorName}
                                        </h2>

                                        {/* ✅ même gabarit de titre que s1_editorial */}
                                        <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2 text-brand-dark leading-tight tracking-tight text-center">
                                            {step.visual.data.introTitle}
                                        </h3>
                                    </div>

                                    <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                                        {step.visual.data.paragraphs?.map((para, idx) => (
                                            <p key={idx} className={idx === 0 ? "font-medium text-brand-dark" : "font-light"}>
                                                {para}
                                            </p>
                                        ))}

                                        {step.visual.data.listItems && (
                                            <ul className="list-disc list-inside mt-4 max-w-md mx-auto">
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
                            </div>
                        )}

                        {/* Transition Text - centré proprement */}
                        {isTransition && (
                            <div className="w-full min-h-screen flex items-center justify-center">
                                <div className="w-full max-w-2xl px-6 text-center">
                                    {(step.body || "").split('\n').map((line, i) => (
                                        <p key={i} className="font-serif text-2xl md:text-3xl text-brand-dark italic mb-4 leading-relaxed">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* S1 Editorial - plein écran, centré proprement */}
                        {isS1Editorial && (
                            <div className="w-full min-h-screen flex items-center justify-center bg-[#fdfbf6] relative z-20">
                                <div className="max-w-2xl px-6 w-full">
                                    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-brand-dark leading-tight tracking-tight text-center">
                                        {step.visual.data.title}
                                    </h2>
                                    <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                                        {(step.visual.data.body || "").split('\n\n').map((para, idx) => (
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
