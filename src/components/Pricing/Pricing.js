import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import useLivePrice from '../../hooks/useLivePrice';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';

/* ── magnetic button ───────────────────────────────────────────────────── */
const MagneticBtn = ({ href, children }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width  / 2) * 0.3,
      y: (e.clientY - r.top  - r.height / 2) * 0.3,
      duration: 0.5, ease: 'power2.out',
    });
  };
  const onLeave = () =>
    gsap.to(ref.current, { x:0, y:0, duration:0.8, ease:'elastic.out(1,0.4)' });

  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
       onMouseMove={onMove} onMouseLeave={onLeave}
       style={{ cursor:'none', display:'inline-block', textDecoration:'none' }}>
      {children}
    </a>
  );
};

/* ── animated price digits ─────────────────────────────────────────────── */
const AnimatedPrice = ({ priceString, loading }) => {
  if (loading) {
    return (
      <span className="inline-flex items-end gap-2">
        {/* skeleton shimmer */}
        <span className="font-bodoni" style={{
          fontSize:'clamp(5rem,18vw,15rem)', color:'rgba(241,231,216,0.15)',
          letterSpacing:'-0.04em', lineHeight:0.9,
        }}>
          ₹ —
        </span>
        <motion.span
          animate={{ opacity:[0.3,0.7,0.3] }}
          transition={{ duration:1.4, repeat:Infinity }}
          className="font-manrope text-xs uppercase tracking-widest mb-6"
          style={{ color:'rgba(241,231,216,0.3)' }}>
          loading…
        </motion.span>
      </span>
    );
  }

  return (
    <motion.span
      key={priceString}                         // re-animate when price changes
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.8, ease:'easeOut' }}
      className="font-bodoni"
      style={{
        fontSize:'clamp(5rem,18vw,15rem)', color:'#F1E7D8',
        letterSpacing:'-0.04em', lineHeight:0.9,
      }}>
      {priceString}
    </motion.span>
  );
};

/* ── source badge ──────────────────────────────────────────────────────── */
const SourceBadge = ({ source, refetch }) => {
  const label = source === 'live'    ? '● Live from Airbnb'
              : source === 'cached'  ? '● Updated 30 min ago'
              : '● Price may vary — check Airbnb';

  const color = source === 'live'    ? '#4ade80'
              : source === 'cached'  ? '#86efac'
              : 'rgba(241,231,216,0.3)';

  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <span className="font-manrope text-[10px] uppercase tracking-[0.2em]"
            style={{ color }}>
        {label}
      </span>
      <button
        onClick={refetch}
        title="Refresh price"
        style={{
          background:'none', border:'1px solid rgba(241,231,216,0.12)',
          color:'rgba(241,231,216,0.3)', cursor:'none',
          padding:'2px 8px', fontSize:'9px', letterSpacing:'0.15em',
          fontFamily:"'Manrope', sans-serif", textTransform:'uppercase',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(66,91,70,0.5)'; e.currentTarget.style.color='rgba(66,91,70,0.8)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(241,231,216,0.12)'; e.currentTarget.style.color='rgba(241,231,216,0.3)'; }}
      >
        ↻ refresh
      </button>
    </div>
  );
};

/* ── main component ────────────────────────────────────────────────────── */
const Pricing = () => {
  const sectionRef = useRef(null);
  const { priceString, loading, source, refetch } = useLivePrice();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset:['start end','end start'] });
  const bgY = useTransform(scrollYProgress, [0,1], ['-8%','8%']);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-28 md:py-48 overflow-hidden"
             style={{ background:'linear-gradient(to bottom, #101010 0%, #0A100C 50%, #101010 100%)' }}>

      {/* moving bg */}
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background:'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(26,42,29,0.4) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage:'linear-gradient(rgba(66,91,70,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(66,91,70,0.03) 1px, transparent 1px)',
          backgroundSize:'60px 60px',
        }} />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">

        {/* label */}
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="font-manrope text-[10px] uppercase tracking-[0.35em] mb-10"
          style={{ color:'rgba(66,91,70,0.8)' }}>
          Pricing
        </motion.p>

        {/* fees note */}
        <motion.p initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.1 }}
          className="font-manrope font-light uppercase tracking-[0.3em] text-xs mb-6"
          style={{ color:'rgba(241,231,216,0.3)' }}>
          Prices include all fees
        </motion.p>

        {/* ── PRICE DISPLAY ── */}
        <motion.div initial={{ opacity:0, y:40, scale:0.96 }} whileInView={{ opacity:1, y:0, scale:1 }}
          viewport={{ once:true }} transition={{ duration:1.2, ease:[0.25,0.46,0.45,0.94] }}
          className="relative inline-block mb-2">

          <AnimatedPrice priceString={priceString} loading={loading} />

          {/* glowing underline */}
          {!loading && (
            <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
              transition={{ duration:1.4, delay:0.6, ease:'easeOut' }}
              className="absolute -bottom-2 left-0 right-0 h-px origin-left"
              style={{
                background:'linear-gradient(to right, transparent, rgba(66,91,70,0.8) 30%, rgba(139,105,20,0.8) 50%, rgba(66,91,70,0.8) 70%, transparent)',
                boxShadow:'0 0 20px rgba(66,91,70,0.5)',
              }} />
          )}
        </motion.div>

        {/* per night + live badge */}
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ delay:0.5 }}
          className="font-manrope font-light uppercase tracking-[0.3em] text-sm"
          style={{ color:'rgba(241,231,216,0.35)' }}>
          per night
        </motion.p>

        <SourceBadge source={source} refetch={refetch} />

        {/* feature pills */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-12 mb-14">
          {['2 Bedrooms','2 Bathrooms','Mountain View','Free Parking','Meppadi, Wayanad'].map(f => (
            <span key={f} className="font-manrope text-[10px] uppercase tracking-[0.2em] px-4 py-2"
                  style={{ border:'1px solid rgba(66,91,70,0.25)', color:'rgba(241,231,216,0.4)' }}>
              {f}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.8 }}>
          <MagneticBtn href={AIRBNB_URL}>
            <div className="relative overflow-hidden group px-14 py-6"
                 style={{ background:'#425B46', cursor:'none' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background:'linear-gradient(to right, transparent, rgba(241,231,216,0.08) 50%, transparent)', transform:'skewX(-15deg)' }} />
              <span className="relative z-10 font-manrope text-xs uppercase tracking-[0.3em]"
                    style={{ color:'#F1E7D8' }}>
                Reserve on Airbnb
              </span>
            </div>
          </MagneticBtn>
        </motion.div>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ delay:1 }}
          className="font-manrope text-xs mt-8"
          style={{ color:'rgba(241,231,216,0.2)', letterSpacing:'0.1em' }}>
          Secure booking via Airbnb · Instant confirmation
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
