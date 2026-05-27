import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const counterRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.to(counterRef.current, {
      textContent: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      snap: { textContent: 1 },
      onUpdate: function () {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(this.targets()[0].textContent) + '%';
        }
      },
    });

    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 2.4,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <motion.div
      className="loading-screen flex-col gap-8"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Mist background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1A2A1D 0%, #101010 70%)',
        }}
      />

      {/* Fog layers */}
      <div
        className="absolute inset-0 fog-layer"
        style={{
          background:
            'radial-gradient(ellipse 120% 40% at 50% 60%, rgba(66,91,70,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Script title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <p
            className="font-script text-5xl"
            style={{ color: '#F1E7D8', opacity: 0.6, letterSpacing: '0.02em' }}
          >
            Tea Town Holidays
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-bodoni text-lg text-white/40 uppercase tracking-[0.3em]"
        >
          Meppadi · Wayanad
        </motion.h1>

        {/* Progress line */}
        <div className="relative w-64">
          <div className="h-px bg-white/10 w-full" />
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-px bg-white/50 w-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Counter */}
        <p
          ref={counterRef}
          className="font-manrope text-xs text-white/30 tracking-widest"
        >
          0%
        </p>
      </div>

      {/* Mountain silhouette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(26,42,29,0.3) 0%, transparent 100%)',
          clipPath: 'polygon(0 100%, 8% 60%, 18% 75%, 28% 40%, 40% 65%, 52% 30%, 65% 55%, 78% 35%, 90% 60%, 100% 45%, 100% 100%)',
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
