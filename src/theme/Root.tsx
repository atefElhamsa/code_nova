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

  const isFlutterCourse = location.pathname.startsWith('/docs');
  const isJsCourse = location.pathname.startsWith('/docs-js');
  const isCourseRoute = isFlutterCourse || isJsCourse;
  
  // تحديد اسم الكورس الحالي برمجياً
  const currentCourse = isJsCourse ? 'js' : (isFlutterCourse ? 'flutter' : 'none');

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

      // التحقق من الصلاحية للكورس الحالي
      const hasCourseAccess = localStorage.getItem(`CodeNova_Course_Access_${currentCourse}`) === 'GRANTED';
      const hasAllAccess = localStorage.getItem(`CodeNova_Course_Access_all`) === 'GRANTED';

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
    localStorage.setItem(`CodeNova_Course_Access_${courseName}`, 'GRANTED');
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

      // الكود سليم! نقوم بحرقه فوراً (تحديث is_approved لتصبح true لكي لا يُستخدم ثانية)
      const { error: updateError } = await supabase
        .from('course_access_requests')
        .update({ is_approved: true })
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
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>

      {isLocked && (
        <div className="course-gate-overlay">
          <div className="course-gate-container" dir="rtl">
            <div className="ag-logo-wrap" style={{ marginBottom: '20px' }}>
              <img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" className="ag-logo" style={{ width: 120, height: 120 }} />
            </div>
            <h2 className="gate-title">وصول حصري</h2>
            <p className="gate-subtitle">
              هذا المحتوى مخصص فقط للمشتركين. يرجى إدخال كود التفعيل الخاص بـ {currentCourse === 'flutter' ? 'كورس فلاتر' : 'كورس جافاسكريبت'} للبدء.
            </p>

            <form onSubmit={handleManualCodeSubmit} className="gate-form">
              <input
                type="text"
                className={`gate-input ${errorMsg ? 'input-error' : ''}`}
                placeholder="أدخل كود التفعيل هنا..."
                value={inputCode}
                onChange={(e) => { setInputCode(e.target.value.toUpperCase()); setErrorMsg(""); }}
                dir="ltr"
              />
              {errorMsg && <div className="gate-error-message">{errorMsg}</div>}
              {successMsg && <div className="gate-error-message" style={{color: '#22d3a0'}}>{successMsg}</div>}
              
              <button 
                type="submit" 
                className={`gate-btn ${isChecking ? 'verifying' : ''}`}
                disabled={isChecking || !inputCode.trim()}
              >
                {isChecking ? 'جاري التحقق...' : 'تفعيل و دخول الكورس'}
              </button>
              
              <button 
                type="button" 
                onClick={() => window.location.href = '/'}
                className="gate-btn"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', marginTop: '0.5rem' }}
              >
                🏠 العودة للصفحة الرئيسية
              </button>
            </form>
            
            <div className="gate-footer" style={{ marginTop: '1.5rem' }}>
              <p>للاشتراك والحصول على الكود، تواصل معنا:</p>
              <div className="gate-contact-links">
                <a href={`https://wa.me/201272442829?text=أريد%20تفعيل%20كورس%20${currentCourse === 'flutter' ? 'فلاتر' : 'جافاسكريبت'}`} target="_blank" rel="noreferrer" className="contact-btn whatsapp">
                  💬 واتساب
                </a>
                <a href={`https://t.me/atefelhamsa`} target="_blank" rel="noreferrer" className="contact-btn telegram">
                  ✈️ تيليجرام
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccessGate>
  );
}
