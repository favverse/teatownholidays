import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';
const MAPS_URL =
  'https://www.google.com/maps/search/Tea+Town+Holidays+Meppadi+Wayanad+Kerala';

const WHATSAPP_NUMBER = '919947673334';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I came across Tea Town Holidays in Meppadi, Wayanad and would like to enquire about availability and booking. Could you please share more details about the stay?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const PHONE_NUMBER = '919947673332';
const EMAIL = 'teatownholidayshomestay@gmail.com';

/* ── contact method cards ─────────────────────────────────────────── */
const contactMethods = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+91 99476 73334',
    href: WHATSAPP_URL,
    newTab: true,
    cta: 'Chat on WhatsApp →',
    color: '#25D366',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-1.5A12 12 0 1 0 20.5 3.5Z"
          stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M9 10c0-.6.4-1 1-1h.5c.3 0 .5.2.6.4l.8 2a.5.5 0 0 1-.1.6l-.6.6c.5 1 1.3 1.8 2.3 2.3l.6-.6a.5.5 0 0 1 .6-.1l2 .8c.2.1.3.3.3.6V16c0 .6-.4 1-1 1-4 0-7.5-3.5-7.5-7.5V10Z"
          stroke="currentColor" strokeWidth="1.4" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+91 99476 73332',
    href: `tel:${PHONE_NUMBER}`,
    newTab: false,
    cta: 'Call Us →',
    color: '#8B6914',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
          stroke="currentColor" strokeWidth="1.4" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    newTab: false,
    cta: 'Send Email →',
    color: '#425B46',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'airbnb',
    label: 'Airbnb',
    value: 'View our listing',
    href: AIRBNB_URL,
    newTab: true,
    cta: 'Open Listing →',
    color: '#FF5A5F',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C9.24 2 7 5 7 8.5C7 11.2 8.6 13.5 11 14.6C8 15.7 4 18.8 4 22H20C20 18.8 16 15.7 13 14.6C15.4 13.5 17 11.2 17 8.5C17 5 14.76 2 12 2Z"
          stroke="currentColor" strokeWidth="1.4" fill="none"/>
      </svg>
    ),
  },
];

const ContactCard = ({ method, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={method.href}
      target={method.newTab ? '_blank' : '_self'}
      rel={method.newTab ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group overflow-hidden block"
      style={{
        background: 'rgba(241,231,216,0.03)',
        border: `1px solid ${hovered ? method.color + '55' : 'rgba(241,231,216,0.07)'}`,
        padding: '1.75rem 1.5rem',
        transition: 'border-color 0.4s ease',
        textDecoration: 'none',
        cursor: 'none',
      }}
    >
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 30% 50%, ${method.color}12 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }} />

      <div className="relative mb-4 transition-colors duration-300"
        style={{ color: hovered ? method.color : 'rgba(241,231,216,0.35)' }}>
        {method.icon}
      </div>

      <p className="font-manrope text-[10px] uppercase tracking-[0.28em] mb-1.5"
         style={{ color: 'rgba(241,231,216,0.3)' }}>
        {method.label}
      </p>
      <p className="font-bodoni mb-4"
         style={{
           fontSize: 'clamp(0.85rem,1.5vw,1.05rem)', color: '#F1E7D8',
           letterSpacing: '-0.01em', lineHeight: 1.3, wordBreak: 'break-all',
         }}>
        {method.value}
      </p>
      <span className="font-manrope text-xs uppercase tracking-[0.18em] transition-colors duration-300"
            style={{ color: hovered ? method.color : 'rgba(241,231,216,0.2)' }}>
        {method.cta}
      </span>

      <div className="absolute bottom-0 left-0 h-px transition-all duration-500"
           style={{ background: method.color, width: hovered ? '100%' : '0%' }} />
    </motion.a>
  );
};

