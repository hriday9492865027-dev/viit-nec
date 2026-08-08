import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Events from '@/components/Events';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans page-enter">
      <Navbar />
      <main className="flex-1">
        <Events />
      </main>
      <Footer />
    </div>
  );
}
