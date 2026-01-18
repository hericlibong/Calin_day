import React from 'react';

export default function IntroTextScene({ data }) {
    const { paragraphs, listItems, closing, stepType, avatar, authorName, introTitle } = data;

    // Different layouts based on stepType ("A" or "B")
    // Both share the same container to maintain visual continuity

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-2xl px-6 md:px-0 relative z-10 transition-opacity duration-700 ease-in-out">

                {/* Header Section (Avatar & Title) - Only for Step A */}
                {stepType === 'A' && (
                    <div className="flex flex-col items-center mb-10 animate-fade-in-up">
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-2 border-white">
                            <img
                                src={avatar || "/images/author.png"}
                                alt={authorName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-2">{authorName}</h2>
                        <h3 className="font-serif text-3xl text-brand-dark italic">{introTitle}</h3>
                    </div>
                )}

                {/* Text Content */}
                <div className="space-y-6 text-lg md:text-xl text-brand-ink leading-relaxed font-serif">
                    {paragraphs && paragraphs.map((para, idx) => (
                        <p key={idx} className={`${stepType === 'A' && idx === 0 ? "font-medium text-brand-dark" : "font-light"}`}>
                            {para}
                        </p>
                    ))}

                    {/* List Items - Only for Step B */}
                    {listItems && (
                        <ul className="space-y-4 py-4 pl-4 border-l-2 border-brand-accent/30 my-6">
                            {listItems.map((item, idx) => (
                                <li key={idx} className="text-brand-dark text-xl italic font-medium">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Closing Text - Only for Step B */}
                    {closing && (
                        <p className="font-light text-brand-ink mt-8">
                            {closing}
                        </p>
                    )}
                </div>

                {/* Decorative End Mark - Only for Step B */}
                {stepType === 'B' && (
                    <div className="flex justify-center mt-12 opacity-30">
                        <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-dark mx-1"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
