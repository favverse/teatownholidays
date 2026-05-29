import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import propertyExterior    from '../../assets/property-exterior-opt.jpg';
import propertySurroundings from '../../assets/property-surroundings-opt.jpg';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';

/* ─────────────────────────────────────────────
   Only 2 real photos — large cinematic layout
───────────────────────────────────────────── */
const photos = [
  {
    id: 1,
    src: propertyExterior,
    caption: 'The Homestay — nestled in greenery',
    subCaption: 'Meppadi, Wayanad',
    position: 'center top',
  },
  {
    id: 2,
    src: propertySurroundings,
    caption: 'Lush surroundings of the estate',
    subCaption: 'Tea estates & open skies',
    position: 'center center',
  },
];

const PhotoPanel = ({ photo, index }) => {
  const [hovered, setHovered] = useState(false);
  const panelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });

  // alternate vertical parallax direction per photo
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? '6%' : '-6%', index % 2 === 0 ? '-6%' : '6%']
  );

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay: index * 0.2, ease: [0.25,0.46,0.45,0.94] }}
      className="relative overflow-hidden group"
      style={{ cursor:'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* parallax image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale: hovered ? 1.04 : 1,
          transition: 'scale 0.9s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover"
          style={{
            objectPosition: photo.position,
            filter: `brightness(${hovered ? 0.72 : 0.78}) saturate(0.88)`,
            transition: 'filter 0.7s ease',
          }}
        />
        {/* cinematic colour grade */}
        <div className="absolute inset-0" style={{
          background:'linear-gradient(to bottom, rgba(16,16,16,0.1) 0%, transparent 30%, rgba(16,16,16,0.55) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background:'rgba(26,42,29,0.14)', mixBlendMode:'color',
        }} />
      </motion.div>

      {/* hover caption overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ background:'linear-gradient(to top, rgba(16,16,16,0.9) 0%, transparent 50%)', zIndex:10 }}
      />

      {/* caption text */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease:'easeOut' }}
        style={{ zIndex: 20 }}
      >
        <p className="font-manrope text-[10px] uppercase tracking-[0.3em] mb-2"
           style={{ color:'rgba(66,91,70,0.9)' }}>
          {photo.subCaption}
        </p>
        <p className="font-bodoni" style={{
          color:'#F1E7D8', fontSize:'clamp(1.1rem,2.5vw,1.8rem)', letterSpacing:'-0.01em',
        }}>
          {photo.caption}
        </p>
      </motion.div>

      {/* corner accent */}
      <div className="absolute top-5 left-5 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ borderTop:'1px solid rgba(66,91,70,0.7)', borderLeft:'1px solid rgba(66,91,70,0.7)', zIndex:20 }} />
      <div className="absolute bottom-5 right-5 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ borderBottom:'1px solid rgba(66,91,70,0.5)', borderRight:'1px solid rgba(66,91,70,0.5)', zIndex:20 }} />
    </motion.div>
  );
};

const CinematicGallery = () => {
  return (
    <section id="gallery" className="relative py-24 md:py-40 overflow-hidden"
             style={{ background:'#101010' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* ── header ── */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="font-manrope text-[10px] uppercase tracking-[0.35em] mb-5"
            style={{ color:'#A8C5A0' }}>
            The Visual Story
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <motion.h2
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:1 }}
              className="font-bodoni"
              style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'#F1E7D8',
                       letterSpacing:'-0.02em', lineHeight:1.05 }}>
              Through the{' '}
              <em style={{ color:'rgba(66,91,70,0.85)' }}>mist</em>
            </motion.h2>
            <motion.p
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:1, delay:0.3 }}
              className="font-manrope font-light"
              style={{ color:'rgba(241,231,216,0.3)', fontSize:'0.82rem',
                       letterSpacing:'0.04em', maxWidth:'280px', lineHeight:1.8 }}>
              Two bedrooms. Endless tea gardens.<br />One unforgettable view.
            </motion.p>
          </div>
        </div>

        {/* ── 2-photo layout ──
            Desktop: large left portrait  |  tall right portrait
            They're equal height, side by side, with the right one
            offset down slightly for editorial rhythm.
        ── */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start">

          {/* Photo 1 — left, portrait, slightly taller */}
          <div className="w-full md:w-[55%]" style={{ height:'clamp(380px,70vh,780px)' }}>
            <PhotoPanel photo={photos[0]} index={0} />
          </div>

          {/* Photo 2 — right, pushed down for editorial offset */}
          <div className="w-full md:w-[45%] md:mt-16"
               style={{ height:'clamp(340px,62vh,700px)' }}>
            <PhotoPanel photo={photos[1]} index={1} />
          </div>
        </div>

        {/* ── photo count badge ── */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:1, delay:0.4 }}
          className="flex items-center gap-4 mt-8">
          <span className="font-bodoni" style={{ color:'rgba(255, 255, 255, 1)', fontSize:'3rem' }}>2</span>
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[0.3em]"
               style={{ color:'rgba(241,231,216,0.25)' }}>Photos from the property</p>
            <p className="font-manrope text-[10px] uppercase tracking-[0.2em] mt-0.5"
               style={{ color:'rgba(66,91,70,0.5)' }}>More available on Airbnb</p>
          </div>
        </motion.div>

        {/* ── VIEW MORE PHOTOS ON AIRBNB button ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.9, delay:0.5 }}
          className="flex justify-center mt-14">
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden flex items-center gap-4 px-8 py-5"
            style={{ border:'1px solid rgba(66,91,70,0.45)', cursor:'none', textDecoration:'none' }}>
            {/* fill on hover */}
            <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background:'#1A2A1D' }} />
            {/* Airbnb-style person icon */}
            <svg className="relative z-10 flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.24 2 7 5 7 8.5C7 11.2 8.6 13.5 11 14.6C8 15.7 4 18.8 4 22H20C20 18.8 16 15.7 13 14.6C15.4 13.5 17 11.2 17 8.5C17 5 14.76 2 12 2Z"
                stroke="rgba(241,231,216,0.55)" strokeWidth="1.3" fill="none"/>
            </svg>
            <span className="relative z-10 font-manrope text-xs uppercase tracking-[0.25em]"
                  style={{ color:'rgba(241,231,216,0.7)' }}>
              View More Photos on Airbnb
            </span>
            <svg className="relative z-10 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                 width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="rgba(241,231,216,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default CinematicGallery;
