import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zVjzVEKeyjH8qtPKS9pJGA_1OSruxJH';
const supabase    = createClient(SUPABASE_URL, SUPABASE_KEY);

const STORAGE_KEY    = 'dart_flutter_access_token';
const STORAGE_EXPIRY = 'dart_flutter_access_expiry';
const WA_NUMBER      = '201552946586';

function isAccessValid(): boolean {
  try {
    const token  = localStorage.getItem(STORAGE_KEY);
    const expiry = localStorage.getItem(STORAGE_EXPIRY);
    if (!token || !expiry) return false;
    return Date.now() < parseInt(expiry, 10);
  } catch { return false; }
}
function saveAccess(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, code);
    localStorage.setItem(STORAGE_EXPIRY, String(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days
  } catch { /* silent */ }
}

// ── Types ─────────────────────────────────────────────────────────
type Panel = 'request' | 'requested' | 'enter-code';

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [ready,        setReady]        = useState(false);
  const [granted,      setGranted]      = useState(false);
  const [panel,        setPanel]        = useState<Panel>('request');
  const [visitorName,  setVisitorName]  = useState('');
  const [visitorMsg,   setVisitorMsg]   = useState('');
  const [code,         setCode]         = useState('');
  const [codeError,    setCodeError]    = useState('');
  const [reqError,     setReqError]     = useState('');
  const [reqLoading,   setReqLoading]   = useState(false);
  const [codeLoading,  setCodeLoading]  = useState(false);
  const [codeSuccess,  setCodeSuccess]  = useState(false);
  const [shake,        setShake]        = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isAccessValid()) setGranted(true);
      setReady(true);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 600); };

  // ── Send request → email ──────────────────────────────────────
  const handleRequest = useCallback(async () => {
    if (!visitorName.trim()) { setReqError('من فضلك اكتب اسمك'); return; }
    setReqLoading(true); setReqError('');
    try {
      const { error: fnError } = await supabase.functions.invoke('send-access-notification', {
        body: {
          requesterInfo: `الاسم: ${visitorName.trim()} — رسالة: ${visitorMsg.trim() || 'لم يكتب رسالة'}`,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
      });
      if (fnError) throw fnError;
      // Build WhatsApp message containing visitor name so admin can identify
      setPanel('requested');
    } catch {
      setReqError('تعذر إرسال الطلب، تحقق من اتصالك بالإنترنت');
    } finally { setReqLoading(false); }
  }, [visitorName, visitorMsg]);

  // ── Validate code ─────────────────────────────────────────────
  const handleValidate = useCallback(async () => {
    if (!code.trim()) { setCodeError('أدخل الكود أولاً'); triggerShake(); return; }
    setCodeLoading(true); setCodeError('');
    try {
      const { data, error: rpcError } = await supabase.rpc('validate_access_code', {
        input_code: code.trim().toUpperCase(),
      });
      if (rpcError) throw rpcError;
      if (data === true) {
        saveAccess(code.trim().toUpperCase());
        setCodeSuccess(true);
        setTimeout(() => setGranted(true), 1000);
      } else {
        setCodeError('الكود غلط أو منتهي الصلاحية');
        triggerShake();
      }
    } catch { setCodeError('حدث خطأ، حاول مرة أخرى'); triggerShake(); }
    finally { setCodeLoading(false); }
  }, [code]);

  if (granted) return <>{children}</>;

  // Build WA link dynamically with visitor name
  const waMsg = encodeURIComponent(`مرحباً، أنا ${visitorName || 'زائر'} — أرسلت طلب وصول لموقع Dart & Flutter Pro، ممكن تبعتلي الكود؟ 🔐`);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  return (
    <>
      <style>{`
        @keyframes ag-in    { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes ag-fadein{ from{opacity:0} to{opacity:1} }
        @keyframes ag-left  { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
        @keyframes ag-right { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
        @keyframes ag-spin  { to{transform:rotate(360deg)} }
        @keyframes ag-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes ag-pop   { 0%{transform:scale(.75);opacity:0} 70%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
        @keyframes ag-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ag-orb1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,-50px)} }
        @keyframes ag-orb2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,60px)} }
        @keyframes ag-glow  { 0%,100%{box-shadow:0 0 30px rgba(14,165,233,.18)} 50%{box-shadow:0 0 60px rgba(14,165,233,.45)} }
        @keyframes ag-wa-pulse { 0%,100%{box-shadow:0 8px 28px rgba(37,211,102,.3)} 50%{box-shadow:0 8px 44px rgba(37,211,102,.6)} }
        @keyframes ag-slide-panel { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }

        .ag-overlay {
          position:fixed; inset:0; z-index:99999;
          display:flex; align-items:center; justify-content:center;
          background:#04080f; overflow:hidden;
          animation:ag-fadein .4s ease;
          font-family:'Cairo','Inter',system-ui,sans-serif;
          direction:rtl;
        }
        .ag-blob { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; }
        .ag-b1 { width:650px;height:650px; background:radial-gradient(circle,rgba(14,165,233,.13) 0%,transparent 65%); top:-200px;right:-200px; animation:ag-orb1 10s ease-in-out infinite; }
        .ag-b2 { width:550px;height:550px; background:radial-gradient(circle,rgba(167,139,250,.1) 0%,transparent 65%); bottom:-180px;left:-180px; animation:ag-orb2 13s ease-in-out infinite; }
        .ag-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:linear-gradient(rgba(14,165,233,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.028) 1px,transparent 1px);
          background-size:70px 70px;
        }

        /* ── TWO-COLUMN CARD ── */
        .ag-card {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1fr 1fr;
          width:min(940px, calc(100vw - 40px));
          min-height:min(570px, calc(100vh - 60px));
          background:rgba(5,11,24,.92);
          backdrop-filter:blur(32px); -webkit-backdrop-filter:blur(32px);
          border:1px solid rgba(255,255,255,.07);
          border-radius:32px; overflow:hidden;
          box-shadow:0 48px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(14,165,233,.04);
        }

        /* ── LEFT PANEL ── */
        .ag-left {
          padding:52px 48px;
          background:linear-gradient(165deg,rgba(14,165,233,.07) 0%,rgba(167,139,250,.04) 100%);
          border-left:1px solid rgba(255,255,255,.05);
          display:flex; flex-direction:column; justify-content:center;
          animation:ag-left .7s cubic-bezier(.16,1,.3,1) both;
        }
        .ag-lock {
          width:80px;height:80px; border-radius:50%;
          background:linear-gradient(135deg,rgba(14,165,233,.18),rgba(167,139,250,.1));
          border:1.5px solid rgba(14,165,233,.28);
          display:flex; align-items:center; justify-content:center;
          font-size:32px; margin-bottom:26px;
          animation:ag-glow 3.5s ease-in-out infinite, ag-float 4s ease-in-out infinite;
        }
        .ag-badge {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(14,165,233,.08); border:1px solid rgba(14,165,233,.18);
          color:#38bdf8; border-radius:100px; padding:4px 13px;
          font-size:.75rem; font-weight:700; margin-bottom:20px;
        }
        .ag-badge-dot { width:6px;height:6px;border-radius:50%;background:#ef4444;box-shadow:0 0 6px #ef4444; }
        .ag-title {
          font-size:1.9rem; font-weight:900; margin:0 0 10px;
          background:linear-gradient(135deg,#fff 20%,#7dd3fc 55%,#a78bfa 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; line-height:1.2;
        }
        .ag-sub { font-size:.88rem; color:#475569; line-height:1.85; margin:0 0 36px; }

        /* How-it-works steps */
        .ag-steps { display:flex; flex-direction:column; gap:12px; }
        .ag-step {
          display:flex; align-items:center; gap:14px;
          background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.05);
          border-radius:14px; padding:13px 16px; transition:all .25s ease;
        }
        .ag-step:hover { background:rgba(14,165,233,.06); border-color:rgba(14,165,233,.15); }
        .ag-step-num {
          width:30px;height:30px;border-radius:50%;flex-shrink:0;
          background:rgba(14,165,233,.1); border:1px solid rgba(14,165,233,.22);
          display:flex; align-items:center; justify-content:center;
          font-size:.78rem; font-weight:800; color:#38bdf8;
        }
        .ag-step-text strong { display:block; color:#94a3b8; font-size:.88rem; margin-bottom:2px; }
        .ag-step-text span   { font-size:.8rem; color:#475569; }

        /* ── RIGHT PANEL ── */
        .ag-right {
          padding:48px 44px;
          display:flex; flex-direction:column; justify-content:center;
          animation:ag-right .7s cubic-bezier(.16,1,.3,1) .08s both;
          position:relative; overflow:hidden;
        }

        /* Success overlay */
        .ag-success-layer {
          position:absolute; inset:0;
          background:rgba(5,11,24,.97); backdrop-filter:blur(20px);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation:ag-fadein .3s ease; z-index:10;
        }
        .ag-s-emoji { font-size:3.5rem; margin-bottom:14px; animation:ag-pop .5s cubic-bezier(.16,1,.3,1); }
        .ag-s-title { font-size:1.3rem; font-weight:900; color:#22d3a0; margin-bottom:6px; }
        .ag-s-sub   { font-size:.86rem; color:#475569; }

        /* Panel animation */
        .ag-panel { animation:ag-slide-panel .35s cubic-bezier(.16,1,.3,1) both; }

        /* Form heading */
        .ag-rh { font-size:1.1rem; font-weight:800; color:#e2e8f0; margin:0 0 6px; }
        .ag-rs { font-size:.84rem; color:#475569; margin:0 0 24px; line-height:1.7; }

        /* Inputs */
        .ag-field { margin-bottom:14px; }
        .ag-lbl { font-size:.8rem; color:#64748b; font-weight:700; margin-bottom:7px; display:block; }
        .ag-inp {
          width:100%; padding:13px 16px;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.08);
          border-radius:13px; outline:none; color:#e2e8f0;
          font-size:.92rem; font-family:inherit; box-sizing:border-box;
          transition:all .25s ease; direction:rtl; text-align:right;
          resize:none;
        }
        .ag-inp:focus { border-color:rgba(14,165,233,.45); background:rgba(14,165,233,.05); box-shadow:0 0 0 3px rgba(14,165,233,.08); }
        .ag-inp::placeholder { color:#1e293b; }

        /* Code input special */
        .ag-code-inp {
          font-family:'Fira Code',monospace; letter-spacing:.3em;
          font-size:1.2rem; font-weight:700; text-align:center;
          text-transform:uppercase; direction:ltr;
          background:rgba(14,165,233,.05) !important;
          border-color:rgba(14,165,233,.2) !important;
        }
        .ag-code-inp:focus { border-color:rgba(14,165,233,.55) !important; box-shadow:0 0 0 4px rgba(14,165,233,.1), 0 0 24px rgba(14,165,233,.12) !important; }
        .ag-code-inp::placeholder { color:#1e293b; letter-spacing:.2em; }
        .ag-code-inp.ag-shake { animation:ag-shake .55s ease !important; }

        /* Primary button */
        .ag-btn {
          width:100%; padding:14px 24px;
          background:linear-gradient(135deg,#0ea5e9,#7c3aed);
          border:none; border-radius:13px; color:#fff;
          font-size:.93rem; font-weight:800; font-family:inherit; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          box-shadow:0 8px 28px rgba(14,165,233,.28);
          transition:all .25s ease; margin-top:4px;
        }
        .ag-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 36px rgba(14,165,233,.4); }
        .ag-btn:disabled { opacity:.5; cursor:not-allowed; }

        /* WhatsApp button */
        .ag-wa {
          display:flex; align-items:center; justify-content:center; gap:10px;
          width:100%; padding:15px 24px;
          background:linear-gradient(135deg,#1a7f3c,#25d366);
          border:none; border-radius:14px; color:#fff;
          font-size:1rem; font-weight:800; font-family:inherit;
          cursor:pointer; text-decoration:none;
          box-shadow:0 8px 28px rgba(37,211,102,.3);
          transition:all .25s ease; margin-bottom:24px;
          animation:ag-wa-pulse 2.5s ease-in-out infinite;
        }
        .ag-wa:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(37,211,102,.5); color:#fff; text-decoration:none; }
        .ag-wa svg { width:22px;height:22px;flex-shrink:0; }

        /* Success request box */
        .ag-req-success {
          background:rgba(34,211,160,.06); border:1px solid rgba(34,211,160,.2);
          border-radius:14px; padding:16px; margin-bottom:24px; text-align:center;
        }
        .ag-req-success-icon { font-size:2rem; display:block; margin-bottom:8px; animation:ag-pop .4s ease; }
        .ag-req-success-title { font-size:.95rem; font-weight:800; color:#22d3a0; margin-bottom:4px; }
        .ag-req-success-sub { font-size:.82rem; color:#475569; line-height:1.65; }

        /* Divider */
        .ag-div { display:flex; align-items:center; gap:12px; margin:20px 0 18px; }
        .ag-div::before,.ag-div::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }
        .ag-div span { font-size:.77rem; color:#334155; white-space:nowrap; font-weight:600; }

        /* Error */
        .ag-err {
          background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.2);
          border-radius:10px; color:#fca5a5;
          font-size:.82rem; padding:8px 13px; text-align:center; margin-bottom:10px;
        }

        /* Switch link */
        .ag-switch { text-align:center; margin-top:16px; }
        .ag-switch button { background:none; border:none; color:#38bdf8; font-size:.82rem; font-weight:700; font-family:inherit; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }

        /* Spinner */
        .ag-spinner { width:17px;height:17px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:ag-spin .7s linear infinite; }

        /* Loading */
        .ag-loading { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
        .ag-loading-ring { width:50px;height:50px;border:3px solid rgba(14,165,233,.15);border-top-color:#0ea5e9;border-radius:50%;animation:ag-spin 1s linear infinite; }
        .ag-loading-txt { color:#334155; font-size:.88rem; font-weight:600; }

        /* Footer */
        .ag-footer { text-align:center; margin-top:24px; font-size:.7rem; color:#1a2744; }
      `}</style>

      <div className="ag-overlay">
        <div className="ag-blob ag-b1" />
        <div className="ag-blob ag-b2" />
        <div className="ag-grid" />

        <div className="ag-card">
          {!ready ? (
            <div className="ag-loading">
              <div className="ag-loading-ring" />
              <div className="ag-loading-txt">جاري التحقق...</div>
            </div>
          ) : (
            <>
              {/* ══ LEFT PANEL ══ */}
              <div className="ag-left">
                <span className="ag-badge">
                  <span className="ag-badge-dot" />
                  محتوى مقيّد الوصول
                </span>
                <div className="ag-lock">🔐</div>
                <h1 className="ag-title">Dart &amp; Flutter Pro</h1>
                <p className="ag-sub">
                  هذا الموقع خاص ويتطلب إذن للوصول.<br />
                  اتبع الخطوات للحصول على كود الدخول.
                </p>
                <div className="ag-steps">
                  <div className="ag-step">
                    <div className="ag-step-num">1</div>
                    <div className="ag-step-text">
                      <strong>📝 أرسل طلب الوصول</strong>
                      <span>اكتب اسمك وارسل الطلب من هنا</span>
                    </div>
                  </div>
                  <div className="ag-step">
                    <div className="ag-step-num">2</div>
                    <div className="ag-step-text">
                      <strong>💬 تواصل عبر واتساب</strong>
                      <span>بعد الطلب، كلمنا على واتساب للتأكيد</span>
                    </div>
                  </div>
                  <div className="ag-step">
                    <div className="ag-step-num">3</div>
                    <div className="ag-step-text">
                      <strong>🔑 أدخل الكود وادخل</strong>
                      <span>سنرسل لك الكود وتبدأ التعلم فوراً</span>
                    </div>
                  </div>
                </div>
                <div className="ag-footer" style={{marginTop:'32px'}}>Dart & Flutter Pro — Secured Access</div>
              </div>

              {/* ══ RIGHT PANEL ══ */}
              <div className="ag-right">
                {/* Code success overlay */}
                {codeSuccess && (
                  <div className="ag-success-layer">
                    <div className="ag-s-emoji">🎉</div>
                    <div className="ag-s-title">تم التحقق بنجاح!</div>
                    <div className="ag-s-sub">جاري فتح المحتوى...</div>
                  </div>
                )}

                {/* ── PANEL: Request form ── */}
                {panel === 'request' && (
                  <div className="ag-panel">
                    <h2 className="ag-rh">أرسل طلب الوصول</h2>
                    <p className="ag-rs">
                      أدخل بياناتك وسنتواصل معك بكود الدخول عبر واتساب.
                    </p>

                    <div className="ag-field">
                      <label className="ag-lbl">👤 اسمك</label>
                      <input
                        id="req-name-input"
                        className="ag-inp"
                        type="text"
                        placeholder="مثال: أحمد محمد"
                        value={visitorName}
                        onChange={e => { setVisitorName(e.target.value); setReqError(''); }}
                        onKeyDown={e => e.key === 'Enter' && handleRequest()}
                        autoFocus
                      />
                    </div>

                    <div className="ag-field">
                      <label className="ag-lbl">💬 رسالة قصيرة (اختياري)</label>
                      <textarea
                        id="req-msg-input"
                        className="ag-inp"
                        placeholder="مثال: أنا طالب اشتريت الكورس..."
                        value={visitorMsg}
                        onChange={e => setVisitorMsg(e.target.value)}
                        rows={3}
                        style={{lineHeight:'1.65'}}
                      />
                    </div>

                    {reqError && <div className="ag-err">⚠️ {reqError}</div>}

                    <button
                      id="btn-send-request"
                      className="ag-btn"
                      onClick={handleRequest}
                      disabled={reqLoading}
                    >
                      {reqLoading
                        ? <span className="ag-spinner" />
                        : <><span>📤</span><span>إرسال طلب الوصول</span></>
                      }
                    </button>

                    <div className="ag-switch">
                      <button onClick={() => setPanel('enter-code')}>
                        عندي كود بالفعل — دخول مباشر →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── PANEL: After request sent ── */}
                {panel === 'requested' && (
                  <div className="ag-panel">
                    <div className="ag-req-success">
                      <span className="ag-req-success-icon">✅</span>
                      <div className="ag-req-success-title">تم إرسال طلبك بنجاح!</div>
                      <div className="ag-req-success-sub">
                        وصلنا طلبك يا <strong style={{color:'#94a3b8'}}>{visitorName}</strong>.<br />
                        كلمنا على واتساب للحصول على كودك بسرعة أكبر.
                      </div>
                    </div>

                    <a
                      id="btn-whatsapp-followup"
                      className="ag-wa"
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      كلمنا على واتساب للحصول على الكود
                    </a>

                    <div className="ag-div"><span>بعد ما تحصل على الكود</span></div>

                    <label className="ag-lbl">🔑 أدخل كود الوصول</label>
                    <input
                      id="access-code-after-request"
                      className={`ag-inp ag-code-inp${shake ? ' ag-shake' : ''}`}
                      type="text"
                      placeholder="XXXX-XXXX"
                      value={code}
                      maxLength={20}
                      onChange={e => { setCode(e.target.value.toUpperCase()); setCodeError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleValidate()}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {codeError && <div className="ag-err" style={{marginTop:'10px'}}>⚠️ {codeError}</div>}
                    <button
                      id="btn-submit-code-after-request"
                      className="ag-btn"
                      onClick={handleValidate}
                      disabled={codeLoading || codeSuccess}
                      style={{marginTop:'12px'}}
                    >
                      {codeLoading
                        ? <span className="ag-spinner" />
                        : <><span>دخول</span><span style={{fontSize:'1.05rem'}}>←</span></>
                      }
                    </button>
                  </div>
                )}

                {/* ── PANEL: Direct code entry ── */}
                {panel === 'enter-code' && (
                  <div className="ag-panel">
                    <h2 className="ag-rh">أدخل كود الوصول</h2>
                    <p className="ag-rs">
                      أدخل الكود الذي حصلت عليه منّا عبر واتساب.
                    </p>

                    <label className="ag-lbl">🔑 كود الوصول</label>
                    <input
                      id="access-code-direct"
                      className={`ag-inp ag-code-inp${shake ? ' ag-shake' : ''}`}
                      type="text"
                      placeholder="XXXX-XXXX"
                      value={code}
                      maxLength={20}
                      onChange={e => { setCode(e.target.value.toUpperCase()); setCodeError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleValidate()}
                      autoFocus
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {codeError && <div className="ag-err" style={{marginTop:'8px'}}>⚠️ {codeError}</div>}
                    <button
                      id="btn-submit-code-direct"
                      className="ag-btn"
                      onClick={handleValidate}
                      disabled={codeLoading || codeSuccess}
                    >
                      {codeLoading
                        ? <span className="ag-spinner" />
                        : <><span>دخول</span><span style={{fontSize:'1.05rem'}}>←</span></>
                      }
                    </button>

                    <div className="ag-switch">
                      <button onClick={() => setPanel('request')}>
                        ← ليس لديّ كود — إرسال طلب وصول
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
