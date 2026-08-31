import { useEffect, useRef, useState, type ReactNode } from 'react'

// ─── Palette ───────────────────────────────────────────────
const C = {
  green: '#183A37',
  cream: '#EFD6AC',
  rose:  '#815355',
  plum:  '#523249',
  creamDark: '#e5c99a',
  creamLight: '#f7edd8',
}

// ─── Team Data ─────────────────────────────────────────────
const PRESIDENT = {
  name: 'Sunnapu Likitha',
  title: 'President',
  tagline: 'Leading with Vision & Excellence',
  bio: 'Likitha serves as the President of the NEC Cell, providing strategic direction and ensuring every initiative aligns with the organization\'s mission. She oversees end-to-end operations, coordinates across all departments, guides the leadership team, and drives innovation through effective planning and execution. From decision-making to event success, she ensures every activity is delivered with excellence.',
  quote: 'Leading with vision, execution, and unwavering commitment to excellence.',
  img: '/team/president.JPG',
};

const VPS = [
  {
    name: 'Md. Khaja Eshaq',
    title: 'Social Media Lead',
    bio: 'Md. Khaja Eshaq leads the Social Media team, managing the organization\'s online identity across all platforms. He plans content strategies, designs engaging campaigns, oversees post creation, coordinates with design and media teams, and ensures consistent branding. His work helps increase visibility, audience engagement, and the overall digital impact of the NEC Cell.',
    img: '/team/vice_president1.JPG',
    quote: 'Building the Digital Presence',
  },
  {
    name: 'Peela Leela',
    title: 'Technical Lead',
    bio: 'Peela Leela heads the Technical team, driving the development of digital solutions and technical initiatives. From managing websites and technical infrastructure to supporting hackathons, workshops, and innovative projects, he ensures the organization stays technologically advanced while providing guidance to the technical team.',
    img: '/team/vice_president2.JPG',
    quote: 'Powering Innovation Through Technology',
  },
  {
    name: 'CH Manoj',
    title: 'Organizing Lead',
    bio: 'CH Manoj leads the Organizing team, ensuring every event is executed seamlessly from planning to completion. He manages logistics, coordinates volunteers, oversees schedules, and works closely with all departments to deliver impactful and well-organized experiences. His leadership ensures smooth execution and operational excellence.',
    img: '/team/vice_president3.JPG',
    quote: 'Turning Ideas into Successful Events',
  },
];

