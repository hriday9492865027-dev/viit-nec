import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/Team';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#EFD6AC] text-[#183A37] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Team />
      </main>
      <Footer />
    </div>
  );
}
