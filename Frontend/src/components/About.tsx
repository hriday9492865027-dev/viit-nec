import React, { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Palette ────────────────────────────────────────────────
const C = {
  green:     '#163A36',
  teal:      '#214741',
  gold:      '#E6C48A',
  goldDim:   'rgba(230,196,138,0.55)',
  goldGlow:  'rgba(230,196,138,0.15)',
  white:     '#FFFFFF',
  gray:      '#D7D7D7',
  glassBg:   'rgba(22,58,54,0.5)',
  glassBdr:  'rgba(230,196,138,0.18)',
};

// ── Reveal hook ────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const { ref, vis } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Counter animation ──────────────────────────────────────
function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, vis } = useReveal(0.3);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [vis, target]);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-head)',
        fontSize: 'clamp(2rem,4vw,2.8rem)',
        fontWeight: 700,
        color: C.gold,
        display: 'block',
        lineHeight: 1,
      }}
    >
      {count}{suffix}
    </span>
  );
}

// ── Floating Blobs ─────────────────────────────────────────
function Blobs({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const base = variant === 'dark'
    ? 'rgba(230,196,138,0.06)'
    : 'rgba(33,71,65,0.4)';
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div
        style={{
          position: 'absolute', top: '10%', left: '-8%',
          width: 480, height: 480, background: `radial-gradient(circle, ${base} 0%, transparent 70%)`,
          animation: 'blob-drift 12s ease-in-out infinite',
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '5%', right: '-5%',
          width: 560, height: 560, background: `radial-gradient(circle, ${base} 0%, transparent 70%)`,
          animation: 'blob-drift 15s ease-in-out infinite reverse',
          borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
          animationDelay: '-5s',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '50%', left: '40%',
          width: 360, height: 360, background: `radial-gradient(circle, ${base} 0%, transparent 70%)`,
          animation: 'blob-drift 18s ease-in-out infinite',
          borderRadius: '50%', animationDelay: '-9s',
        }}
      />
    </div>
  );
}

