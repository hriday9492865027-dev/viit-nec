import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Linkedin, Loader2, AlertCircle } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import InstagramFeed from '@/components/InstagramFeed';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation(0.12);
  const { isVisible: leftVisible,   ref: leftRef   } = useScrollAnimation(0.08);
  const { isVisible: rightVisible,  ref: rightRef  } = useScrollAnimation(0.08);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg(result.message || 'Your message has been sent and stored in our database!');
        setSubmitted(true);

        // Store in localStorage as resilient backup
        try {
          const localMessages = JSON.parse(localStorage.getItem('ecell_contact_messages') || '[]');
          localMessages.unshift({
            ...formData,
            id: result.data?.id || `msg-${Date.now()}`,
            createdAt: new Date().toISOString(),
            emailSent: result.data?.emailSent ?? false,
          });
          localStorage.setItem('ecell_contact_messages', JSON.stringify(localMessages.slice(0, 50)));
        } catch {
          // ignore localstorage errors
        }
      } else {
        setErrorMsg(result.error || 'Failed to deliver message. Please check the backend connection.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMsg(
        'Unable to reach backend server. Please make sure the backend is running with "npm run dev:backend" or check network connectivity.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-b text-slate-900"
      style={{ background: '#fffdf8', borderColor: 'rgba(24,58,55,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-3xl mx-auto mb-16 space-y-3 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest"
            style={{ background: 'rgba(24,58,55,0.08)', border: '1px solid rgba(24,58,55,0.18)', color: '#183A37' }}>
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183A37' }}>
            Connect With{' '}
            <span className="gradient-text">NEC E-Cell</span>
          </h2>
          <p className="text-base sm:text-lg font-normal" style={{ color: 'rgba(24,58,55,0.6)' }}>
            Have a startup query, event collaboration proposal, or mentorship request? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Contact Details */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`card-tech accent-line-tech p-8 rounded-2xl flex flex-col justify-between space-y-8 shadow-sm transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold" style={{ color: '#183A37' }}>NEC E-Cell Secretariat</h3>
              <p className="text-sm leading-relaxed font-normal" style={{ color: 'rgba(24,58,55,0.6)' }}>
                Connect with our team or schedule a visit to our innovation incubator space on campus.
              </p>

              <div className="space-y-5 pt-2">
                {[
                  { Icon: MapPin, label: 'Campus Address', lines: ['NEC Campus, Innovation & Incubation Hub', 'College Address Placeholder, India'] },
                  { Icon: Mail,   label: 'Email Us',       lines: ['viitnec@gmail.com'] },
                  { Icon: Phone,  label: 'Phone / WhatsApp', lines: ['+91 95730 45472'] },
                ].map(({ Icon, label, lines }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl border shrink-0" style={{ background: 'rgba(24,58,55,0.08)', borderColor: 'rgba(24,58,55,0.18)', color: '#183A37' }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold" style={{ color: '#183A37' }}>{label}</h4>
                      {lines.map((l, j) => (
                        <p key={j} className={`text-xs ${j === 0 ? 'text-slate-700 font-semibold' : 'text-slate-500 font-medium'}`}>{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Handles */}
            <div className="pt-6 space-y-3" style={{ borderTop: '1px solid rgba(24,58,55,0.1)' }}>
              <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'rgba(24,58,55,0.5)' }}>Official Social Channels</h4>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={INSTAGRAM_CONFIG.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(129,83,85,0.08)', color: '#815355', borderColor: 'rgba(129,83,85,0.25)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(129,83,85,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(129,83,85,0.08)'; }}
                >
                  <Instagram className="w-4 h-4" />
                  @{INSTAGRAM_CONFIG.handle}
                </a>
                <a
                  href="https://www.linkedin.com/in/vignan-s-iit-nec-97b333425/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(24,58,55,0.07)', color: '#183A37', borderColor: 'rgba(24,58,55,0.2)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(24,58,55,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(24,58,55,0.07)'; }}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Page
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`card-tech p-8 rounded-2xl shadow-sm transition-all duration-700 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold mb-1" style={{ color: '#183A37' }}>Message Delivered!</h3>
                <p className="text-sm max-w-md mx-auto font-medium" style={{ color: 'rgba(24,58,55,0.7)' }}>
                  {successMsg || 'Thank you for reaching out to NEC E-Cell. Your inquiry is recorded in our database and dispatched to our inbox.'}
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-1.5 text-slate-600">
                  <p><span className="font-bold text-slate-800">From:</span> {formData.name} ({formData.email})</p>
                  {formData.subject && <p><span className="font-bold text-slate-800">Topic:</span> {formData.subject}</p>}
                  <p className="line-clamp-2"><span className="font-bold text-slate-800">Message:</span> {formData.message}</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: 'rgba(24,58,55,0.07)', color: '#183A37', borderColor: 'rgba(24,58,55,0.18)' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold mb-2" style={{ color: '#183A37' }}>Send us a Message</h3>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5 animate-scale-up">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold">Message Not Delivered</p>
                      <p className="mt-0.5 text-[11px] opacity-90">{errorMsg}</p>
                    </div>
                  </div>
                )}

                {[
                  { label: 'Full Name *',      key: 'name',    type: 'text',  placeholder: 'e.g. Rahul Sharma',                     required: true  },
                  { label: 'Email Address *',  key: 'email',   type: 'email', placeholder: 'e.g. rahul@student.nec.edu.in',          required: true  },
                  { label: 'Subject / Topic',  key: 'subject', type: 'text',  placeholder: 'e.g. Startup Incubation / E-Summit',    required: false },
                ].map(({ label, key, type, placeholder, required }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-extrabold uppercase tracking-widest mb-2" style={{ color: '#183A37' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      required={required}
                      disabled={submitting}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                      style={{ background: 'rgba(24,58,55,0.04)', border: '1px solid rgba(24,58,55,0.14)', color: '#183A37' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-widest mb-2" style={{ color: '#183A37' }}>
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    disabled={submitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your startup idea or event query..."
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all resize-none disabled:opacity-50"
                    style={{ background: 'rgba(24,58,55,0.04)', border: '1px solid rgba(24,58,55,0.14)', color: '#183A37' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 border cursor-pointer disabled:opacity-60"
                  style={{ background: '#183A37', color: '#EFD6AC', borderColor: 'rgba(239,214,172,0.2)', boxShadow: '0 8px 24px rgba(24,58,55,0.3)' }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting & Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Instagram Feed inside Contact Section */}
        <InstagramFeed />
      </div>
    </section>
  );
}

