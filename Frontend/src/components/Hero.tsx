import React from 'react';
import { Award, ArrowRight, Rocket, Users, Lightbulb, Sparkles, ChevronDown } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

/* ─── Individual animated stat card ─── */
interface StatConfig {
  icon: React.ElementType;
  rawValue: number;
  suffix: string;
  label: string;
  delay: number;
  isText?: boolean;
  textValue?: string;
}

function StatCard({ icon: Icon, rawValue, suffix, label, delay, isText, textValue }: StatConfig) {
  const { count, ref } = useCountUp(rawValue, 800);

  const displayValue = isText
    ? textValue
    : rawValue >= 1000
    ? `${(count / 1000).toFixed(0)},000`
    : `${count}`;

  return (
    <div
      ref={ref}
      className="stat-card card-tech p-6 rounded-2xl flex flex-col items-center shadow-sm stagger-item border"
      style={{ background: '#fffdf8', borderColor: 'rgba(24,58,55,0.14)', animationDelay: `${600 + delay}ms` }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
        style={{ background: 'rgba(24,58,55,0.08)', border: '1px solid rgba(24,58,55,0.15)' }}>
        <Icon className="w-6 h-6" style={{ color: '#183A37' }} />
      </div>
      <span className="stat-number text-3xl sm:text-4xl font-extrabold" style={{ color: '#183A37' }}>
        {displayValue}
        {!isText && <span style={{ color: '#815355' }}>{suffix}</span>}
      </span>
      <span className="text-xs uppercase tracking-wider font-bold mt-1.5 text-center" style={{ color: 'rgba(24,58,55,0.6)' }}>
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const stats: StatConfig[] = [
    { icon: Rocket,    rawValue: 15,   suffix: '+',  label: 'Startups Incubated', delay: 0   },
    { icon: Users,     rawValue: 2000, suffix: '+',  label: 'Student Members',    delay: 100 },
    { icon: Lightbulb, rawValue: 25,   suffix: '+',  label: 'Bootcamps & Talks',  delay: 200 },
    { icon: Award,     rawValue: 0,    suffix: '',   label: 'Network Partner',    delay: 300, isText: true, textValue: 'IIT Bombay' },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden text-slate-900 py-28 lg:py-36 tech-grid-pattern min-h-[90vh] flex items-center"
      style={{
        background: '#fffdf8',
        borderBottom: '1px solid rgba(24,58,55,0.12)',
      }}
    >
      {/* Animated Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none animate-orb-1"
        style={{ background: 'rgba(24,58,55,0.08)' }} />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none animate-orb-2"
        style={{ background: 'rgba(129,83,85,0.07)' }} />
      <div className="absolute bottom-0 left-10 w-[320px] h-[320px] rounded-full blur-[120px] pointer-events-none animate-orb-3"
        style={{ background: 'rgba(82,50,73,0.06)' }} />

      {/* Decorative dots */}
      <div className="absolute top-20 right-24 w-3 h-3 rounded-full opacity-60 animate-float" style={{ background: '#815355' }} />
      <div className="absolute top-40 left-16 w-2 h-2 rounded-full opacity-50 animate-float delay-300" style={{ background: '#EFD6AC' }} />
      <div className="absolute bottom-32 right-16 w-4 h-4 rounded-full opacity-40 animate-float-rev" style={{ background: 'rgba(24,58,55,0.5)' }} />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full opacity-60 animate-float delay-500" style={{ background: '#523249' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">

          {/* IIT Bombay Badge */}
          <div className="animate-fade-down">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-iitb-tech text-sm font-bold shadow-sm animate-pulse-glow">
              <Award className="w-5 h-5 shrink-0" style={{ color: '#183A37' }} />
              <span>
                In association with{' '}
                <strong style={{ color: '#183A37' }} className="font-extrabold">E-Cell IIT Bombay</strong>
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-5 flex flex-col items-center text-center">
            <span className="text-sm uppercase tracking-[0.22em] font-bold block animate-fade-up" style={{ color: '#815355' }}>
              Where Founders &amp; Innovators Begin
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.15] flex flex-col items-center w-full"
              style={{ color: '#183A37' }}>
              <span className="type-line-1 pb-1">
                Ideas That
              </span>
              <span className="type-line-2 pb-2 mt-1">
                <span className="gradient-text-animated">Ignite Tomorrow</span>
              </span>
            </h1>
          </div>

          <p
            className="text-lg sm:text-xl max-w-2xl font-medium leading-relaxed animate-fade-up"
            style={{ color: 'rgba(24,58,55,0.65)', animationDelay: '200ms' }}
          >
            NEC Entrepreneurship Cell empowers student founders, builders, and visionaries with
            incubation, expert mentorship, and access to India&apos;s premier startup network.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href="/events"
              className="btn-primary btn-ripple w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-extrabold text-sm uppercase tracking-wider shadow-lg border"
              style={{
                background: '#183A37',
                color: '#EFD6AC',
                borderColor: 'rgba(239,214,172,0.2)',
                boxShadow: '0 12px 32px -4px rgba(24,58,55,0.35)',
              }}
            >
              Explore Events &amp; Summit
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fffdf8',
                color: '#183A37',
                borderColor: 'rgba(24,58,55,0.2)',
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: '#815355' }} />
              Our Mission
            </a>
          </div>

          {/* Animated Counter Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-14 w-full mt-8"
            style={{ borderTop: '1px solid rgba(24,58,55,0.12)' }}
          >
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Scroll hint */}
          <button
            onClick={scrollToContent}
            className="mt-4 flex flex-col items-center gap-1 transition-colors group animate-fade-up"
            style={{ color: 'rgba(24,58,55,0.45)', animationDelay: '1000ms' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#815355'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(24,58,55,0.45)'}
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>

        </div>
      </div>
    </section>
  );
}


