const fs = require('fs');
let settingsContent = fs.readFileSync('src/pages/settings.tsx', 'utf-8');

// We will overwrite the entire file to ensure a pristine state for the new design
const newSettingsCode = `import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { supabase } from '../lib/supabaseClient';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'profile' | 'courses' | 'security'>('profile');

  // Profile
  const [fullName, setFullName] = useState('');
  const [initialFullName, setInitialFullName] = useState('');
  
  const [email, setEmail] = useState('');
  
  const [phone, setPhone] = useState('');
  const [initialPhone, setInitialPhone] = useState('');
  const [dialCode, setDialCode] = useState('20');
  
  const [avatar, setAvatar] = useState('');
  
  // Account status
  const [accessStatus, setAccessStatus] = useState('none');
  
  // Courses
  const [courses, setCourses] = useState<any[]>([]);
  
  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        if (mounted) setLoading(false);
        return;
      }

      if (mounted) {
        setSession(session);
        setEmail(session.user.email || '');
        setAvatar(session.user.user_metadata?.avatar_url || '');
      }

      // Fetch Profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile && mounted) {
        setFullName(profile.full_name || '');
        setInitialFullName(profile.full_name || '');
        
        setPhone(profile.phone || '');
        setInitialPhone(profile.phone || '');
        
        setAccessStatus(profile.access_status || 'none');
      }

      // Fetch Courses
      const { data: codes } = await supabase
        .from('course_access_requests')
        .select('target_course, created_at')
        .eq('user_id', session.user.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (codes && mounted) {
        setCourses(codes);
      }

      if (mounted) setLoading(false);
    };

    loadData();
    return () => { mounted = false; };
  }, []);

  const isProfileChanged = fullName !== initialFullName || phone !== initialPhone;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !isProfileChanged) return;
    setSaving(true);
    setMessage('');

    const fullPhone = phone;
    const { error } = await supabase
      .from('user_profiles')
      .update({ full_name: fullName, phone: fullPhone })
      .eq('id', session.user.id);

    if (error) {
      setMessage('❌ حدث خطأ أثناء الحفظ.');
    } else {
      setMessage('✅ تم حفظ البيانات بنجاح.');
      setInitialFullName(fullName);
      setInitialPhone(phone);
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!currentPassword) {
      setPassError('يرجى إدخال كلمة المرور الحالية للتأكيد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('كلمتا المرور غير متطابقتين.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
      return;
    }

    setSaving(true);

    // Verify current password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: currentPassword,
    });

    if (signInError) {
      setPassError('❌ كلمة المرور الحالية غير صحيحة.');
      setSaving(false);
      return;
    }

    // Now update password
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      setPassError('❌ حدث خطأ أثناء تغيير كلمة المرور.');
    } else {
      setPassSuccess('✅ تم تغيير كلمة المرور بنجاح.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 3000);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getCourseName = (c: string) => {
    if (c === 'flutter') return 'دورة Flutter & Dart';
    if (c === 'js') return 'دورة JavaScript OOP';
    if (c === 'cpp') return 'دورة C++ Mastery';
    if (c === 'python') return 'دورة Python Pro';
    if (c === 'all') return 'الباقة الشاملة (جميع الكورسات)';
    return 'كورس غير معروف';
  };

  if (loading) {
    return (
      <Layout title="الإعدادات">
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b' }}>
          <div className="st-spin" />
        </div>
        <style>{\`
          .st-spin { width:40px; height:40px; border-radius:50%; border:3px solid rgba(56,189,248,.2); border-top-color:#38bdf8; animation:st-spin 1s linear infinite; }
          @keyframes st-spin { to { transform:rotate(360deg); } }
        \`}</style>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout title="الإعدادات">
        <div className="st-page">
          <div className="st-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="st-card" style={{ textAlign: 'center', padding: '60px 40px', maxWidth: '400px', width: '100%' }}>
              <h2 className="st-title" style={{ marginBottom: '16px' }}>غير مسجل الدخول</h2>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>يجب عليك تسجيل الدخول أولاً للوصول إلى الإعدادات.</p>
              <button className="st-btn st-btn-primary" onClick={() => window.location.href = '/'}>
                العودة للرئيسية وتسجيل الدخول
              </button>
            </div>
          </div>
        </div>
        <style>{stStyles}</style>
      </Layout>
    );
  }

  return (
    <Layout title="إعدادات الحساب">
      <div className="st-page">
        <div className="st-ambient-glow"></div>
        <div className="st-container">
          
          <div className="st-header">
            <div className="st-header-info">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="st-avatar" />
              ) : (
                <div className="st-avatar-placeholder">
                  {(fullName || email || '?')[0].toUpperCase()}
                </div>
              )}
              <div className="st-user-details">
                <h1 className="st-page-title">{fullName || 'مستخدم جديد'}</h1>
                <p className="st-user-email">{email}</p>
              </div>
            </div>
          </div>

          <div className="st-tabs">
            <button 
              className={\`st-tab \${activeTab === 'profile' ? 'active' : ''}\`}
              onClick={() => setActiveTab('profile')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              البيانات الشخصية
            </button>
            <button 
              className={\`st-tab \${activeTab === 'courses' ? 'active' : ''}\`}
              onClick={() => setActiveTab('courses')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              كورساتي والاشتراكات
            </button>
            <button 
              className={\`st-tab \${activeTab === 'security' ? 'active' : ''}\`}
              onClick={() => setActiveTab('security')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              الأمان
            </button>
          </div>

          <main className="st-content">
            {activeTab === 'profile' && (
              <div className="st-tab-pane animate-fade-up">
                <div className="st-card">
                  <div className="st-card-hdr">
                    <div>
                      <h2 className="st-title">تحديث البيانات</h2>
                      <p className="st-sub">قم بتعديل بيانات الاتصال الخاصة بك.</p>
                    </div>
                    {message && <span className="st-msg">{message}</span>}
                  </div>
                  
                  <form onSubmit={handleUpdateProfile}>
                    <div className="st-form-grid">
                      <div className="st-inp-wrap">
                        <label className="st-label">الاسم الكامل</label>
                        <input 
                          type="text" className="st-inp" 
                          value={fullName} onChange={e => setFullName(e.target.value)} 
                          required placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      
                      <div className="st-inp-wrap">
                        <label className="st-label">البريد الإلكتروني</label>
                        <input 
                          type="email" className="st-inp" 
                          value={email} disabled dir="ltr"
                        />
                        <span className="st-inp-hint">لا يمكن تغيير البريد الإلكتروني لأسباب أمنية.</span>
                      </div>

                      <div className="st-inp-wrap st-full-width">
                        <label className="st-label">رقم الهاتف (واتساب)</label>
                        <div style={{ position: 'relative' }}>
                          <PhoneInput
                            country={'eg'}
                            enableSearch={true}
                            disableCountryCode={true}
                            value={phone ? (phone.startsWith('+' + dialCode) ? phone.slice(dialCode.length + 1) : phone) : ''}
                            onChange={(p, data: any) => {
                              let newPhone = p;
                              if (newPhone && !newPhone.startsWith('+')) newPhone = '+' + newPhone;
                              setPhone(newPhone);
                              if (data?.dialCode) setDialCode(data.dialCode);
                            }}
                            dropdownStyle={{ maxHeight: '200px' }}
                            inputProps={{ required: true, dir: 'ltr' }}
                          />
                          <div className="st-dial-code">+{dialCode}</div>
                        </div>
                      </div>
                    </div>

                    <div className="st-form-actions">
                      <button type="submit" className="st-btn st-btn-primary" disabled={saving || !isProfileChanged}>
                        {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="st-tab-pane animate-fade-up">
                <div className="st-card" style={{ marginBottom: '30px' }}>
                  <div className="st-status-box">
                    <div className={\`st-status-icon \${accessStatus}\`}>
                      {accessStatus === 'approved' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : accessStatus === 'pending' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                      )}
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 6px', fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                        {accessStatus === 'approved' ? 'الحساب مفعل وجاهز للتعلم' : accessStatus === 'pending' ? 'جاري مراجعة الحساب' : 'الحساب غير مفعل'}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
                        {accessStatus === 'approved' 
                          ? 'مبروك! حسابك مفعل تماماً ويمكنك الاستمتاع بالكورسات المفتوحة لديك بحرية.' 
                          : 'حسابك في مرحلة المراجعة من قبل المشرف. سيتم التفعيل قريباً لتتمكن من الوصول للمحتوى.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="st-card">
                  <div className="st-card-hdr">
                    <div>
                      <h2 className="st-title">الكورسات المفتوحة ({courses.length})</h2>
                      <p className="st-sub">الوصول السريع لدوراتك التدريبية.</p>
                    </div>
                  </div>
                  
                  {courses.length === 0 ? (
                    <div className="st-empty">
                      <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }}>📚</div>
                      <h3 style={{ fontSize: '1.4rem', color: '#e2e8f0', margin: '0 0 10px', fontWeight: 800 }}>ليس لديك كورسات مفعلة حالياً</h3>
                      <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '0 auto 30px', maxWidth: '400px', lineHeight: 1.6 }}>بمجرد اشتراكك وتفعيل أي كود، سيظهر الكورس الخاص بك هنا لتبدأ رحلتك التعليمية فوراً.</p>
                      <a href="/" className="st-btn st-btn-primary">تصفح الكورسات المتاحة</a>
                    </div>
                  ) : (
                    <div className="st-course-grid">
                      {courses.map((c, i) => (
                        <div key={i} className={\`st-course-card \${c.target_course}\`}>
                          <div className="st-course-card-bg"></div>
                          <div className="st-course-card-content">
                            <div className="st-course-icon-large">
                               {c.target_course === 'js' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              ) : c.target_course === 'flutter' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
                              ) : c.target_course === 'cpp' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                              ) : c.target_course === 'python' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v4l3 3"/></svg>
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line></svg>
                              )}
                            </div>
                            <h4 className="st-course-card-title">{getCourseName(c.target_course)}</h4>
                            <p className="st-course-card-date">تاريخ التفعيل: {new Date(c.created_at).toLocaleDateString('ar-EG')}</p>
                            <a href={c.target_course === 'js' ? '/javascript' : c.target_course === 'flutter' ? '/flutter' : c.target_course === 'cpp' ? '/cpp' : c.target_course === 'python' ? '/python' : '/'} className="st-btn-go-full">دخول للكورس</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="st-tab-pane animate-fade-up">
                <div className="st-card" style={{ marginBottom: '30px' }}>
                  <div className="st-card-hdr">
                    <div>
                      <h2 className="st-title">تغيير كلمة المرور</h2>
                      <p className="st-sub">حافظ على أمان حسابك عن طريق اختيار كلمة مرور قوية.</p>
                    </div>
                    {passError && <div className="st-err">{passError}</div>}
                    {passSuccess && <div className="st-msg">{passSuccess}</div>}
                  </div>
                  
                  <form onSubmit={handleUpdatePassword}>
                    <div className="st-form-grid">
                      <div className="st-inp-wrap st-full-width">
                        <label className="st-label">كلمة المرور الحالية</label>
                        <input 
                          type="password" className="st-inp" placeholder="••••••••"
                          value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} 
                          dir="ltr"
                        />
                      </div>
                      <div className="st-inp-wrap">
                        <label className="st-label">كلمة المرور الجديدة</label>
                        <input 
                          type="password" className="st-inp" placeholder="••••••••"
                          value={newPassword} onChange={e => setNewPassword(e.target.value)} 
                          dir="ltr"
                        />
                      </div>
                      
                      <div className="st-inp-wrap">
                        <label className="st-label">تأكيد كلمة المرور الجديدة</label>
                        <input 
                          type="password" className="st-inp" placeholder="••••••••"
                          value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="st-form-actions">
                      <button type="submit" className="st-btn st-btn-primary" disabled={saving || !currentPassword || !newPassword}>
                        {saving ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="st-card st-danger-card">
                  <div className="st-danger-header">
                    <div className="st-danger-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                      <h2 className="st-title" style={{ color: '#f87171' }}>تسجيل الخروج</h2>
                      <p className="st-sub" style={{ margin: '6px 0 0' }}>سيتم إغلاق الجلسة الحالية من هذا الجهاز وتحتاج لتسجيل الدخول مرة أخرى.</p>
                    </div>
                    <button className="st-btn st-btn-danger" style={{ marginRight: 'auto', padding: '12px 24px' }} onClick={handleLogout}>خروج</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <style>{stStyles}</style>
    </Layout>
  );
}

const stStyles = \`
  :root {
    --st-bg: #09090b;
    --st-surface: #18181b;
    --st-border: rgba(255,255,255,0.08);
    --st-text: #f4f4f5;
    --st-text-muted: #94a3b8;
    --st-primary: #38bdf8;
    --st-primary-glow: rgba(56, 189, 248, 0.25);
    --st-danger: #f87171;
  }

  .st-page {
    background-color: var(--st-bg);
    min-height: calc(100vh - 60px);
    font-family: 'Cairo', 'Inter', system-ui, sans-serif;
    direction: rtl;
    padding: 60px 20px;
    position: relative;
    overflow-x: hidden;
  }

  .st-ambient-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 600px;
    background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }

  .st-container {
    max-width: 900px; /* Centered narrow container looks much better */
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .st-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .st-header-info {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .st-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid var(--st-border);
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  .st-avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
  }

  .st-page-title {
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--st-text);
    margin: 0 0 8px;
    letter-spacing: -0.5px;
  }

  .st-user-email {
    font-size: 1.1rem;
    color: var(--st-text-muted);
    margin: 0;
    font-family: monospace;
  }

  .st-tabs {
    display: flex;
    gap: 10px;
    background: rgba(255,255,255,0.02);
    padding: 8px;
    border-radius: 20px;
    border: 1px solid var(--st-border);
    margin-bottom: 40px;
    overflow-x: auto;
  }

  .st-tabs::-webkit-scrollbar { display: none; }

  .st-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 24px;
    border-radius: 14px;
    background: transparent;
    border: none;
    color: var(--st-text-muted);
    font-size: 1.1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .st-tab svg {
    width: 20px;
    height: 20px;
    opacity: 0.6;
    transition: all 0.3s;
  }

  .st-tab:hover {
    color: var(--st-text);
    background: rgba(255,255,255,0.03);
  }

  .st-tab.active {
    background: var(--st-surface);
    color: var(--st-primary);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    border: 1px solid var(--st-border);
  }
  .st-tab.active svg { opacity: 1; color: var(--st-primary); }

  .st-content {
    width: 100%;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up {
    animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .st-card {
    background: var(--st-surface);
    border: 1px solid var(--st-border);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  .st-card-hdr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--st-border);
  }

  .st-title {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--st-text);
    margin: 0 0 8px;
  }
  .st-sub {
    font-size: 1.05rem;
    color: var(--st-text-muted);
    margin: 0;
  }

  .st-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .st-full-width {
    grid-column: 1 / -1;
  }
  .st-inp-wrap { margin-bottom: 8px; }

  .st-label {
    display: block;
    font-size: 0.95rem;
    color: #cbd5e1;
    margin-bottom: 12px;
    font-weight: 800;
  }

  .st-inp {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--st-border);
    border-radius: 16px;
    color: var(--st-text);
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    box-sizing: border-box;
  }
  .st-inp:focus {
    border-color: var(--st-primary);
    background: rgba(56, 189, 248, 0.03);
    box-shadow: 0 0 0 4px var(--st-primary-glow);
  }
  .st-inp:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0,0,0,0.2);
  }
  .st-inp-hint { display: block; font-size: 0.85rem; color: #64748b; margin-top: 10px; }

  .st-form-actions {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    padding-top: 24px;
    border-top: 1px solid var(--st-border);
  }

  .st-btn {
    padding: 14px 32px;
    border-radius: 14px;
    font-size: 1.05rem;
    font-weight: 800;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .st-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    filter: grayscale(1);
  }

  .st-btn-primary {
    background: var(--st-primary);
    color: #000;
    box-shadow: 0 8px 20px var(--st-primary-glow);
  }
  .st-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px var(--st-primary-glow);
  }

  .st-btn-danger {
    background: rgba(248, 113, 113, 0.1);
    color: var(--st-danger);
    border: 1px solid rgba(248, 113, 113, 0.2);
  }
  .st-btn-danger:hover {
    background: rgba(248, 113, 113, 0.2);
    border-color: rgba(248, 113, 113, 0.4);
  }

  .st-msg { color: #34d399; font-size: 0.95rem; font-weight: 700; background: rgba(52, 211, 153, 0.1); padding: 10px 16px; border-radius: 12px; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-err { color: var(--st-danger); font-size: 0.95rem; font-weight: 700; background: rgba(248, 113, 113, 0.1); padding: 14px 20px; border-radius: 14px; border: 1px solid rgba(248, 113, 113, 0.2); }

  /* Status Box */
  .st-status-box {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--st-border);
    border-radius: 20px;
  }
  .st-status-icon {
    width: 80px; height: 80px; border-radius: 20px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .st-status-icon.approved { background: rgba(52, 211, 153, 0.1); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-status-icon.pending { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  .st-status-icon svg { width: 40px; height: 40px; }

  /* Course Grid */
  .st-course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .st-course-card {
    position: relative;
    border-radius: 20px;
    padding: 30px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--st-border);
    overflow: hidden;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .st-course-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); }
  .st-course-card.js:hover { border-color: rgba(250, 204, 21, 0.4); box-shadow: 0 10px 30px rgba(250, 204, 21, 0.15); }
  .st-course-card.flutter:hover { border-color: rgba(14, 165, 233, 0.4); box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15); }
  .st-course-card.cpp:hover { border-color: rgba(249, 115, 22, 0.4); box-shadow: 0 10px 30px rgba(249, 115, 22, 0.15); }
  .st-course-card.python:hover { border-color: rgba(55, 118, 171, 0.4); box-shadow: 0 10px 30px rgba(55, 118, 171, 0.15); }

  .st-course-card-bg { position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%); pointer-events: none; }
  .st-course-card-content { position: relative; z-index: 2; width: 100%; display: flex; flex-direction: column; align-items: center; }

  .st-course-icon-large {
    width: 64px; height: 64px; border-radius: 20px;
    display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
  }
  .st-course-card.js .st-course-icon-large { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  .st-course-card.flutter .st-course-icon-large { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
  .st-course-card.cpp .st-course-icon-large { background: rgba(249, 115, 22, 0.1); color: #f97316; border: 1px solid rgba(249, 115, 22, 0.2); }
  .st-course-card.python .st-course-icon-large { background: rgba(55, 118, 171, 0.1); color: #4da8da; border: 1px solid rgba(55, 118, 171, 0.2); }
  .st-course-icon-large svg { width: 32px; height: 32px; }

  .st-course-card-title { font-size: 1.15rem; font-weight: 800; color: #fff; margin: 0 0 6px; }
  .st-course-card-date { font-size: 0.85rem; color: var(--st-text-muted); margin: 0 0 20px; }

  .st-btn-go-full {
    width: 100%; padding: 12px; background: rgba(255,255,255,0.03); color: var(--st-text);
    border-radius: 12px; text-decoration: none !important; font-weight: 700; font-size: 0.95rem;
    border: 1px solid var(--st-border); display: block; text-align: center; transition: all 0.3s;
  }
  .st-course-card.js .st-btn-go-full:hover { background: #facc15; color: #000; border-color: #facc15; }
  .st-course-card.flutter .st-btn-go-full:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; }
  .st-course-card.cpp .st-btn-go-full:hover { background: #f97316; color: #fff; border-color: #f97316; }
  .st-course-card.python .st-btn-go-full:hover { background: #3776ab; color: #fff; border-color: #3776ab; }

  /* Danger Card */
  .st-danger-card {
    border: 1px solid rgba(248, 113, 113, 0.2);
    background: rgba(248, 113, 113, 0.02);
  }
  .st-danger-header {
    display: flex; align-items: center; gap: 24px;
  }
  .st-danger-icon {
    width: 64px; height: 64px; border-radius: 20px;
    background: rgba(248, 113, 113, 0.1); color: var(--st-danger);
    display: flex; align-items: center; justify-content: center;
  }
  .st-danger-icon svg { width: 32px; height: 32px; }

  .st-empty { text-align: center; padding: 60px 20px; background: rgba(255, 255, 255, 0.01); border-radius: 24px; border: 2px dashed rgba(255, 255, 255, 0.05); }

  /* Phone Input Overrides */
  .react-tel-input { font-family: inherit; direction: ltr; margin-bottom: 0 !important; }
  .react-tel-input .flag { display: none !important; }
  .react-tel-input .form-control { 
    width: 100% !important; padding: 16px 20px 16px 84px !important; height: auto !important;
    background: rgba(255,255,255,.02) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px !important; color: var(--st-text) !important; font-size: 1rem !important; 
    transition: all .3s !important; outline: none !important; box-shadow: none !important;
  }
  .react-tel-input .form-control:focus { border-color: var(--st-primary) !important; background: rgba(56,189,248,.03) !important; box-shadow: 0 0 0 4px var(--st-primary-glow) !important; }
  .react-tel-input .flag-dropdown { 
    background: rgba(255,255,255,.03) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px 0 0 16px !important; border-right: none !important; padding: 0 !important;
    width: 70px !important; display: flex !important; align-items: center !important; justify-content: center !important;
  }
  .react-tel-input .flag-dropdown:hover, .react-tel-input .flag-dropdown.open { background: rgba(255,255,255,.07) !important; }
  .react-tel-input .selected-flag { border-radius: 16px 0 0 16px !important; width: 100% !important; padding: 0 !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important; }
  .react-tel-input .selected-flag .arrow { left: auto !important; right: auto !important; position: static !important; border-top-color: var(--st-text-muted) !important; margin-right: 38px !important; }
  .react-tel-input .selected-flag .arrow.up { border-bottom-color: var(--st-text-muted) !important; }
  .react-tel-input .country-list { 
    background: var(--st-surface) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px !important; color: var(--st-text) !important; 
    box-shadow: 0 20px 40px rgba(0,0,0,.3) !important; margin-top: 10px !important; text-align: left !important;
    max-height: 250px !important; overflow-y: auto !important; direction: ltr !important;
  }
  .react-tel-input .country-list::-webkit-scrollbar { width: 6px; }
  .react-tel-input .country-list::-webkit-scrollbar-thumb { background: rgba(56,189,248,.3); border-radius: 10px; }
  .react-tel-input .country-list .country { padding: 12px 16px !important; transition: background .2s; display: flex; align-items: center; direction: ltr !important; text-align: left !important; }
  .react-tel-input .country-list .country:hover, .react-tel-input .country-list .country.highlight { background: rgba(56,189,248,.1) !important; }
  .react-tel-input .country-list .country .dial-code { color: var(--st-text-muted) !important; margin-left: 8px !important; direction: ltr !important; }
  .react-tel-input .country-list .country .country-name { color: var(--st-text) !important; margin-right: 8px !important; }
  .react-tel-input .search { background: var(--st-surface) !important; padding: 12px !important; border-bottom: 1px solid var(--st-border); border-radius: 16px 16px 0 0 !important; z-index: 2; position: sticky; top: 0; }
  .react-tel-input .search-box { 
    background: rgba(255,255,255,.03) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 12px !important; color: #fff !important; width: 100% !important; 
    padding: 10px 14px !important; outline: none; margin: 0 !important; font-family: inherit; direction: rtl;
  }
  .st-dial-code { position: absolute; top: 0; left: 30px; height: 100%; display: flex; align-items: center; color: var(--st-text); font-weight: 800; font-size: 1rem; pointer-events: none; z-index: 1; direction: ltr; }

  @media (max-width: 768px) {
    .st-form-grid { grid-template-columns: 1fr; }
    .st-header { flex-direction: column; text-align: center; }
    .st-header-info { flex-direction: column; gap: 16px; }
    .st-tab { padding: 12px 16px; font-size: 1rem; }
    .st-card { padding: 30px 20px; }
    .st-danger-header { flex-direction: column; text-align: center; }
    .st-btn-danger { margin: 16px auto 0 !important; }
  }
\`;`;

fs.writeFileSync('src/pages/settings.tsx', newSettingsCode);
