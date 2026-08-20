const fs = require('fs');
const path = require('path');

const newAdminContent = `import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase as codesSupabase } from '../lib/supabaseClient';

const SUPABASE_URL = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zVjzVEKeyjH8qtPKS9pJGA_1OSruxJH';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const PASS_KEY = 'admin_panel_password';

interface UserProfile {
  id: string;
  status: string;
  display_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_agent: string | null;
  is_blocked: boolean;
  created_at: string;
  last_seen_at: string;
  notes: string | null;
}

const relTime = (iso: string) => {
  const m = Math.floor((Date.now() - +new Date(iso)) / 60000);
  if (m < 1) return 'الآن';
  if (m < 60) return \`\${m}د\`;
  if (m < 1440) return \`\${Math.floor(m / 60)}س\`;
  return \`\${Math.floor(m / 1440)}ي\`;
};
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const getCourseName = (c: string) => {
  if (c === 'all') return 'الباقة الشاملة';
  if (c === 'flutter') return 'كورس Flutter & Dart';
  if (c === 'js') return 'كورس JavaScript OOP';
  if (c === 'cpp') return 'كورس C++ Mastery';
  if (c === 'python') return 'كورس Python Pro';
  return c;
};

const isOnline = (iso: string) => Date.now() - +new Date(iso) < 120_000;

const getBrowser = (ua: string | null) => {
  if (!ua) return '—';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Browser';
};

const colorAvatar = (str: string) => {
  const colors = ['#38bdf8', '#34d399', '#a78bfa', '#fb923c', '#f472b6', '#fbbf24'];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
};

const formatPhoneForWA = (phone: string | null) => {
  if (!phone) return '';
  let clean = phone.replace(/\\D/g, '');
  if (clean.startsWith('01') && clean.length === 11) {
    return '20' + clean.substring(1);
  }
  if (clean.startsWith('1') && clean.length === 10) {
    return '20' + clean;
  }
  return clean;
};

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr] = useState('');
  const [logging, setLogging] = useState(false);
  
  const [data, setData] = useState<UserProfile[]>([]);
  const [fetching, setFetching] = useState(false);
  const [blocking, setBlocking] = useState<string | null>(null);
  
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'all' | 'pending' | 'active' | 'blocked' | 'codes'>('all');
  const [savedPass, setSavedPass] = useState('');
  
  const [confirmDelete, setConfirmDelete] = useState<{ id: string, name: string } | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userCoursesMap, setUserCoursesMap] = useState<Record<string, any[]>>({});

  // Code Generator States
  const [accessCodes, setAccessCodes] = useState<any[]>([]);
  const [codesLoading, setCodesLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  useLayoutEffect(() => {
    ['nav.navbar', '.navbar', 'footer.footer', '.footer', '.table-of-contents'].forEach(s => {
      const el = document.querySelector(s) as HTMLElement | null;
      if (el) el.style.display = 'none';
    });
    const w = document.querySelector('.main-wrapper') as HTMLElement | null;
    if (w) w.style.cssText = 'padding:0!important;margin:0!important;';
    document.body.style.cssText = 'overflow:hidden;margin:0;background:#09090b;';
    return () => { document.body.style.cssText = ''; if (w) w.style.cssText = ''; };
  }, []);

  useEffect(() => {
    const p = localStorage.getItem(PASS_KEY);
    if (p) setSavedPass(p);
  }, []);

  const load = useCallback(async (p: string) => {
    setFetching(true);
    try {
      const { data: res, error } = await supabase.rpc('admin_list_users', { p_password: p });
      if (error) throw error;
      setData(res || []);
      
      const { data: codes } = await codesSupabase.from('course_access_requests').select('*').eq('is_approved', true);
      if (codes) {
        const map: Record<string, any[]> = {};
        codes.forEach(c => {
          if (c.user_id) {
            if (!map[c.user_id]) map[c.user_id] = [];
            map[c.user_id].push(c);
          }
        });
        setUserCoursesMap(map);
      }
    } catch (e: unknown) {
      if ((e as { message?: string })?.message?.includes('Unauthorized')) { setAuthed(false); setAuthErr('كلمة المرور خاطئة'); }
    } finally { setFetching(false); }
  }, []);

  const login = useCallback(async () => {
    if (!pass.trim()) { setAuthErr('الرجاء إدخال كلمة المرور'); return; }
    setLogging(true); setAuthErr('');
    try {
      const { data: res, error } = await supabase.rpc('admin_list_users', { p_password: pass.trim() });
      if (error) throw error;
      setData(res || []);
      
      const { data: codes } = await codesSupabase.from('course_access_requests').select('*').eq('is_approved', true);
      if (codes) {
        const map: Record<string, any[]> = {};
        codes.forEach(c => {
          if (c.user_id) {
            if (!map[c.user_id]) map[c.user_id] = [];
            map[c.user_id].push(c);
          }
        });
        setUserCoursesMap(map);
      }
      
      setSavedPass(pass.trim());
      localStorage.setItem(PASS_KEY, pass.trim());
      setAuthed(true);
    } catch { setAuthErr('كلمة المرور غير صحيحة'); }
    finally { setLogging(false); }
  }, [pass]);

  const updateUser = useCallback(async (id: string, newStatus: string, block: boolean) => {
    setBlocking(id);
    try {
      const { error } = await supabase.rpc('admin_update_user',
        { p_password: savedPass, p_user_id: id, p_status: newStatus, p_blocked: block });
      if (error) throw error;
      setData(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, is_blocked: block } : s));
    } catch {/**/ }
    finally { setBlocking(null); }
  }, [savedPass]);

  const deleteUser = useCallback(async (id: string) => {
    setBlocking(id);
    try {
      const { error } = await supabase.rpc('admin_delete_user',
        { p_password: savedPass, p_user_id: id });
      if (error) throw error;
      setData(prev => prev.filter(s => s.id !== id));
    } catch { alert('حدث خطأ أثناء مسح المستخدم.'); }
    finally { setBlocking(null); }
  }, [savedPass]);

  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => load(savedPass), 30_000);
    return () => clearInterval(t);
  }, [authed, savedPass, load]);

  const fetchCodes = useCallback(async () => {
    setCodesLoading(true);
    const { data, error } = await codesSupabase
      .from('course_access_requests')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      const userIds = data.map(d => d.user_id).filter(Boolean);
      if (userIds.length > 0) {
        const { data: users } = await codesSupabase
          .from('user_profiles')
          .select('id, full_name, email, avatar_url')
          .in('id', userIds);
          
        if (users) {
          const userMap = {};
          users.forEach((u: any) => userMap[u.id] = u);
          data.forEach(d => {
            if (d.user_id && userMap[d.user_id]) d.user = userMap[d.user_id];
          });
        }
      }
      setAccessCodes(data);
    }
    setCodesLoading(false);
  }, []);

  useEffect(() => {
    if (tab === 'codes' && authed) fetchCodes();
  }, [tab, authed, fetchCodes]);

  const handleGenerateNewCode = async () => {
    setIsGenerating(true);
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await codesSupabase
      .from('course_access_requests')
      .insert([{ device_code: newCode, is_approved: false, target_course: selectedCourse, code_type: 'admin' }]);

    if (!error) await fetchCodes();
    else alert("حدث خطأ أثناء توليد الكود.");
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الكود: ' + text);
  };

  const handleApproveStudent = async (id: string) => {
    const { error } = await codesSupabase.from('course_access_requests').update({ is_approved: true }).eq('id', id);
    if (!error) await fetchCodes();
  };

  const rows = data.filter(s => {
    if (tab === 'active' && (s.is_blocked || s.status !== 'approved')) return false;
    if (tab === 'pending' && (s.is_blocked || s.status !== 'pending')) return false;
    if (tab === 'blocked' && !s.is_blocked) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    const nm = (s.display_name || '').toLowerCase();
    const em = (s.email || '').toLowerCase();
    const ph = (s.phone || '').toLowerCase();
    return nm.includes(q) || em.includes(q) || ph.includes(q);
  });

  const C = {
    all: data.length,
    active: data.filter(s => !s.is_blocked && s.status === 'approved').length,
    pending: data.filter(s => !s.is_blocked && s.status === 'pending').length,
    blocked: data.filter(s => s.is_blocked).length,
    online: data.filter(s => !s.is_blocked && isOnline(s.last_seen_at)).length,
  };

  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&family=Fira+Code:wght@400;500&display=swap');
        
        :root {
          --bg-base: #09090b;
          --bg-surface: #18181b;
          --bg-elevated: #27272a;
          --border: #3f3f46;
          --text-main: #f4f4f5;
          --text-muted: #a1a1aa;
          
          --primary: #38bdf8;
          --primary-glow: rgba(56, 189, 248, 0.15);
          --success: #34d399;
          --danger: #f87171;
          --warning: #fbbf24;
          --purple: #a855f7;
        }

        * { box-sizing: border-box; }
        
        #v-admin {
          position: fixed; inset: 0; z-index: 99999;
          background: var(--bg-base); font-family: 'Cairo', sans-serif;
          display: flex; direction: rtl; color: var(--text-main);
          overflow: hidden;
        }

        /* ── Scrollbars ── */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #52525b; }

        /* ── Sidebar ── */
        .v-sidebar {
          width: 260px; background: var(--bg-surface);
          border-left: 1px solid var(--border);
          display: flex; flex-direction: column; padding: 24px;
          flex-shrink: 0;
        }
        .v-logo {
          font-size: 1.5rem; font-weight: 900; margin-bottom: 40px;
          display: flex; align-items: center; gap: 12px; color: #fff;
        }
        .v-logo-icon {
          width: 32px; height: 32px; border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), var(--purple));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px var(--primary-glow);
        }
        .v-menu { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .v-menu-item {
          padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          color: var(--text-muted); cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 12px; border: 1px solid transparent;
        }
        .v-menu-item:hover { color: #fff; background: rgba(255,255,255,0.03); }
        .v-menu-item.active {
          color: var(--primary); background: var(--primary-glow);
          border-color: rgba(56,189,248,0.2);
        }
        
        .v-sys-status {
          margin-top: auto; padding: 16px; background: var(--bg-elevated);
          border-radius: 14px; border: 1px solid var(--border);
        }
        .v-sys-title { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 700; }
        .v-live {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px;
          background: rgba(52,211,153,0.1); color: var(--success);
          border-radius: 100px; font-size: 0.8rem; font-weight: 800;
        }
        .v-live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--success);
          box-shadow: 0 0 10px var(--success); animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* ── Main Content ── */
        .v-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg-base); }
        
        .v-header {
          height: 80px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; border-bottom: 1px solid var(--border); background: var(--bg-surface);
        }
        .v-header-title { font-size: 1.3rem; font-weight: 800; margin: 0; }
        .v-header-actions { display: flex; gap: 12px; }
        
        .v-btn {
          padding: 10px 18px; border-radius: 12px; border: 1px solid var(--border);
          background: var(--bg-elevated); color: var(--text-main); font-weight: 700;
          font-family: inherit; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .v-btn:hover { background: #3f3f46; }
        .v-btn-primary { background: var(--primary); color: #000; border: none; }
        .v-btn-primary:hover { background: #0284c7; color: #fff; }
        .v-btn-danger { color: var(--danger); border-color: rgba(248,113,113,0.2); background: rgba(248,113,113,0.05); }
        .v-btn-danger:hover { background: rgba(248,113,113,0.15); }

        .v-content { padding: 32px 40px; overflow-y: auto; flex: 1; }

        /* ── Stats Grid ── */
        .v-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .v-stat-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
          transition: transform 0.2s, border-color 0.2s;
        }
        .v-stat-card:hover { transform: translateY(-3px); border-color: var(--primary); }
        .v-stat-icon { font-size: 1.8rem; margin-bottom: 12px; display: inline-block; }
        .v-stat-num { font-size: 2.2rem; font-weight: 900; margin: 0 0 4px; line-height: 1; }
        .v-stat-lbl { color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        .v-stat-card.c1 .v-stat-num { color: var(--primary); }
        .v-stat-card.c2 .v-stat-num { color: var(--success); }
        .v-stat-card.c3 .v-stat-num { color: var(--warning); }
        .v-stat-card.c4 .v-stat-num { color: var(--danger); }

        /* ── Search & Filter ── */
        .v-toolbar { display: flex; gap: 16px; margin-bottom: 24px; }
        .v-search {
          flex: 1; position: relative;
        }
        .v-search input {
          width: 100%; padding: 14px 44px 14px 16px; background: var(--bg-surface);
          border: 1px solid var(--border); border-radius: 14px; color: #fff;
          font-family: inherit; font-size: 0.95rem; outline: none; transition: border 0.2s;
        }
        .v-search input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }
        .v-search svg { position: absolute; right: 16px; top: 15px; color: var(--text-muted); }

        /* ── Data Table ── */
        .v-table-wrap {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 20px; overflow: hidden;
        }
        .v-table-hdr {
          display: grid; padding: 16px 24px; background: rgba(255,255,255,0.02);
          border-bottom: 1px solid var(--border); font-size: 0.85rem; font-weight: 800;
          color: var(--text-muted); text-align: center;
        }
        .v-table-row {
          display: grid; padding: 16px 24px; align-items: center; text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: background 0.2s;
        }
        .v-table-row:hover { background: rgba(255,255,255,0.02); }
        .v-table-row:last-child { border-bottom: none; }
        
        .v-badge {
          display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
          border-radius: 100px; font-size: 0.8rem; font-weight: 700;
        }
        .v-badge.ok { background: rgba(52,211,153,0.1); color: var(--success); border: 1px solid rgba(52,211,153,0.2); }
        .v-badge.warn { background: rgba(251,191,36,0.1); color: var(--warning); border: 1px solid rgba(251,191,36,0.2); }
        .v-badge.bad { background: rgba(248,113,113,0.1); color: var(--danger); border: 1px solid rgba(248,113,113,0.2); }
        .v-badge.neutral { background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border); }

        .v-ava {
          width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-weight: 800; font-size: 1.1rem; color: #fff;
          object-fit: cover; border: 2px solid rgba(255,255,255,0.05);
        }

        .v-pill {
          background: rgba(56,189,248,0.1); color: var(--primary);
          padding: 4px 10px; border-radius: 8px; font-family: 'Fira Code', monospace;
          font-size: 0.85rem; letter-spacing: 1px; border: 1px solid rgba(56,189,248,0.2);
        }

        /* ── Modal ── */
        .v-modal-overlay {
          position: fixed; inset: 0; background: rgba(9,9,11,0.85); backdrop-filter: blur(8px);
          z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .v-modal {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 24px; width: 100%; max-width: 650px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); animation: mSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mSlideIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: none; } }
        
        .v-modal-hdr {
          padding: 32px; background: linear-gradient(to bottom, rgba(56,189,248,0.05), transparent);
          border-bottom: 1px solid var(--border); display: flex; gap: 24px; align-items: center;
        }
        .v-modal-ava {
          width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 2.5rem; font-weight: 900;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 3px solid var(--border);
        }
        
        /* ── Login ── */
        .v-login-wrap {
          display: flex; align-items: center; justify-content: center; height: 100vh;
        }
        .v-login-card {
          width: 440px; background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 28px; padding: 48px; text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }

      \`}</style>

      <div id="v-admin">
        {/* Login Screen */}
        {!authed ? (
          <div className="v-login-wrap">
            <div className="v-login-card">
              <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--primary-glow)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 8px' }}>بوابة الإدارة</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>يرجى تسجيل الدخول للوصول للوحة التحكم</p>
              
              {authErr && <div style={{ padding: '12px', background: 'rgba(248,113,113,0.1)', color: 'var(--danger)', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 700 }}>{authErr}</div>}
              
              <input type="password" placeholder="كلمة المرور" value={pass} onChange={e => { setPass(e.target.value); setAuthErr(''); }} onKeyDown={e => e.key === 'Enter' && login()}
                style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-base)', border: '1px solid var(--border)', color: '#fff', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '4px', marginBottom: '24px', outline: 'none' }} />
              
              <button className="v-btn v-btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', justifyContent: 'center' }} onClick={login} disabled={logging}>
                {logging ? 'جاري التحقق...' : 'تسجيل الدخول'}
              </button>
            </div>
          </div>
        ) : (
          /* Dashboard Screen */
          <>
            <div className="v-sidebar">
              <div className="v-logo">
                <div className="v-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg></div>
                CodeNova
              </div>
              
              <div className="v-menu">
                <div className={\`v-menu-item \${tab !== 'codes' ? 'active' : ''}\`} onClick={() => setTab('all')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  إدارة الطلاب
                </div>
                <div className={\`v-menu-item \${tab === 'codes' ? 'active' : ''}\`} onClick={() => setTab('codes')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  أكواد التفعيل
                </div>
              </div>

              <div className="v-sys-status">
                <div className="v-sys-title">حالة النظام</div>
                <div className="v-live">
                  <div className="v-live-dot" /> {C.online} متصل الآن
                </div>
              </div>
            </div>

            <div className="v-main">
              <div className="v-header">
                <h2 className="v-header-title">{tab === 'codes' ? 'توليد ومتابعة الأكواد' : 'قاعدة بيانات الطلاب'}</h2>
                <div className="v-header-actions">
                  <button className="v-btn" onClick={() => load(savedPass)} disabled={fetching}>
                    {fetching ? '...' : '🔄 تحديث البيانات'}
                  </button>
                  <button className="v-btn v-btn-danger" onClick={() => { localStorage.removeItem(PASS_KEY); setAuthed(false); }}>🚪 خروج</button>
                </div>
              </div>

              <div className="v-content">
                {tab !== 'codes' ? (
                  <>
                    <div className="v-stats">
                      <div className="v-stat-card c1" onClick={() => setTab('all')} style={{ cursor: 'pointer', borderColor: tab === 'all' ? 'var(--primary)' : '' }}>
                        <div className="v-stat-icon">👥</div>
                        <div className="v-stat-num">{C.all}</div>
                        <div className="v-stat-lbl">إجمالي المسجلين</div>
                      </div>
                      <div className="v-stat-card c3" onClick={() => setTab('pending')} style={{ cursor: 'pointer', borderColor: tab === 'pending' ? 'var(--warning)' : '' }}>
                        <div className="v-stat-icon">🔔</div>
                        <div className="v-stat-num">{C.pending}</div>
                        <div className="v-stat-lbl">بانتظار الموافقة</div>
                      </div>
                      <div className="v-stat-card c2" onClick={() => setTab('active')} style={{ cursor: 'pointer', borderColor: tab === 'active' ? 'var(--success)' : '' }}>
                        <div className="v-stat-icon">✅</div>
                        <div className="v-stat-num">{C.active}</div>
                        <div className="v-stat-lbl">حسابات مفعلة</div>
                      </div>
                      <div className="v-stat-card c4" onClick={() => setTab('blocked')} style={{ cursor: 'pointer', borderColor: tab === 'blocked' ? 'var(--danger)' : '' }}>
                        <div className="v-stat-icon">🚫</div>
                        <div className="v-stat-num">{C.blocked}</div>
                        <div className="v-stat-lbl">حسابات محظورة</div>
                      </div>
                    </div>

                    <div className="v-toolbar">
                      <div className="v-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input placeholder="ابحث بالاسم، الإيميل، رقم الهاتف..." value={search} onChange={e => setSearch(e.target.value)} />
                      </div>
                    </div>

                    <div className="v-table-wrap">
                      <div className="v-table-hdr" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }}>
                        <div style={{ textAlign: 'right' }}>بيانات الطالب</div>
                        <div>رقم الهاتف</div>
                        <div>الكورسات</div>
                        <div>الحالة</div>
                        <div>إجراء سريع</div>
                      </div>
                      {rows.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد بيانات لعرضها</div>
                      ) : rows.map(s => (
                        <div key={s.id} className="v-table-row" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }} onClick={() => setSelectedUser(s)}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'right' }}>
                            {s.avatar_url ? <img src={s.avatar_url} className="v-ava" alt="" /> : (
                              <div className="v-ava" style={{ background: colorAvatar(s.display_name || s.id), borderColor: colorAvatar(s.display_name || s.id) }}>
                                {(s.display_name || s.email || '?')[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {s.display_name || 'مجهول'}
                                {isOnline(s.last_seen_at) && !s.is_blocked && <div className="v-live-dot" style={{ width: 6, height: 6 }} />}
                              </div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.email || 'بدون إيميل'}</div>
                            </div>
                          </div>
                          
                          <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', color: 'var(--primary)' }}>
                            {s.phone ? <a href={\`https://wa.me/\${formatPhoneForWA(s.phone)}\`} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:'var(--primary)', textDecoration:'none'}}>{s.phone}</a> : '—'}
                          </div>
                          
                          <div>
                            {(userCoursesMap[s.id] || []).length > 0 ? (
                              <span className="v-pill" style={{ color: 'var(--purple)', background: 'rgba(168,85,247,0.1)', borderColor: 'rgba(168,85,247,0.2)' }}>
                                {(userCoursesMap[s.id] || []).length} اشتراك
                              </span>
                            ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                          </div>

                          <div>
                            {s.is_blocked ? <span className="v-badge bad">محظور</span>
                            : s.status === 'pending' ? <span className="v-badge warn">مراجعة</span>
                            : s.status === 'approved' ? <span className="v-badge ok">مفعل</span>
                            : <span className="v-badge neutral">لم يطلب</span>}
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
                            {s.is_blocked ? (
                              <button className="v-btn" style={{ padding: '6px 12px' }} onClick={() => updateUser(s.id, s.status, false)}>فك حظر</button>
                            ) : s.status === 'pending' ? (
                              <button className="v-btn" style={{ padding: '6px 12px', background: 'var(--success)', color: '#000', borderColor: 'var(--success)' }} onClick={() => updateUser(s.id, 'approved', false)}>قبول</button>
                            ) : (
                              <button className="v-btn" style={{ padding: '6px 12px', color: 'var(--danger)' }} onClick={() => updateUser(s.id, s.status, true)}>حظر</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Codes Tab */
                  <>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', background: 'var(--bg-surface)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800 }}>توليد كود جديد</h3>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>يمكنك توليد كود تفعيل فوري وإرساله للطالب.</p>
                      </div>
                      
                      <div style={{ marginRight: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-base)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}>
                          <option value="all">الباقة الشاملة</option>
                          <option value="flutter">كورس Flutter</option>
                          <option value="js">كورس JavaScript</option>
                          <option value="cpp">كورس C++</option>
                          <option value="python">كورس Python</option>
                        </select>
                        <button className="v-btn v-btn-primary" onClick={handleGenerateNewCode} disabled={isGenerating}>
                          {isGenerating ? 'جاري...' : '✨ توليد كود'}
                        </button>
                      </div>
                    </div>

                    <div className="v-table-wrap">
                      <div className="v-table-hdr" style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr 1fr 1.5fr' }}>
                        <div>الكود</div>
                        <div style={{ textAlign: 'right' }}>الطالب</div>
                        <div>الكورس</div>
                        <div>النوع</div>
                        <div>الحالة</div>
                        <div>إجراء</div>
                      </div>
                      
                      {codesLoading ? (
                        <div style={{ padding: '60px', textAlign: 'center' }}>جاري التحميل...</div>
                      ) : accessCodes.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد أكواد</div>
                      ) : accessCodes.map(c => {
                        const isStud = c.code_type === 'student';
                        return (
                          <div key={c.id} className="v-table-row" style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr 1fr 1.5fr' }}>
                            <div><span className="v-pill">{c.device_code}</span></div>
                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                              {c.user ? (
                                <>
                                  <span style={{ fontWeight: 800 }}>{c.user.full_name || 'بدون اسم'}</span>
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.user.email}</span>
                                </>
                              ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                            </div>
                            <div style={{ fontWeight: 700 }}>{getCourseName(c.target_course)}</div>
                            <div>{isStud ? '👨‍🎓 طالب' : '👑 أدمن'}</div>
                            <div>
                              {c.is_approved ? <span className="v-badge ok">محروق</span> : <span className="v-badge warn">{isStud ? 'بانتظار الدفع' : 'متاح'}</span>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                              {isStud && !c.is_approved ? (
                                <button className="v-btn" style={{ padding: '6px 12px', background: 'var(--success)', color: '#000', borderColor: 'var(--success)' }} onClick={() => handleApproveStudent(c.id)}>تفعيل</button>
                              ) : !isStud && !c.is_approved ? (
                                <button className="v-btn" style={{ padding: '6px 12px' }} onClick={() => copyToClipboard(c.device_code)}>نسخ</button>
                              ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Modal User Details */}
        {selectedUser && (
          <div className="v-modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="v-modal" onClick={e => e.stopPropagation()}>
              <div className="v-modal-hdr">
                {selectedUser.avatar_url ? <img src={selectedUser.avatar_url} className="v-modal-ava" alt="" /> : (
                  <div className="v-modal-ava" style={{ background: colorAvatar(selectedUser.display_name || selectedUser.id), borderColor: 'rgba(255,255,255,0.1)' }}>
                    {(selectedUser.display_name || selectedUser.email || '?')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 style={{ margin: '0 0 8px', fontSize: '1.8rem', fontWeight: 900 }}>{selectedUser.display_name || 'مستخدم مجهول'}</h2>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📧 {selectedUser.email || 'بدون إيميل'}</span>
                    {selectedUser.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>📞 {selectedUser.phone}</span>}
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ background: 'var(--bg-base)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>تاريخ التسجيل</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{fmtDate(selectedUser.created_at)}</div>
                  </div>
                  <div style={{ background: 'var(--bg-base)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>آخر نشاط</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isOnline(selectedUser.last_seen_at) && <div className="v-live-dot" />}
                      {fmtDate(selectedUser.last_seen_at)}
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>الكورسات المشتراة</h3>
                {(!userCoursesMap[selectedUser.id] || userCoursesMap[selectedUser.id].length === 0) ? (
                  <div style={{ background: 'var(--bg-base)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد كورسات</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {userCoursesMap[selectedUser.id].map(cr => (
                      <div key={cr.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56,189,248,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(56,189,248,0.15)' }}>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '4px' }}>{getCourseName(cr.target_course)}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{fmtDate(cr.created_at)}</div>
                        </div>
                        <div><span className="v-pill">{cr.device_code}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding: '24px 32px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="v-btn" onClick={() => setSelectedUser(null)}>إغلاق</button>
                {selectedUser.is_blocked ? (
                  <button className="v-btn" style={{ background: 'rgba(52,211,153,0.15)', color: 'var(--success)' }} onClick={() => { updateUser(selectedUser.id, selectedUser.status, false); setSelectedUser({...selectedUser, is_blocked: false}); }}>فك حظر الحساب</button>
                ) : (
                  <button className="v-btn v-btn-danger" onClick={() => { updateUser(selectedUser.id, selectedUser.status, true); setSelectedUser({...selectedUser, is_blocked: true}); }}>حظر الحساب</button>
                )}
                <button className="v-btn v-btn-primary" style={{ background: 'var(--danger)', color: '#fff' }} onClick={() => { setConfirmDelete({id: selectedUser.id, name: selectedUser.display_name}); setSelectedUser(null); }}>مسح نهائي</button>
              </div>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div className="v-modal-overlay">
            <div className="v-modal" style={{ maxWidth: '400px', textAlign: 'center' }}>
              <div style={{ padding: '32px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(248,113,113,0.1)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem' }}>⚠️</div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.3rem', fontWeight: 900 }}>تأكيد الحذف</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>هل أنت متأكد من مسح <strong>{confirmDelete.name}</strong>؟ لا يمكن التراجع عن هذا الإجراء.</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="v-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setConfirmDelete(null)}>إلغاء</button>
                  <button className="v-btn v-btn-primary" style={{ flex: 1, justifyContent: 'center', background: 'var(--danger)', color: '#fff' }} onClick={() => { deleteUser(confirmDelete.id); setConfirmDelete(null); }}>تأكيد الحذف</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'admin.tsx'), newAdminContent);
console.log('Done writing admin.tsx');
