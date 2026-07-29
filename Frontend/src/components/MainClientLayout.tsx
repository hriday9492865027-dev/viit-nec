'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import GalleryGrid from '@/components/GalleryGrid';
import InstagramFeed from '@/components/InstagramFeed';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import IntroPage from '@/components/IntroPage';

export default function MainClientLayout() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleTriggerIntro = () => {
      setFadeOut(false);
      setShowIntro(true);
    };

    window.addEventListener('trigger-intro-page', handleTriggerIntro);
    return () => {
      window.removeEventListener('trigger-intro-page', handleTriggerIntro);
    };
  }, []);

  const handleEnterSite = () => {
    setFadeOut(true);
    // Smooth transition
    setTimeout(() => {
      setShowIntro(false);
    }, 800);
  };

  return (
    <>
      {showIntro && (
        <div className={`transition-opacity duration-[800ms] ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <IntroPage onEnter={handleEnterSite} />
        </div>
      )}
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Events />
          <GalleryGrid />
          <InstagramFeed />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
