import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';

export default function Footer() {
  return (
    <footer style={{ background: '#0f2422', borderTop: '1px solid rgba(239,214,172,0.12)', color: '#c8b89a' }} className="text-sm">


      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg"
                style={{ background: '#183A37', color: '#EFD6AC', border: '1px solid rgba(239,214,172,0.2)' }}>
                E
              </div>
              <span className="font-extrabold text-lg tracking-tight" style={{ color: '#EFD6AC' }}>
                NEC <span style={{ color: '#815355' }}>E-CELL</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed font-normal" style={{ color: 'rgba(200,184,154,0.7)' }}>
              Empowering student founders, innovators, and changemakers at NEC College in association with E-Cell IIT Bombay.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#EFD6AC' }}>Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#home" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Home</a></li>
              <li><a href="#about" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>About NEC E-Cell</a></li>
              <li><a href="#events" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Events &amp; Summits</a></li>
              <li><a href="#gallery" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Photo Gallery</a></li>
              <li><a href="#instagram" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Instagram Feed</a></li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#EFD6AC' }}>Portals &amp; Admin</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/admin" className="hover:underline flex items-center gap-1 font-bold" style={{ color: '#EFD6AC' }}>
                  Photo &amp; Featured Admin Panel
                </Link>
              </li>
              <li><Link to="/gallery" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Full Photo Archive</Link></li>
              <li><a href="#contact" className="transition-colors" style={{ color: 'rgba(200,184,154,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EFD6AC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,184,154,0.7)'}>Contact Coordinators</a></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#EFD6AC' }}>Connect</h4>
            <p className="text-xs font-normal" style={{ color: 'rgba(200,184,154,0.7)' }}>
              Follow our official Instagram handle for daily updates:
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={INSTAGRAM_CONFIG.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn p-2.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(239,214,172,0.15)', color: '#c8b89a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#815355'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#c8b89a'; }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vignan-s-iit-nec-97b333425/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn p-2.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(239,214,172,0.15)', color: '#c8b89a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#183A37'; (e.currentTarget as HTMLElement).style.color = '#EFD6AC'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#c8b89a'; }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ecell@nec.edu.in"
                className="social-btn p-2.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(239,214,172,0.15)', color: '#c8b89a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#523249'; (e.currentTarget as HTMLElement).style.color = '#EFD6AC'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#c8b89a'; }}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
          style={{ borderTop: '1px solid rgba(239,214,172,0.1)', color: 'rgba(200,184,154,0.55)' }}>
          <p>© {new Date().getFullYear()} NEC E-Cell. All rights reserved.</p>
          <p className="flex items-center gap-1 font-normal">
            Built for NEC College in association with <span className="font-bold" style={{ color: '#EFD6AC' }}>E-Cell IIT Bombay</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
