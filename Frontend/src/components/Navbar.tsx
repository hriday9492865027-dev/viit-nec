import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',      to: '/'        },
    { name: 'About',     to: '/about'   },
    { name: 'Events',    to: '/events'  },
    { name: 'Gallery',   to: '/gallery' },
    { name: 'Team',      to: '/team'    },
    { name: 'Contact',   to: '/contact' },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      {/* ============================================================
          LOGOS BAR — scrolls away with the page (NOT sticky)
         ============================================================ */}
      <div style={{ background: '#fffdf8', borderBottom: '1px solid rgba(24,58,55,0.1)' }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-3">

            <div className="flex items-center justify-start animate-fade-left">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('trigger-intro-page'));
                }}
                className="block group bg-transparent border-none p-0 focus:outline-none cursor-pointer"
              >
                <img
                  src="/logos/ecell-logo.jpg"
                  alt="E-Cell Logo"
                  className="w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </button>
            </div>

            <div className="flex items-center justify-center animate-fade-down">
              <Link to="/" className="block group">
                <img
                  src="/logos/viit-logo.png"
                  alt="VIIT Logo"
                  className="w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </Link>
            </div>

            <div className="flex items-center justify-end animate-fade-right">
              <Link to="/" className="block group">
                <img
                  src="/logos/nec-logo.jpeg"
                  alt="NEC Logo"
                  className="w-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          STICKY NAV — floating pill
         ============================================================ */}
      <div className="sticky top-0 z-50 pointer-events-none h-0 w-full bg-transparent">

        {/* Desktop: centered floating pill */}
        <div className="hidden lg:flex items-center justify-center py-4">
          <div
            className={`pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border shadow-2xl transition-all duration-500 ${
              scrolled
                ? 'backdrop-blur-xl shadow-lg scale-[1.02]'
                : 'backdrop-blur-md'
            }`}
            style={{
              background: scrolled ? 'rgba(255,253,248,0.95)' : 'rgba(255,253,248,0.75)',
              borderColor: scrolled ? 'rgba(24,58,55,0.22)' : 'rgba(24,58,55,0.12)',
              boxShadow: '0 16px 36px -8px rgba(24, 58, 55, 0.15)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`nav-link-animated px-5 py-2 text-[15px] sm:text-[16px] uppercase tracking-wider font-extrabold rounded-full transition-all duration-300 ${
                  isActive(link.to)
                    ? 'nav-pill-active'
                    : 'text-stone-800 hover:text-[#183A37] hover:bg-[rgba(24,58,55,0.05)]'
                }`}
                style={{ fontFamily: '"Satoshi", sans-serif' }}
              >
                {link.name}
              </Link>
            ))}

            <div className="w-px h-6 bg-stone-300/80 mx-2" />

            <Link
              to="/admin"
              style={{
                color: isActive('/admin') ? '#183A37' : '#815355',
                fontFamily: '"Satoshi", sans-serif',
              }}
              className={`inline-flex items-center gap-2 px-5 py-2 text-[15px] sm:text-[16px] font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-[rgba(24,58,55,0.07)]`}
              title="Admin Panel"
            >
              <ImageIcon className="w-4.5 h-4.5" />
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <div className="flex lg:hidden items-center justify-between py-2 px-4">
          <span className="pointer-events-auto text-sm font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg border shadow-sm"
            style={{ background: '#fffdf8', color: '#183A37', borderColor: 'rgba(24,58,55,0.15)' }}>
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto p-2 rounded-xl backdrop-blur-md border shadow-sm focus:outline-none transition-all duration-300"
            style={{
              background: '#fffdf8',
              color: mobileMenuOpen ? '#815355' : '#183A37',
              borderColor: mobileMenuOpen ? 'rgba(129,83,85,0.3)' : 'rgba(24,58,55,0.15)',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ============================================================
          MOBILE DRAWER
         ============================================================ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ zIndex: 49, position: 'relative' }}
      >
        <div style={{ background: '#fffdf8', borderBottom: '1px solid rgba(24,58,55,0.1)' }}
          className="px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="py-2 px-3 rounded-xl badge-iitb-tech text-xs font-bold flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#183A37' }} />
            <span>In association with E-Cell IIT Bombay</span>
          </div>

          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-base font-bold border transition-all duration-300`}
              style={{
                color: isActive(link.to) ? '#183A37' : '#292524',
                background: isActive(link.to) ? 'rgba(24,58,55,0.07)' : 'transparent',
                borderColor: isActive(link.to) ? 'rgba(24,58,55,0.2)' : 'transparent',
                animationDelay: `${i * 50}ms`,
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(24,58,55,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#183A37';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#292524';
                }
              }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              to="/admin"
              className="w-full text-center px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-300"
              style={{ background: '#fffdf8', borderColor: 'rgba(24,58,55,0.15)', color: '#183A37' }}
            >
              Gallery Admin Panel
            </Link>
            <Link
              to="/contact"
              className="btn-primary w-full text-center px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-wider text-[#EFD6AC] shadow-md"
              style={{ background: '#183A37' }}
            >
              Join NEC E-Cell
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


