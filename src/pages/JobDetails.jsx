import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Users, DollarSign, Bookmark, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { jobs } from '../data/jobs';

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === parseInt(id));
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!job) return (
    <div style={{ paddingTop: 120, textAlign: 'center', minHeight: '100vh' }}>
      <h2>Job not found</h2>
      <Link to="/jobs" className="btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Back to Jobs</Link>
    </div>
  );

  const logoColors = ['#4285F4','#0082FB','#635BFF','#E50914','#95BF47','#FF6900','#00e5a0','#FFB800'];
  const color = logoColors[job.id % logoColors.length];

  return (
    <div style={{ paddingTop: 90, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, marginBottom: 32, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <ArrowLeft size={15} /> Back to Jobs
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          {/* Main */}
          <div>
            {/* Job Header Card */}
            <div className="card" style={{ padding: 32, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: color + '20', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                  {job.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, marginBottom: 6 }}>{job.title}</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{job.company}</p>
                </div>
                {job.featured && <span className="badge">⭐ Featured</span>}
              </div>

              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                {[
                  { icon: MapPin, text: job.location },
                  { icon: Clock, text: job.posted },
                  { icon: Users, text: `${job.applicants} applicants` },
                  { icon: DollarSign, text: job.salary + '/yr' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <Icon size={15} color="var(--accent)" /> {text}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: 32, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Job Description</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                We're looking for an experienced <strong style={{ color: 'var(--text-primary)' }}>{job.title}</strong> to join our team at {job.company}. You'll work on cutting-edge products used by millions of users around the world.
              </p>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Key Responsibilities</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['Lead design and development of new product features', 'Collaborate with cross-functional teams', 'Mentor junior team members', 'Participate in code reviews and architecture decisions', 'Drive best practices and technical excellence'].map(r => (
                  <li key={r} style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <CheckCircle size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} /> {r}
                  </li>
                ))}
              </ul>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Requirements</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['5+ years of relevant experience', 'Strong proficiency in ' + job.tags.join(', '), 'Excellent communication skills', 'Experience with agile methodologies', 'Bachelor\'s degree or equivalent experience'].map(r => (
                  <li key={r} style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <CheckCircle size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div className="card" style={{ padding: 28, marginBottom: 16 }}>
              <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>{job.salary}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>per year · {job.type}</div>
              </div>
              <button onClick={() => setApplied(!applied)} className={applied ? '' : 'btn-primary'} style={{ width: '100%', padding: '14px', borderRadius: 10, marginBottom: 10, fontSize: 15, fontWeight: 600, border: applied ? '1px solid var(--border-accent)' : 'none', background: applied ? 'var(--accent-dim)' : undefined, color: applied ? 'var(--accent)' : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {applied ? <><CheckCircle size={16} /> Applied!</> : 'Apply Now'}
              </button>
              <button onClick={() => setSaved(!saved)} className="btn-outline" style={{ width: '100%', padding: '12px', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, color: saved ? 'var(--accent)' : undefined, borderColor: saved ? 'var(--accent)' : undefined }}>
                <Bookmark size={15} fill={saved ? 'var(--accent)' : 'none'} /> {saved ? 'Saved' : 'Save Job'}
              </button>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>About {job.company}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                {job.company} is a world-class technology company building products that shape the future of the internet.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Industry', 'Technology'], ['Company Size', '10,000+'], ['Founded', '2000'], ['Website', job.company.toLowerCase() + '.com']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .job-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
