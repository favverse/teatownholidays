import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import propertyExterior from '../../assets/property-exterior-opt.jpg';

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const sectionRef = useRef(null);
  const imageRef  = useRef(null);
  const textRef   = useRef(null);
  const maskRef   = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY  = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mask reveal
      gsap.fromTo(
        maskRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 70%', once: true },
        }
      );

      // Text lines
      const lines = textRef.current?.querySelectorAll('.story-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.18, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: textRef.current, start: 'top 65%', once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const storyLines = [
    'Tea Town Holidays is a quiet mountain',
    'homestay tucked into the misty hills of',
    'Meppadi, Wayanad.',
  ];

  return (
    <section ref={sectionRef} id="story" className="relative overflow-hidden py-24 md:py-40" style={{ background: '#101010' }}>
      {/* Fog top */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(16,16,16,0.95) 0%, transparent 100%)', zIndex: 10 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-manrope text-[10px] uppercase mb-20 md:mb-28"
          style={{ color: '#A8C5A0', letterSpacing: '0.35em' }}
        >
          Our Story
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image side */}
          <div ref={imageRef} className="relative order-2 md:order-1">
            <motion.div style={{ y: imgY }} className="relative">
              <div className="relative overflow-hidden" style={{ paddingBottom: '130%' }}>
                {/* Real property photo */}
                <img
                  src={propertyExterior}
                  alt="Tea Town Holidays exterior"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'brightness(0.78) saturate(0.85)' }}
                />
                {/* Cinematic colour grade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(16,16,16,0.2) 0%, transparent 40%, rgba(16,16,16,0.55) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
                {/* Green tint grade */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(26,42,29,0.18)', mixBlendMode: 'color' }}
                />

                {/* Stats overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end" style={{ zIndex: 5 }}>
                  <div>
                    <p className="font-bodoni" style={{ color: 'rgba(241,231,216,0.85)', fontSize: '2.5rem' }}>2</p>
                    <p className="font-manrope text-xs uppercase tracking-widest" style={{ color: 'rgba(241,231,216,0.4)' }}>Bedrooms</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bodoni" style={{ color: 'rgba(241,231,216,0.85)', fontSize: '2.5rem' }}>∞</p>
                    <p className="font-manrope text-xs uppercase tracking-widest" style={{ color: 'rgba(241,231,216,0.4)' }}>Views</p>
                  </div>
                </div>
              </div>

              {/* Mask reveal */}
              <div ref={maskRef} className="absolute inset-0 origin-right" style={{ background: '#101010', zIndex: 20 }} />
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute -right-4 md:-right-10 top-1/3 glass-panel p-5 md:p-7"
              style={{ maxWidth: '180px', zIndex: 15 }}
            >
              <p className="font-script mb-1" style={{ color: 'rgba(241,231,216,0.8)', fontSize: '1.6rem' }}>1800m</p>
              <p className="font-manrope text-[10px] uppercase tracking-widest" style={{ color: 'rgba(241,231,216,0.4)' }}>Above sea level</p>
            </motion.div>
          </div>

          {/* Text side */}
          <div ref={textRef} className="order-1 md:order-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-script mb-6"
              style={{ color: 'rgba(66,91,70,0.9)', fontSize: '2rem' }}
            >
              Meppadi, Wayanad
            </motion.p>

            <div className="overflow-hidden mb-8">
              {storyLines.map((line, i) => (
                <p
                  key={i}
                  className="story-line font-bodoni leading-tight"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                    color: '#F1E7D8',
                    letterSpacing: '-0.01em',
                    opacity: 0,
                  }}
                >
                  {i === 1 ? (
                    <>
                      {line.split('misty hills')[0]}
                      <em style={{ color: '#A8C5A0' }}>misty hills</em>
                      {line.split('misty hills')[1]}
                    </>
                  ) : line}
                </p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p
                className="font-manrope font-light leading-relaxed mb-10"
                style={{ color: 'rgba(241,231,216,0.5)', fontSize: '0.95rem', lineHeight: 2, maxWidth: '480px' }}
              >
                Designed for slow mornings, rain-soaked evenings, and endless mountain views — the stay offers two cozy bedrooms, two bathrooms, and a peaceful atmosphere surrounded by tea estates.
              </p>

              <div className="flex items-center gap-6 mb-10">
                <div className="h-px flex-1" style={{ background: 'rgba(241,231,216,0.1)' }} />
                <p className="font-manrope text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(66,91,70,0.7)' }}>Wayanad, Kerala</p>
                <div className="h-px flex-1" style={{ background: 'rgba(241,231,216,0.1)' }} />
              </div>

              <div className="flex flex-wrap gap-3">
                {['Tea Estates', 'Misty Mornings', 'Mountain Views', 'Slow Living'].map((tag) => (
                  <span
                    key={tag}
                    className="font-manrope text-[10px] uppercase tracking-widest px-4 py-2"
                    style={{ border: '1px solid rgba(66,91,70,0.35)', color: 'rgba(241,231,216,0.45)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(16,16,16,0.95) 0%, transparent 100%)', zIndex: 10 }} />
    </section>
  );
};

export default StorySection;
