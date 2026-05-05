import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Bookmark, Bell, Settings, LogOut, Briefcase, MapPin, Phone, Mail, Edit2, Save, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobs } from '../data/jobs';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', location: user?.location || '', bio: user?.bio || '' });

  const savedJobs = jobs.slice(0, 4);
  const appliedJobs = jobs.slice(0, 3);

  const upd = (k, v) => { setForm(f => ({...f, [k]: v})); setEditErrors(e => ({...e, [k]: ''})); };

  const validateEdit = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.';
    return e;
  };

  const handleSave = () => {
    const errs = validateEdit();
    if (Object.keys(errs).length) { setEditErrors(errs); return; }
    const result = updateProfile({ name: form.name.trim(), phone: form.phone, location: form.location, bio: form.bio });
    if (result.success) { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }
  };

  const handleCancelEdit = () => {
    setForm({ name: user?.name || '', phone: user?.phone || '', location: user?.location || '', bio: user?.bio || '' });
    setEditErrors({});
    setEditing(false);
  };

  if (!user) { navigate('/login'); return null; }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
    { id: 'applied', label: 'Applications', icon: Briefcase },
    { id: 'alerts', label: 'Job Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const inp = (key) => ({
    width: '100%', background: 'var(--bg-primary)', border: `1px solid ${editErrors[key] ? '#ff5050' : 'var(--border)'}`,
    borderRadius: 10, padding: '11px 14px', color: 'var(--text-primary)', fontSize: 14, outline: 'none',
  });

  return (
    <div style={{ paddingTop: 90, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>{user.name}</h1>
                <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--border-accent)' }}>{user.role === 'admin' ? '🛡️ Admin' : '👤 User'}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}><Mail size={13} />{user.email}</span>
                {user.location && <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={13} />{user.location}</span>}
                {user.phone && <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={13} />{user.phone}</span>}
              </div>
              {user.bio && <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>{user.bio}</p>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn-primary" style={{ padding: '9px 18px', fontSize: 13, textDecoration: 'none' }}>🛡️ Admin Panel</Link>
              )}
              <button onClick={() => setEditing(true)} className="btn-outline" style={{ padding: '9px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Edit2 size={14} /> Edit Profile
              </button>
              <button onClick={() => { logout(); navigate('/'); }} style={{ padding: '9px 18px', fontSize: 13, borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff5050', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)' }}>
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
            {[['12', 'Jobs Applied'], ['4', 'Saved Jobs'], ['3', 'Interviews'], ['1', 'Offer Received']].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>{n}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ padding: 36, width: '100%', maxWidth: 500, position: 'relative' }}>
            <button onClick={handleCancelEdit} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Edit Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Full Name *</label>
                <input value={form.name} onChange={e => upd('name', e.target.value)} style={inp('name')}
                  onFocus={e => { if (!editErrors.name) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!editErrors.name) e.target.style.borderColor = 'var(--border)'; }} />
                {editErrors.name && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{editErrors.name}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Phone</label>
                  <input value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+91 98765 43210" style={inp('phone')}
                    onFocus={e => { if (!editErrors.phone) e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { if (!editErrors.phone) e.target.style.borderColor = 'var(--border)'; }} />
                  {editErrors.phone && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{editErrors.phone}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Location</label>
                  <input value={form.location} onChange={e => upd('location', e.target.value)} placeholder="City, State" style={{ ...inp('location'), border: '1px solid var(--border)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Bio</label>
                <textarea value={form.bio} onChange={e => upd('bio', e.target.value)} placeholder="Tell us about yourself..." rows={3} style={{ ...inp('bio'), border: '1px solid var(--border)', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={handleCancelEdit} className="btn-outline" style={{ padding: '10px 20px', fontSize: 14 }}>Cancel</button>
                <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {saved && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3000, boxShadow: 'var(--shadow)' }}>
          <CheckCircle size={18} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Profile updated successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent', color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', marginBottom: -1 }}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid-2">
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Account Information</h3>
              {[['Full Name', user.name], ['Email', user.email], ['Phone', user.phone || 'Not set'], ['Location', user.location || 'Not set'], ['Member Since', user.createdAt], ['Account Type', user.role]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Activity</h3>
              {['Applied to React Developer at TCS', 'Saved DevOps Engineer at Wipro', 'Profile viewed by Infosys recruiter', 'Applied to UI/UX Designer at Infosys'].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'saved' && (
          <div className="grid-3">
            {savedJobs.map((job, i) => {
              const colors = ['#007CC3','#C00','#528FF0','#F7A400'];
              const c = colors[i % colors.length];
              return (
                <div key={job.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: c + '20', border: `1px solid ${c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: c, fontFamily: 'var(--font-display)', flexShrink: 0 }}>{job.logo}</div>
                    <div><p style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{job.title}</p><p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{job.company}</p></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontWeight: 700, fontSize: 15 }}>{job.salary}</span>
                    <Link to={`/jobs/${job.id}`} className="btn-primary" style={{ padding: '7px 16px', fontSize: 13, textDecoration: 'none' }}>Apply</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'applied' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {appliedJobs.map((job, i) => {
              const statuses = ['Under Review', 'Interview Scheduled', 'Offer Received'];
              const sc = ['#FFB800', '#528FF0', '#00e5a0'];
              return (
                <div key={job.id} className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{job.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{job.company} · Applied {job.posted}</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 999, background: sc[i] + '18', color: sc[i], border: `1px solid ${sc[i]}30` }}>{statuses[i]}</span>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'alerts' && (
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <Bell size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>Set Up Job Alerts</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>Get notified when new jobs matching your profile are posted</p>
            <button className="btn-primary" style={{ display: 'inline-flex' }}>+ Create Alert</button>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ maxWidth: 480 }}>
            <div className="card" style={{ padding: 28, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Notification Preferences</h3>
              {['Email me new job matches', 'Email me application updates', 'Weekly job digest', 'Marketing emails'].map((pref, i) => (
                <div key={pref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{pref}</span>
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: i < 2 ? 'var(--accent)' : 'var(--bg-card)', border: `1px solid ${i < 2 ? 'var(--accent)' : 'var(--border)'}`, position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: i < 2 ? 20 : 2, transition: 'left 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Danger Zone</h3>
              <button style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff5050', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)' }}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
