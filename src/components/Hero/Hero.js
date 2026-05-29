import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import propertyExterior from '../../assets/property-exterior-opt.jpg';
import propertySurroundings from '../../assets/property-surroundings-opt.jpg';
import staypic1 from '../../assets/staypic1.jpg';
import staypic2 from '../../assets/staypic2.jpg';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';

const HERO_SCENES = [
  { type: 'photo', src: staypic1,            label: 'The Homestay' },
  { type: 'photo', src: staypic2,            label: 'The Surroundings' },
  { type: 'photo', src: propertyExterior,    label: 'The Property' },
  { type: 'photo', src: propertySurroundings,label: 'The Gardens' },
];

const MagneticButton = ({ children, href }) => {
  const btnRef = useRef(null);
  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    gsap.to(btnRef.current, {
      x: (e.clientX - rect.left - rect.width  / 2) * 0.35,
      y: (e.clientY - rect.top  - rect.height / 2) * 0.35,
      duration: 0.5, ease: 'power2.out',
    });
  };
  const handleMouseLeave = () =>
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });

  return (
    <a ref={btnRef} href={href} target="_blank" rel="noopener noreferrer"
       onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
       style={{ cursor:'none', display:'inline-block', textDecoration:'none' }}>
      {children}
    </a>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const [sceneIndex, setSceneIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start','end start'] });
  const y       = useTransform(scrollYProgress, [0,1], ['0%','28%']);
  const opacity = useTransform(scrollYProgress, [0,0.7], [1,0]);
  const scale   = useTransform(scrollYProgress, [0,1], [1,1.07]);

  // auto-cycle scenes
  useEffect(() => {
    const id = setInterval(() => setSceneIndex(p => (p + 1) % HERO_SCENES.length), 5500);
    return () => clearInterval(id);
  }, []);

  // headline char animation
  useEffect(() => {
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars,
        { opacity:0, y:80, rotateX:-40 },
        { opacity:1, y:0, rotateX:0, stagger:0.04, duration:1.2, ease:'power3.out', delay:0.5 }
      );
    }
  }, []);

  const words = 'Wake Up Above The Clouds'.split(' ');

  return (
    <section ref={sectionRef} id="hero" className="relative w-full overflow-hidden"
             style={{ height:'100vh', minHeight:'700px' }}>

      {/* ── photo scenes ── */}
      {HERO_SCENES.map((scene, i) => (
        <motion.div key={i} className="absolute inset-0"
          animate={{ opacity: i === sceneIndex ? 1 : 0 }}
          transition={{ duration: 2.2, ease:'easeInOut' }}>
          <img src={scene.src} alt={scene.label}
     className="w-full h-full object-cover"
     loading="eager"
     decoding="async"
     style={{
       filter: 'brightness(0.32) saturate(0.7)',
       transform: i === sceneIndex ? 'scale(1.05)' : 'scale(1)',
       transition: 'transform 6s ease-out',
       willChange: 'transform',
     }} />
        </motion.div>
      ))}

      {/* ── parallax depth layer ── */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div className="absolute inset-0 fog-layer"
          style={{ background:'radial-gradient(ellipse 140% 60% at 50% 85%, rgba(241,231,216,0.08) 0%, transparent 60%)' }} />
        {/* mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0"
          style={{ height:'28vh', background:'rgba(16,16,16,0.75)',
            clipPath:'polygon(0 100%,0 55%,8% 40%,18% 60%,28% 30%,42% 55%,55% 20%,68% 48%,80% 28%,92% 50%,100% 38%,100% 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0"
          style={{ height:'14vh', background:'rgba(16,16,16,0.95)',
            clipPath:'polygon(0 100%,0 70%,12% 52%,25% 72%,38% 45%,52% 68%,66% 40%,78% 62%,90% 52%,100% 65%,100% 100%)' }} />
      </motion.div>

      {/* ── gradient overlays ── */}
      <div className="absolute inset-0" style={{
        background:'linear-gradient(to bottom, rgba(16,16,16,0.4) 0%, transparent 30%, rgba(16,16,16,0.72) 100%)'}} />
      <div className="absolute inset-0" style={{
        background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(16,16,16,0.5) 100%)'}} />

      {/* ── text content ── */}
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                  style={{ opacity }}>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:0.2 }}
          className="font-script mb-4 md:mb-6"
          style={{ color:'rgba(241,231,216,0.7)', fontSize:'clamp(1.8rem,4vw,3rem)' }}>
          A Mountain Escape
        </motion.p>

        <div ref={textRef} style={{ perspective:'1000px' }}>
          <h1 className="font-bodoni font-medium leading-none"
            style={{ fontSize:'clamp(2.8rem,8.5vw,9rem)', color:'#F1E7D8', letterSpacing:'-0.02em' }}>
            {words.map((word, wi) => (
              <span key={wi} className="inline-block mr-3 md:mr-5 overflow-hidden">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="char inline-block" style={{ opacity:0 }}>{char}</span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:1.4 }}
          className="font-manrope font-light mt-6 md:mt-8 max-w-lg"
          style={{ color:'rgba(241,231,216,0.62)', fontSize:'clamp(0.875rem,2vw,1.1rem)',
                   letterSpacing:'0.05em', lineHeight:1.75 }}>
          A hidden mountain stay in Meppadi where tea gardens meet the mist.
        </motion.p>

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:1.8 }} className="mt-10 md:mt-12">
          <MagneticButton href={AIRBNB_URL}>
            <div className="relative group overflow-hidden px-12 py-5"
                 style={{ border:'1px solid rgba(241,231,216,0.45)', cursor:'none' }}>
              <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background:'#425B46' }} />
              <span className="relative z-10 font-manrope text-xs uppercase tracking-[0.28em]"
                    style={{ color:'#F1E7D8' }}>
                Book Your Escape
              </span>
            </div>
          </MagneticButton>
        </motion.div>

        {/* scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:1, delay:2.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="font-manrope text-[10px] tracking-[0.3em] uppercase"
             style={{ color:'rgba(241,231,216,0.3)' }}>Scroll</p>
          <div className="w-px h-12 relative overflow-hidden" style={{ background:'rgba(241,231,216,0.08)' }}>
            <motion.div className="absolute inset-0" style={{ background:'rgba(241,231,216,0.5)' }}
              animate={{ y:['-100%','200%'] }}
              transition={{ duration:1.6, ease:'easeInOut', repeat:Infinity }} />
          </div>
        </motion.div>
      </motion.div>

      {/* scene dots */}
      <div className="absolute bottom-8 right-8 flex gap-2" style={{ zIndex:20 }}>
        {HERO_SCENES.map((_, i) => (
          <button key={i} onClick={() => setSceneIndex(i)} style={{
            cursor:'none', border:'none',
            width: i === sceneIndex ? '22px' : '6px', height:'6px', borderRadius:'3px',
            background: i === sceneIndex ? 'rgba(241,231,216,0.8)' : 'rgba(241,231,216,0.22)',
            transition:'all 0.5s ease',
          }} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
