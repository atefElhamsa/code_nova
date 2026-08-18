import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from '@docusaurus/Head';
import { createClient, Session } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zVjzVEKeyjH8qtPKS9pJGA_1OSruxJH';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const WA_NUMBER = '201272442829';
const CHECK_INTERVAL_MS = 10_000;

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [userPhone, setUserPhone] = useState<string | null | undefined>(undefined);
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState<'main' | 'login' | 'signup'>('main');
  const [accessStatus, setAccessStatus] = useState<'none' | 'pending' | 'approved'>('none');
  const [blocked, setBlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setAuthError('');
  }, []);

  // Allow unrestricted access to the admin panel (it has its own password protection)
  const isAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  const checkIntervalRef = useRef<any>(null);

  const startSessionCheck = useCallback(() => {
    if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);

    const doCheck = async () => {
      try {
        const { data, error } = await supabase.rpc('check_access_status');
        if (error) return; // network hiccup

        if (data && data.length > 0) {
          const { status, is_blocked } = data[0];
          setAccessStatus(status as any);
          setBlocked(is_blocked);
        }
      } catch { /* silent */ }
    };

    doCheck();
    checkIntervalRef.current = setInterval(doCheck, CHECK_INTERVAL_MS);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        setSession(session);
        if (session) {
          const { data } = await supabase.from('user_profiles').select('phone').eq('id', session.user.id).single();
          setUserPhone(data?.phone || null);
          await startSessionCheck();
        }
        setReady(true);
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setSession(session);
        if (session) {
          const { data } = await supabase.from('user_profiles').select('phone').eq('id', session.user.id).single();
          setUserPhone(data?.phone || null);
          startSessionCheck();
        } else {
          setAccessStatus('none');
          setBlocked(false);
          setUserPhone(undefined);
          if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [startSessionCheck]);

  const handleLogin = async () => {
    setLoading(true);
    setAuthError('');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setAuthError('أدخل الإيميل وكلمة المرور'); return; }
    setLoading(true); setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message.includes('Invalid login') ? 'البيانات غير صحيحة' : error.message);
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !password) {
      setAuthError('جميع الحقول مطلوبة'); return;
    }
    setLoading(true); setAuthError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        }
      }
    });
    if (error) {
      setAuthError(error.message.includes('already registered') ? 'هذا الإيميل مسجل مسبقاً' : error.message);
      setLoading(false);
    } else {
      if (!data.session) {
        setAuthError('تم التسجيل بنجاح! راجع بريدك الإلكتروني للتفعيل.');
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleRequestAccess = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('request_access', {
        p_user_agent: navigator.userAgent
      });
      if (!error && data) {
        setAccessStatus('pending');
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    const { error } = await supabase.from('user_profiles').update({ phone: phone }).eq('id', session?.user.id);
    if (!error) setUserPhone(phone);
    setLoading(false);
  };

  // ── 0. Admin Page Bypass ────────────────────────────────────────
  if (isAdminPage) {
    return <>{children}</>;
  }

  // ── 1. Loader ──────────────────────────────────────────────────
  if (!ready) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999, background: '#020617',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></Head>
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          border: '4px solid rgba(255,255,255,.1)',
          borderTopColor: '#38bdf8', animation: 'ag-spin .8s linear infinite'
        }} />
        <style>{`@keyframes ag-spin { to { transform:rotate(360deg) } }`}</style>
      </div>
    );
  }

  // ── 2. Blocked ──────────────────────────────────────────────────
  if (session && blocked) {
    const waMsgBlocked = encodeURIComponent(`مرحباً، تم إيقاف وصولي لموقع Dart & Flutter Pro (الإيميل: ${session.user.email})، هل يمكن المساعدة؟`);
    const waLinkBlocked = `https://wa.me/${WA_NUMBER}?text=${waMsgBlocked}`;

    return (
      <div className="ag-overlay">
        <Head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></Head>
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; }
          .ag-card { background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; text-align:center; max-width:460px; width:90%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; }
          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .ag-btn { display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px;border-radius:16px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;color:#fff; }
          .ag-wa { background:linear-gradient(135deg,#1a7f3c,#25d366); box-shadow:0 8px 24px rgba(37,211,102,.25); }
          .ag-wa:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(37,211,102,.4); }
          .ag-logout { margin-top:16px; background:transparent; border:1px solid rgba(255,255,255,.1); color:#94a3b8; font-size:.9rem; padding:12px; }
          .ag-logout:hover { background:rgba(255,255,255,.05); color:#e2e8f0; }
        `}</style>
        <div className="ag-card">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171', margin: '0 0 12px' }}>تم إيقاف وصولك</h1>
          <p style={{ fontSize: '.95rem', color: '#94a3b8', lineHeight: 1.8, margin: '0 0 32px' }}>
            تم إيقاف وصولك لهذا الموقع بواسطة المشرف.<br />
            تواصل معنا عبر واتساب للمساعدة.
          </p>
          <a href={waLinkBlocked} target="_blank" rel="noopener noreferrer" className="ag-btn ag-wa" style={{ textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            تواصل معنا عبر واتساب
          </a>
          <button className="ag-btn ag-logout" onClick={handleLogout}>تسجيل الخروج</button>
        </div>
      </div>
    );
  }

  // ── 3. Needs Login ──────────────────────────────────────────────
  if (!session) {
    return (
      <div className="ag-overlay">
        <Head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></Head>
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; overflow-y:auto; padding:24px 16px; }
          .ag-card { margin:auto; background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; text-align:center; max-width:440px; width:100%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; position:relative; transition: max-width 0.3s ease; }
          .ag-card.wide { max-width: 720px; padding: 60px 56px; }
          
          /* Custom scrollbar for overlay */
          .ag-overlay::-webkit-scrollbar { width: 6px; }
          .ag-overlay::-webkit-scrollbar-track { background: transparent; }
          .ag-overlay::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.3); border-radius: 10px; }
          
          .ag-logo { width:140px; height:140px; border-radius:50%; object-fit:cover; animation:ag-float 4s ease-in-out infinite; border:2px solid rgba(56, 189, 248, 0.3); }
          .ag-logo-wrap { margin-bottom: 28px; display: flex; justify-content: center; }
          .ag-title { font-size:1.6rem; font-weight:800; color:#f8fafc; margin:0 0 12px; }
          .ag-subtitle { font-size:.95rem; color:#94a3b8; line-height:1.8; margin:0 0 32px; }

          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes ag-float { 0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 40px rgba(56, 189, 248, 0.25); } 50% { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 50px rgba(56, 189, 248, 0.4); } }
          
          /* Form Styles */
          .ag-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; text-align: right; }
          .ag-grid .ag-inp-wrap { margin-bottom: 0 !important; }
          
          @media (max-width: 600px) { 
            .ag-overlay { padding: 16px 12px; }
            .ag-card { padding: 32px 20px; border-radius: 24px; }
            .ag-card.wide { padding: 32px 20px; }
            .ag-grid { grid-template-columns: 1fr; gap: 12px; margin-bottom: 16px; } 
            .ag-logo { width: 100px; height: 100px; }
            .ag-logo-wrap { margin-bottom: 20px; }
            .ag-title { font-size: 1.4rem; margin: 0 0 8px; }
            .ag-subtitle { font-size: 0.85rem; margin: 0 0 24px; }
            .ag-inp-wrap { margin-bottom: 12px; }
          }
          
          .ag-inp-wrap { margin-bottom:16px; text-align:right; }
          .ag-inp-label { display:block; font-size:.9rem; color:#94a3b8; margin-bottom:8px; font-weight:600; }
          .ag-inp-box { position:relative; }
          .ag-inp-icon { position:absolute; right:16px; top:50%; transform:translateY(-50%); color:#64748b; display:flex; align-items:center; transition:color .2s; pointer-events:none; }
          .ag-inp { box-sizing:border-box; width:100%; padding:14px 48px 14px 18px; background:rgba(255,255,255,.03); border:1.5px solid rgba(255,255,255,.08); border-radius:14px; outline:none; color:#f8fafc; font-size:.95rem; font-family:inherit; transition:all .2s; }
          .ag-inp:focus { border-color:rgba(56,189,248,.5); background:rgba(14,165,233,.04); box-shadow:0 0 0 4px rgba(56,189,248,.1); }
          .ag-inp:focus + .ag-inp-icon { color:#38bdf8; }
          .ag-inp::placeholder { color:#475569; font-size:.9rem; }
          
          /* Buttons */
          .ag-btn { box-sizing:border-box; width:100%; padding:14px; border-radius:14px; font-weight:700; font-size:1rem; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:16px; }
          .g-btn { background:#fff; color:#0f172a; border:none; }
          .g-btn:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(255,255,255,.15); }
          .p-btn { background:linear-gradient(135deg, #0ea5e9, #38bdf8); color:#fff; border:none; box-shadow:0 4px 15px rgba(14,165,233,.3); }
          .p-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 25px rgba(14,165,233,.4); }
          .p-btn:disabled { opacity:0.7; cursor:not-allowed; }
          .s-btn { background:transparent; color:#94a3b8; border:1.5px solid rgba(255,255,255,.1); }
          .s-btn:hover { background:rgba(255,255,255,.05); color:#f8fafc; border-color:rgba(255,255,255,.2); }
          
          .ag-err { background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.2); color:#fca5a5; font-size:.85rem; padding:12px; border-radius:12px; margin-bottom:20px; line-height:1.5; }
          
          .ag-back { position:absolute; top:20px; right:20px; background:transparent; border:none; width:40px; height:40px; color:#64748b; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; }
          .ag-back:hover { color:#f8fafc; transform:translateX(4px); }
          
          .spin { border-radius:50%; border-right-color:transparent!important; animation:spin 1s linear infinite; }
          @keyframes spin { 100% { transform:rotate(360deg); } }
        `}</style>

        <div className={`ag-card ${authMode === 'signup' ? 'wide' : ''}`}>
          {authMode !== 'main' && (
            <button className="ag-back" onClick={() => { setAuthMode('main'); resetForm(); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 19 12 12 5"></polyline></svg>
            </button>
          )}

          <div className="ag-logo-wrap">
            <img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" className="ag-logo" />
          </div>
          <h1 className="ag-title">
            {authMode === 'main' ? 'مرحباً بك في CodeNova' : authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h1>
          <p className="ag-subtitle">
            {authMode === 'main' ? 'اختر طريقة تسجيل الدخول أو أنشئ حساباً جديداً للوصول إلى محتوى الدورة.' :
              authMode === 'login' ? 'أدخل بيانات حسابك للمتابعة.' : 'أدخل بياناتك لإنشاء حسابك الخاص.'}
          </p>

          {authError && <div className="ag-err">{authError}</div>}

          {/* MAIN MENU */}
          {authMode === 'main' && (
            <div className="ag-modes">
              <button className="ag-btn g-btn" onClick={handleLogin} disabled={loading}>
                {loading ? <div className="spin" style={{ width: 20, height: 20, border: '2px solid rgba(0,0,0,.1)', borderTopColor: '#0f172a' }} /> : (
                  <>
                    <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.14 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                    الاستمرار بحساب Google
                  </>
                )}
              </button>
              <button className="ag-btn p-btn" onClick={() => { setAuthMode('login'); resetForm(); }}>
                الدخول بالإيميل وكلمة المرور
              </button>
              <button className="ag-btn s-btn" onClick={() => { setAuthMode('signup'); resetForm(); }} style={{ marginBottom: 0 }}>
                إنشاء حساب جديد
              </button>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleEmailLogin}>
              <div className="ag-inp-wrap">
                <label className="ag-inp-label">البريد الإلكتروني</label>
                <div className="ag-inp-box">
                  <input className="ag-inp" type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr" />
                  <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                </div>
              </div>
              <div className="ag-inp-wrap" style={{ marginBottom: 24 }}>
                <label className="ag-inp-label">كلمة المرور</label>
                <div className="ag-inp-box">
                  <input className="ag-inp" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required dir="ltr" />
                  <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                </div>
              </div>
              <button type="submit" className="ag-btn p-btn" disabled={loading}>
                {loading ? <div className="spin" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,.2)', borderTopColor: '#fff' }} /> : 'دخول'}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignup}>
              <div className="ag-grid">
                <div className="ag-inp-wrap">
                  <label className="ag-inp-label">الاسم الكامل</label>
                  <div className="ag-inp-box">
                    <input className="ag-inp" type="text" placeholder="مثال: أحمد محمد" value={fullName} onChange={e => setFullName(e.target.value)} required />
                    <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                  </div>
                </div>
                <div className="ag-inp-wrap">
                  <label className="ag-inp-label">رقم الهاتف (واتساب)</label>
                  <div className="ag-inp-box">
                    <input className="ag-inp" type="tel" placeholder="05XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} required dir="ltr" />
                    <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                  </div>
                </div>
                <div className="ag-inp-wrap">
                  <label className="ag-inp-label">البريد الإلكتروني</label>
                  <div className="ag-inp-box">
                    <input className="ag-inp" type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr" />
                    <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                  </div>
                </div>
                <div className="ag-inp-wrap">
                  <label className="ag-inp-label">كلمة المرور</label>
                  <div className="ag-inp-box">
                    <input className="ag-inp" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required dir="ltr" />
                    <div className="ag-inp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                  </div>
                </div>
              </div>
              <button type="submit" className="ag-btn p-btn" disabled={loading}>
                {loading ? <div className="spin" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,.2)', borderTopColor: '#fff' }} /> : 'إنشاء حساب جديد'}
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // ── 4. Needs Access Request (status = none) ──────────────────────
  if (session && accessStatus === 'none' && !blocked) {
    return (
      <div className="ag-overlay">
        <Head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></Head>
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; }
          .ag-card { background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; max-width:440px; width:90%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; text-align:center; }
          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .ag-btn { display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px;border-radius:16px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;color:#fff;background:#38bdf8;margin-top:20px; }
          .ag-btn:hover { background:#0ea5e9; }
          .ag-input { width:100%; padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.03); color:white; margin-top:16px; box-sizing:border-box; }
          .ag-logout { display:block; text-align:center; margin-top:24px; color:#64748b; font-size:.85rem; cursor:pointer; background:none; border:none; width:100%; }
          .ag-logout:hover { color:#94a3b8; }
        `}</style>
        <div className="ag-card">
          <img src={session.user.user_metadata.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'} alt="" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 16, border: '2px solid rgba(255,255,255,.1)' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 12px' }}>أهلاً، {session.user.user_metadata.full_name || 'بك'}</h2>

          {userPhone === null ? (
            <form onSubmit={handleUpdatePhone}>
              <p style={{ fontSize: '.9rem', color: '#94a3b8', margin: '0 0 8px' }}>يرجى إدخال رقم هاتفك للمتابعة:</p>
              <input type="tel" className="ag-input" placeholder="05XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} required />
              <button type="submit" className="ag-btn" disabled={loading}>حفظ الرقم</button>
            </form>
          ) : (
            <>
              <p style={{ fontSize: '.95rem', color: '#94a3b8', lineHeight: 1.8, margin: '0 0 32px' }}>
                حسابك مسجل لدينا بنجاح، لكنك بحاجة إلى موافقة المشرف للوصول إلى المنصة.
              </p>
              <button onClick={handleRequestAccess} className="ag-btn" disabled={loading}>
                {loading ? 'جاري الإرسال...' : 'طلب الموافقة من المشرف'}
              </button>
            </>
          )}

          <button type="button" onClick={handleLogout} className="ag-logout">
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  // ── 5. Pending Approval (status = pending) ─────────────────────
  if (session && accessStatus === 'pending' && !blocked) {
    const waMsgRequest = encodeURIComponent(`مرحباً، لقد أرسلت طلب موافقة للمنصة (الإيميل: ${session.user.email})، هل يمكن المراجعة؟`);
    const waLinkRequest = `https://wa.me/${WA_NUMBER}?text=${waMsgRequest}`;

    return (
      <div className="ag-overlay">
        <Head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></Head>
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; }
          .ag-card { background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; max-width:440px; width:90%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; text-align:center; }
          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .ag-wa-link { display:flex;align-items:center;justify-content:center;gap:8px;margin-top:32px;color:#34d399;font-weight:700;text-decoration:none;font-size:.95rem;transition:color .2s; background:rgba(52,211,153,.1); padding:12px; border-radius:12px; border:1px solid rgba(52,211,153,.2); }
          .ag-wa-link:hover { background:rgba(52,211,153,.2); }
          .ag-logout { display:block; text-align:center; margin-top:24px; color:#64748b; font-size:.85rem; cursor:pointer; background:none; border:none; width:100%; }
          .ag-logout:hover { color:#94a3b8; }
          .pulse { animation:pulse 2s infinite; }
          @keyframes pulse { 0% { opacity:1; } 50% { opacity:.5; } 100% { opacity:1; } }
        `}</style>
        <div className="ag-card">
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }} className="pulse">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 12px' }}>جاري المراجعة</h2>
          <p style={{ fontSize: '.95rem', color: '#94a3b8', lineHeight: 1.8, margin: '0 0 24px' }}>
            تم إرسال طلبك بنجاح! يرجى الانتظار لحين قيام المشرف بمراجعة حسابك والموافقة عليه.
          </p>

          <a href={waLinkRequest} target="_blank" rel="noopener noreferrer" className="ag-wa-link">
            تواصل معنا لتسريع الموافقة
          </a>

          <button type="button" onClick={handleLogout} className="ag-logout">
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  // ── 6. Granted (status = approved) ─────────────────────────────
  if (session && accessStatus === 'approved' && !blocked) {
    return <>{children}</>;
  }

  return null;
}
