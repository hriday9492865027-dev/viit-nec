'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Rocket, Users, Lightbulb, Sparkles, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-[#fffdf8] tech-grid-pattern text-[#0f0d0c] py-24 sm:py-32 lg:py-36 border-b border-[rgba(24,58,55,0.12)]"
    >
      {/* ── Background Ambient Glowing Orbs ── */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-[150px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(239, 214, 172, 0.45) 0%, transparent 70%)' }} />
      </div>

      <div 
        className="absolute top-1/4 -right-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(129, 83, 85, 0.14) 0%, transparent 70%)' }} />
      </div>

      <div 
        className="absolute bottom-5 -left-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(24, 58, 55, 0.10) 0%, transparent 70%)' }} />
      </div>

      {/* Decorative colored dots */}
      <div 
        className="absolute top-[22%] right-10 w-2.5 h-2.5 rounded-full bg-[#815355]/35 pointer-events-none hidden sm:block" 
      />
      <div 
        className="absolute top-[32%] left-12 w-2 h-2 rounded-full bg-[#E6C48A]/60 pointer-events-none hidden sm:block" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-9">
          
          {/* Official IIT Bombay Association Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs"
            style={{
              background: 'linear-gradient(135deg, #FBF6EC 0%, #EFE5D3 100%)',
              border: '1px solid rgba(129, 83, 85, 0.28)',
              color: '#183A37',
            }}
          >
            <Bookmark className="w-4 h-4 text-[#815355] shrink-0" />
            <span>In association with <strong className="text-[#183A37] font-extrabold">E-Cell IIT Bombay</strong></span>
          </motion.div>

          {/* Main Headline & Tagline */}
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] font-extrabold text-[#8A5A58] block"
            >
              Where Founders &amp; Innovators Begin
            </motion.span>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] select-none">
              <motion.span 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[#163A36] block"
              >
                Ideas That
              </motion.span>

              <motion.span 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block mt-1 sm:mt-2"
              >
                <span className="gradient-text">Ignite Tomorrow</span>
              </motion.span>
            </h1>
          </div>


          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-[#5A6772] max-w-2xl font-medium leading-relaxed"
          >
            NEC Entrepreneurship Cell empowers student founders, builders, and visionaries with incubation, expert mentorship, and access to India&apos;s premier startup network.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto"
          >
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-2xl bg-[#163A36] hover:bg-[#102A27] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#163A36]/25 border border-[#163A36] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Events &amp; Summit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-2xl bg-white hover:bg-[#FAF6EE] text-[#183A37] font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-[#E3D9C9] shadow-xs transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#9E5A54]" />
              Our Mission
            </Link>
          </motion.div>

          {/* Key Metrics Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-[#EAE1D3] w-full mt-8"
          >
            {[
              { icon: Rocket, value: '15+', label: 'Startups Incubated' },
              { icon: Users, value: '2,000+', label: 'Student Members' },
              { icon: Lightbulb, value: '25+', label: 'Bootcamps & Talks' },
              { icon: Award, value: 'IIT Bombay', label: 'Network Partner' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#fffdf8] border border-[rgba(24,58,55,0.12)] hover:border-[#815355] p-6 rounded-2xl flex flex-col items-center shadow-xs transition-all duration-300 hover:-translate-y-1"
              >
                <item.icon className="w-7 h-7 text-[#163A36] mb-3" />
                <span className="text-3xl sm:text-4xl font-extrabold text-[#163A36]">{item.value}</span>
                <span className="text-xs text-[#7A6B62] uppercase tracking-wider font-bold mt-1.5">{item.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
