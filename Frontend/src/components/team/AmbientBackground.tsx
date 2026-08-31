import React, { useEffect, useRef, useCallback } from 'react';

/**
 * AmbientBackground: Canvas particle engine + animated gradient blobs +
 * cursor-reactive spotlight glow. Creates a "living" environment.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Particles ──
    interface Particle {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.3 + 0.05,
        hue: 210 + Math.random() * 40,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ── Draw particles ──
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alpha})`;
        ctx.fill();
      }

      // ── Cursor reactive glow ──
      const scrollY = window.scrollY;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + scrollY;
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        grad.addColorStop(0, 'rgba(99, 142, 255, 0.07)');
        grad.addColorStop(0.5, 'rgba(99, 142, 255, 0.03)');
        grad.addColorStop(1, 'rgba(99, 142, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(mx - 250, my - 250, 500, 500);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Canvas for particles & cursor glow */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated gradient blobs */}
      <div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-20 animate-blob-move"
        style={{
          background: 'radial-gradient(circle, rgba(99, 142, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full opacity-15 animate-blob-move"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full opacity-15 animate-blob-move"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-14s',
        }}
      />
      <div
        className="absolute top-[60%] left-[60%] w-[300px] h-[300px] rounded-full opacity-10 animate-blob-move"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '-3s',
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
