import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const inp = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', color: 'var(--text-primary)', fontSize: 14, width: '100%', transition: 'border-color 0.2s' };

  return (
    <div style={{ paddingTop: 90, minHeight: '100vh' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '60px 24px 40px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container">
          <span className="badge" style={{ marginBottom: 16 }}>Get In Touch</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 12 }}>Contact Us</h1>
          <p style={{ color: 'var(--text-muted)' }}>We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Let's talk</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, fontSize: 14 }}>
                Whether you're looking for a job, want to post a position, or just have questions — we're here to help.
              </p>
              {[
                { icon: Mail, label: 'Email', value: 'hello@jobportal.com' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                { icon: MapPin, label: 'Office', value: 'Rajkot, Gujarat, India' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="card" style={{ padding: 36 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={56} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Your Name *</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Mihir Sanghani" style={inp} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inp} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Subject</label>
                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" style={inp} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." rows={5} style={{ ...inp, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '13px 32px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Send Message <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
