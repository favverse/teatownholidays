import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const amenities = [
  {
    id: 'mountain',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4 52L20 24L28 36L38 16L60 52H4Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <circle cx="48" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        {/* Animated cloud dots */}
        <ellipse cx="14" cy="38" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
        <ellipse cx="50" cy="32" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
      </svg>
    ),
    label: 'Mountain View',
    description: 'Wake up to endless layers of mist-draped peaks every single morning.',
    accent: '#425B46',
    animated: true,
  },
  {
    id: 'parking',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="24" width="48" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M16 24V18C16 14 20 12 28 12H36C44 12 48 14 48 18V24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="42" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="44" cy="42" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M25 42H39" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 36H56" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    label: 'Free Parking',
    description: 'Complimentary secure parking right on the property premises.',
    accent: '#5A4333',
  },
  {
    id: 'smoking',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M8 40H44V48H8V40Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M44 40H52V48H44V40Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M48 40V32C48 28 52 26 52 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M42 40V34C42 30 44 28 44 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* Smoke wisps */}
        <path d="M16 36C14 32 18 28 16 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        <path d="M24 34C22 30 26 26 24 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2"/>
      </svg>
    ),
    label: 'Smoking Allowed',
    description: 'Designated outdoor spaces to unwind with the mountain air.',
    accent: '#8B6914',
  },
  {
    id: 'security',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="28" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.5"/>
        <path d="M32 38V52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 52H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 28H22" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <path d="M42 28H50" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 4"/>
      </svg>
    ),
    label: 'Security Cameras',
    description: 'Exterior security cameras on property for your peace of mind.',
    accent: '#1A2A1D',
  },
];

const CloudAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          top: `${20 + i * 18}%`,
          left: '-20%',
          width: `${50 + i * 20}%`,
          height: '12%',
          borderRadius: '50%',
          background: `rgba(241,231,216,${0.06 - i * 0.015})`,
          filter: 'blur(12px)',
        }}
        animate={{ x: ['0%', '140%', '0%'] }}
        transition={{
          duration: 16 + i * 6,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: i * 4,
        }}
      />
    ))}
  </div>
);

const AmenityPanel = ({ amenity, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * 8;
    const rotY = (x - 0.5) * -8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden group"
      style={{
        background: 'rgba(26,42,29,0.15)',
        border: '1px solid rgba(241,231,216,0.07)',
        padding: '2.5rem 2rem',
        transition: 'transform 0.3s ease',
        cursor: 'none',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${amenity.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Mountain cloud animation for that panel */}
      {amenity.animated && <CloudAnimation />}

      {/* Icon */}
      <div
        className="relative mb-8"
        style={{ width: '52px', height: '52px', color: 'rgba(241,231,216,0.5)' }}
      >
        {amenity.icon}
      </div>

      {/* Label */}
      <h3
        className="font-bodoni mb-3"
        style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          color: '#F1E7D8',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {amenity.label}
      </h3>

      {/* Description */}
      <p
        className="font-manrope font-light leading-relaxed"
        style={{ color: 'rgba(241,231,216,0.4)', fontSize: '0.875rem', lineHeight: 1.8 }}
      >
        {amenity.description}
      </p>

      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
        style={{ background: amenity.accent }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-4 right-4 w-8 h-8 opacity-20"
        style={{
          border: `1px solid ${amenity.accent}`,
          borderRadius: '0 0 0 8px',
        }}
      />
    </motion.div>
  );
};

const ExperienceGrid = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #101010 0%, #0D1A10 50%, #101010 100%)' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(66,91,70,0.02) 80px, rgba(66,91,70,0.02) 82px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-manrope text-[10px] uppercase tracking-[0.35em] mb-5"
            style={{ color: 'rgba(66,91,70,0.8)' }}
          >
            What This Place Offers
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-bodoni"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                color: '#F1E7D8',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                maxWidth: '600px',
              }}
            >
              Curated for the<br />
              <em style={{ color: 'rgba(66,91,70,0.85)' }}>discerning</em> traveller
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-manrope font-light"
              style={{
                color: 'rgba(241,231,216,0.35)',
                fontSize: '0.875rem',
                maxWidth: '300px',
                lineHeight: 1.9,
              }}
            >
              Every detail of the stay is crafted to let you sink into the rhythm of the mountains.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {amenities.map((amenity, i) => (
            <AmenityPanel key={amenity.id} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceGrid;
