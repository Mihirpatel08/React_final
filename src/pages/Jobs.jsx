import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import JobCard from '../components/JobCard';
import { jobs } from '../data/jobs';

const types = ['All', 'Full Time', 'Part Time', 'Contract'];
const cats = ['All', 'Engineering', 'Design', 'Product', 'Data', 'Marketing'];

export default function Jobs() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [type, setType] = useState('All');
  const [cat, setCat] = useState(params.get('cat') || 'All');
  const [remote, setRemote] = useState(false);
  const [sort, setSort] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let res = [...jobs];
    if (query) res = res.filter(j => j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(query.toLowerCase())));
    if (type !== 'All') res = res.filter(j => j.type === type);
    if (cat !== 'All') res = res.filter(j => j.category === cat);
    if (remote) res = res.filter(j => j.location === 'Remote');
    if (sort === 'featured') res = [...res.filter(j => j.featured), ...res.filter(j => !j.featured)];
    return res;
  }, [query, type, cat, remote, sort]);

  return (
    <div style={{ paddingTop: 90, overflowX: "hidden", minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', padding: '40px 24px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 8 }}>Browse Jobs</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>{filtered.length} positions available</p>

          {/* Search */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search jobs, companies, skills..." style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, flex: 1 }} />
              {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0 }}><X size={14} /></button>}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-outline" style={{ padding: '10px 18px', gap: 8, display: 'flex', alignItems: 'center' }}>
              <SlidersHorizontal size={15} /> Filters {showFilters ? <X size={14} /> : null}
            </button>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 10, padding: '10px 16px', fontSize: 14, cursor: 'pointer' }}>
              <option value="recent">Most Recent</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          {/* Filters */}
          {showFilters && (
            <div style={{ marginTop: 16, display: 'flex', gap: 24, flexWrap: 'wrap', padding: 20, background: 'var(--bg-primary)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Job Type</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, border: '1px solid', borderColor: type === t ? 'var(--accent)' : 'var(--border)', background: type === t ? 'var(--accent-dim)' : 'transparent', color: type === t ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {cats.map(c => (
                    <button key={c} onClick={() => setCat(c)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, border: '1px solid', borderColor: cat === c ? 'var(--accent)' : 'var(--border)', background: cat === c ? 'var(--accent-dim)' : 'transparent', color: cat === c ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setRemote(!remote)} style={{ width: 40, height: 22, borderRadius: 11, background: remote ? 'var(--accent)' : 'var(--bg-card)', border: `1px solid ${remote ? 'var(--accent)' : 'var(--border)'}`, position: 'relative', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: remote ? 20 : 2, transition: 'left 0.2s' }} />
                </button>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Remote only</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Grid */}
      <div className="container section" style={{ paddingTop: 40 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8 }}>No jobs found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
