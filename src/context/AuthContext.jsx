import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Cookie helpers
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; SameSite=Lax`;
};
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) { try { return JSON.parse(decodeURIComponent(match[2])); } catch { return null; } }
  return null;
};
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Seed users in localStorage if not present
const seedUsers = () => {
  const existing = localStorage.getItem('jp_users');
  if (!existing) {
    const users = [
      { id: 1, name: 'Admin User', email: 'admin@jobportal.com', password: 'admin123', role: 'admin', phone: '+91 98765 00000', location: 'Mumbai, MH', bio: 'Platform administrator', avatar: 'AU', createdAt: '2024-01-01', status: 'active' },
      { id: 2, name: 'Rahul Sharma', email: 'rahul@example.com', password: 'user123', role: 'user', phone: '+91 98765 43210', location: 'Bangalore, KA', bio: 'Frontend Developer with 3 years experience', avatar: 'RS', createdAt: '2024-03-10', status: 'active' },
      { id: 3, name: 'Priya Mehta', email: 'priya@example.com', password: 'user123', role: 'user', phone: '+91 91234 56789', location: 'Delhi, DL', bio: 'UI/UX Designer passionate about user experience', avatar: 'PM', createdAt: '2024-04-15', status: 'active' },
      { id: 4, name: 'Arjun Patel', email: 'arjun@example.com', password: 'user123', role: 'user', phone: '+91 70000 11111', location: 'Ahmedabad, GJ', bio: 'Data Scientist and ML enthusiast', avatar: 'AP', createdAt: '2024-05-20', status: 'inactive' },
    ];
    localStorage.setItem('jp_users', JSON.stringify(users));
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedUsers();
    // Restore session from cookie
    const session = getCookie('jp_session');
    if (session) {
      const users = JSON.parse(localStorage.getItem('jp_users') || '[]');
      const found = users.find(u => u.id === session.id && u.email === session.email);
      if (found) setUser({ ...found, password: undefined });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    if (found.status === 'inactive') return { success: false, error: 'Your account has been deactivated. Contact admin.' };
    const userData = { ...found };
    delete userData.password;
    setUser(userData);
    setCookie('jp_session', { id: found.id, email: found.email }, 7);
    localStorage.setItem('jp_current_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const register = (data) => {
    const users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'Email already registered. Please login.' };
    }
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || '',
      location: data.location || '',
      bio: '',
      role: 'user',
      avatar: data.name.slice(0, 2).toUpperCase(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    users.push(newUser);
    localStorage.setItem('jp_users', JSON.stringify(users));
    const userData = { ...newUser };
    delete userData.password;
    setUser(userData);
    setCookie('jp_session', { id: newUser.id, email: newUser.email }, 7);
    localStorage.setItem('jp_current_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return { success: false, error: 'User not found.' };
    users[idx] = { ...users[idx], ...updates };
    localStorage.setItem('jp_users', JSON.stringify(users));
    const updated = { ...users[idx] };
    delete updated.password;
    setUser(updated);
    localStorage.setItem('jp_current_user', JSON.stringify(updated));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    deleteCookie('jp_session');
    localStorage.removeItem('jp_current_user');
  };

  // Admin: get all users
  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('jp_users') || '[]').map(u => { const c = {...u}; delete c.password; return c; });
  };

  const updateUserStatus = (userId, status) => {
    const users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) { users[idx].status = status; localStorage.setItem('jp_users', JSON.stringify(users)); }
  };

  const deleteUser = (userId) => {
    const users = JSON.parse(localStorage.getItem('jp_users') || '[]').filter(u => u.id !== userId);
    localStorage.setItem('jp_users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, getAllUsers, updateUserStatus, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
