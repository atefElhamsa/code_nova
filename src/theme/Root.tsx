import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { supabase } from '../lib/supabaseClient';
import AccessGate from '../components/AccessGate';

// 🛑 زر التحكم السحري: اجعل هذه القيمة false إذا كنت تريد فتح الكورسات مجاناً للجميع وإلغاء البوابة تماماً
const IS_GATE_ENABLED = true;

export default function Root({ children }) {
  const location = useLocation();
  const [isLocked, setIsLocked] = useState(false);
  const [deviceCode, setDeviceCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const isFlutterCourse = location.pathname.startsWith('/docs') && !location.pathname.startsWith('/docs-js') && !location.pathname.startsWith('/docs-cpp') && !location.pathname.startsWith('/docs-python');
  const isJsCourse = location.pathname.startsWith('/docs-js');
  const isCppCourse = location.pathname.startsWith('/docs-cpp');
  const isPythonCourse = location.pathname.startsWith('/docs-python');
  const isCourseRoute = isFlutterCourse || isJsCourse || isCppCourse || isPythonCourse;

  // تحديد اسم الكورس الحالي برمجياً
  const currentCourse = isJsCourse ? 'js' : isCppCourse ? 'cpp' : isPythonCourse ? 'python' : (isFlutterCourse ? 'flutter' : 'none');
  const currentCourseName = currentCourse === 'flutter' ? 'كورس فلاتر & Dart' : currentCourse === 'js' ? 'كورس جافاسكريبت' : currentCourse === 'cpp' ? 'كورس C++' : 'كورس Python';

  useEffect(() => {
    let isMounted = true;

    const initGate = async () => {
      // إذا كان النظام معطلاً من زر التحكم السحري، لا تظهر البوابة
      if (!IS_GATE_ENABLED) {
        setIsInitializing(false);
        return;
      }

      if (typeof window === 'undefined' || !isCourseRoute) {
        setIsInitializing(false);
        return;
      }

      let hasCourseAccess = false;
      let hasAllAccess = false;

      // التحقق من قاعدة البيانات للمستخدم الحالي
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (user) {
        const { data: dbAccess } = await supabase
          .from('course_access_requests')
          .select('target_course')
          .eq('user_id', user.id)
          .eq('is_approved', true);

        if (dbAccess && dbAccess.length > 0) {
          if (dbAccess.some(r => r.target_course === 'all')) {
            hasAllAccess = true;
          }
          if (dbAccess.some(r => r.target_course === currentCourse)) {
            hasCourseAccess = true;
          }
        }
      }

      if (hasCourseAccess || hasAllAccess) {
        setIsLocked(false);
        document.body.style.overflow = 'auto';
        setIsInitializing(false);
        return;
      }

      setIsLocked(true);
      document.body.style.overflow = 'hidden';

      // تجهيز كود الجهاز في الخلفية
      let storedCode = localStorage.getItem(`CodeNova_Device_Code_${currentCourse}`);
      if (!storedCode) {
        storedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        localStorage.setItem(`CodeNova_Device_Code_${currentCourse}`, storedCode);
      }
      if (isMounted) setDeviceCode(storedCode);
      if (isMounted) setIsInitializing(false);
    };

    initGate();
    return () => { isMounted = false; };
  }, [location.pathname, isCourseRoute, currentCourse]);

  const grantAccess = (courseName) => {
    // Note: We intentionally DO NOT save 'GRANTED' to localStorage anymore.
    // Course access MUST be validated via the database on every page load for security.
    setIsLocked(false);
    document.body.style.overflow = 'auto';
  };



  const handleManualCodeSubmit = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return setErrorMsg("الرجاء إدخال الكود أولاً");

    setIsChecking(true);
    setErrorMsg(""); setSuccessMsg("");

    try {
      const { data, error } = await supabase
        .from('course_access_requests')
        .select('*')
        .eq('device_code', inputCode.trim().toUpperCase())
        .single();

      if (error || !data) {
        setErrorMsg("الكود غير صحيح، تأكد من كتابته بشكل سليم.");
        setIsChecking(false); return;
      }

      // ⚠️ هنا برمجة (انتهاء صلاحية الكود إذا استُخدم من قبل)
      if (data.is_approved === true) {
        setErrorMsg("هذا الكود تم استخدامه من قبل وانتهت صلاحيته!");
        setIsChecking(false); return;
      }

      // هل هذا الكود مخصص لهذا الكورس؟
      if (data.target_course !== currentCourse && data.target_course !== 'all') {
        setErrorMsg("هذا الكود مخصص لكورس آخر، ولا يفتح هذا الكورس!");
        setIsChecking(false); return;
      }

      // الكود سليم! نقوم بحرقه وربطه بالمستخدم فوراً
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      const updatePayload: any = { is_approved: true };
      if (user) {
        updatePayload.user_id = user.id;
      }

      const { error: updateError } = await supabase
        .from('course_access_requests')
        .update(updatePayload)
        .eq('id', data.id);

      if (!updateError) {
        setSuccessMsg("كود صحيح! تم التفعيل بنجاح، جاري الدخول...");
        setTimeout(() => grantAccess(data.target_course), 1000);
      } else {
        setErrorMsg("حدث خطأ أثناء حرق الكود.");
      }
    } catch (err) {
      setErrorMsg("حدث خطأ في الاتصال بالخادم.");
    }
    setIsChecking(false);
  };

  const [showCodeInput, setShowCodeInput] = useState(false);

  if (isCourseRoute && isInitializing) {
    return <div style={{ height: '100vh', background: '#04080f' }}></div>;
  }

  return (
    <AccessGate>
      {children}

      {/* Floating Contact Button */}
      <a
        href="https://wa.me/201272442829"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        title="تواصل معنا عبر واتساب"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {isLocked && (
        <div className="course-gate-overlay">
          <style>{`
            .course-gate-overlay {
              position: fixed; inset: 0; z-index: 999999;
              display: grid; place-items: center;
              background: rgba(9, 9, 11, 0.9);
              backdrop-filter: blur(40px);
              -webkit-backdrop-filter: blur(40px);
              padding: 10px;
              overflow-y: auto;
            }
            .course-gate-overlay::-webkit-scrollbar { width: 0px; display: none; }
            
            .fintech-card {
              background: linear-gradient(180deg, rgba(39, 39, 42, 0.9) 0%, rgba(24, 24, 27, 0.9) 100%);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 24px;
              padding: 24px;
              width: 100%;
              max-width: 440px;
              box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
              text-align: center;
              animation: ag-scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              margin: auto;
            }
            
            @keyframes ag-scaleUp { 
              from { opacity: 0; transform: scale(0.95) translateY(10px); } 
              to { opacity: 1; transform: scale(1) translateY(0); } 
            }
            
            .fintech-header { margin-bottom: 16px; }
            
            .fintech-header-icon {
              width: 48px; height: 48px; 
              background: rgba(56,189,248,0.1); 
              border-radius: 14px; display: flex; align-items: center; justify-content: center; 
              margin: 0 auto 12px; color: #38bdf8;
            }

            .fintech-title {
              font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 4px;
            }
            .fintech-subtitle {
              color: #a1a1aa; font-size: 0.9rem; line-height: 1.4; margin: 0;
            }

            .instapay-box {
              background: rgba(144, 25, 255, 0.05);
              border: 1px solid rgba(144, 25, 255, 0.3);
              border-radius: 16px;
              padding: 16px;
              margin-bottom: 16px;
              transition: all 0.3s ease;
            }
            .instapay-box:hover {
              background: rgba(144, 25, 255, 0.08);
              box-shadow: 0 0 30px rgba(144, 25, 255, 0.15);
              transform: translateY(-2px);
            }
            .instapay-logo-text {
              font-size: 1.8rem;
              font-weight: 900;
              background: linear-gradient(135deg, #a855f7, #6366f1);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
              display: inline-block;
              letter-spacing: -1px;
            }
            .instapay-address-wrap {
              background: #000;
              padding: 12px 16px;
              border-radius: 12px;
              font-family: 'Inter', monospace;
              font-size: 1.2rem;
              font-weight: 700;
              color: #fff;
              border: 1px solid #3f3f46;
              margin-bottom: 8px;
              display: flex; align-items: center; justify-content: center; gap: 8px;
              box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
            }

            .fintech-btn {
              width: 100%; padding: 14px; border-radius: 16px; font-weight: 700; font-size: 1rem;
              border: none; cursor: pointer; transition: all 0.2s ease;
              display: flex; align-items: center; justify-content: center; gap: 10px;
            }
            .btn-whatsapp {
              background: #25d366; color: #000; text-decoration: none !important;
            }
            .btn-whatsapp:hover { background: #22c55e; transform: scale(1.02); }
            
            .btn-primary {
              background: #38bdf8; color: #000;
            }
            .btn-primary:hover { background: #0ea5e9; transform: scale(1.02); }
            .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

            .toggle-link {
              color: #a1a1aa; background: transparent; border: none; font-size: 0.95rem; font-weight: 600;
              margin-top: 12px; cursor: pointer; transition: color 0.2s; text-decoration: none; padding: 6px;
            }
            .toggle-link:hover { color: #fff; }

            .code-input-wrapper { margin-bottom: 16px; }
            .premium-input {
              width: 100%; background: #000; border: 1px solid #3f3f46; border-radius: 16px;
              padding: 16px; font-size: 1.5rem; color: #fff; text-align: center; letter-spacing: 6px;
              transition: all 0.3s; font-family: monospace; font-weight: 800;
            }
            .premium-input:focus {
              outline: none; border-color: #38bdf8; box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
            }
            
            .msg-alert {
              padding: 12px; border-radius: 12px; font-size: 0.9rem; margin-bottom: 16px; font-weight: 600;
            }
            .msg-error { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
            .msg-success { background: rgba(34, 197, 94, 0.15); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.3); }

            .footer-nav {
              display: flex; gap: 8px; margin-top: 20px; border-top: 1px solid #3f3f46; padding-top: 16px;
            }
            .footer-btn {
              flex: 1; background: #18181b; color: #a1a1aa; border: 1px solid #3f3f46; 
              padding: 10px; border-radius: 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
            }
            .footer-btn:hover { background: #27272a; color: #fff; border-color: #52525b; }
          `}</style>

          <div className="fintech-card" dir="rtl">

            {!showCodeInput ? (
              <>
                <div className="fintech-header">
                  <div className="fintech-header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <h2 className="fintech-title">بوابة الدفع الآمنة</h2>
                  <p className="fintech-subtitle">
                    للوصول الكامل لمحتوى <strong>{currentCourseName}</strong>، يرجى إتمام الدفع عبر إنستاباي.
                  </p>
                </div>

                <div className="instapay-box">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }} dir="ltr">
                    <img src={require('@site/static/img/instapay.jpg').default} alt="InstaPay" style={{ width: '80px', height: '80px', objectFit: 'contain', mixBlendMode: 'lighten', borderRadius: '16px' }} />
                    <div className="instapay-logo-text" style={{ marginBottom: 0, fontSize: '2.4rem', background: 'none', WebkitTextFillColor: '#fff', color: '#fff' }}>InstaPay</div>
                  </div>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: '0 0 10px' }}>
                    قم بتحويل قيمة الكورس إلى المعرف التالي:
                  </p>
                  <div className="instapay-address-wrap" dir="ltr">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9019ff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    01552946586
                  </div>
                  <div style={{ color: '#71717a', fontSize: '0.85rem' }}>أو المعرف: atefelhamsa@instapay</div>
                </div>

                <a
                  href={`https://wa.me/201272442829?text=مرحباً، قمت بتحويل قيمة ${encodeURIComponent(currentCourseName)} وهذا إيصال الدفع:`}
                  target="_blank"
                  rel="noreferrer"
                  className="fintech-btn btn-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                  تأكيد التحويل عبر واتساب
                </a>

                <button className="toggle-link" onClick={() => setShowCodeInput(true)}>
                  لدي كود تفعيل مسبق
                </button>
              </>
            ) : (
              <>
                <div className="fintech-header">
                  <div className="fintech-header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                  <h2 className="fintech-title">كود التفعيل</h2>
                  <p className="fintech-subtitle">
                    الرجاء إدخال الكود المكون من 6 أرقام أو حروف للبدء.
                  </p>
                </div>

                <form onSubmit={handleManualCodeSubmit}>
                  <div className="code-input-wrapper">
                    <input
                      type="text"
                      className="premium-input"
                      placeholder="XXXXXX"
                      value={inputCode}
                      onChange={(e) => { setInputCode(e.target.value.toUpperCase()); setErrorMsg(""); }}
                      dir="ltr"
                      maxLength={6}
                    />
                  </div>

                  {errorMsg && <div className="msg-alert msg-error">{errorMsg}</div>}
                  {successMsg && <div className="msg-alert msg-success">{successMsg}</div>}

                  <button
                    type="submit"
                    className="fintech-btn btn-primary"
                    disabled={isChecking || !inputCode.trim() || inputCode.length < 5}
                  >
                    {isChecking ? 'جاري التحقق...' : 'تفعيل الكورس'}
                  </button>
                </form>

                <button className="toggle-link" onClick={() => setShowCodeInput(false)}>
                  العودة لخيارات الدفع
                </button>
              </>
            )}

            <div className="footer-nav">
              <button type="button" onClick={() => window.location.href = '/'} className="footer-btn">
                الرئيسية
              </button>
              <button type="button" onClick={() => window.location.href = '/settings'} className="footer-btn">
                إعدادات الحساب
              </button>
            </div>

          </div>
        </div>
      )}
    </AccessGate>
  );
}
