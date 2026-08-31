import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#163A36] text-white flex flex-col font-sans page-enter">
      <Navbar />
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </div>
  );
}

