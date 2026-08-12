import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zVjzVEKeyjH8qtPKS9pJGA_1OSruxJH';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const WA_NUMBER = '201552946586';
const CHECK_INTERVAL_MS = 10_000;

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [accessStatus, setAccessStatus] = useState<'none'|'pending'|'approved'>('none');
  const [blocked, setBlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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
          startSessionCheck();
        }
        setReady(true);
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        if (session) {
          startSessionCheck();
        } else {
          setAccessStatus('none');
          setBlocked(false);
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
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
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

  // ── 0. Admin Page Bypass ────────────────────────────────────────
  if (isAdminPage) {
    return <>{children}</>;
  }

  // ── 1. Loader ──────────────────────────────────────────────────
  if (!ready) {
    return (
      <div style={{
        position:'fixed', inset:0, zIndex:99999, background:'#020617',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <div style={{
          width:50, height:50, borderRadius:'50%',
          border:'4px solid rgba(255,255,255,.1)',
          borderTopColor:'#38bdf8', animation:'ag-spin .8s linear infinite'
        }}/>
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
          <div style={{fontSize:'4rem', marginBottom:'16px'}}>🔒</div>
          <h1 style={{fontSize:'1.8rem', fontWeight:800, color:'#f87171', margin:'0 0 12px'}}>تم إيقاف وصولك</h1>
          <p style={{fontSize:'.95rem', color:'#94a3b8', lineHeight:1.8, margin:'0 0 32px'}}>
            تم إيقاف وصولك لهذا الموقع بواسطة المشرف.<br/>
            تواصل معنا عبر واتساب للمساعدة.
          </p>
          <a href={waLinkBlocked} target="_blank" rel="noopener noreferrer" className="ag-btn ag-wa" style={{textDecoration:'none'}}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; }
          .ag-card { background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; text-align:center; max-width:440px; width:90%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; }
          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .ag-btn { display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px;border-radius:16px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;color:#1e293b; background:#fff; box-shadow:0 8px 24px rgba(255,255,255,.15); }
          .ag-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(255,255,255,.25); }
        `}</style>
        <div className="ag-card">
          <div style={{fontSize:'3.5rem', marginBottom:'24px'}}>🚀</div>
          <h1 style={{fontSize:'1.8rem', fontWeight:800, color:'#f8fafc', margin:'0 0 12px'}}>مرحباً بك في الكورس</h1>
          <p style={{fontSize:'.95rem', color:'#94a3b8', lineHeight:1.8, margin:'0 0 36px'}}>
            يجب تسجيل الدخول بحساب جوجل للوصول إلى محتوى الدورة.
          </p>
          <button className="ag-btn" onClick={handleLogin} disabled={loading}>
            {loading ? 'جاري التحويل...' : (
              <>
                <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.14 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                تسجيل الدخول بجوجل
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── 4. Needs Access Request (status = none) ──────────────────────
  if (session && accessStatus === 'none' && !blocked) {
    return (
      <div className="ag-overlay">
        <style>{`
          .ag-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#020617;font-family:'Cairo','Inter',sans-serif;direction:rtl; }
          .ag-card { background:rgba(15,23,42,.95); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:32px; padding:60px 48px; max-width:440px; width:90%; box-shadow:0 40px 80px rgba(0,0,0,.6); animation:ag-fadeup .5s ease; text-align:center; }
          @keyframes ag-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .ag-btn { display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px;border-radius:16px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;color:#fff;background:#38bdf8;margin-top:20px; }
          .ag-btn:hover { background:#0ea5e9; }
          .ag-logout { display:block; text-align:center; margin-top:24px; color:#64748b; font-size:.85rem; cursor:pointer; background:none; border:none; width:100%; }
          .ag-logout:hover { color:#94a3b8; }
        `}</style>
        <div className="ag-card">
          <img src={session.user.user_metadata.avatar_url} alt="" style={{width:80,height:80,borderRadius:'50%', marginBottom:16, border:'2px solid rgba(255,255,255,.1)'}} />
          <h2 style={{fontSize:'1.6rem', fontWeight:800, color:'#f8fafc', margin:'0 0 12px'}}>أهلاً، {session.user.user_metadata.full_name}</h2>
          <p style={{fontSize:'.95rem', color:'#94a3b8', lineHeight:1.8, margin:'0 0 32px'}}>
            حسابك مسجل لدينا بنجاح، لكنك بحاجة إلى موافقة المشرف للوصول إلى محتوى الدورة.
          </p>

          <button onClick={handleRequestAccess} className="ag-btn" disabled={loading}>
            {loading ? 'جاري الإرسال...' : 'طلب الانضمام للكورس'}
          </button>

          <button type="button" onClick={handleLogout} className="ag-logout">
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  // ── 5. Pending Approval (status = pending) ─────────────────────
  if (session && accessStatus === 'pending' && !blocked) {
    const waMsgRequest = encodeURIComponent(`مرحباً، لقد أرسلت طلب انضمام لكورس Dart & Flutter Pro (الإيميل: ${session.user.email})، هل يمكن المراجعة؟`);
    const waLinkRequest = `https://wa.me/${WA_NUMBER}?text=${waMsgRequest}`;

    return (
      <div className="ag-overlay">
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
          <div style={{fontSize:'3.5rem', marginBottom:'24px'}} className="pulse">⏳</div>
          <h2 style={{fontSize:'1.6rem', fontWeight:800, color:'#f8fafc', margin:'0 0 12px'}}>جاري المراجعة</h2>
          <p style={{fontSize:'.95rem', color:'#94a3b8', lineHeight:1.8, margin:'0 0 24px'}}>
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
