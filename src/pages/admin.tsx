import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zVjzVEKeyjH8qtPKS9pJGA_1OSruxJH';
const supabase     = createClient(SUPABASE_URL, SUPABASE_KEY);
const PASS_KEY     = 'admin_panel_password';

interface UserProfile {
  id: string;
  status: string;
  display_name: string | null;
  email: string | null;
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
  if (m < 60) return `${m}د`;
  if (m < 1440) return `${Math.floor(m/60)}س`;
  return `${Math.floor(m/1440)}ي`;
};
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('ar-EG', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
const isOnline = (iso: string) => Date.now() - +new Date(iso) < 120_000;
const getBrowser = (ua: string|null) => {
  if (!ua) return '—';
  if (ua.includes('Edg'))     return 'Edge';
  if (ua.includes('Chrome'))  return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari'))  return 'Safari';
  return 'Browser';
};
const colorAvatar = (str: string) => {
  const colors = ['#38bdf8','#34d399','#a78bfa','#fb923c','#f472b6','#fbbf24'];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
};

export default function AdminPage() {
  const [pass,      setPass]      = useState('');
  const [authed,    setAuthed]    = useState(false);
  const [authErr,   setAuthErr]   = useState('');
  const [logging,   setLogging]   = useState(false);
  const [data,      setData]      = useState<UserProfile[]>([]);
  const [fetching,  setFetching]  = useState(false);
  const [blocking,  setBlocking]  = useState<string|null>(null);
  const [search,    setSearch]    = useState('');
  const [tab,       setTab]       = useState<'all'|'pending'|'active'|'blocked'>('all');
  const [savedPass, setSavedPass] = useState('');

  useLayoutEffect(() => {
    ['nav.navbar','.navbar','footer.footer','.footer','.table-of-contents'].forEach(s => {
      const el = document.querySelector(s) as HTMLElement|null;
      if (el) el.style.display = 'none';
    });
    const w = document.querySelector('.main-wrapper') as HTMLElement|null;
    if (w) w.style.cssText = 'padding:0!important;margin:0!important;';
    document.body.style.cssText = 'overflow:hidden;margin:0;background:#080d1a;';
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
    } catch (e: unknown) {
      if ((e as {message?:string})?.message?.includes('Unauthorized'))
        { setAuthed(false); setAuthErr('كلمة المرور غلط'); }
    } finally { setFetching(false); }
  }, []);

  const login = useCallback(async () => {
    if (!pass.trim()) { setAuthErr('أدخل كلمة المرور'); return; }
    setLogging(true); setAuthErr('');
    try {
      const { data: res, error } = await supabase.rpc('admin_list_users', { p_password: pass.trim() });
      if (error) throw error;
      setData(res || []);
      setSavedPass(pass.trim());
      localStorage.setItem(PASS_KEY, pass.trim());
      setAuthed(true);
    } catch { setAuthErr('كلمة المرور غلط'); }
    finally { setLogging(false); }
  }, [pass]);

  const updateUser = useCallback(async (id: string, newStatus: string, block: boolean) => {
    setBlocking(id);
    try {
      const { error } = await supabase.rpc('admin_update_user',
        { p_password:savedPass, p_user_id:id, p_status:newStatus, p_blocked:block });
      if (error) throw error;
      setData(prev => prev.map(s => s.id===id ? {...s, status:newStatus, is_blocked:block} : s));
    } catch {/**/}
    finally { setBlocking(null); }
  }, [savedPass]);

  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => load(savedPass), 30_000);
    return () => clearInterval(t);
  }, [authed, savedPass, load]);

  const rows = data.filter(s => {
    if (tab==='active'  && (s.is_blocked || s.status !== 'approved')) return false;
    if (tab==='pending' && (s.is_blocked || s.status !== 'pending')) return false;
    if (tab==='blocked' && !s.is_blocked) return false;
    const q = search.toLowerCase();
    const nm = (s.display_name || s.email || '').toLowerCase();
    return !q || nm.includes(q);
  });
  const C = {
    all:     data.length,
    active:  data.filter(s=>!s.is_blocked && s.status==='approved').length,
    pending: data.filter(s=>!s.is_blocked && s.status==='pending').length,
    blocked: data.filter(s=> s.is_blocked).length,
    online:  data.filter(s=>!s.is_blocked && isOnline(s.last_seen_at)).length,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap');

        @keyframes a-spin  { to{transform:rotate(360deg)} }
        @keyframes a-pop   { from{opacity:0;transform:scale(.9) translateY(20px)} to{opacity:1;transform:none} }
        @keyframes a-fade  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes a-pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 currentColor} 50%{opacity:.5;box-shadow:0 0 0 4px transparent} }
        @keyframes a-glow  { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes a-row   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes a-shine {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }

        #ap * { box-sizing:border-box; }

        #ap {
          position:fixed; top:0; left:0; width:100vw; height:100vh;
          z-index:99999; overflow:hidden;
          background:#080d1a;
          font-family:'Cairo',system-ui,sans-serif;
          display:flex; flex-direction:column;
        }

        /* ── scrollbar ── */
        #ap .scroll::-webkit-scrollbar       { width:4px }
        #ap .scroll::-webkit-scrollbar-thumb { background:rgba(255,255,255,.06); border-radius:4px }

        /* ── HEADER ── */
        #ap .hdr {
          flex-shrink:0; height:60px; display:flex; align-items:center; justify-content:space-between;
          padding:0 32px;
          background:linear-gradient(90deg,rgba(14,165,233,.06) 0%,rgba(8,13,26,.95) 50%,rgba(124,58,237,.06) 100%);
          border-bottom:1px solid rgba(255,255,255,.06);
        }
        #ap .hdr-logo { display:flex; align-items:center; gap:10px; }
        #ap .hdr-dot  {
          width:8px; height:8px; border-radius:50%; background:#0ea5e9;
          box-shadow:0 0 10px #0ea5e9; animation:a-glow 2s ease-in-out infinite;
        }
        #ap .hdr-title { font-size:1rem; font-weight:900; color:#e2e8f0; letter-spacing:-.01em; }
        #ap .hdr-pill  {
          font-size:.7rem; font-weight:700; color:#38bdf8;
          background:rgba(56,189,248,.08); border:1px solid rgba(56,189,248,.14);
          border-radius:100px; padding:2px 10px;
        }
        #ap .hdr-right { display:flex; align-items:center; gap:8px; }
        #ap .hdr-live  {
          display:flex; align-items:center; gap:6px; padding:5px 13px;
          background:rgba(52,211,153,.08); border:1px solid rgba(52,211,153,.15);
          border-radius:100px; font-size:.75rem; font-weight:700; color:#34d399;
          cursor:default;
        }
        #ap .hdr-live-dot {
          width:6px; height:6px; border-radius:50%; background:#34d399;
          box-shadow:0 0 6px #34d399; animation:a-glow 1.5s ease-in-out infinite;
        }
        #ap .hbtn {
          height:32px; padding:0 14px; border-radius:8px;
          border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.04);
          color:#64748b; font-size:.78rem; font-weight:700; font-family:inherit;
          cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:5px;
        }
        #ap .hbtn:hover       { background:rgba(255,255,255,.09); color:#e2e8f0; border-color:rgba(255,255,255,.12); }
        #ap .hbtn.hbtn-exit:hover { background:rgba(239,68,68,.1); color:#f87171; border-color:rgba(239,68,68,.2); }

        /* ── BODY ── */
        #ap .body {
          flex:1; overflow-y:auto; overflow-x:hidden;
          padding:24px 32px 40px; direction:rtl;
        }

        /* ── STATS ── */
        #ap .stats {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:14px; margin-bottom:20px;
        }
        #ap .stat {
          border-radius:16px; padding:18px 20px;
          border:1px solid rgba(255,255,255,.06);
          background:rgba(255,255,255,.03);
          animation:a-fade .4s ease both;
          transition:transform .2s, box-shadow .2s;
          cursor:default; position:relative; overflow:hidden;
        }
        #ap .stat::before {
          content:''; position:absolute; top:-40px; left:-20px;
          width:140px; height:140px; border-radius:50%;
          filter:blur(40px); pointer-events:none;
        }
        #ap .stat.c0::before { background:rgba(56,189,248,.15); }
        #ap .stat.c1::before { background:rgba(52,211,153,.12); }
        #ap .stat.c2::before { background:rgba(248,113,113,.1); }
        #ap .stat.c3::before { background:rgba(167,139,250,.12); }
        #ap .stat:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,.2); }

        #ap .stat-top  { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        #ap .stat-icon { font-size:1.3rem; }
        #ap .stat-tag  { font-size:.68rem; font-weight:800; border-radius:100px; padding:3px 9px; }

        #ap .stat.c0 .stat-tag { color:#38bdf8; background:rgba(56,189,248,.1); border:1px solid rgba(56,189,248,.15); }
        #ap .stat.c1 .stat-tag { color:#34d399; background:rgba(52,211,153,.1); border:1px solid rgba(52,211,153,.15); }
        #ap .stat.c2 .stat-tag { color:#f87171; background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.14); }
        #ap .stat.c3 .stat-tag { color:#a78bfa; background:rgba(167,139,250,.1); border:1px solid rgba(167,139,250,.15); }

        #ap .stat-num  { font-size:2.4rem; font-weight:900; line-height:1; margin-bottom:4px; }
        #ap .stat.c0 .stat-num { color:#38bdf8; }
        #ap .stat.c1 .stat-num { color:#34d399; }
        #ap .stat.c2 .stat-num { color:#f87171; }
        #ap .stat.c3 .stat-num { color:#a78bfa; }
        #ap .stat-lbl  { font-size:.74rem; color:#475569; font-weight:600; }

        /* ── TOOLBAR ── */
        #ap .toolbar { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        #ap .search-box {
          flex:1; position:relative;
        }
        #ap .search-box input {
          width:100%; padding:10px 42px 10px 16px; direction:rtl;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.07);
          border-radius:12px; outline:none; color:#e2e8f0; font-size:.86rem;
          font-family:inherit; transition:border .2s, background .2s;
        }
        #ap .search-box input:focus { border-color:rgba(56,189,248,.35); background:rgba(14,165,233,.03); }
        #ap .search-box input::placeholder { color:#1e293b; }
        #ap .search-ico { position:absolute; right:14px; top:50%; transform:translateY(-50%); font-size:13px; color:#2d3f5a; pointer-events:none; }

        #ap .tabs { display:flex; gap:3px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:12px; padding:4px; flex-shrink:0; }
        #ap .tab  { padding:6px 14px; border-radius:9px; border:none; font-size:.8rem; font-weight:700; font-family:inherit; cursor:pointer; transition:all .18s; white-space:nowrap; }
        #ap .tab.t0  { background:transparent; color:#475569; }
        #ap .tab.t0:hover  { background:rgba(255,255,255,.06); color:#94a3b8; }
        #ap .tab.on { box-shadow:0 2px 8px rgba(0,0,0,.2); }
        #ap .tab.on.b0 { background:rgba(56,189,248,.14); color:#38bdf8; }
        #ap .tab.on.b1 { background:rgba(52,211,153,.12); color:#34d399; }
        #ap .tab.on.b2 { background:rgba(239,68,68,.1);   color:#f87171; }

        /* ── CARD ── */
        #ap .card {
          background:rgba(10,16,32,.9); border:1px solid rgba(255,255,255,.07);
          border-radius:20px; overflow:hidden;
          box-shadow:0 24px 60px rgba(0,0,0,.35);
          animation:a-fade .4s ease .1s both;
          width:100%;
        }
        #ap .card-hdr {
          padding:14px 22px; border-bottom:1px solid rgba(255,255,255,.055);
          display:flex; align-items:center; justify-content:space-between;
          background:rgba(255,255,255,.013);
        }
        #ap .card-title { font-size:.88rem; font-weight:800; color:#e2e8f0; display:flex; align-items:center; gap:8px; }
        #ap .card-badge { background:rgba(56,189,248,.1); border:1px solid rgba(56,189,248,.15); color:#38bdf8; border-radius:100px; padding:2px 10px; font-size:.72rem; font-weight:700; }

        /* ── LUXURY MINIMALIST GRID TABLE ── */
        #ap .grid-tbl {
          width:100%; min-width:760px;
          display:flex; flex-direction:column;
        }
        #ap .grid-hdr {
          display:grid; grid-template-columns:26% 16% 14% 16% 14% 14%;
          padding:16px 26px;
          background:linear-gradient(90deg, rgba(255,255,255,.01), rgba(255,255,255,.025) 50%, rgba(255,255,255,.01));
          border-top:1px solid rgba(255,255,255,.05);
          border-bottom:1px solid rgba(255,255,255,.05);
          color:#94a3b8; font-size:.82rem; font-weight:600; letter-spacing:.02em;
          text-align:right;
        }
        #ap .grid-row {
          display:grid; grid-template-columns:26% 16% 14% 16% 14% 14%;
          align-items:center;
          padding:18px 26px;
          border-bottom:1px solid rgba(255,255,255,.03);
          background:transparent;
          transition:background .2s ease;
        }
        #ap .grid-row:last-child { border-bottom:none; }
        #ap .grid-row:hover {
          background:rgba(255,255,255,.02);
        }
        #ap .grid-cell { text-align:right; }

        /* User cell */
        #ap .u-wrap { display:flex; align-items:center; gap:14px; justify-content:flex-start; }
        #ap .u-ava  { width:42px; height:42px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.1rem; font-weight:800; color:#fff; box-shadow:inset 0 2px 4px rgba(255,255,255,.1); object-fit:cover; overflow:hidden; }
        #ap .u-name { font-size:1rem; font-weight:700; color:#f8fafc; display:flex; align-items:center; justify-content:flex-start; gap:8px; }
        #ap .u-sub  { font-size:.78rem; color:#64748b; margin-top:4px; text-align:right; }
        #ap .online-dot { width:6px; height:6px; border-radius:50%; background:#34d399; box-shadow:0 0 5px #34d399; flex-shrink:0; animation:a-glow 2s infinite; }

        /* Code pill */
        #ap .cpill { font-family:'Fira Code',monospace; font-size:.85rem; letter-spacing:.05em; color:#38bdf8; background:rgba(56,189,248,.07); border:1px solid rgba(56,189,248,.12); border-radius:8px; padding:4px 11px; display:inline-block; }

        /* Status badge */
        #ap .sbadge { display:inline-flex; align-items:center; gap:6px; border-radius:100px; padding:5px 13px; font-size:.8rem; font-weight:700; }
        #ap .sbadge.ok  { background:rgba(52,211,153,.08); border:1px solid rgba(52,211,153,.15); color:#34d399; }
        #ap .sbadge.bad { background:rgba(239,68,68,.07);  border:1px solid rgba(239,68,68,.13);  color:#f87171; }
        #ap .sbadge-dot { width:5px; height:5px; border-radius:50%; }
        #ap .sbadge.ok  .sbadge-dot { background:#34d399; animation:a-glow 2s infinite; }
        #ap .sbadge.bad .sbadge-dot { background:#f87171; }

        /* Action button */
        #ap .abtn { display:inline-flex; align-items:center; gap:5px; padding:8px 16px; border-radius:10px; border:none; font-size:.85rem; font-weight:800; font-family:inherit; cursor:pointer; transition:opacity .18s, transform .18s; white-space:nowrap; }
        #ap .abtn:hover:not(:disabled) { opacity:.78; transform:translateY(-1px); }
        #ap .abtn:disabled { opacity:.4; cursor:not-allowed; }
        #ap .abtn.block   { background:rgba(239,68,68,.09); color:#f87171; border:1px solid rgba(239,68,68,.15); }
        #ap .abtn.unblock { background:rgba(52,211,153,.09); color:#34d399; border:1px solid rgba(52,211,153,.15); }

        /* Empty / Loading */
        #ap .empty { text-align:center; padding:70px 20px; }
        #ap .empty-ico { font-size:2.8rem; opacity:.3; display:block; margin-bottom:12px; }
        #ap .empty-txt { font-size:.86rem; color:#94a3b8; }

        /* Spinner */
        #ap .spin { border-radius:50%; animation:a-spin .7s linear infinite; flex-shrink:0; }

        /* ── LOGIN ── */
        #ap .login-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:20px; }
        #ap .login-card {
          width:min(420px,100%); padding:52px 48px;
          background:rgba(10,16,32,.97);
          border:1px solid rgba(255,255,255,.07);
          border-radius:28px; text-align:center;
          box-shadow:0 40px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04);
          animation:a-pop .55s cubic-bezier(.16,1,.3,1);
        }
        #ap .login-emblem {
          width:72px; height:72px; border-radius:22px; margin:0 auto 22px;
          background:linear-gradient(135deg,rgba(14,165,233,.18),rgba(124,58,237,.12));
          border:1px solid rgba(56,189,248,.15);
          display:flex; align-items:center; justify-content:center; font-size:30px;
          box-shadow:0 0 40px rgba(14,165,233,.15);
        }
        #ap .login-title { font-size:1.45rem; font-weight:900; color:#e2e8f0; margin-bottom:6px; }
        #ap .login-sub   { font-size:.82rem; color:#334155; margin-bottom:34px; }
        #ap .login-label { display:block; text-align:right; font-size:.76rem; font-weight:700; color:#2d3f5a; margin-bottom:8px; }
        #ap .login-inp {
          width:100%; padding:13px 18px; margin-bottom:13px;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.07);
          border-radius:13px; outline:none; color:#e2e8f0; font-size:.97rem;
          font-family:inherit; text-align:center; letter-spacing:.15em; direction:ltr;
          transition:border .2s, background .2s;
        }
        #ap .login-inp:focus { border-color:rgba(56,189,248,.4); background:rgba(14,165,233,.04); }
        #ap .login-inp::placeholder { color:#1e293b; letter-spacing:normal; }
        #ap .login-btn {
          width:100%; padding:14px; border:none; border-radius:13px;
          background:linear-gradient(135deg,#0ea5e9,#7c3aed);
          color:#fff; font-size:.97rem; font-weight:800; font-family:inherit;
          cursor:pointer; transition:all .25s; display:flex; align-items:center; justify-content:center; gap:8px;
          box-shadow:0 10px 28px rgba(14,165,233,.2), inset 0 1px 0 rgba(255,255,255,.15);
        }
        #ap .login-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 40px rgba(14,165,233,.35); }
        #ap .login-btn:disabled { opacity:.5; cursor:not-allowed; }
        #ap .login-err {
          display:flex; align-items:center; justify-content:center; gap:7px;
          background:rgba(239,68,68,.07); border:1px solid rgba(239,68,68,.15);
          border-radius:11px; color:#fca5a5; font-size:.82rem; padding:10px;
          margin-bottom:13px;
        }

        @media (max-width:768px) {
          #ap .stats { grid-template-columns:repeat(2,1fr); }
          #ap .hdr   { padding:0 16px; }
          #ap .body  { padding:16px 14px 30px; }
        }
      `}</style>

      <div id="ap">
        {/* ── HEADER */}
        <div className="hdr">
          <div className="hdr-logo">
            <div className="hdr-dot" />
            <span className="hdr-title">Admin Panel</span>
            <span className="hdr-pill">Dart & Flutter Pro</span>
          </div>
          {authed && (
            <div className="hdr-right">
              {C.online > 0 && (
                <div className="hdr-live">
                  <div className="hdr-live-dot" />
                  {C.online} أونلاين
                </div>
              )}
              <button className="hbtn" onClick={() => load(savedPass)} disabled={fetching}>
                {fetching
                  ? <div className="spin" style={{width:13,height:13,border:'2px solid rgba(255,255,255,.2)',borderTopColor:'#94a3b8'}} />
                  : '🔄'} تحديث
              </button>
              <button className="hbtn hbtn-exit" onClick={() => {
                localStorage.removeItem(PASS_KEY);
                setAuthed(false); setSavedPass(''); setPass('');
              }}>🚪 خروج</button>
            </div>
          )}
        </div>

        {/* ── LOGIN */}
        {!authed ? (
          <div className="login-wrap">
            <div className="login-card">
              <div className="login-emblem">🛡️</div>
              <div className="login-title">لوحة التحكم</div>
              <div className="login-sub">أدخل كلمة مرور المشرف للمتابعة</div>
              {authErr && <div className="login-err">⚠️ {authErr}</div>}
              <label className="login-label">🔑 كلمة المرور</label>
              <input className="login-inp" type="password" placeholder="••••••••••"
                value={pass} autoFocus
                onChange={e => { setPass(e.target.value); setAuthErr(''); }}
                onKeyDown={e => e.key==='Enter' && login()}
              />
              <button className="login-btn" onClick={login} disabled={logging}>
                {logging
                  ? <div className="spin" style={{width:18,height:18,border:'2px solid rgba(255,255,255,.25)',borderTopColor:'#fff'}} />
                  : <><span>🔓</span>دخول للوحة التحكم</>}
              </button>
            </div>
          </div>

        ) : (
          /* ── DASHBOARD */
          <div className="body scroll">

            {/* Stats */}
            <div className="stats">
              {[
                {cls:'c0', ico:'👥', num:C.all,     lbl:'المسجلين',    tag:'الكل',  d:0},
                {cls:'c3', ico:'⏳', num:C.pending, lbl:'طلبات انضمام', tag:'جديد',   d:.07},
                {cls:'c1', ico:'✅', num:C.active,  lbl:'نشطين',       tag:'مفعل',   d:.14},
                {cls:'c2', ico:'🚫', num:C.blocked, lbl:'محظورين',     tag:'محظور', d:.21},
              ].map(s => (
                <div key={s.cls} className={`stat ${s.cls}`} style={{animationDelay:`${s.d}s`}}>
                  <div className="stat-top">
                    <span className="stat-icon">{s.ico}</span>
                    <span className="stat-tag">{s.tag}</span>
                  </div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="toolbar">
              <div className="search-box">
                <span className="search-ico">🔍</span>
                <input placeholder="ابحث بالاسم أو الإيميل..."
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="tabs">
                {[
                  {key:'all',     lbl:`الكل (${C.all})`,        cls:'b0'},
                  {key:'pending', lbl:`انتظار (${C.pending})`,  cls:'b1'},
                  {key:'active',  lbl:`نشطين (${C.active})`,    cls:'b1'},
                  {key:'blocked', lbl:`محظورين (${C.blocked})`, cls:'b2'},
                ].map(t => (
                  <button key={t.key}
                    className={`tab ${tab===t.key ? `on ${t.cls}` : 't0'}`}
                    onClick={() => setTab(t.key as typeof tab)}>
                    {t.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Card */}
            <div className="card">
              <div className="card-hdr">
                <div className="card-title">
                  👤 المستخدمون
                  <span className="card-badge">{rows.length}</span>
                </div>
                {fetching && (
                  <div className="spin" style={{width:16,height:16,border:'2px solid rgba(255,255,255,.1)',borderTopColor:'#38bdf8'}} />
                )}
              </div>

              <div style={{overflowX:'auto', paddingBottom:'8px'}}>
                <div className="grid-tbl">
                  {/* Header */}
                  <div className="grid-hdr">
                    {['المستخدم','تاريخ الانضمام','المتصفح','آخر ظهور','حالة الوصول','إجراء'].map((h, i) => (
                      <div key={h} style={i > 0 ? {textAlign: 'center'} : {}}>{h}</div>
                    ))}
                  </div>

                  {/* Body */}
                  {rows.length===0 ? (
                    <div className="empty">
                      <span className="empty-ico">{search?'🔍':'👥'}</span>
                      <div className="empty-txt">{search?'لا توجد نتائج مطابقة':'لا يوجد مستخدمين بعد'}</div>
                    </div>
                  ) : rows.map((s,i) => {
                    const avc = colorAvatar(s.display_name || s.id);
                    return (
                      <div key={s.id} className="grid-row" style={{animationDelay:`${i*.04}s`}}>
                        {/* Name */}
                        <div className="grid-cell">
                          <div className="u-wrap">
                            {s.avatar_url ? (
                              <img src={s.avatar_url} alt="" className="u-ava" />
                            ) : (
                              <div className="u-ava" style={{background:`${avc}22`,border:`1px solid ${avc}50`,color:avc}}>
                                {(s.display_name||s.email||'?')[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="u-name">
                                {s.display_name||'مجهول'}
                                {isOnline(s.last_seen_at)&&!s.is_blocked&&<div className="online-dot"/>}
                              </div>
                              <div className="u-sub">{s.email || 'بدون إيميل'}</div>
                            </div>
                          </div>
                        </div>
                        {/* Join Date */}
                        <div className="grid-cell" style={{color:'#94a3b8',fontSize:'.82rem', textAlign:'center'}} dir="rtl">{fmtDate(s.created_at)}</div>
                        {/* Browser */}
                        <div className="grid-cell" style={{color:'#94a3b8',fontSize:'.88rem', textAlign:'center'}}>{getBrowser(s.user_agent)}</div>
                        {/* Time */}
                        <div className="grid-cell" style={{color:'#94a3b8',fontSize:'.82rem', textAlign:'center'}} dir="rtl">{fmtDate(s.last_seen_at)}</div>
                        {/* Status */}
                        <div className="grid-cell" style={{textAlign:'center'}}>
                          {s.is_blocked ? (
                             <span className="sbadge bad"><span className="sbadge-dot"/>محظور</span>
                          ) : s.status === 'pending' ? (
                             <span className="sbadge" style={{background:'rgba(251,191,36,.1)', color:'#fbbf24', border:'1px solid rgba(251,191,36,.2)'}}><span className="sbadge-dot" style={{background:'#fbbf24'}}/>مراجعة</span>
                          ) : s.status === 'approved' ? (
                             <span className="sbadge ok"><span className="sbadge-dot"/>مفعل</span>
                          ) : (
                             <span className="sbadge" style={{background:'rgba(148,163,184,.1)', color:'#94a3b8', border:'1px solid rgba(148,163,184,.2)'}}>لم يطلب</span>
                          )}
                        </div>
                        {/* Action */}
                        <div className="grid-cell" style={{display:'flex', gap:'8px', justifyContent:'center'}}>
                          {s.is_blocked ? (
                            <button className="abtn unblock" disabled={blocking===s.id} onClick={()=>updateUser(s.id, s.status, false)}>
                              {blocking===s.id ? <div className="spin" style={{width:12,height:12,border:'2px solid rgba(255,255,255,.2)',borderTopColor:'currentColor'}}/> : '✅'} فك الحظر
                            </button>
                          ) : (
                            <>
                              {s.status === 'pending' && (
                                <button className="abtn unblock" disabled={blocking===s.id} onClick={()=>updateUser(s.id, 'approved', false)}>
                                  {blocking===s.id ? <div className="spin" style={{width:12,height:12,border:'2px solid rgba(255,255,255,.2)',borderTopColor:'currentColor'}}/> : '✅'} موافقة
                                </button>
                              )}
                              <button className="abtn block" disabled={blocking===s.id} onClick={()=>updateUser(s.id, s.status, true)}>
                                {blocking===s.id ? <div className="spin" style={{width:12,height:12,border:'2px solid rgba(255,255,255,.2)',borderTopColor:'currentColor'}}/> : '🚫'} حظر
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
