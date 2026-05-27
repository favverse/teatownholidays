import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AIRBNB_URL =
  'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story',      href: '#story' },
    { label: 'Experience', href: '#experience' },
    { label: 'Pricing',    href: '#pricing' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
      style={{
        background: scrolled ? 'rgba(16,16,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(241,231,216,0.06)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Logo */}
      <a href="/#" style={{ cursor: 'none', textDecoration: 'none' }}>
        <span className="font-script text-3xl leading-none" style={{ color: '#F1E7D8', opacity: 0.9 }}>
          Tea Town
        </span>
        <span
          className="block font-manrope text-[9px] tracking-[0.35em] uppercase"
          style={{ color: '#F1E7D8', opacity: 0.4, marginTop: 2 }}
        >
          Holidays · Wayanad
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative group font-manrope text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(241,231,216,0.5)', cursor: 'none', textDecoration: 'none' }}
          >
            <span className="group-hover:text-white transition-colors duration-300" style={{ color: 'inherit' }}>
              {link.label}
            </span>
            <span
              className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
              style={{ background: '#425B46' }}
            />
          </a>
        ))}
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-manrope text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300"
          style={{ border: '1px solid rgba(66,91,70,0.6)', color: '#F1E7D8', cursor: 'none', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#425B46'; e.currentTarget.style.borderColor = '#425B46'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(66,91,70,0.6)'; }}
        >
          Book Stay
        </a>
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        style={{ cursor: 'none', background: 'none', border: 'none' }}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="block h-px w-6 transition-all duration-300" style={{ background: '#F1E7D8', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
        <span className="block h-px w-4 transition-all duration-300" style={{ background: '#F1E7D8', opacity: menuOpen ? 0 : 1 }} />
        <span className="block h-px w-6 transition-all duration-300" style={{ background: '#F1E7D8', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="absolute top-full left-0 right-0 flex flex-col items-center gap-7 py-10"
          style={{ background: 'rgba(16,16,16,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(241,231,216,0.06)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-manrope text-sm tracking-[0.25em] uppercase"
              style={{ color: 'rgba(241,231,216,0.7)', cursor: 'none', textDecoration: 'none' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-xs tracking-[0.2em] uppercase px-8 py-4"
            style={{ border: '1px solid rgba(66,91,70,0.6)', color: '#F1E7D8', cursor: 'none', textDecoration: 'none' }}
          >
            Book Your Stay
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
