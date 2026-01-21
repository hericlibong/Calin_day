import React, { useEffect, useState } from 'react';
import HeroFigures from './HeroFigures';
import CoverScene from './CoverScene';
import IntroCoverScene from './IntroCoverScene';
import IntroTextScene from './IntroTextScene';
import IntroImageScene from './IntroImageScene';
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

  const vizType = step.visual?.type || step.vizType;
  const vizData = step.visual?.data || step.data || step;
  const vizOptions = step.visual?.options || {};

  // Parallax effect on the background of the scene
  const bgStyle = {
    transform: `translateY(${scrollProgress * 50}px)`,
  };

  // Fullscreen scenes (no default bg-brand-bg)
  const isFullscreenScene = [
    'intro_cover',
    'intro_text',
    'intro_transition',
    'intro_image',
    's1_editorial',
    's1_transition',
    's1_thresholds'
  ].includes(vizType);

  // Image de référence (s1_interlude_image)
  const interludeStep = data.find((s) => s.id === 's1_interlude_image');
  const interludeImageData = interludeStep?.visual?.data;

  // --- Révélation progressive pendant intro_text (stabilisée) ---
  const [introReveal, setIntroReveal] = useState(0);

  useEffect(() => {
    if (vizType !== 'intro_text') {
      setIntroReveal(0);
      return;
    }

    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const computeReveal = () => {
      const el = document.querySelector(`.step[data-step="${activeStepIndex}"]`);
      if (!el) {
        setIntroReveal(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const movedUp = clamp01((-rect.top) / vh);

      // PARAMETRES INTRO (à conserver)
      const start = 0.35;
      const end = 0.85;

      const t = (movedUp - start) / (end - start);
      setIntroReveal(clamp01(t));
    };

    window.addEventListener('scroll', computeReveal, { passive: true });
    window.addEventListener('resize', computeReveal);
    computeReveal();

    return () => {
      window.removeEventListener('scroll', computeReveal);
      window.removeEventListener('resize', computeReveal);
    };
  }, [vizType, activeStepIndex]);

  // --- IMPORTANT : couper l'image de fond de s1_editorial dès que le step suivant arrive ---
  const [hideEditorialBg, setHideEditorialBg] = useState(false);

  useEffect(() => {
    if (vizType !== 's1_editorial') {
      setHideEditorialBg(false);
      return;
    }

    const computeHide = () => {
      const vh = window.innerHeight || 1;

      // Step courant (s1_editorial)
      const currentEl = document.querySelector(`.step[data-step="${activeStepIndex}"]`);
      // Step suivant (celui qui arrive après s1_editorial)
      const nextEl = document.querySelector(`.step[data-step="${activeStepIndex + 1}"]`);

      if (!currentEl || !nextEl) {
        setHideEditorialBg(false);
        return;
      }

      const nextRect = nextEl.getBoundingClientRect();

      // PARAMETRE A NOTER :
      // Dès que le step suivant approche du "haut" (ici 55% de l'écran),
      // on coupe le fond image pour éviter qu'il "déborde".
      const cutoff = vh * 0.55;

      setHideEditorialBg(nextRect.top <= cutoff);
    };

    window.addEventListener('scroll', computeHide, { passive: true });
    window.addEventListener('resize', computeHide);
    computeHide();

    return () => {
      window.removeEventListener('scroll', computeHide);
      window.removeEventListener('resize', computeHide);
    };
  }, [vizType, activeStepIndex]);

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-700 ${isFullscreenScene ? '' : 'bg-brand-bg'}`}>
      {/* Background Layer (Global Parallax Texture) */}
      {!isFullscreenScene && (
        <div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"
          style={bgStyle}
        />
      )}

      {/* ✅ INTRO_TEXT : fond beige + reveal progressif */}
      {vizType === 'intro_text' && interludeImageData?.src && (
        <>
          <div className="absolute inset-0 z-0 bg-[#fdfbf6]" />
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              opacity: 1,
              clipPath: `inset(${(1 - introReveal) * 100}% 0 0 0)`,
              transition: 'clip-path 0ms linear',
            }}
          >
            <IntroImageScene data={interludeImageData} showCaption={false} />
          </div>
        </>
      )}

      {/* ✅ S1_EDITORIAL : image de fond, MAIS elle s'éteint dès que le step suivant arrive */}
      {vizType === 's1_editorial' && interludeImageData?.src && !hideEditorialBg && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <IntroImageScene data={interludeImageData} showCaption={false} />
        </div>
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
          <div className="w-full h-full" />
        ) : vizType === 'intro_image' ? (
          <IntroImageScene data={vizData} />
        ) : vizType === 's1_editorial' ? (
          <div className="w-full h-full" />
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