// ── Particles ──────────────────────────────────────────────
function Particles() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: i * 0.4,
    dur: 6 + Math.random() * 8,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {pts.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: C.gold, opacity: 0.3,
            animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Grid overlay ───────────────────────────────────────────
function GridOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(rgba(230,196,138,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(230,196,138,${opacity}) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════
// HERO SECTION
// ════════════════════════════════════════════════════════════
const STATS = [
  { icon: '🎓', value: 1000, suffix: '+', label: 'Students Inspired' },
  { icon: '⚡', value: 50,   suffix: '+', label: 'Events Conducted' },
  { icon: '🚀', value: 20,   suffix: '+', label: 'Startups Supported' },
];

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        padding: '5rem 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.green,
      }}
    >
      {/* Building image with parallax */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          transform: `translateY(${scrollY * 0.25}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      >
        <img
          src="/about-hero.png"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/college-building.png';
          }}
          alt="VIIT Campus Building"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>

      {/* Cinematic dark overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, rgba(22,58,54,0.78) 0%, rgba(22,58,54,0.6) 40%, rgba(22,58,54,0.88) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)', zIndex: 2 }} />

      {/* Soft light rays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden' }}>
        {[[-20, 0.06], [0, 0.04], [20, 0.05]].map(([angle, opacity], i) => (
          <div
            key={i}
            style={{
              position: 'absolute', top: 0, left: '50%',
              width: 3, height: '80%',
              background: `linear-gradient(to bottom, rgba(230,196,138,${opacity}), transparent)`,
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: 'top center',
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Edge blur */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, boxShadow: 'inset 0 0 120px rgba(22,58,54,0.6)' }} />

      {/* Grid */}
      <GridOverlay opacity={0.03} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: 800, width: '100%' }}>
        {/* Pill */}
        <div
          style={{
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-16px)',
            transition: 'all 0.8s cubic-bezier(.16,1,.3,1) 0.1s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(230,196,138,0.12)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(230,196,138,0.3)', borderRadius: 999,
            padding: '8px 20px', marginBottom: '2rem', cursor: 'default',
          }}
        >
          <span style={{ color: C.gold, fontSize: '0.7rem' }}>✦</span>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.72rem', letterSpacing: '0.16em', color: C.gold, textTransform: 'uppercase', fontWeight: 500 }}>
            About VIIT E-Cell
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-head)', fontWeight: 700, lineHeight: 1.1,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            color: C.white, marginBottom: '1.5rem',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.25s',
            letterSpacing: '-0.02em',
          }}
        >
          Where Passion Meets{' '}
          <span
            style={{
              color: C.gold,
              textShadow: `0 0 40px rgba(230,196,138,0.4)`,
            }}
          >
            Entrepreneurial Execution
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(215,215,215,0.85)', lineHeight: 1.7, fontWeight: 300,
            maxWidth: 660, margin: '0 auto 3rem',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.4s',
          }}
        >
          VIIT Entrepreneurship Cell is the student-driven catalyst transforming innovative sparks into market-ready ventures.
        </p>

        {/* Stat Cards */}
        <div
          style={{
            display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.58s',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-card glass"
              style={{
                borderRadius: 16, padding: '1.2rem 1.8rem', minWidth: 150, textAlign: 'center',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{s.icon}</div>
              <AnimatedCount target={s.value} suffix={s.suffix} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.gray, marginTop: 4, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          marginTop: '2.5rem',
          zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: loaded ? 0.7 : 0, transition: 'opacity 1s ease 1.2s',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: C.gray, textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 35, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, animation: 'scroll-bob 2s ease-in-out infinite' }} />
      </div>

      {/* Wave divider */}
      <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, zIndex: 6 }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '100%', height: 70, display: 'block' }}>
          <path d="M0,40 C240,80 480,0 720,45 C960,90 1200,20 1440,50 L1440,90 L0,90 Z" fill={C.green} />
        </svg>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// ABOUT / IIT BOMBAY SECTION
// ════════════════════════════════════════════════════════════
const CHIPS = [
  { icon: '🧭', label: 'Nationwide Mentor Pool' },
  { icon: '🏆', label: 'NEC Participation' },
  { icon: '🚀', label: 'Startup Bootcamps' },
  { icon: '⚡', label: 'E-Summit Access' },
];

function AboutSection() {
  return (
    <section style={{ background: C.green, padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <Blobs variant="dark" />
      <GridOverlay opacity={0.035} />
      <Particles />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.goldDim }}>
              Our Foundation
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.goldDim}, transparent)`, maxWidth: 200, animation: 'line-grow 1s ease both' }} />
          </div>
        </Reveal>

        {/* Asymmetric layout: large feature card + side stack */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>

          {/* IIT Bombay — BIG feature card */}
          <Reveal delay={0.1} style={{ gridColumn: 'span 1' }}>
            <div
              className="gold-border-shimmer"
              style={{
                background: `linear-gradient(135deg, rgba(33,71,65,0.8) 0%, rgba(22,58,54,0.95) 100%)`,
                backdropFilter: 'blur(24px)',
                borderRadius: 24,
                padding: '2.8rem',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${C.glassBdr}`,
                boxShadow: `0 0 0 1px transparent, 0 32px 64px rgba(0,0,0,0.3)`,
              }}
            >
              {/* BG glow */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, rgba(230,196,138,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

              {/* Icon badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: `rgba(230,196,138,0.12)`, border: `1px solid ${C.goldDim}`, fontSize: '1.6rem', marginBottom: '1.5rem', boxShadow: `0 0 32px rgba(230,196,138,0.2)` }}>
                🏛️
              </div>

              {/* Gold connector line */}
              <div style={{ width: 40, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginBottom: '1.2rem', borderRadius: 2 }} />

              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: C.white, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                IIT Bombay<br />
                <span style={{ color: C.gold }}>E-Cell Affiliation</span>
              </h2>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(215,215,215,0.75)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
                VIIT E-Cell operates under the prestigious umbrella of IIT Bombay's Entrepreneurship Cell — one of Asia's largest student-run entrepreneurship organisations. This affiliation grants our students unparalleled access to world-class resources, mentors, and a thriving national network.
              </p>

              {/* Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {CHIPS.map(c => (
                  <div
                    key={c.label}
                    className="chip glass"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 999,
                      fontSize: '0.75rem', fontFamily: 'var(--font-body)',
                      color: C.gray, fontWeight: 400,
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>{c.icon}</span>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right column — two stacked cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Who We Are */}
            <Reveal delay={0.2}>
              <div className="glass" style={{ borderRadius: 24, padding: '2.2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, rgba(230,196,138,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(230,196,138,0.1)', border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>💡</div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.72rem', letterSpacing: '0.18em', color: C.goldDim, textTransform: 'uppercase' }}>Who We Are</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: C.white, marginBottom: '0.8rem', letterSpacing: '-0.01em' }}>
                  Student-Led. Innovation-Driven.
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.87rem', color: 'rgba(215,215,215,0.7)', lineHeight: 1.75, fontWeight: 300 }}>
                  Founded by students, for students — VIIT E-Cell bridges the gap between academic learning and real-world entrepreneurial action. We cultivate a mindset of creation, disruption, and sustainable growth.
                </p>
              </div>
            </Reveal>

            {/* Numbers at a glance */}
            <Reveal delay={0.3}>
              <div
                style={{
                  background: `linear-gradient(135deg, rgba(33,71,65,0.7), rgba(22,58,54,0.9))`,
                  borderRadius: 24, padding: '2.2rem',
                  border: `1px solid rgba(230,196,138,0.12)`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(230,196,138,0.1)', border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📊</div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.72rem', letterSpacing: '0.18em', color: C.goldDim, textTransform: 'uppercase' }}>Impact at a Glance</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  {[['5+', 'Years Active'], ['200+', 'Core Members'], ['₹2Cr+', 'Funding Raised'], ['15+', 'Awards Won']].map(([n, l]) => (
                    <div key={l} style={{ borderTop: `1px solid rgba(230,196,138,0.12)`, paddingTop: '0.8rem' }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, color: C.gold, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(215,215,215,0.5)', marginTop: 3, letterSpacing: '0.06em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// VISION SECTION
// ════════════════════════════════════════════════════════════
function VisionSection() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{ background: C.teal, padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <Blobs variant="light" />
      <GridOverlay opacity={0.04} />

      {/* Faded world map/network bg */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
        <svg viewBox="0 0 800 400" style={{ width: '90%', maxWidth: 900, opacity: 0.04 }}>
          {Array.from({ length: 24 }, (_, i) => {
            const x = 40 + (i % 8) * 100;
            const y = 60 + Math.floor(i / 8) * 140;
            return <circle key={i} cx={x} cy={y} r={4} fill={C.gold} />;
          })}
          {Array.from({ length: 20 }, (_, i) => {
            const x1 = 40 + (i % 7) * 100;
            const y1 = 60 + Math.floor(i / 7) * 140;
            const x2 = x1 + 100 + (Math.random() * 100 - 50);
            const y2 = y1 + (Math.random() * 80 - 40);
            return <line key={i} x1={x1} y1={y1} x2={Math.min(760, Math.max(40, x2))} y2={Math.min(340, Math.max(60, y2))} stroke={C.gold} strokeWidth={0.8} />;
          })}
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.goldDim})`, maxWidth: 200 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.goldDim }}>Our Vision</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.goldDim})`, maxWidth: 200 }} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="gold-border-shimmer"
            style={{
              background: `linear-gradient(135deg, rgba(22,58,54,0.85) 0%, rgba(33,71,65,0.7) 100%)`,
              backdropFilter: 'blur(32px)',
              borderRadius: 28,
              padding: 'clamp(2.5rem,5vw,4rem)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${C.glassBdr}`,
              transition: 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.5s ease',
              transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: hovered
                ? `0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(230,196,138,0.3), 0 0 80px rgba(230,196,138,0.08)`
                : `0 24px 48px rgba(0,0,0,0.25)`,
            }}
          >
            {/* BG glow rings */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', border: `1px solid rgba(230,196,138,0.06)`, animation: 'pulse-ring 4s ease-in-out infinite', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', border: `1px solid rgba(230,196,138,0.04)`, animation: 'pulse-ring 4s ease-in-out infinite', animationDelay: '-2s', pointerEvents: 'none' }} />

            {/* Compass icon */}
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 80, height: 80, borderRadius: 24,
                background: `radial-gradient(circle, rgba(230,196,138,0.15), rgba(230,196,138,0.05))`,
                border: `1px solid ${C.goldDim}`,
                fontSize: '2.2rem', marginBottom: '2rem',
                boxShadow: `0 0 40px rgba(230,196,138,0.25)`,
                animation: 'spin-slow 20s linear infinite',
              }}
            >
              🧭
            </div>

            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 700, color: C.white, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
              To emerge as a premier launchpad and{' '}
              <span style={{ color: C.gold, textShadow: `0 0 30px rgba(230,196,138,0.35)` }}>Centre of Excellence</span>
              {' '}for student entrepreneurs
            </h2>

            <div style={{ width: 60, height: 2, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`, margin: '0 auto 1.5rem', borderRadius: 2 }} />

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.92rem,1.8vw,1.05rem)', color: 'rgba(215,215,215,0.75)', lineHeight: 1.8, fontWeight: 300, maxWidth: 650, margin: '0 auto' }}>
              We empower innovators, researchers, and future leaders by fostering a culture of creativity, deep technology, sustainability, and startup excellence — contributing towards Viksit Bharat 2047 through impactful innovation-led development.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// MISSION SECTION
// ════════════════════════════════════════════════════════════
const MISSIONS = [
  {
    icon: '🌱',
    step: '01',
    title: 'Innovation Ecosystem',
    desc: 'Cultivating a vibrant, idea-rich environment where bold thinking is rewarded, cross-disciplinary collaboration flourishes, and every student is empowered to experiment without fear of failure.',
  },
  {
    icon: '🛠️',
    step: '02',
    title: 'Entrepreneurial Skills',
    desc: 'Equipping students with Design Thinking, Lean Startup frameworks, financial literacy, pitch preparation, and leadership tools to build globally competitive ventures.',
  },
  {
    icon: '🤝',
    step: '03',
    title: 'Strategic Collaboration',
    desc: 'Forging strategic partnerships with industry leaders, investors, incubators, research labs, and academic institutions to create clear funding and market channels.',
  },
  {
    icon: '⚖️',
    step: '04',
    title: 'Intellectual Property',
    desc: 'Facilitating patenting, trademarks, copyrights, technology transfer, and startup creation through an effective Intellectual Property Management ecosystem.',
  },
];

function MissionCard({ m, index }: { m: typeof MISSIONS[0]; index: number }) {
  const { ref, vis } = useReveal(0.12);
  const [hov, setHov] = useState(false);
  const offsets = [0, 16, 8, 24];

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? `translateY(${offsets[index]}px)` : `translateY(${offsets[index] + 40}px)`,
        transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${index * 0.14}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${index * 0.14}s`,
      }}
    >
      <div
        className="mission-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov
            ? `linear-gradient(135deg, rgba(33,71,65,0.9), rgba(22,58,54,0.95))`
            : `linear-gradient(135deg, rgba(22,58,54,0.7), rgba(33,71,65,0.6))`,
          backdropFilter: 'blur(20px)',
          border: hov ? `1px solid rgba(230,196,138,0.35)` : `1px solid rgba(230,196,138,0.12)`,
          borderRadius: 24,
          padding: '2.4rem',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: hov
            ? `0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(230,196,138,0.2), inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 8px 32px rgba(0,0,0,0.2)`,
          transition: 'all 0.5s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div style={{ position: 'absolute', top: -10, right: 16, fontFamily: 'var(--font-head)', fontSize: '6rem', fontWeight: 800, color: C.gold, opacity: hov ? 0.1 : 0.05, lineHeight: 1, userSelect: 'none', transition: 'opacity 0.4s ease' }}>
          {m.step}
        </div>
        {hov && <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, rgba(230,196,138,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', color: C.goldDim, textTransform: 'uppercase' }}>Step {m.step}</div>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, rgba(230,196,138,0.3), transparent)` }} />
        </div>

        <div
          className="mission-icon"
          style={{
            width: 56, height: 56, borderRadius: 16,
            background: hov ? `rgba(230,196,138,0.15)` : `rgba(230,196,138,0.08)`,
            border: `1px solid rgba(230,196,138,${hov ? 0.4 : 0.15})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', marginBottom: '1.2rem',
            boxShadow: hov ? `0 0 24px rgba(230,196,138,0.2)` : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          {m.icon}
        </div>

        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 700, color: hov ? C.gold : C.white, marginBottom: '0.8rem', letterSpacing: '-0.01em', transition: 'color 0.3s ease' }}>
          {m.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(215,215,215,0.65)', lineHeight: 1.75, fontWeight: 300 }}>
          {m.desc}
        </p>
      </div>
    </div>
  );
}

function MissionSection() {
  return (
    <section style={{ background: C.green, padding: '6rem 1.5rem 7rem', position: 'relative', overflow: 'hidden' }}>
      <Blobs variant="dark" />
      <GridOverlay opacity={0.032} />
      <Particles />

      <div style={{ position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-head)', fontSize: '22vw', fontWeight: 800, color: C.gold, opacity: 0.022, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', letterSpacing: '-0.05em' }}>
        MISSION
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem', background: 'rgba(230,196,138,0.08)', border: `1px solid rgba(230,196,138,0.18)`, borderRadius: 999, padding: '6px 16px' }}>
              <span style={{ color: C.gold, fontSize: '0.65rem' }}>✦</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.22em', color: C.goldDim, textTransform: 'uppercase' }}>Our Mission</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700, color: C.white, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Four pillars.{' '}
              <span style={{ color: C.gold }}>One purpose.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(215,215,215,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
              Every initiative we build, every event we run, every startup we support — traces back to these four pillars.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {MISSIONS.map((m, i) => <MissionCard key={m.title} m={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// CLOSING CTA
// ════════════════════════════════════════════════════════════
function ClosingSection() {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();

  return (
    <section style={{ background: C.teal, padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <Blobs variant="light" />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,196,138,0.04) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <GridOverlay opacity={0.038} />

      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(230,196,138,0.1)', border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem', boxShadow: `0 0 40px rgba(230,196,138,0.15)`, animation: 'floatSlow 6s ease-in-out infinite' }}>
            🌟
          </div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 700, color: C.white, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.2rem' }}>
            Ready to build the{' '}
            <span style={{ color: C.gold }}>next big thing?</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(215,215,215,0.65)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2.5rem' }}>
            Join VIIT E-Cell and be part of a generation rewriting what's possible from a campus.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/contact')}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.9rem',
                padding: '14px 32px', borderRadius: 12,
                background: hov ? `linear-gradient(135deg, #e6c48a, #d4a85a)` : C.gold,
                color: C.green, border: 'none', cursor: 'pointer',
                letterSpacing: '0.02em',
                transform: hov ? 'translateY(-3px) scale(1.02)' : 'translateY(0)',
                boxShadow: hov ? `0 16px 40px rgba(230,196,138,0.35)` : `0 8px 24px rgba(230,196,138,0.2)`,
                transition: 'all 0.35s cubic-bezier(.16,1,.3,1)',
              }}
            >
              Join E-Cell ✦
            </button>
            <button
              onClick={() => navigate('/events')}
              style={{
                fontFamily: 'var(--font-head)', fontWeight: 500, fontSize: '0.9rem',
                padding: '14px 32px', borderRadius: 12,
                background: 'transparent', color: C.gray,
                border: `1px solid rgba(215,215,215,0.2)`,
                cursor: 'pointer', letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldDim; (e.target as HTMLElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(215,215,215,0.2)'; (e.target as HTMLElement).style.color = C.gray; }}
            >
              Explore Events →
            </button>
          </div>
        </Reveal>

        {/* Bottom credits */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: `1px solid rgba(230,196,138,0.08)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(215,215,215,0.28)', textTransform: 'uppercase' }}>© VIIT E-Cell 2026</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, opacity: i === 0 ? 0.7 : 0.15 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(215,215,215,0.28)', textTransform: 'uppercase' }}>Powered by IIT Bombay E-Cell</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN ABOUT COMPONENT
// ════════════════════════════════════════════════════════════
export default function About() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: C.green, overflowX: 'hidden' }}>
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <MissionSection />
      <ClosingSection />
    </div>
  );
}
