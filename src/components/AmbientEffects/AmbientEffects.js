import React, { useEffect, useRef } from 'react';

const LEAF_COUNT = 12;
const RAIN_COUNT = 40;

const AmbientEffects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    // Rain drops
    const drops = Array.from({ length: RAIN_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() * 15 + 8,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.15 + 0.05,
      width: Math.random() * 0.6 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.3, d.y + d.len);
        ctx.strokeStyle = `rgba(200, 220, 230, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.stroke();
        d.y += d.speed;
        d.x += d.speed * 0.15;
        if (d.y > h + d.len) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      });
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Subtle rain canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* Floating leaves */}
      {Array.from({ length: LEAF_COUNT }).map((_, i) => (
        <div
          key={i}
          className="fixed pointer-events-none"
          aria-hidden="true"
          style={{
            zIndex: 2,
            left: `${Math.random() * 90 + 5}%`,
            bottom: '-20px',
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 14 + 8}px`,
            borderRadius: '50% 50% 50% 0',
            background: `rgba(66, 91, 70, ${Math.random() * 0.3 + 0.1})`,
            animation: `floatLeaf ${Math.random() * 12 + 14}s ease-in-out ${Math.random() * 10}s infinite`,
            transform: `rotate(${Math.random() * 60 - 30}deg)`,
          }}
        />
      ))}

      {/* Ambient fog layers */}
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none fog-layer"
        style={{
          zIndex: 1,
          height: '30vh',
          background:
            'linear-gradient(to top, rgba(241,231,216,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default AmbientEffects;
