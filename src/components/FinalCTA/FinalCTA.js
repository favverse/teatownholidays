import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import propertySurroundings from '../../assets/property-surroundings-opt.jpg';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';

const RainCanvas = () => {
  const canvasRef = useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const drops = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() * 18 + 8,
      speed: Math.random() * 3.5 + 2,
      opacity: Math.random() * 0.18 + 0.04,
      width: Math.random() * 0.7 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.25, d.y + d.len);
        ctx.strokeStyle = `rgba(180, 210, 220, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.stroke();
        d.y += d.speed;
        d.x += d.speed * 0.1;
        if (d.y > h + d.len) { d.y = -d.len; d.x = Math.random() * w; }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    />
  );
};

const MagneticBtn = () => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <a
      ref={ref}
      href={AIRBNB_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'none', display: 'inline-block', textDecoration: 'none' }}
    >
      <div
        className="relative overflow-hidden group px-16 py-6"
        style={{ border: '1px solid rgba(241,231,216,0.3)', cursor: 'none' }}
      >
        <div
          className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ background: '#1A2A1D' }}
        />
        <span
          className="relative z-10 font-manrope text-xs uppercase tracking-[0.3em]"
          style={{ color: '#F1E7D8' }}
        >
          Book Your Stay
        </span>
      </div>
    </a>
  );
};

const FinalCTA = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Background — real surroundings photo */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <img
        src={propertySurroundings}
        alt="Tea Town Holidays surroundings"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        style={{ filter: 'brightness(0.4) saturate(0.6)', willChange: 'transform' }}
      />
        {/* Green grade */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(16,26,18,0.45)', mixBlendMode: 'multiply' }}
        />

        {/* Mountain silhouettes on top of photo */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1200 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 L0,200 L100,150 L220,190 L340,100 L480,170 L580,80 L700,150 L820,90 L940,140 L1060,100 L1160,130 L1200,110 L1200,300 Z"
            fill="rgba(16,16,16,0.6)"
          />
          <path
            d="M0,300 L0,260 L140,220 L280,250 L420,200 L560,240 L700,195 L840,230 L980,205 L1100,235 L1200,220 L1200,300 Z"
            fill="rgba(10,14,11,0.9)"
          />
        </svg>

        {/* Fog band */}
        <motion.div
          className="absolute fog-layer"
          style={{
            bottom: '22%',
            left: 0,
            right: 0,
            height: '18%',
            background: 'linear-gradient(to top, transparent, rgba(241,231,216,0.12) 50%, transparent)',
            opacity: fogOpacity,
          }}
        />
      </motion.div>

      {/* Rain */}
      <RainCanvas />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0.75) 100%)',
          zIndex: 4,
        }}
      />

      {/* Content */}
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-script mb-8"
          style={{ color: 'rgba(241,231,216,0.45)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          A final thought
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="font-bodoni mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            color: '#F1E7D8',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Some places are not meant<br />
          to be <em style={{ color: '#A8C5A0' }}>visited.</em>
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-bodoni mb-12"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            color: '#F1E7D8',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          They are meant to be <em style={{ color: 'rgba(139,105,20,0.9)' }}>felt.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-5 mb-14"
        >
          <div className="h-px w-14" style={{ background: 'rgba(241,231,216,0.15)' }} />
          <p className="font-manrope text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(241,231,216,0.35)' }}>
            Tea Town Holidays, Meppadi, Wayanad
          </p>
          <div className="h-px w-14" style={{ background: 'rgba(241,231,216,0.15)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <MagneticBtn />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex justify-center gap-1.5 mt-10"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: '#8B6914', fontSize: '1rem' }}>★</span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-manrope text-xs mt-3"
          style={{ color: 'rgba(241,231,216,0.25)', letterSpacing: '0.1em' }}
        >
          Rated 5 stars by guests · Airbnb Guest Favourite
        </motion.p>
      </div>

      {/* Mobile sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-50 py-4 px-6"
        style={{ background: 'rgba(16,16,16,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(241,231,216,0.06)' }}
      >
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-4 font-manrope text-xs uppercase tracking-[0.25em]"
          style={{ background: '#425B46', color: '#F1E7D8', textDecoration: 'none', cursor: 'none' }}
        >
          Book Your Stay · ₹3,139/night
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
