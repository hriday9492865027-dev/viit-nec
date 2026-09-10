'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Events', to: '/events' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Team', to: '/team' },
    { name: 'Contact', to: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ============================================================
          LOGOS BAR — scrolls away with the page (NOT sticky)
         ============================================================ */}
      <div className="bg-white border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-4 sm:py-5 lg:py-6">

            <div className="flex items-center justify-start animate-fade-left">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-intro-page'));
                }}
                className="block group bg-transparent border-none p-0 focus:outline-none cursor-pointer"
                title="Replay intro animation"
              >
                <img
                  src="/logos/ecell-logo.jpg"
                  alt="E-Cell Logo"
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                  style={{ maxHeight: '115px' }}
                />
              </button>
            </div>

            <div className="flex items-center justify-center animate-fade-down">
              <Link to="/" className="block group">
                <img
                  src="/logos/viit-logo.png"
                  alt="VIIT Logo"
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{ maxHeight: '115px' }}
                />
              </Link>
            </div>

            <div className="flex items-center justify-end animate-fade-right">
              <Link to="/" className="block group">
                <img
                  src="/logos/nec-logo.jpeg"
                  alt="NEC Logo"
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{ maxHeight: '115px' }}
                />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          STICKY NAV — floating pill matching screenshot
         ============================================================ */}
      <div className="sticky top-0 z-50 pointer-events-none h-0 w-full bg-transparent">

        {/* Desktop: centered floating pill */}
        <div className="hidden lg:flex items-center justify-center py-3">
          <div
            className={`pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-500 ${
              scrolled
                ? 'bg-white/90 backdrop-blur-md border-[#E3D9CB] shadow-sm'
                : 'bg-white/80 backdrop-blur-sm border-[#E5DCD0] shadow-xs'
            }`}
            style={{
              backdropFilter: scrolled ? 'blur(16px)' : 'blur(10px)',
              WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(10px)',
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`px-4 py-1.5 text-[13px] uppercase tracking-wider font-extrabold rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-[#E5DFD3] text-[#183A37] shadow-xs'
                      : 'text-[#283238] hover:text-[#183A37] hover:bg-[#FAF6EE]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <div className="flex lg:hidden items-center justify-between py-2.5 px-4">
          <span className="pointer-events-auto text-xs font-black text-[#183A37] uppercase tracking-wider bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            NEC E-Cell
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto p-2 rounded-xl bg-white/90 backdrop-blur-md text-[#183A37] border border-slate-200 shadow-sm focus:outline-none hover:bg-slate-50 transition-all"
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
      >
        <div className="bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="py-2 px-3 rounded-xl badge-iitb-tech text-xs font-bold flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#815355] shrink-0" />
            <span>In association with E-Cell IIT Bombay</span>
          </div>

          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-all ${
                  active
                    ? 'bg-[#183A37] text-[#EFD6AC]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
