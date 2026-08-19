import React, { useState, useEffect } from 'react';
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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
        setPhone(profile.phone || '');
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
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
    if (c === 'all') return 'الباقة الشاملة (جميع الكورسات)';
    return 'كورس غير معروف';
  };

  if (loading) {
    return (
      <Layout title="الإعدادات">
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
          <div className="st-spin" />
        </div>
        <style>{`
          .st-spin { width:40px; height:40px; border-radius:50%; border:3px solid rgba(56,189,248,.2); border-top-color:#38bdf8; animation:st-spin 1s linear infinite; }
          @keyframes st-spin { to { transform:rotate(360deg); } }
        `}</style>
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
        <div className="st-container">
          
          <div className="st-layout">
            {/* Sidebar Navigation */}
            <aside className="st-sidebar">
              <div className="st-sidebar-header">
                <a href="/" className="st-back-home" title="العودة للرئيسية">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </a>
                
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="st-avatar" />
                ) : (
                  <div className="st-avatar-placeholder">
                    {(fullName || email || '?')[0].toUpperCase()}
                  </div>
                )}
                <div className="st-user-info">
                  <h3 className="st-user-name">{fullName || 'مستخدم جديد'}</h3>
                  <p className="st-user-email">{email}</p>
                </div>
              </div>
              
              <nav className="st-nav-menu">
                <button 
                  className={`st-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  البيانات الشخصية
                </button>
                <button 
                  className={`st-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  كورساتي والاشتراكات
                </button>
                <button 
                  className={`st-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  الأمان وكلمة المرور
                </button>
                
                <div className="st-nav-divider"></div>
                
                <button className="st-nav-item st-nav-danger" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  تسجيل الخروج
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="st-content">
              {activeTab === 'profile' && (
                <div className="st-tab-pane animate-fade-in">
                  <h1 className="st-page-title">البيانات الشخصية</h1>
                  <p className="st-page-sub">قم بتحديث معلومات الاتصال الخاصة بك وتفاصيل حسابك الأساسية.</p>
                  
                  <div className="st-card mt-6">
                    <div className="st-card-hdr">
                      <h2 className="st-title">معلومات الحساب</h2>
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
                        <button type="submit" className="st-btn st-btn-primary" disabled={saving}>
                          {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="st-tab-pane animate-fade-in">
                  <h1 className="st-page-title">كورساتي والاشتراكات</h1>
                  <p className="st-page-sub">إدارة وصولك للكورسات وحالة حسابك في المنصة.</p>
                  
                  <div className="st-card mt-6">
                    <h2 className="st-title" style={{ marginBottom: '20px' }}>حالة الحساب العامة</h2>
                    <div className="st-status-box">
                      <div className={`st-status-icon ${accessStatus}`}>
                        {accessStatus === 'approved' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : accessStatus === 'pending' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        )}
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#fff', fontWeight: 800 }}>
                          {accessStatus === 'approved' ? 'الحساب مفعل وجاهز للتعلم' : accessStatus === 'pending' ? 'جاري مراجعة الحساب' : 'غير مفعل'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                          {accessStatus === 'approved' 
                            ? 'مبروك! حسابك مفعل تماماً ويمكنك الاستمتاع بالكورسات المفتوحة لديك بحرية.' 
                            : 'حسابك في مرحلة المراجعة من قبل المشرف. سيتم التفعيل قريباً لتتمكن من الوصول للمحتوى.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="st-card mt-6">
                    <h2 className="st-title" style={{ marginBottom: '20px' }}>الكورسات المفتوحة ({courses.length})</h2>
                    
                    {courses.length === 0 ? (
                      <div className="st-empty">
                        <div style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.5 }}>📚</div>
                        <p style={{ fontSize: '1.05rem', color: '#e2e8f0', margin: '0 0 8px', fontWeight: 700 }}>ليس لديك كورسات مفعلة حالياً</p>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 20px' }}>بمجرد اشتراكك وتفعيل أي كود، سيظهر الكورس الخاص بك هنا.</p>
                        <a href="/" className="st-btn st-btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '10px 24px' }}>تصفح الكورسات المتاحة</a>
                      </div>
                    ) : (
                      <div className="st-course-grid">
                        {courses.map((c, i) => (
                          <div key={i} className={`st-course-card ${c.target_course}`}>
                            <div className="st-course-card-bg"></div>
                            <div className="st-course-card-content">
                              <div className="st-course-icon-large">
                                {c.target_course === 'js' ? (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                ) : c.target_course === 'flutter' ? (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line></svg>
                                )}
                              </div>
                              <h4 className="st-course-card-title">{getCourseName(c.target_course)}</h4>
                              <p className="st-course-card-date">تم التفعيل في: {new Date(c.created_at).toLocaleDateString('ar-EG')}</p>
                              <a href={c.target_course === 'js' ? '/docs-js' : '/docs'} className="st-btn-go-full">دخول للكورس</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="st-tab-pane animate-fade-in">
                  <h1 className="st-page-title">الأمان وكلمة المرور</h1>
                  <p className="st-page-sub">حافظ على أمان حسابك عن طريق اختيار كلمة مرور قوية.</p>
                  
                  <div className="st-card mt-6">
                    <h2 className="st-title" style={{ marginBottom: '24px' }}>تغيير كلمة المرور</h2>
                    {passError && <div className="st-err">{passError}</div>}
                    {passSuccess && <div className="st-msg" style={{ marginBottom: '24px' }}>{passSuccess}</div>}
                    
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

                  <div className="st-card mt-6 st-danger-card">
                    <div className="st-danger-header">
                      <div className="st-danger-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      </div>
                      <div>
                        <h2 className="st-title" style={{ color: '#f87171' }}>تسجيل الخروج</h2>
                        <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>سيتم إغلاق الجلسة الحالية من هذا الجهاز.</p>
                      </div>
                    </div>
                    <button className="st-btn st-btn-danger mt-4" onClick={handleLogout}>تسجيل الخروج من الحساب</button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <style>{stStyles}</style>
    </Layout>
  );
}

const stStyles = `
  .st-page {
    background-color: #020617;
    min-height: calc(100vh - 60px);
    font-family: 'Cairo', 'Inter', system-ui, sans-serif;
    direction: rtl;
    padding: 40px 20px;
    background-image: radial-gradient(circle at 15% 50%, rgba(56, 189, 248, 0.03), transparent 30%),
                      radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.03), transparent 30%);
  }

  .st-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .st-layout {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  /* Sidebar Styles */
  .st-sidebar {
    width: 280px;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 24px 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    position: sticky;
    top: 90px;
    flex-shrink: 0;
  }

  .st-sidebar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 20px;
    position: relative;
  }

  .st-back-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    color: #94a3b8;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .st-back-home:hover {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    border-color: rgba(56, 189, 248, 0.2);
    transform: translateX(2px);
  }
  .st-back-home svg { width: 20px; height: 20px; }

  .st-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 4px solid rgba(15, 23, 42, 1);
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3), 0 10px 20px rgba(0,0,0,0.2);
    object-fit: cover;
    margin-bottom: 16px;
  }

  .st-avatar-placeholder {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
    border: 4px solid rgba(15, 23, 42, 1);
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3), 0 10px 20px rgba(14, 165, 233, 0.3);
    margin-bottom: 16px;
  }

  .st-user-info { width: 100%; overflow: hidden; }

  .st-user-name {
    font-size: 1.15rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .st-user-email {
    font-size: 0.9rem;
    color: #cbd5e1;
    margin: 0;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .st-nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .st-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: right;
  }

  .st-nav-item svg {
    width: 20px;
    height: 20px;
    opacity: 0.7;
    transition: all 0.2s ease;
  }

  .st-nav-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #e2e8f0;
  }

  .st-nav-item.active {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
  }

  .st-nav-item.active svg {
    opacity: 1;
    color: #38bdf8;
  }

  .st-nav-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 8px 0;
  }

  .st-nav-danger {
    color: #f87171;
  }
  .st-nav-danger:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
  }
  .st-nav-danger svg {
    color: #f87171;
  }

  /* Main Content Styles */
  .st-content {
    flex: 1;
    min-width: 0;
  }

  .st-page-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0 0 8px;
    letter-spacing: -0.5px;
  }

  .st-page-sub {
    font-size: 1.05rem;
    color: #94a3b8;
    margin: 0;
  }

  .mt-6 { margin-top: 2rem; }
  .mt-4 { margin-top: 1rem; }

  .st-card {
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  .st-card-hdr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .st-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #e2e8f0;
    margin: 0;
  }

  .st-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .st-full-width {
    grid-column: 1 / -1;
  }

  .st-inp-wrap {
    margin-bottom: 8px;
  }

  .st-label {
    display: block;
    font-size: 0.9rem;
    color: #cbd5e1;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .st-inp {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #f8fafc;
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.2s;
    outline: none;
    box-sizing: border-box;
  }

  .st-inp:focus {
    border-color: #38bdf8;
    background: rgba(56, 189, 248, 0.03);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
  }

  .st-inp:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .st-inp-hint {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 8px;
  }

  .st-form-actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

  .st-btn {
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .st-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .st-btn-primary {
    background: linear-gradient(135deg, #0ea5e9, #38bdf8);
    color: #0f172a;
    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
  }

  .st-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.5);
  }

  .st-btn-danger {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.2);
    width: 100%;
  }

  .st-btn-danger:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .st-msg { color: #34d399; font-size: 0.9rem; font-weight: 700; background: rgba(52, 211, 153, 0.1); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-err { color: #f87171; font-size: 0.9rem; font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(239, 68, 68, 0.2); margin-bottom: 24px; }

  /* Status Box */
  .st-status-box {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
  }

  .st-status-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .st-status-icon.approved { background: rgba(52, 211, 153, 0.1); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-status-icon.pending { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  
  .st-status-icon svg { width: 28px; height: 28px; }

  /* Course Grid */
  .st-course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .st-course-card {
    position: relative;
    border-radius: 20px;
    padding: 24px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .st-course-card:hover {
    transform: translateY(-5px);
  }
  .st-course-card.js:hover { border-color: rgba(250, 204, 21, 0.3); box-shadow: 0 10px 30px rgba(250, 204, 21, 0.15); }
  .st-course-card.flutter:hover { border-color: rgba(14, 165, 233, 0.3); box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15); }

  .st-course-card-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%); pointer-events: none; }
  .st-course-card-content { position: relative; z-index: 2; width: 100%; display: flex; flex-direction: column; align-items: center; }

  .st-course-icon-large {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .st-course-card.js .st-course-icon-large { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  .st-course-card.flutter .st-course-icon-large { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
  .st-course-icon-large svg { width: 32px; height: 32px; }

  .st-course-card-title { font-size: 1.15rem; font-weight: 800; color: #fff; margin: 0 0 8px; }
  .st-course-card-date { font-size: 0.85rem; color: #94a3b8; margin: 0 0 24px; }

  .st-btn-go-full {
    width: 100%;
    padding: 12px;
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
    border-radius: 12px;
    text-decoration: none !important;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.2s;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .st-course-card.js .st-btn-go-full:hover { background: #facc15; color: #000; border-color: #facc15; }
  .st-course-card.flutter .st-btn-go-full:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; }

  /* Danger Card */
  .st-danger-card {
    border: 1px solid rgba(239, 68, 68, 0.2);
    background: rgba(239, 68, 68, 0.02);
  }
  .st-danger-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .st-danger-icon {
    width: 48px; height: 48px; border-radius: 12px;
    background: rgba(239, 68, 68, 0.1); color: #f87171;
    display: flex; align-items: center; justify-content: center;
  }
  .st-danger-icon svg { width: 24px; height: 24px; }

  .st-empty {
    text-align: center;
    padding: 40px 20px;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 20px;
    border: 2px dashed rgba(255, 255, 255, 0.05);
  }

  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Phone Input Overrides */
  .react-tel-input { font-family: inherit; direction: ltr; margin-bottom: 0 !important; }
  .react-tel-input .flag { display: none !important; }
  .react-tel-input .form-control { 
    width: 100% !important; padding: 14px 18px 14px 74px !important; height: auto !important;
    background: rgba(255,255,255,.03) !important; border: 1px solid rgba(255,255,255,.1) !important; 
    border-radius: 12px !important; color: #f8fafc !important; font-size: .95rem !important; 
    transition: all .2s !important; outline: none !important; box-shadow: none !important;
  }
  .react-tel-input .form-control:focus { border-color: #38bdf8 !important; background: rgba(56,189,248,.03) !important; box-shadow: 0 0 0 3px rgba(56,189,248,.15) !important; }
  .react-tel-input .flag-dropdown { 
    background: rgba(255,255,255,.04) !important; border: 1px solid rgba(255,255,255,.1) !important; 
    border-radius: 12px 0 0 12px !important; border-right: none !important; padding: 0 !important;
    width: 60px !important; display: flex !important; align-items: center !important; justify-content: center !important;
  }
  .react-tel-input .flag-dropdown:hover, .react-tel-input .flag-dropdown.open { background: rgba(255,255,255,.07) !important; }
  .react-tel-input .selected-flag { border-radius: 12px 0 0 12px !important; width: 100% !important; padding: 0 !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important; }
  .react-tel-input .selected-flag .arrow { left: auto !important; right: auto !important; position: static !important; border-top-color: #94a3b8 !important; margin-right: 32px !important; }
  .react-tel-input .selected-flag .arrow.up { border-bottom-color: #94a3b8 !important; }
  .react-tel-input .country-list { 
    background: #0f172a !important; border: 1px solid rgba(255,255,255,.1) !important; 
    border-radius: 12px !important; color: #f8fafc !important; 
    box-shadow: 0 10px 30px rgba(0,0,0,.5) !important; margin-top: 8px !important; text-align: left !important;
    max-height: 220px !important; overflow-y: auto !important; direction: ltr !important;
  }
  .react-tel-input .country-list::-webkit-scrollbar { width: 6px; }
  .react-tel-input .country-list::-webkit-scrollbar-thumb { background: rgba(56,189,248,.3); border-radius: 10px; }
  .react-tel-input .country-list .country { padding: 10px 14px !important; transition: background .2s; display: flex; align-items: center; direction: ltr !important; text-align: left !important; }
  .react-tel-input .country-list .country:hover, .react-tel-input .country-list .country.highlight { background: rgba(56,189,248,.1) !important; }
  .react-tel-input .country-list .country .dial-code { color: #94a3b8 !important; margin-left: 8px !important; direction: ltr !important; }
  .react-tel-input .country-list .country .country-name { color: #f8fafc !important; margin-right: 8px !important; }
  .react-tel-input .search { background: #0f172a !important; padding: 10px !important; border-bottom: 1px solid rgba(255,255,255,.1); border-radius: 12px 12px 0 0 !important; z-index: 2; position: sticky; top: 0; }
  .react-tel-input .search-box { 
    background: rgba(255,255,255,.05) !important; border: 1px solid rgba(255,255,255,.1) !important; 
    border-radius: 8px !important; color: #fff !important; width: 100% !important; 
    padding: 8px 12px !important; outline: none; margin: 0 !important; font-family: inherit; direction: rtl;
  }
  .st-dial-code {
    position: absolute; top: 0; left: 26px; height: 100%; display: flex; align-items: center;
    color: #f8fafc; font-weight: bold; font-size: 0.95rem; pointer-events: none; z-index: 1; direction: ltr;
  }

  @media (max-width: 900px) {
    .st-layout { flex-direction: column; gap: 20px; }
    .st-sidebar { width: 100%; position: static; padding: 20px; display: block; border-radius: 20px; }
    .st-sidebar-header { 
      flex-direction: row; text-align: right; justify-content: flex-start;
      gap: 16px; align-items: center; padding-bottom: 16px; margin-bottom: 16px;
    }
    .st-avatar, .st-avatar-placeholder { margin-bottom: 0; width: 64px; height: 64px; font-size: 1.8rem; }
    .st-user-name { font-size: 1.1rem; }
    .st-user-email { font-size: 0.85rem; }
    
    /* Horizontal scrollable nav menu for mobile */
    .st-nav-menu { 
      flex-direction: row; 
      overflow-x: auto; 
      padding-bottom: 8px;
      margin: 0 -10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    .st-nav-menu::-webkit-scrollbar { height: 0; width: 0; display: none; }
    
    .st-nav-item { 
      width: auto; 
      white-space: nowrap; 
      padding: 10px 16px; 
      background: rgba(255,255,255,0.03); 
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 100px;
    }
    .st-nav-divider { display: none; }
  }

  @media (max-width: 600px) {
    .st-form-grid { grid-template-columns: 1fr; }
    .st-nav-item { min-width: 100%; justify-content: flex-start; }
    .st-card { padding: 24px 20px; }
  }
`;