/* ── main component ───────────────────────────────────────────────── */
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dates: '', message: '' });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* Build mailto: link dynamically from form fields */
  const buildMailto = () => {
    const subject = encodeURIComponent(
      `Enquiry – Tea Town Holidays${form.dates ? ` | Stay: ${form.dates}` : ''}`
    );
    const body = encodeURIComponent(
      `Hi Tea Town Holidays,\n\n` +
      `I would like to enquire about booking a stay.\n\n` +
      `Name: ${form.name || '—'}\n` +
      `Phone: ${form.phone || '—'}\n` +
      `Preferred Dates: ${form.dates || '—'}\n\n` +
      `Message:\n${form.message || '—'}\n\n` +
      `Please let me know about availability and any details.\n\nThank you.`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  /* Also offer a WhatsApp send that pre-fills from the form */
  const buildWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi! I would like to enquire about Tea Town Holidays.\n\n` +
      `Name: ${form.name || '—'}\n` +
      `Preferred Dates: ${form.dates || '—'}\n` +
      `${form.message ? `Message: ${form.message}` : ''}\n\nCould you please share availability details?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <section id="contact" className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #101010 0%, #0A100C 60%, #101010 100%)' }}>

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(66,91,70,0.05) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(66,91,70,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(66,91,70,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* header */}
        <div className="mb-16 md:mb-20">
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="font-manrope text-[10px] uppercase tracking-[0.35em] mb-5"
            style={{ color:'rgba(66,91,70,0.8)' }}>
            Find Us
          </motion.p>
          <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:1 }}
            className="font-bodoni"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'#F1E7D8', letterSpacing:'-0.02em', lineHeight:1.05 }}>
            Come find{' '}
            <em style={{ color:'rgba(66,91,70,0.85)' }}>us</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">

          {/* ── LEFT: address + map ── */}
          <div>
            {/* address */}
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:1 }} className="mb-8">
              <div className="flex items-start gap-5 p-7"
                style={{ background:'rgba(241,231,216,0.03)', border:'1px solid rgba(241,231,216,0.07)' }}>
                <div className="flex-shrink-0 mt-1" style={{ color:'rgba(66,91,70,0.7)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                      stroke="currentColor" strokeWidth="1.4" fill="none"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                  </svg>
                </div>
                <div>
                  <p className="font-manrope text-[10px] uppercase tracking-[0.28em] mb-3"
                     style={{ color:'rgba(241,231,216,0.35)' }}>Address</p>
                  <p className="font-bodoni leading-relaxed"
                     style={{ color:'#F1E7D8', fontSize:'clamp(1rem,1.8vw,1.3rem)', lineHeight:1.6 }}>
                    Tea Town Holidays<br />
                    Meppadi, Wayanad<br />
                    Kerala — 673 577
                  </p>
                </div>
              </div>
            </motion.div>

            {/* get directions */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.9, delay:0.2 }} className="mb-10">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full py-5 px-7 transition-all duration-300"
                style={{ background:'#1A2A1D', border:'1px solid rgba(66,91,70,0.4)', textDecoration:'none', cursor:'none' }}
                onMouseEnter={e => { e.currentTarget.style.background='#425B46'; e.currentTarget.style.borderColor='#425B46'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#1A2A1D'; e.currentTarget.style.borderColor='rgba(66,91,70,0.4)'; }}>
                <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color:'#F1E7D8' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z"
                    stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
                <span className="font-manrope text-xs uppercase tracking-[0.25em] flex-1"
                      style={{ color:'#F1E7D8' }}>
                  Get Directions on Google Maps
                </span>
                <svg className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color:'rgba(241,231,216,0.5)' }}>
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            {/* map visual */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:1, delay:0.35 }}
              className="relative overflow-hidden"
              style={{ height:'260px', border:'1px solid rgba(241,231,216,0.07)' }}>
              <div className="absolute inset-0"
                style={{ background:'radial-gradient(ellipse 120% 120% at 50% 60%, #1A2A1D 0%, #0D1A10 50%, #101010 100%)' }}/>
              <div className="absolute inset-0"
                style={{ backgroundImage:'linear-gradient(rgba(66,91,70,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(66,91,70,0.12) 1px, transparent 1px)', backgroundSize:'40px 40px' }}/>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 130 Q100 100 200 130 Q300 160 400 130" stroke="rgba(66,91,70,0.25)" strokeWidth="2" fill="none"/>
                <path d="M200 0 Q220 80 200 130 Q180 180 200 260" stroke="rgba(66,91,70,0.2)" strokeWidth="1.5" fill="none"/>
                <path d="M50 200 Q150 170 200 130 Q250 90 350 60" stroke="rgba(90,67,51,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"/>
              </svg>
              <div className="absolute" style={{ top:'50%', left:'50%', transform:'translate(-50%,-100%)' }}>
                <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                    <path d="M18 2C10.27 2 4 8.27 4 16C4 26 18 42 18 42C18 42 32 26 32 16C32 8.27 25.73 2 18 2Z" fill="#425B46" opacity="0.9"/>
                    <circle cx="18" cy="16" r="5" fill="#F1E7D8" opacity="0.9"/>
                  </svg>
                </motion.div>
                <motion.div className="absolute" style={{ bottom:'-4px', left:'50%', transform:'translateX(-50%)', width:'28px', height:'10px', borderRadius:'50%', background:'rgba(66,91,70,0.4)', filter:'blur(4px)' }}
                  animate={{ opacity:[0.4,0.8,0.4], scaleX:[0.8,1.2,0.8] }}
                  transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}/>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-3"
                style={{ background:'rgba(16,16,16,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(241,231,216,0.07)' }}>
                <div>
                  <p className="font-manrope text-[10px] uppercase tracking-widest" style={{ color:'rgba(241,231,216,0.4)' }}>Meppadi, Wayanad</p>
                  <p className="font-bodoni text-sm" style={{ color:'#F1E7D8' }}>Tea Town Holidays</p>
                </div>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="font-manrope text-[10px] uppercase tracking-widest px-3 py-1.5"
                  style={{ border:'1px solid rgba(66,91,70,0.5)', color:'rgba(66,91,70,0.9)', cursor:'none', textDecoration:'none' }}>
                  Open →
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: contact cards + form ── */}
          <div>
            {/* 4 contact cards */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              {contactMethods.map((method, i) => (
                <ContactCard key={method.id} method={method} index={i} />
              ))}
            </div>

            {/* enquiry form */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:1, delay:0.4 }}>
              <p className="font-manrope text-[10px] uppercase tracking-[0.3em] mb-6"
                 style={{ color:'rgba(241,231,216,0.35)' }}>
                Send an Enquiry
              </p>

              <div className="flex flex-col gap-4">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-manrope text-[10px] uppercase tracking-[0.25em]"
                           style={{ color:'rgba(241,231,216,0.35)' }}>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="font-manrope text-sm px-4 py-3 outline-none transition-all duration-300"
                      style={{ background:'rgba(241,231,216,0.04)', border:'1px solid rgba(241,231,216,0.08)', color:'#F1E7D8', cursor:'none' }}
                      onFocus={e => e.target.style.borderColor='rgba(66,91,70,0.5)'}
                      onBlur={e  => e.target.style.borderColor='rgba(241,231,216,0.08)'}/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-manrope text-[10px] uppercase tracking-[0.25em]"
                           style={{ color:'rgba(241,231,216,0.35)' }}>Phone (optional)</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="font-manrope text-sm px-4 py-3 outline-none transition-all duration-300"
                      style={{ background:'rgba(241,231,216,0.04)', border:'1px solid rgba(241,231,216,0.08)', color:'#F1E7D8', cursor:'none' }}
                      onFocus={e => e.target.style.borderColor='rgba(66,91,70,0.5)'}
                      onBlur={e  => e.target.style.borderColor='rgba(241,231,216,0.08)'}/>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[10px] uppercase tracking-[0.25em]"
                         style={{ color:'rgba(241,231,216,0.35)' }}>Your Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className="font-manrope text-sm px-4 py-3 outline-none transition-all duration-300"
                    style={{ background:'rgba(241,231,216,0.04)', border:'1px solid rgba(241,231,216,0.08)', color:'#F1E7D8', cursor:'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(66,91,70,0.5)'}
                    onBlur={e  => e.target.style.borderColor='rgba(241,231,216,0.08)'}/>
                </div>

                {/* Dates */}
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[10px] uppercase tracking-[0.25em]"
                         style={{ color:'rgba(241,231,216,0.35)' }}>Preferred Stay Dates</label>
                  <input type="text" name="dates" value={form.dates} onChange={handleChange}
                    placeholder="e.g. Dec 20 – Dec 23"
                    className="font-manrope text-sm px-4 py-3 outline-none transition-all duration-300"
                    style={{ background:'rgba(241,231,216,0.04)', border:'1px solid rgba(241,231,216,0.08)', color:'#F1E7D8', cursor:'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(66,91,70,0.5)'}
                    onBlur={e  => e.target.style.borderColor='rgba(241,231,216,0.08)'}/>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[10px] uppercase tracking-[0.25em]"
                         style={{ color:'rgba(241,231,216,0.35)' }}>Message</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder="Tell us about your stay…"
                    className="font-manrope text-sm px-4 py-3 outline-none resize-none transition-all duration-300"
                    style={{ background:'rgba(241,231,216,0.04)', border:'1px solid rgba(241,231,216,0.08)', color:'#F1E7D8', cursor:'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(66,91,70,0.5)'}
                    onBlur={e  => e.target.style.borderColor='rgba(241,231,216,0.08)'}/>
                </div>

                {/* ── action buttons ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">

                  {/* Send via Email — mailto: with auto-filled subject + body */}
                  <a href={buildMailto()}
                    className="group relative overflow-hidden flex items-center justify-between px-6 py-5 transition-all duration-300"
                    style={{ background:'#1A2A1D', border:'1px solid rgba(66,91,70,0.45)', textDecoration:'none', cursor:'none' }}
                    onMouseEnter={e => e.currentTarget.style.background='#425B46'}
                    onMouseLeave={e => e.currentTarget.style.background='#1A2A1D'}>
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color:'rgba(241,231,216,0.6)', flexShrink:0 }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                        <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      <span className="font-manrope text-xs uppercase tracking-[0.22em]" style={{ color:'#F1E7D8' }}>
                        Send via Email
                      </span>
                    </div>
                    <svg className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color:'rgba(241,231,216,0.4)' }}>
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {/* Send via WhatsApp — pre-filled from form */}
                  <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer"
                    className="group relative overflow-hidden flex items-center justify-between px-6 py-5 transition-all duration-300"
                    style={{ background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.3)', textDecoration:'none', cursor:'none' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(37,211,102,0.18)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.3)'; }}>
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color:'#25D366', flexShrink:0 }}>
                        <path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-1.5A12 12 0 1 0 20.5 3.5Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                        <path d="M9 10c0-.6.4-1 1-1h.5c.3 0 .5.2.6.4l.8 2a.5.5 0 0 1-.1.6l-.6.6c.5 1 1.3 1.8 2.3 2.3l.6-.6a.5.5 0 0 1 .6-.1l2 .8c.2.1.3.3.3.6V16c0 .6-.4 1-1 1-4 0-7.5-3.5-7.5-7.5V10Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                      </svg>
                      <span className="font-manrope text-xs uppercase tracking-[0.22em]" style={{ color:'#F1E7D8' }}>
                        Send via WhatsApp
                      </span>
                    </div>
                    <svg className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color:'rgba(37,211,102,0.5)' }}>
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* helper note */}
                <p className="font-manrope text-[10px] leading-relaxed"
                   style={{ color:'rgba(241,231,216,0.2)', letterSpacing:'0.04em' }}>
                  Clicking either button opens your email / WhatsApp app with your message pre-filled.
                  Or book instantly via Airbnb for same-day confirmation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
