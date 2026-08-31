'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tasks & Events', href: '#tasks-events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Instagram', href: '#instagram' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* ============================================================
          LOGOS BAR — scrolls away with the page (NOT sticky)
         ============================================================ */}
      <div className="bg-white border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-3">

            <div className="flex items-center justify-start animate-fade-left">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-intro-page'));
                }}
                className="block group bg-transparent border-none p-0 focus:outline-none cursor-pointer"
              >
                <img
                  src="/logos/ecell-logo.jpg"
                  alt="E-Cell Logo"
                  className="h-12.5 sm:h-15 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </button>
            </div>

            <div className="flex items-center justify-center animate-fade-down">
              <Link href="/" className="block group">
                <img
                  src="/logos/viit-logo.png"
                  alt="VIIT Logo"
                  className="h-12.5 sm:h-15 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </Link>
            </div>

            <div className="flex items-center justify-end animate-fade-right">
              <Link href="/" className="block group">
                <img
                  src="/logos/nec-logo.jpeg"
                  alt="NEC Logo"
                  className="h-12.5 sm:h-15 w-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{ height: '90px' }}
                />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          STICKY NAV — floating pill, only pill has background
         ============================================================ */}
      <div className="sticky top-0 z-50 pointer-events-none h-0 w-full bg-transparent">

        {/* Desktop: centered floating pill */}
        <div className="hidden lg:flex items-center justify-center py-3">
          <div
            className={`pointer-events-auto inline-flex items-center gap-1 px-4 py-1.5 rounded-full border shadow-xl transition-all duration-500 ${
              scrolled
                ? 'bg-white/70 backdrop-blur-md border-white/20 shadow-blue-900/5'
                : 'bg-white/40 backdrop-blur-sm border-white/10 shadow-slate-200/30'
            }`}
            style={{
              backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
              WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link-animated px-4 py-1.5 text-[14px] uppercase tracking-wider font-extrabold text-slate-700 hover:text-blue-700 transition-colors duration-300 rounded-full hover:bg-blue-50/60"
              >
                {link.name}
              </a>
            ))}

            <div className="w-px h-5 bg-slate-300 mx-1" />

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] font-extrabold uppercase tracking-wider text-blue-700 hover:text-blue-900 hover:bg-blue-50/60 rounded-full transition-all duration-300"
              title="Admin Panel"
            >
              <ImageIcon className="w-4 h-4" />
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <div className="flex lg:hidden items-center justify-between py-2 px-4">
          <span className="pointer-events-auto text-sm font-extrabold text-blue-950 uppercase tracking-wider bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 shadow-sm focus:outline-none hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ============================================================
          MOBILE DRAWER — separate from sticky div
         ============================================================ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="py-2 px-3 rounded-xl badge-iitb-tech text-xs font-bold flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
            <span>In association with E-Cell IIT Bombay</span>
          </div>

          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              Gallery Admin Panel
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-sm font-extrabold uppercase tracking-wider text-white shadow-md"
            >
              Join NEC E-Cell
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
