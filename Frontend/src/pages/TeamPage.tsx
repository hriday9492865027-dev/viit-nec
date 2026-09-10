import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/Team';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#0f0d0c] flex flex-col font-sans page-enter">
      <Navbar />
      <main className="flex-1">
        <Team />
      </main>
      <Footer />
    </div>
  );
}
