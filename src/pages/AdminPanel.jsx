import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, Shield, Trash2, Eye, CheckCircle, XCircle, Search, BarChart2, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobs as allJobs } from '../data/jobs';

export default function AdminPanel() {
  const { user, logout, getAllUsers, updateUserStatus, deleteUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [users, setUsers] = useState(getAllUsers());
  const [userSearch, setUserSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState('');

  if (!user || user.role !== 'admin') { navigate('/'); return null; }

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleStatusToggle = (uid, current) => {
    const newStatus = current === 'active' ? 'inactive' : 'active';
    updateUserStatus(uid, newStatus);
    setUsers(getAllUsers());
    showToast(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`);
  };

  const handleDelete = (uid) => {
    deleteUser(uid);
    setUsers(getAllUsers());
    setConfirmDelete(null);
    showToast('User deleted successfully.');
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));
  const filteredJobs = allJobs.filter(j => j.title.toLowerCase().includes(jobSearch.toLowerCase()) || j.company.toLowerCase().includes(jobSearch.toLowerCase()));

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: '#528FF0' },
    { label: 'Active Jobs', value: allJobs.length, icon: Briefcase, color: '#00e5a0' },
    { label: 'Total Applications', value: 147, icon: TrendingUp, color: '#FFB800' },
    { label: 'Companies', value: 6, icon: BarChart2, color: '#FF6900' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', padding: '24px 16px', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={17} color="#0a0a0f" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Admin Panel</span>
        </Link>

        <nav style={{ flex: 1 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, marginBottom: 4, background: tab === t.id ? 'var(--accent-dim)' : 'transparent', border: tab === t.id ? '1px solid var(--border-accent)' : '1px solid transparent', color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', transition: 'all 0.2s' }}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{user.avatar}</div>
            <div><p style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</p><p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Administrator</p></div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff5050', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: 240, padding: 32, overflowY: 'auto' }}>
        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Welcome back, {user.name}! Here's an overview of your platform.</p>

            <div className="grid-4" style={{ marginBottom: 32 }}>
              {stats.map(s => (
                <div key={s.label} className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '18', border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon size={20} color={s.color} />
                    </div>
                    <span style={{ fontSize: 11, color: '#00e5a0', background: 'rgba(0,229,160,0.1)', padding: '3px 8px', borderRadius: 999 }}>+12%</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid-2">
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Users</h3>
                {users.slice(0, 4).map(u => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{u.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</p>
                    </div>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: u.status === 'active' ? 'rgba(0,229,160,0.1)' : 'rgba(255,80,80,0.1)', color: u.status === 'active' ? '#00e5a0' : '#ff5050' }}>{u.status}</span>
                  </div>
                ))}
                <button onClick={() => setTab('users')} style={{ marginTop: 16, fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}>View all users <ChevronRight size={13} /></button>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Jobs</h3>
                {allJobs.slice(0, 4).map(j => (
                  <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{j.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{j.company} · {j.type}</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{j.salary}</span>
                  </div>
                ))}
                <button onClick={() => setTab('jobs')} style={{ marginTop: 16, fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}>View all jobs <ChevronRight size={13} /></button>
              </div>
            </div>
          </div>
        )}

        {/* Manage Users */}
        {tab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Manage Users</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{users.length} total users</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px' }}>
                <Search size={15} color="var(--text-muted)" />
                <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users..." style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, outline: 'none', width: 200 }} />
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)' }}>
                    {['User', 'Email', 'Role', 'Location', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{u.avatar}</div>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: u.role === 'admin' ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.06)', color: u.role === 'admin' ? 'var(--accent)' : 'var(--text-secondary)', border: u.role === 'admin' ? '1px solid var(--border-accent)' : '1px solid var(--border)', fontWeight: 500 }}>
                          {u.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{u.location || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, fontWeight: 600, background: u.status === 'active' ? 'rgba(0,229,160,0.1)' : 'rgba(255,80,80,0.1)', color: u.status === 'active' ? '#00e5a0' : '#ff5050' }}>
                          {u.status === 'active' ? '● Active' : '● Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {u.role !== 'admin' && (
                            <>
                              <button onClick={() => handleStatusToggle(u.id, u.status)} title={u.status === 'active' ? 'Deactivate' : 'Activate'} style={{ width: 32, height: 32, borderRadius: 8, background: u.status === 'active' ? 'rgba(255,183,0,0.1)' : 'rgba(0,229,160,0.1)', border: `1px solid ${u.status === 'active' ? 'rgba(255,183,0,0.3)' : 'rgba(0,229,160,0.3)'}`, color: u.status === 'active' ? '#FFB800' : '#00e5a0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {u.status === 'active' ? <XCircle size={15} /> : <CheckCircle size={15} />}
                              </button>
                              <button onClick={() => setConfirmDelete(u)} title="Delete user" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff5050', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Trash2 size={15} />
                              </button>
                            </>
                          )}
                          {u.role === 'admin' && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Protected</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manage Jobs */}
        {tab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Manage Jobs</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{allJobs.length} total listings</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px' }}>
                <Search size={15} color="var(--text-muted)" />
                <input value={jobSearch} onChange={e => setJobSearch(e.target.value)} placeholder="Search jobs..." style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, outline: 'none', width: 200 }} />
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)' }}>
                    {['Job Title', 'Company', 'Location', 'Salary', 'Type', 'Applicants', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(j => (
                    <tr key={j.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ fontSize: 14, fontWeight: 500 }}>{j.title}</p>
                        {j.featured && <span style={{ fontSize: 11, color: 'var(--accent)' }}>⭐ Featured</span>}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{j.company}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{j.location}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{j.salary}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,229,160,0.1)', color: '#00e5a0' }}>{j.type}</span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{j.applicants}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link to={`/jobs/${j.id}`} title="View" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(82,143,240,0.1)', border: '1px solid rgba(82,143,240,0.3)', color: '#528FF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={15} /></Link>
                          <button title="Delete" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff5050', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings */}
        {tab === 'settings' && (
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Platform Settings</h1>
            <div className="card" style={{ padding: 28, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>General</h3>
              {[['Platform Name', 'JobPortal'], ['Support Email', 'support@jobportal.com'], ['Max Jobs per Page', '12']].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{k}</label>
                  <input defaultValue={v} style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: 8 }}>Save Settings</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} color="#ff5050" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Delete User?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>This will permanently delete <strong style={{ color: 'var(--text-primary)' }}>{confirmDelete.name}</strong>'s account. This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setConfirmDelete(null)} className="btn-outline" style={{ padding: '10px 24px' }}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)} style={{ padding: '10px 24px', borderRadius: 8, background: '#ff5050', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 4000, boxShadow: 'var(--shadow)' }}>
          <CheckCircle size={18} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{toast}</span>
        </div>
      )}
    </div>
  );
}
