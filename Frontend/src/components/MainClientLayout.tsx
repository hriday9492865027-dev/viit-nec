import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import IntroPage from '@/components/IntroPage';
import GalleryGrid from '@/components/GalleryGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Calendar, Image, Users, Mail, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ─── Official Quick Navigation Cards ─── */
const quickNavItems = [
  {
    title: 'About E-Cell',
    subtitle: 'Our Story',
    description: 'Vision, mission & IIT Bombay affiliation driving innovation.',
    to: '/about',
    iconGradient: 'from-[#163A36] to-[#214741]',
    icon: Target,
  },
  {
    title: 'Events & Summits',
    subtitle: 'What We Do',
    description: 'Annual summits, hackathons & expert speaker series.',
    to: '/events',
    iconGradient: 'from-[#815355] to-[#523249]',
    icon: Calendar,
  },
  {
    title: 'Photo Gallery',
    subtitle: 'Our Moments',
    description: 'Highlights from pitch competitions & workshops.',
    to: '/gallery',
    iconGradient: 'from-[#183A37] to-[#815355]',
    icon: Image,
  },
  {
    title: 'Meet the Team',
    subtitle: 'Who We Are',
    description: 'Faculty mentors & student leaders driving E-Cell.',
    to: '/team',
    iconGradient: 'from-[#523249] to-[#163A36]',
    icon: Users,
  },
  {
    title: 'Get in Touch',
    subtitle: 'Contact Us',
    description: 'Reach out for mentorship, events or collaboration.',
    to: '/contact',
    iconGradient: 'from-[#815355] to-[#183A37]',
    icon: Mail,
  },
];

function QuickNavSection() {
  const { isVisible, ref } = useScrollAnimation(0.05);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 bg-[#fffdf8] tech-grid-pattern text-[#0f0d0c] relative overflow-hidden border-b border-[rgba(24,58,55,0.12)]"
    >
      {/* Animated ambient glow orbs matching Hero & Events */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '700px', height: '500px',
            top: '-5%', left: '-8%',
            background: 'radial-gradient(circle, rgba(239,214,172,0.45) 0%, transparent 70%)',
            animation: 'orb1 12s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '25%', right: '-5%',
            background: 'radial-gradient(circle, rgba(129,83,85,0.14) 0%, transparent 70%)',
            animation: 'orb2 10s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            bottom: '-5%', left: '35%',
            background: 'radial-gradient(circle, rgba(24,58,55,0.10) 0%, transparent 70%)',
            animation: 'orb3 14s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-600/20 text-[#8A5A58]">
            <Sparkles className="w-3.5 h-3.5 text-[#815355]" />
            Explore Ecosystem
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#183A37] tracking-tight leading-tight">
            Everything <span className="gradient-text">E-Cell</span> Has to Offer
          </h2>
          <p className="text-[#5A6772] text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Navigate to any section of our official entrepreneurship portal.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {quickNavItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group relative flex flex-col justify-between min-h-[290px] rounded-3xl p-8 bg-[#fffdf8] border border-[rgba(24,58,55,0.12)] hover:border-[#815355] shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{
                  boxShadow: '0 4px 20px -2px rgba(24,58,55,0.06)',
                }}
              >
                {/* Top highlight glow bar */}
                <div
                  className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #815355, transparent)' }}
                />

                <div>
                  {/* Icon & Subtitle */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconGradient} flex items-center justify-center shadow-md text-white`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#815355]">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#183A37] mb-2 tracking-tight group-hover:text-[#102A27] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-medium text-[#5A6772] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-6 mt-6 border-t border-[rgba(24,58,55,0.08)] flex items-center justify-end">
                  <span className="text-xs font-black uppercase tracking-wider text-[#183A37] group-hover:text-[#815355] flex items-center gap-1.5 transition-colors">
                    Explore Section <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ─── Main Home Page ─── */
export default function MainClientLayout() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ecell_intro_seen') !== 'true';
    }
    return false;
  });
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
    sessionStorage.setItem('ecell_intro_seen', 'true');
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

      <div className="min-h-screen bg-[#fffdf8] text-[#0f0d0c] flex flex-col font-sans page-enter">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <QuickNavSection />
          <GalleryGrid />
        </main>
        <Footer />
      </div>
    </>
  );
}