const SECRETARIES = [
  {
    name: 'Kadagalla Prasad',
    title: 'Secretary, Event Manager',
    img: '/team/prasad.JPG',
  },
  {
    name: 'Jureddy Manideep',
    title: 'Secretary, Technical Manager',
    img: '/team/manideep.JPG',
  },
  {
    name: 'Vanjarapu Eswara Vara Prasad',
    title: 'Secretary, Social Media',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sai Teja',
    title: 'Secretary, Content Creator',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
]

// ─── Reveal Hook ────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ─── Section Wrapper ────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Magazine Rule ──────────────────────────────────────────
function Rule({ color = C.green, my = 0 }: { color?: string; my?: number }) {
  return <div style={{ height: 1, background: color, marginTop: my, marginBottom: my, width: '100%' }} />
}

// ─── Decorative BG shapes ───────────────────────────────────
function BgShapes() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Large faded letterform */}
      <div style={{
        position: 'absolute', top: -80, right: -60, fontSize: '32vw', fontFamily: 'var(--font-display)',
        fontStyle: 'italic', fontWeight: 300, color: C.green, opacity: 0.025, lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
      }}>E</div>
      {/* Decorative circles */}
      <div className="deco-circle" style={{
        position: 'absolute', top: '12%', left: '6%', width: 180, height: 180,
        border: `1px solid ${C.rose}`, opacity: 0.18,
      }} />
      <div className="deco-circle" style={{
        position: 'absolute', bottom: '8%', right: '8%', width: 320, height: 320,
        border: `1px solid ${C.green}`, opacity: 0.08,
        animationDelay: '-3s',
      }} />
      <div style={{
        position: 'absolute', top: '35%', left: '3%', width: 2, height: 260,
        background: `linear-gradient(to bottom, transparent, ${C.rose}, transparent)`, opacity: 0.3,
      }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// MAGAZINE COVER / HERO
// ═══════════════════════════════════════════════════════════
function CoverSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section style={{ background: C.cream, position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <div className="grid-overlay" />
      <BgShapes />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '2rem 0 1.5rem',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.1s',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: C.green, letterSpacing: '0.02em' }}>
              E·CELL
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.rose }}>
              Entrepreneurship Cell
            </span>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {['People', 'Vision', 'Archive'].map(l => (
              <span key={l} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green, opacity: 0.55 }}>{l}</span>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', color: C.green, opacity: 0.5 }}>VOL. XII · ISSUE 01</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', color: C.rose, marginTop: 2 }}>2025 – 2026</div>
          </div>
        </div>

        <Rule color={C.green} />

        {/* Hero layout */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2.4fr 1fr',
          gap: '3rem', paddingTop: '3rem', paddingBottom: '3rem', alignItems: 'start',
        }}>
          {/* Left column */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.4s',
          }}>
            <div className="vert-text" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: C.green, opacity: 0.45, marginBottom: '2rem',
            }}>
              People of the Year
            </div>
            <Rule color={C.rose} my={24} />
            <div style={{ marginTop: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: C.green, opacity: 0.5, letterSpacing: '0.12em', lineHeight: 1.9 }}>
                The visionaries,<br />operators,<br />and builders behind<br />the Cell.
              </p>
            </div>
            <div style={{ marginTop: '4rem', width: 48, height: 48, borderRadius: '50%', border: `1px solid ${C.rose}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: C.rose }}>↓</span>
            </div>
          </div>

          {/* Center — main headline */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: C.rose, letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '1.2rem',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 0.5s',
            }}>
              Annual People Issue
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 11vw, 10rem)',
              fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.02em',
              color: C.green, margin: '0 0 0.3em',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1.1s cubic-bezier(.16,1,.3,1) 0.3s',
            }}>
              Meet<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>Our</em><br />Team
            </h1>
            <Rule color={C.green} my={24} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              letterSpacing: '0.12em', color: C.green, opacity: 0.55,
              textTransform: 'uppercase',
              opacity: loaded ? 0.55 : 0,
              transition: 'opacity 0.8s ease 0.8s',
            }}>
              The Faces Shaping Tomorrow
            </p>
          </div>

          {/* Right column */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(24px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.6s',
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300, color: C.plum, opacity: 0.15, lineHeight: 1 }}>01</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: C.green, opacity: 0.4, textTransform: 'uppercase' }}>President</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300, color: C.plum, opacity: 0.15, lineHeight: 1 }}>03</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: C.green, opacity: 0.4, textTransform: 'uppercase' }}>Vice Presidents</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300, color: C.plum, opacity: 0.15, lineHeight: 1 }}>04</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: C.green, opacity: 0.4, textTransform: 'uppercase' }}>Secretaries</div>
            </div>
          </div>
        </div>

        <Rule color={C.green} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.green, opacity: 0.4 }}>© E-CELL 2025</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: C.rose, opacity: i === 0 ? 0.8 : 0.2 }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.green, opacity: 0.4 }}>PAGE 01 / 08</span>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// PRESIDENT SPREAD
// ═══════════════════════════════════════════════════════════
function PresidentSpread() {
  return (
    <section style={{ background: C.green, position: 'relative', overflow: 'hidden' }}>
      {/* Faded bg text */}
      <div style={{
        position: 'absolute', bottom: -40, left: -20, fontFamily: 'var(--font-display)',
        fontSize: '28vw', fontWeight: 700, color: C.cream, opacity: 0.03,
        userSelect: 'none', lineHeight: 1, pointerEvents: 'none',
      }}>P</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
        {/* Section label */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '3rem 0 2rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: C.cream, opacity: 0.4, textTransform: 'uppercase' }}>Chapter I</div>
            <div style={{ flex: 1, height: 1, background: C.cream, opacity: 0.12 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: C.rose, opacity: 0.8 }}>The President</div>
          </div>
        </Reveal>

        {/* Main spread */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', paddingBottom: '5rem', alignItems: 'start' }}>
          {/* Left: portrait */}
          <Reveal delay={0.1}>
            <div style={{ position: 'relative' }}>
              <div className="president-img-wrap" style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '3/4' }}>
                <img src={PRESIDENT.img} alt={PRESIDENT.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                {/* Overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.green}cc 0%, transparent 50%)` }} />
              </div>
              {/* Floating name over image */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: C.rose, textTransform: 'uppercase', marginBottom: 8 }}>President · E-Cell</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, color: C.cream, margin: 0, lineHeight: 1.0 }}>
                  {PRESIDENT.name}
                </h2>
              </div>
              {/* Corner decoration */}
              <div style={{ position: 'absolute', top: -1, right: -1, width: 40, height: 40, borderTop: `2px solid ${C.rose}`, borderRight: `2px solid ${C.rose}` }} />
              <div style={{ position: 'absolute', bottom: -1, left: -1, width: 40, height: 40, borderBottom: `2px solid ${C.rose}`, borderLeft: `2px solid ${C.rose}` }} />
            </div>
          </Reveal>

          {/* Right: editorial content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '2rem' }}>
            <Reveal delay={0.2}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: C.cream, lineHeight: 1.2 }}>
                {PRESIDENT.tagline}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ height: 1, background: C.cream, opacity: 0.15 }} />
            </Reveal>

            <Reveal delay={0.35}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.9, color: C.cream, opacity: 0.7, fontWeight: 300 }}>
                {PRESIDENT.bio}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <blockquote style={{
                margin: 0, padding: '1.5rem 2rem',
                borderLeft: `3px solid ${C.rose}`,
                background: `rgba(129,83,85,0.1)`,
                borderRadius: '0 4px 4px 0',
              }}>
                <p className="pull-quote" style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: '1.2rem', color: C.cream, opacity: 0.9,
                  margin: 0, lineHeight: 1.6,
                }}>
                  {PRESIDENT.quote}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.5}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ width: 32, height: 1, background: C.rose, opacity: 0.6 }} />
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.85rem', color: C.cream, opacity: 0.35 }}>
                  Entrepreneurship Cell · Annual Report
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// DIVIDER — FULL-WIDTH QUOTE
// ═══════════════════════════════════════════════════════════
function QuoteDivider() {
  return (
    <section style={{ background: C.plum, padding: '6rem 3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)', fontSize: '40vw', fontWeight: 700,
        color: C.cream, opacity: 0.03, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>VP</div>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: C.cream, opacity: 0.4, textTransform: 'uppercase', marginBottom: '2rem' }}>
            Chapter II — Vice Presidents
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: C.cream, lineHeight: 1.3 }}>
            Three voices. One direction.<br />Infinite momentum.
          </div>
          <div style={{ width: 48, height: 1, background: C.rose, margin: '2.5rem auto 0', opacity: 0.6 }} />
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// VP SECTION — EDITORIAL ASYMMETRIC
// ═══════════════════════════════════════════════════════════
function VPSection() {
  return (
    <section style={{ background: C.cream, padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Faded chapter number */}
      <div style={{
        position: 'absolute', top: '5%', right: '-2%', fontFamily: 'var(--font-display)',
        fontSize: '22vw', fontWeight: 700, color: C.green, opacity: 0.04,
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>02</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
        {/* VP 1 — Large left image, text right */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '7rem' }}>
            <div className="vp-card" style={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 16px 48px rgba(24,58,55,0.12)' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <div className="img-inner" style={{ width: '100%', height: '100%' }}>
                  <img src={VPS[0].img} alt={VPS[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Paper frame */}
                <div style={{ position: 'absolute', inset: 8, border: `1px solid rgba(239,214,172,0.4)`, borderRadius: 1, pointerEvents: 'none' }} />
                {/* Glass overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.green}55 0%, transparent 45%)` }} />
                {/* Role badge */}
                <div style={{ position: 'absolute', top: 20, left: 20, background: `rgba(239,214,172,0.15)`, backdropFilter: 'blur(8px)', border: `1px solid rgba(239,214,172,0.3)`, borderRadius: 2, padding: '6px 14px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.cream, textTransform: 'uppercase' }}>{VPS[0].title}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: C.rose, textTransform: 'uppercase', opacity: 0.8 }}>
                No. 01 · Vice President
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 600, color: C.green, lineHeight: 1.0, margin: 0 }}>
                {VPS[0].name}
              </h3>
              <div style={{ height: 1, background: C.green, opacity: 0.12 }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.85, color: C.green, opacity: 0.65, fontWeight: 300 }}>{VPS[0].bio}</p>
              <blockquote style={{ margin: 0, paddingLeft: '1.2rem', borderLeft: `2px solid ${C.rose}` }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', color: C.plum, margin: 0, lineHeight: 1.5 }}>
                  "{VPS[0].quote}"
                </p>
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* VP 2 — Text left, tall image right, slight rotation */}
        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'center', marginBottom: '7rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: C.plum, textTransform: 'uppercase', opacity: 0.7 }}>
                No. 02 · Vice President
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 600, color: C.green, lineHeight: 1.0, margin: 0 }}>
                {VPS[1].name}
              </h3>
              <div style={{ height: 1, background: C.green, opacity: 0.12 }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.85, color: C.green, opacity: 0.65, fontWeight: 300 }}>{VPS[1].bio}</p>
              <blockquote style={{ margin: 0, paddingLeft: '1.2rem', borderLeft: `2px solid ${C.plum}` }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', color: C.plum, margin: 0, lineHeight: 1.5 }}>
                  "{VPS[1].quote}"
                </p>
              </blockquote>
              {/* Decorative element */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: '0.5rem' }}>
                {[0,1,2,3].map(i => <div key={i} style={{ width: i === 0 ? 24 : 8, height: 1, background: C.rose, opacity: i === 0 ? 0.6 : 0.2 }} />)}
              </div>
            </div>
            <div className="vp-card" style={{ borderRadius: 2, boxShadow: '0 20px 60px rgba(24,58,55,0.14)', transform: 'rotate(1deg)' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <div className="img-inner" style={{ width: '100%', height: '100%' }}>
                  <img src={VPS[1].img} alt={VPS[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.plum}66 0%, transparent 50%)` }} />
                <div style={{ position: 'absolute', top: 20, right: 20, background: `rgba(82,50,73,0.2)`, backdropFilter: 'blur(8px)', border: `1px solid rgba(239,214,172,0.25)`, borderRadius: 2, padding: '6px 14px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.cream, textTransform: 'uppercase' }}>{VPS[1].title}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* VP 3 — Wide horizontal layout */}
        <Reveal delay={0.1}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.8fr 0.8fr', gap: '3rem', alignItems: 'stretch',
            background: C.green, borderRadius: 4, overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(24,58,55,0.18)',
          }}>
            {/* Left text */}
            <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', color: C.rose, textTransform: 'uppercase', opacity: 0.9, marginBottom: '1rem' }}>No. 03</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 600, color: C.cream, lineHeight: 1.05, margin: '0 0 1.5rem' }}>
                  {VPS[2].name}
                </h3>
                <div style={{ height: 1, background: C.cream, opacity: 0.12, marginBottom: '1.5rem' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.85, color: C.cream, opacity: 0.6, fontWeight: 300 }}>{VPS[2].bio}</p>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: C.rose, opacity: 0.8, lineHeight: 1.5 }}>
                "{VPS[2].quote}"
              </div>
            </div>
            {/* Center image */}
            <div className="vp-card" style={{ overflow: 'hidden', borderRadius: 0 }}>
              <div style={{ position: 'relative', height: '100%', minHeight: 420, overflow: 'hidden' }}>
                <div className="img-inner" style={{ width: '100%', height: '100%' }}>
                  <img src={VPS[2].img} alt={VPS[2].name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${C.green}44 0%, transparent 30%, transparent 70%, ${C.green}22)` }} />
              </div>
            </div>
            {/* Right detail */}
            <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1.5rem' }}>
              <div className="vert-text" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '0.8rem', color: C.cream, opacity: 0.2, alignSelf: 'flex-end' }}>
                {VPS[2].title}
              </div>
              <Rule color={`rgba(239,214,172,0.12)`} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.cream, opacity: 0.3, textTransform: 'uppercase' }}>E-Cell · 2025</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECRETARIES — COLLAGE SPREAD
