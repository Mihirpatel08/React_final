import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Briefcase, Mail, Lock, User, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', password: '', confirm: '', role: 'jobseeker' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const upd = (k, v) => { setForm(f => ({...f, [k]: v})); setErrors(e => ({...e, [k]: '', general: ''})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name must be at least 2 characters.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(form.password)) e.password = 'Password must contain letters and numbers.';
    if (!form.confirm) e.confirm = 'Please confirm your password.';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register({ name: form.name.trim(), email: form.email.trim(), password: form.password, phone: form.phone, location: form.location });
      setLoading(false);
      if (result.success) navigate('/');
      else setErrors({ general: result.error });
    }, 700);
  };

  const inp = (key) => ({
    width: '100%', background: 'var(--bg-primary)',
    border: `1px solid ${errors[key] ? '#ff5050' : 'var(--border)'}`,
    borderRadius: 10, padding: '13px 16px 13px 44px', color: 'var(--text-primary)',
    fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
  });

  const strength = !form.password ? 0 : form.password.length < 6 ? 1 : !/(?=.*[a-zA-Z])(?=.*\d)/.test(form.password) ? 2 : form.password.length < 10 ? 2 : 3;
  const strengthInfo = [null, { color: '#ff5050', label: 'Weak' }, { color: '#FFB800', label: 'Fair' }, { color: '#00e5a0', label: 'Strong' }];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,160,0.08) 0%, transparent 60%), var(--bg-primary)' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 32, textDecoration: 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={20} color="#0a0a0f" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            Job<span style={{ color: 'var(--accent)' }}>Portal</span>
          </span>
        </Link>

        <div className="card" style={{ padding: 36 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Create Account 🚀</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>Join thousands of professionals finding their dream jobs</p>

          {/* Role Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[{ v: 'jobseeker', l: '🔍 Job Seeker' }, { v: 'employer', l: '🏢 Employer' }].map(r => (
              <button key={r.v} type="button" onClick={() => upd('role', r.v)} style={{ padding: 10, borderRadius: 10, border: '1px solid', borderColor: form.role === r.v ? 'var(--accent)' : 'var(--border)', background: form.role === r.v ? 'var(--accent-dim)' : 'transparent', color: form.role === r.v ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>{r.l}</button>
            ))}
          </div>

          {errors.general && (
            <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ff5050', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={15} /> {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Name */}
            <div>
              <div style={{ position: 'relative' }}>
                <User size={16} color={errors.name ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Full Name" style={inp('name')}
                  onFocus={e => { if (!errors.name) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.name) e.target.style.borderColor = 'var(--border)'; }} />
              </div>
              {errors.name && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color={errors.email ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="Email" style={inp('email')}
                    onFocus={e => { if (!errors.email) e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--border)'; }} />
                </div>
                {errors.email && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color={errors.phone ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+91 98765 43210" style={inp('phone')}
                    onFocus={e => { if (!errors.phone) e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { if (!errors.phone) e.target.style.borderColor = 'var(--border)'; }} />
                </div>
                {errors.phone && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
              </div>
            </div>

            {/* Location */}
            <div style={{ position: 'relative' }}>
              <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input value={form.location} onChange={e => upd('location', e.target.value)} placeholder="City, State (e.g. Mumbai, MH)"
                style={{ ...inp('location'), border: '1px solid var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>

            {/* Password */}
            <div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={errors.password ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => upd('password', e.target.value)} placeholder="Create password" style={{ ...inp('password'), paddingRight: 44 }}
                  onFocus={e => { if (!errors.password) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.password) e.target.style.borderColor = 'var(--border)'; }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0, cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthInfo[strength]?.color : 'var(--border)', transition: 'background 0.3s' }} />)}
                  </div>
                  {strengthInfo[strength] && <span style={{ fontSize: 11, color: strengthInfo[strength].color, marginTop: 3, display: 'block' }}>{strengthInfo[strength].label} password</span>}
                </div>
              )}
              {errors.password && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={errors.confirm ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="password" value={form.confirm} onChange={e => upd('confirm', e.target.value)} placeholder="Confirm password" style={{ ...inp('confirm'), paddingRight: 44 }}
                  onFocus={e => { if (!errors.confirm) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.confirm) e.target.style.borderColor = 'var(--border)'; }} />
                {form.confirm && form.password === form.confirm && <CheckCircle size={16} color="var(--accent)" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }} />}
              </div>
              {errors.confirm && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{errors.confirm}</p>}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15, justifyContent: 'center', marginTop: 4, opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Creating Account...' : <><span>Create Account</span> <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
