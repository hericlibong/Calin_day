import React from "react";

export default function IntroImageScene({ data }) {
    const src = data?.src || "/images/silhouettes_01.png";
    const alt = data?.alt || "Transition";
    const caption = data?.caption || "";

    return (
        <div className="relative w-full h-full bg-[#fdfbf6] overflow-hidden">
            {/* Image plein écran */}
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Optionnel : léger voile pour lisibilité */}
            <div className="absolute inset-0 bg-[#fdfbf6]/20" />

            {/* Optionnel : petit texte de transition */}
            {caption && (
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center w-full px-4">
                    <p className="font-serif text-3xl md:text-4xl italic text-brand-dark whitespace-pre-wrap">
                        {caption}
                    </p>
                    <div className="mt-3 opacity-40">⌄</div>
                </div>
            )}
        </div>
    );
}
