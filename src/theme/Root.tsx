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

      {isLocked && (
        <div className="course-gate-overlay">
          <div className="course-gate-container" dir="rtl">
            <div className="gate-icon-wrapper">
              <span className="gate-icon">🔒</span>
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
                <a href={`https://wa.me/201552946586?text=أريد%20تفعيل%20كورس%20${currentCourse === 'flutter' ? 'فلاتر' : 'جافاسكريبت'}`} target="_blank" rel="noreferrer" className="contact-btn whatsapp">
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
