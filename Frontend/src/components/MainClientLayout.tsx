import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import IntroPage from '@/components/IntroPage';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Calendar, Image, Users, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ─── Official Quick Navigation Cards ─── */
const quickNavItems = [
  {
    title: 'About E-Cell',
    subtitle: 'Our Story',
    description: 'Vision, mission & IIT Bombay affiliation driving innovation.',
    to: '/about',
    iconGradient: 'from-blue-600 to-indigo-600',
    icon: Target,
  },
  {
    title: 'Events & Summits',
    subtitle: 'What We Do',
    description: 'Annual summits, hackathons & expert speaker series.',
    to: '/events',
    iconGradient: 'from-indigo-600 to-purple-600',
    icon: Calendar,
  },
  {
    title: 'Photo Gallery',
    subtitle: 'Our Moments',
    description: 'Highlights from pitch competitions & workshops.',
    to: '/gallery',
    iconGradient: 'from-blue-500 to-cyan-600',
    icon: Image,
  },
  {
    title: 'Meet the Team',
    subtitle: 'Who We Are',
    description: 'Faculty mentors & student leaders driving E-Cell.',
    to: '/team',
    iconGradient: 'from-emerald-600 to-teal-600',
    icon: Users,
  },
  {
    title: 'Get in Touch',
    subtitle: 'Contact Us',
    description: 'Reach out for mentorship, events or collaboration.',
    to: '/contact',
    iconGradient: 'from-slate-700 to-slate-900',
    icon: Mail,
  },
];

function QuickNavSection() {
  const { isVisible, ref } = useScrollAnimation(0.08);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 relative overflow-hidden"
      style={{
        background: '#EFD6AC',
      }}
    >
      {/* Animated ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            top: '-10%', left: '-8%',
            background: 'radial-gradient(circle, rgba(24,58,55,0.12) 0%, transparent 70%)',
            animation: 'orb1 8s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '20%', right: '-5%',
            background: 'radial-gradient(circle, rgba(129,83,85,0.1) 0%, transparent 70%)',
            animation: 'orb2 10s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '-5%', left: '40%',
            background: 'radial-gradient(circle, rgba(82,50,73,0.08) 0%, transparent 70%)',
            animation: 'orb3 12s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5 shadow-sm"
            style={{
              background: 'rgba(23, 37, 84, 0.08)',
              border: '1px solid rgba(23, 37, 84, 0.2)',
              color: '#172554',
              fontFamily: '"Satoshi", sans-serif',
            }}
          >
            ✦ Explore Ecosystem
          </div>
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: '"Satoshi", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              letterSpacing: '-0.02em',
              color: '#172554',
            }}
          >
            Everything{' '}
            <span
              style={{
                color: '#172554',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(23, 37, 84, 0.3)',
                textUnderlineOffset: '8px',
              }}
            >
              E-Cell
            </span>{' '}
            Has to Offer
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(23, 37, 84, 0.75)',
              fontSize: '1.1rem',
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            Navigate to any section of our official entrepreneurship portal.
          </p>
        </div>

        {/* ── Glass Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {quickNavItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex flex-col justify-between min-h-[290px] rounded-3xl p-8 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${i * 90}ms`,
                  background: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 16px 36px -10px rgba(23, 37, 84, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px) scale(1.015)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.85)';
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(23, 37, 84, 0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 50px -12px rgba(23, 37, 84, 0.22), 0 0 0 1px rgba(23, 37, 84, 0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.55)';
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255, 255, 255, 0.8)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 36px -10px rgba(23, 37, 84, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)';
                }}
              >
                {/* Top highlight glow bar */}
                <div
                  className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, transparent, #172554, transparent)' }}
                />

                <div>
                  {/* Icon & Subtitle */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconGradient} flex items-center justify-center shadow-md`}
                      style={{
                        boxShadow: '0 8px 20px -4px rgba(23, 37, 84, 0.25)',
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span
                      style={{
                        fontFamily: '"Satoshi", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(23, 37, 84, 0.65)',
                      }}
                    >
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 transition-colors duration-300"
                    style={{
                      fontFamily: '"Satoshi", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(28px, 2.4vw, 38px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      color: '#172554',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      color: 'rgba(23, 37, 84, 0.78)',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div
                  className="pt-6 mt-6 flex items-center justify-end"
                  style={{ borderTop: '1px solid rgba(23, 37, 84, 0.1)' }}
                >
                  <div
                    className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                    style={{
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: '0.825rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#172554',
                    }}
                  >
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes orb1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px, 40px) scale(1.15); } }
        @keyframes orb2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px, 60px) scale(1.1); } }
        @keyframes orb3 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,-50px) scale(1.12); } }
        @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.5; } }
      `}</style>
    </section>
  );
}

/* ─── Main Home Page ─── */
export default function MainClientLayout() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleTriggerIntro = () => {
      setFadeOut(false);
      setShowIntro(true);
    };
    window.addEventListener('trigger-intro-page', handleTriggerIntro);
    return () => window.removeEventListener('trigger-intro-page', handleTriggerIntro);
  }, []);

  const handleEnterSite = () => {
    setFadeOut(true);
    setTimeout(() => setShowIntro(false), 800);
  };

  return (
    <>
      {showIntro && (
        <div
          className={`transition-opacity duration-[800ms] ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <IntroPage onEnter={handleEnterSite} />
        </div>
      )}

      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans page-enter">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <QuickNavSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
