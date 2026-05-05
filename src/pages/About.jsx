import React from 'react';
import { Target, Users, Globe, Award } from 'lucide-react';

export default function About() {
  const stats = [['50K+','Active Jobs'],['12K+','Companies'],['2M+','Users'],['98%','Satisfaction']];
  const team = [
    { name: 'Mihir Sanghani', role: 'CEO & Co-Founder', avatar: 'MS', color: '#4285F4' },
    { name: 'Priya Sharma', role: 'CTO', avatar: 'PS', color: '#00e5a0' },
    { name: 'Raj Patel', role: 'Head of Design', avatar: 'RP', color: '#635BFF' },
    { name: 'Ananya Gupta', role: 'VP Marketing', avatar: 'AG', color: '#FF6900' },
  ];
  return (
    <div style={{ paddingTop: 90, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'radial-gradient(ellipse at top, rgba(0,229,160,0.08) 0%, transparent 60%), var(--bg-secondary)', padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="badge" style={{ marginBottom: 16 }}>Our Story</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Connecting Talent with <span style={{ color: 'var(--accent)' }}>Opportunity</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            We built JobPortal because finding the right job shouldn't be hard. We believe every person deserves work they love.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="grid-4">
            {stats.map(([num, label]) => (
              <div key={label} className="card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'var(--accent)', marginBottom: 8 }}>{num}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Our Values</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: Target, title: 'Mission-Driven', desc: 'Every feature we build is focused on helping people find meaningful work.' },
              { icon: Users, title: 'People First', desc: 'We put job seekers and employers at the center of everything we do.' },
              { icon: Globe, title: 'Global Reach', desc: 'Connecting talent worldwide with companies across every industry.' },
              { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every interaction.' },
            ].map(v => (
              <div key={v.title} className="card" style={{ padding: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <v.icon size={22} color="var(--accent)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Meet the Team</h2>
          </div>
          <div className="grid-4">
            {team.map(member => (
              <div key={member.name} className="card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: member.color + '20', border: `2px solid ${member.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 20, fontWeight: 700, color: member.color, fontFamily: 'var(--font-display)' }}>{member.avatar}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{member.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