// ═══════════════════════════════════════════════════════════
function SecretariesSection() {
  // Offsets for Polaroid-style rotation
  const rotations = [-2, 1.5, -1, 2.5]
  const offsets = [0, -20, 12, -8]

  return (
    <section style={{ background: C.creamLight ?? '#f7edd8', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG decorative */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-display)', fontSize: '20vw', fontWeight: 700, color: C.green, opacity: 0.025, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        SECRETARIES
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${C.rose}, transparent)`, opacity: 0.3 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.3em', color: C.rose, textTransform: 'uppercase', marginBottom: '0.8rem' }}>Chapter III</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 600, color: C.green, lineHeight: 0.95, margin: 0 }}>
                The<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>Secretaries</em>
              </h2>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.green, opacity: 0.5, maxWidth: 260, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                Four pillars. Each a domain expert. Together, the operational core of the Cell.
              </p>
            </div>
          </div>
          <Rule color={C.green} />
        </Reveal>

        {/* Collage grid — intentionally asymmetric */}
        <div style={{ paddingTop: '3rem', position: 'relative' }}>
          {/* Row 1: Two large + one small */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.75fr 1.15fr 0.9fr', gap: '2rem', alignItems: 'end' }}>
            {SECRETARIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <div
                  className="sec-card"
                  style={{
                    background: 'white',
                    borderRadius: 2,
                    padding: '10px 10px 32px',
                    boxShadow: '0 12px 40px rgba(24,58,55,0.1)',
                    transform: `rotate(${rotations[i]}deg) translateY(${offsets[i]}px)`,
                    transition: 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.5s ease',
                  }}
                >
                  {/* Photo */}
                  <div style={{ overflow: 'hidden', aspectRatio: i % 2 === 0 ? '3/4' : '4/5', position: 'relative' }}>
                    <div className="img-inner" style={{ width: '100%', height: '100%' }}>
                      <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    {/* Glass label */}
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      borderRadius: 1, padding: '4px 10px',
                    }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'white', textTransform: 'uppercase' }}>{s.title.split(',')[0]}</span>
                    </div>
                  </div>
                  {/* Polaroid caption area */}
                  <div style={{ paddingTop: 12, paddingLeft: 4 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: C.green, lineHeight: 1.2 }}>{s.name}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.12em', color: C.rose, marginTop: 3, textTransform: 'uppercase', opacity: 0.8 }}>
                      {s.title}
                    </div>
                    {/* Signature line */}
                    <div style={{ marginTop: 8, height: 1, width: 32, background: C.green, opacity: 0.15 }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// CLOSING PAGE
// ═══════════════════════════════════════════════════════════
function ClosingSection() {
  return (
    <section style={{ background: C.green, padding: '7rem 3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(239,214,172,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,214,172,0.03) 1px, transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.3em', color: C.cream, opacity: 0.35, textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            Fin — E-Cell People Issue 2025
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: C.cream, lineHeight: 1.1, marginBottom: '2.5rem' }}>
            Every great venture<br />begins with the right people.
          </h2>
          <div style={{ width: 48, height: 1, background: C.rose, margin: '0 auto 2.5rem', opacity: 0.6 }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: C.cream, opacity: 0.45, fontWeight: 300, lineHeight: 1.8, maxWidth: 480, margin: '0 auto 3rem' }}>
            Together, this team leads with purpose, builds with intention, and inspires the next generation of entrepreneurs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ height: 1, width: 40, background: C.cream, opacity: 0.15 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', color: C.rose, opacity: 0.7 }}>E·Cell · 2025 – 2026</span>
            <div style={{ height: 1, width: 40, background: C.cream, opacity: 0.15 }} />
          </div>
        </Reveal>
      </div>

      {/* Bottom publication bar */}
      <div style={{ maxWidth: 1280, margin: '5rem auto 0', padding: '1.5rem 0 0', borderTop: `1px solid rgba(239,214,172,0.1)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.cream, opacity: 0.25 }}>© ENTREPRENEURSHIP CELL 2025</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: C.rose, opacity: i < 2 ? 0.7 : 0.15 }} />
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', color: C.cream, opacity: 0.25 }}>VOL. XII — FINAL PAGE</span>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════
export default function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: C.cream }}>
      <CoverSection />
      <PresidentSpread />
      <QuoteDivider />
      <VPSection />
      <SecretariesSection />
      <ClosingSection />
    </div>
  )
}
