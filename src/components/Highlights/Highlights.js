import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const highlights = [
  {
    id: 'checkin',
    badge: '5★',
    title: 'Exceptional Check-in',
    body: 'Recent guests gave the check-in process a 5-star rating.',
    detail: 'Seamless arrival, warm welcome',
    color: '#8B6914',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
        <path d="M8 24L20 36L40 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'location',
    badge: '100%',
    title: 'Unbeatable Location',
    body: '100% of guests in the past year gave this location a 5-star rating.',
    detail: 'Meppadi, heart of Wayanad',
    color: '#425B46',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
        <path d="M24 4C17.373 4 12 9.373 12 16C12 25 24 44 24 44C24 44 36 25 36 16C36 9.373 30.627 4 24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'view',
    badge: '∞',
    title: 'Mountain View',
    body: 'Soak up the view during your stay. Endless horizons of tea-draped hills.',
    detail: 'Misty peaks every morning',
    color: '#1A2A1D',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
        <path d="M4 36L14 18L20 26L28 10L38 22L44 16V36H4Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <circle cx="36" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
];

const GlassPanel = ({ highlight, index }) => {
  const panelRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    panelRef.current.style.transform = `perspective(600px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateZ(10px)`;
    panelRef.current.style.transition = 'transform 0.15s ease';

    // Move glow
    const glow = panelRef.current.querySelector('.panel-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${highlight.color}30 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    panelRef.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)';
    panelRef.current.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1)';
  };

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.18 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group overflow-hidden"
      style={{
        background: 'rgba(241,231,216,0.03)',
        border: '1px solid rgba(241,231,216,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '2.5rem 2rem',
        cursor: 'none',
        willChange: 'transform',
      }}
    >
      {/* Glow */}
      <div
        className="panel-glow absolute inset-0 transition-all duration-200"
        style={{ pointerEvents: 'none' }}
      />

      {/* Float animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + index * 1.2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        className="relative z-10"
      >
        {/* Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-bodoni"
            style={{ color: highlight.color, fontSize: '1.8rem', letterSpacing: '-0.02em' }}
          >
            {highlight.badge}
          </span>
          <div
            className="h-px flex-1"
            style={{ background: `${highlight.color}40` }}
          />
        </div>

        {/* Icon */}
        <div
          className="mb-5"
          style={{ color: `${highlight.color}CC` }}
        >
          {highlight.icon}
        </div>

        {/* Title */}
        <h3
          className="font-bodoni mb-3"
          style={{
            fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
            color: '#F1E7D8',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {highlight.title}
        </h3>

        {/* Body */}
        <p
          className="font-manrope font-light mb-6"
          style={{ color: 'rgba(241,231,216,0.45)', fontSize: '0.875rem', lineHeight: 1.8 }}
        >
          {highlight.body}
        </p>

        {/* Detail tag */}
        <span
          className="font-manrope text-[10px] uppercase tracking-[0.25em] px-3 py-1.5"
          style={{
            border: `1px solid ${highlight.color}40`,
            color: `${highlight.color}CC`,
          }}
        >
          {highlight.detail}
        </span>
      </motion.div>

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        style={{
          borderLeft: `1px solid ${highlight.color}20`,
          borderBottom: `1px solid ${highlight.color}20`,
          margin: '0',
        }}
      />
    </motion.div>
  );
};

const Highlights = () => {
  return (
    <section
      id="highlights"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #101010 0%, #0A100C 50%, #101010 100%)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(66,91,70,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-manrope text-[10px] uppercase tracking-[0.35em] mb-5"
            style={{ color: '#A8C5A0' }}
          >
            Guest Experience
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-bodoni"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: '#F1E7D8',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Why guests{' '}
            <em style={{ color: '#A8C5A0' }}>never forget</em>
          </motion.h2>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <GlassPanel key={h.id} highlight={h} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p
            className="font-script"
            style={{
              color: 'rgba(241,231,216,0.2)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            }}
          >
            "The mountains have a way of calling you back."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
