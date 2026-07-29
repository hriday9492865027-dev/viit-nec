'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Linkedin } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-widest">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
            Connect With NEC E-Cell
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Have a startup query, event collaboration proposal, or mentorship request? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Contact Details */}
          <div className="card-tech accent-line-tech p-8 rounded-2xl flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-blue-950">NEC E-Cell Secretariat</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Connect with our team or schedule a visit to our innovation incubator space on campus.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-950">Campus Address</h4>
                    <p className="text-xs text-slate-700 font-semibold">NEC Campus, Innovation & Incubation Hub</p>
                    <p className="text-xs text-slate-500 font-medium">College Address Placeholder, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-950">Email Us</h4>
                    <p className="text-xs text-slate-700 font-semibold">ecell@nec.edu.in</p>
                    <p className="text-xs text-slate-500 font-medium">contact@nececell.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-950">Phone / WhatsApp</h4>
                    <p className="text-xs text-slate-700 font-semibold">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Handles */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Official Social Channels</h4>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={INSTAGRAM_CONFIG.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-pink-50 text-xs font-bold text-pink-600 border border-slate-200 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @{INSTAGRAM_CONFIG.handle}
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-xs font-bold text-blue-700 border border-slate-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Page
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="card-tech p-8 rounded-2xl shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-blue-950">Message Delivered!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-normal">
                  Thank you for reaching out to NEC E-Cell. Our student team will get back to your message shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold uppercase tracking-wider border border-slate-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold text-blue-950 mb-2">Send us a Message</h3>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@student.nec.edu.in"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Startup Incubation / E-Summit Partnership"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your startup idea or event query..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-700/25 flex items-center justify-center gap-2 transition-all border border-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
