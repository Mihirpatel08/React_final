import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Star, ChevronRight, ArrowRight } from 'lucide-react';
import JobCard from '../components/JobCard';
import { jobs, categories, companies, testimonials } from '../data/jobs';

export default function Home() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${query}&loc=${location}`);
  };

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight: "100vh", overflowX: "hidden", display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,160,0.12) 0%, transparent 70%), var(--bg-primary)',
        paddingTop: 100, paddingBottom: 80, position: 'relative', overflow: 'hidden',
      }}>
        {/* BG Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.4 }} />

        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ marginBottom: 24, animation: 'fadeUp 0.6s ease both' }}>
            <span className="badge"><TrendingUp size={12} /> 10,000+ jobs added this week</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 24, animation: 'fadeUp 0.6s ease 0.1s both', letterSpacing: '-0.02em' }}>
            Find Your <span style={{ color: 'var(--accent)', position: 'relative', display: 'inline-block' }}>Dream Job</span>
            <br />Today!
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 48px', animation: 'fadeUp 0.6s ease 0.2s both', lineHeight: 1.7 }}>
            Connecting top talent with world-class companies. Browse thousands of opportunities and take the next step in your career.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ animation: 'fadeUp 0.6s ease 0.3s both', maxWidth: 740, margin: '0 auto 48px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '8px 8px 8px 24px', display: 'flex', gap: 8, alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <Search size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Job title, keywords..." style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 15, padding: '8px 0' }} />
            <div style={{ width: 1, height: 28, background: 'var(--border)', flexShrink: 0 }} />
            <MapPin size={18} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: 8 }} />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or Remote..." style={{ width: 160, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 15, padding: '8px 0' }} />
            <button type="submit" className="btn-primary" style={{ borderRadius: 10, whiteSpace: 'nowrap' }}>
              Search Jobs
            </button>
          </form>

          {/* Popular searches */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.6s ease 0.4s both' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Popular:</span>
            {['React Developer', 'UI Designer', 'Product Manager', 'Data Scientist'].map(s => (
              <button key={s} onClick={() => navigate(`/jobs?q=${s}`)} style={{ fontSize: 13, padding: '4px 14px', borderRadius: 999, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)'; }}>
                {s}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.5s both' }}>
            {[['50K+', 'Active Jobs'], ['12K+', 'Companies'], ['2M+', 'Job Seekers'], ['98%', 'Success Rate']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{num}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <span className="badge" style={{ marginBottom: 12 }}>Browse by Category</span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Explore Job Categories</h2>
            </div>
            <Link to="/categories" className="btn-outline" style={{ padding: '9px 20px', fontSize: 14 }}>View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid-4">
            {categories.map(cat => (
              <Link key={cat.name} to={`/jobs?cat=${cat.name}`} className="card" style={{ padding: 24, textAlign: 'center', textDecoration: 'none' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{cat.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{cat.count.toLocaleString()} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <span className="badge" style={{ marginBottom: 12 }}><Star size={12} /> Featured</span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Featured Jobs</h2>
            </div>
            <Link to="/jobs" className="btn-outline" style={{ padding: '9px 20px', fontSize: 14 }}>All Jobs <ArrowRight size={14} /></Link>
          </div>
          <div className="grid-3">
            {featuredJobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Top Companies ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 12 }}>Top Employers</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Companies Hiring Now</h2>
          </div>
          <div className="grid-3">
            {companies.map(co => (
              <div key={co.name} className="card" style={{ padding: 28, display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: co.color + '20', border: `1px solid ${co.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: co.color, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                  {co.logo}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{co.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{co.jobs} open positions</p>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 12 }}>Success Stories</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>What People Say</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} color="var(--accent)" fill="var(--accent)" />)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.1) 0%, transparent 70%), var(--bg-secondary)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Ready to Find Your <span style={{ color: 'var(--accent)' }}>Next Role?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 17 }}>Join thousands of professionals who found their dream jobs through JobPortal.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>Browse Jobs <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline" style={{ fontSize: 16, padding: '14px 32px' }}>Post a Job</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
