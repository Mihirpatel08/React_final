import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Briefcase, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      const result = login(email.trim(), password);
      setLoading(false);
      if (result.success) {
        navigate(result.user.role === 'admin' ? '/admin' : from, { replace: true });
      } else {
        setErrors({ general: result.error });
      }
    }, 700);
  };

  const inp = (hasErr) => ({
    width: '100%', background: 'var(--bg-primary)',
    border: `1px solid ${hasErr ? '#ff5050' : 'var(--border)'}`,
    borderRadius: 10, padding: '13px 16px 13px 44px', color: 'var(--text-primary)',
    fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,160,0.08) 0%, transparent 60%), var(--bg-primary)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 36, textDecoration: 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={20} color="#0a0a0f" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            Job<span style={{ color: 'var(--accent)' }}>Portal</span>
          </span>
        </Link>

        <div className="card" style={{ padding: 36 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Welcome Back 👋</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', marginBottom: 28 }}>Sign in to continue to your account</p>

          {/* Demo credentials hint */}
          <div style={{ background: 'rgba(0,229,160,0.07)', border: '1px solid var(--border-accent)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13 }}>
            <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>Demo Accounts:</p>
            <p style={{ color: 'var(--text-secondary)' }}>Admin: <code style={{ color: 'var(--accent)' }}>admin@jobportal.com</code> / <code style={{ color: 'var(--accent)' }}>admin123</code></p>
            <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>User: <code style={{ color: 'var(--accent)' }}>rahul@example.com</code> / <code style={{ color: 'var(--accent)' }}>user123</code></p>
          </div>

          {errors.general && (
            <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#ff5050', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={15} /> {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={errors.email ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                  placeholder="your@email.com" style={inp(errors.email)}
                  onFocus={e => { if (!errors.email) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--border)'; }} />
              </div>
              {errors.email && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 5 }}>{errors.email}</p>}
            </div>

            <div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={errors.password ? '#ff5050' : 'var(--text-muted)'} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="Password" style={{ ...inp(errors.password), paddingRight: 44 }}
                  onFocus={e => { if (!errors.password) e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.password) e.target.style.borderColor = 'var(--border)'; }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0, cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 5 }}>{errors.password}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--accent)' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15, justifyContent: 'center', opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Signing in...' : <><span>Sign In</span> <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ position: 'relative', margin: '24px 0', textAlign: 'center' }}>
            <div style={{ height: 1, background: 'var(--border)', position: 'absolute', top: '50%', left: 0, right: 0 }} />
            <span style={{ background: 'var(--bg-card)', padding: '0 12px', color: 'var(--text-muted)', fontSize: 13, position: 'relative' }}>or continue with</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['🔵 Google', '💼 LinkedIn'].map(l => (
              <button key={l} className="btn-outline" style={{ padding: 11, justifyContent: 'center', fontSize: 13 }}>{l}</button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)', fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
