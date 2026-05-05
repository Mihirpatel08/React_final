import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories, jobs } from '../data/jobs';

export default function Categories() {
  return (
    <div style={{ paddingTop: 90, minHeight: '100vh' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '60px 24px 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: 16 }}>Browse Categories</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 12 }}>Job Categories</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Find the right field for your expertise</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {categories.map(cat => {
              const catJobs = jobs.filter(j => j.category === cat.name);
              return (
                <Link key={cat.name} to={`/jobs?cat=${cat.name}`} className="card" style={{ padding: 32, textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 48, animation: 'float 3s ease-in-out infinite' }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{cat.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{cat.count.toLocaleString()} total positions</p>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4 }}>
                    <span style={{ fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      Browse Jobs <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
