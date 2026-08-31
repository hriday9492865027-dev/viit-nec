'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      
      {/* Top Footer Affiliation Banner */}
      <div className="bg-blue-950 border-b border-blue-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-900/80 text-blue-300 border border-blue-700/50">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-blue-300 uppercase tracking-widest">
                Institutional Partnership
              </p>
              <p className="text-sm font-extrabold text-white">
                NEC E-Cell in association with E-Cell IIT Bombay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300 font-normal">Representing National Education Campus</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold uppercase tracking-wider text-[11px] border border-blue-700 transition-colors"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-lg border border-blue-400/20">
                E
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                NEC <span className="text-blue-400">E-CELL</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 font-normal">
              Empowering student founders, innovators, and changemakers at NEC College in association with E-Cell IIT Bombay.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About NEC E-Cell</a></li>
              <li><a href="#tasks-events" className="hover:text-blue-400 transition-colors">Tasks & Events</a></li>
              <li><a href="#gallery" className="hover:text-blue-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#instagram" className="hover:text-blue-400 transition-colors">Instagram Feed</a></li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">Portals & Admin</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/admin" className="text-blue-400 hover:underline flex items-center gap-1 font-bold">
                  Photo & Featured Admin Panel
                </Link>
              </li>
              <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">Full Photo Archive</Link></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact Coordinators</a></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">Connect</h4>
            <p className="text-xs text-slate-400 font-normal">
              Follow our official Instagram handle for daily updates:
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={INSTAGRAM_CONFIG.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ecell@nec.edu.in"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} NEC E-Cell. All rights reserved.</p>
          <p className="flex items-center gap-1 font-normal">
            Built for NEC College in association with <span className="text-blue-400 font-bold">E-Cell IIT Bombay</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
