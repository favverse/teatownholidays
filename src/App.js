import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import StorySection from './components/StorySection/StorySection';
import ExperienceGrid from './components/ExperienceGrid/ExperienceGrid';
import Highlights from './components/Highlights/Highlights';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import FinalCTA from './components/FinalCTA/FinalCTA';
import AmbientEffects from './components/AmbientEffects/AmbientEffects';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/CustomCursor/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <div className="grain-texture" aria-hidden="true" />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative"
        >
          <AmbientEffects />
          <Navbar />
          <main>
            <Hero />
            <StorySection />
            <ExperienceGrid />
            <Highlights />
            <Pricing />
            <Contact />
            <FinalCTA />
          </main>
          <footer className="relative z-10 py-8 text-center border-t border-white/5">
            <p className="font-manrope text-xs text-white/30 tracking-widest uppercase">
              © 2024 Tea Town Holidays · Meppadi, Wayanad, Kerala
            </p>
          </footer>
        </motion.div>
      )}
    </>
  );
}

export default App;
