import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="الرئيسية"
      description="أكاديمية CodeNova لاحتراف البرمجة - مسارك من الصفر حتى الاحتراف">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&display=swap');

        :root {
          --primary: #38bdf8;
          --primary-glow: rgba(56, 189, 248, 0.4);
          --secondary: #a855f7;
          --bg-dark: #09090b;
          --bg-card: #18181b;
          --text-light: #f8fafc;
          --text-muted: #94a3b8;
        }

        body {
          font-family: 'Cairo', sans-serif;
          background-color: var(--bg-dark);
          color: var(--text-light);
          direction: rtl;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.15) 0%, var(--bg-dark) 70%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
          padding: 0 20px;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-title span {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          line-height: 1.8;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 36px;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 800;
          font-family: 'Cairo', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .btn-primary {
          background: var(--primary);
          color: #000;
          box-shadow: 0 10px 30px var(--primary-glow);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px var(--primary-glow);
          color: #000;
          text-decoration: none;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-light);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          text-decoration: none;
        }

        /* Features Section */
        .features-section {
          padding: 100px 20px;
          background: var(--bg-dark);
          position: relative;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 60px;
          color: var(--text-light);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          transition: transform 0.3s, border-color 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: rgba(56, 189, 248, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 24px;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .feature-desc {
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* Premium Stats Section */
        .stats-section {
          padding: 80px 20px;
          background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, var(--bg-dark) 100%);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 40px 20px;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .stat-item:hover {
          transform: translateY(-8px);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 15px 35px rgba(56, 189, 248, 0.1);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          background: rgba(56, 189, 248, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 2rem;
          transition: transform 0.3s;
        }

        .stat-item:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-num {
          font-size: 3.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 1.15rem;
          font-weight: 800;
        }

        /* Animations */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Floating Shapes for Hero Background */
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
          opacity: 0.5;
        }
        .shape-1 { width: 400px; height: 400px; background: rgba(56, 189, 248, 0.2); top: -100px; right: -100px; }
        .shape-2 { width: 300px; height: 300px; background: rgba(168, 85, 247, 0.2); bottom: 100px; left: -50px; }
        


        /* Courses Section */
        .course-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 28px;
          padding: 40px 30px;
          text-decoration: none;
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .course-bg-shape {
          position: absolute;
          width: 150px;
          height: 150px;
          background: var(--course-glow);
          border-radius: 50%;
          top: -50px;
          right: -50px;
          filter: blur(40px);
          opacity: 0.3;
          transition: all 0.4s;
          pointer-events: none;
        }

        .course-card:hover .course-bg-shape {
          transform: scale(1.5);
          opacity: 0.8;
        }

        .course-card:hover {
          transform: translateY(-10px);
          border-color: var(--course-color);
          box-shadow: 0 20px 40px -10px var(--course-glow);
          text-decoration: none;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.03);
        }

        .course-icon {
          width: 90px;
          height: 90px;
          border-radius: 24px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .course-card:hover .course-icon {
          transform: scale(1.1) translateY(-5px);
          border-color: rgba(255,255,255,0.1);
        }

        .course-title {
          font-size: 1.6rem;
          font-weight: 900;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .course-desc {
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 30px;
          flex-grow: 1;
          position: relative;
          z-index: 2;
        }

        .course-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 800;
          color: var(--course-color);
          position: relative;
          z-index: 2;
          padding: 12px 24px;
          background: rgba(255,255,255,0.03);
          border-radius: 100px;
          width: 100%;
          transition: background 0.3s;
        }

        .course-card:hover .course-footer {
          background: rgba(255,255,255,0.08);
        }

        .course-card .arrow {
          transition: transform 0.3s;
        }

        .course-card:hover .arrow {
          transform: translateX(-5px);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 30px 20px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--hover-color), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-hover);
          text-decoration: none;
          box-shadow: 0 15px 35px -10px var(--hover-color);
        }

        .contact-card:hover::before {
          opacity: 0.15;
        }

        .contact-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--icon-bg);
          color: var(--icon-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 2rem;
          transition: transform 0.3s;
        }

        .contact-card:hover .contact-icon-wrap {
          transform: scale(1.1);
        }

        .contact-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-light);
          margin-bottom: 8px;
        }

        .contact-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }

          .hero-buttons { flex-direction: column; }
          .btn { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />

        <div className="hero-content">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" style={{ width: 160, height: 160, borderRadius: '50%', background: 'transparent', border: '3px solid rgba(56,189,248,0.5)', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }} />
          </div>
          <h1 className="hero-title">
            ابدأ رحلتك نحو <span>الاحتراف</span> في البرمجة
          </h1>
          <p className="hero-subtitle">
            أكاديمية CodeNova تقدم لك مسارات تعليمية متكاملة، مشاريع عملية، ودعم مستمر لتصبح مطور برمجيات محترف ومستعد لسوق العمل.
          </p>
          <div className="hero-buttons">
            <a href="#courses" className="btn btn-primary">
              استكشف الكورسات
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </a>
            <Link to="/about" className="btn btn-secondary">
              تعرف علينا
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div className="stat-num">+1500</div>
            <div className="stat-label">طالب مسجل</div>
          </div>
          <div className="stat-item" style={{ '--primary': '#a855f7' } as React.CSSProperties}>
            <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 22 12 17 22 22 12 2"></polygon></svg>
            </div>
            <div className="stat-num" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4</div>
            <div className="stat-label">مسارات برمجية</div>
          </div>
          <div className="stat-item" style={{ '--primary': '#34d399' } as React.CSSProperties}>
            <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div className="stat-num" style={{ background: 'linear-gradient(135deg, #34d399 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+50</div>
            <div className="stat-label">مشروع عملي</div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" className="courses-section" style={{ padding: '100px 20px', background: 'var(--bg-dark)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>مساراتنا البرمجية</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>اختر المسار الذي يناسب طموحك وابدأ رحلة الاحتراف بخطوات عملية ومشاريع حقيقية.</p>
        </div>

        <div className="courses-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Flutter */}
          <Link to="/flutter" className="course-card" style={{ '--course-color': '#42A5F5', '--course-glow': 'rgba(66, 165, 245, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار فلاتر (Flutter)</h3>
            <p className="course-desc">تعلم بناء تطبيقات هواتف ذكية (Android & iOS) بأداء عالي وواجهات احترافية بأسلوب متقدم.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* JavaScript */}
          <Link to="/javascript" className="course-card" style={{ '--course-color': '#F7DF1E', '--course-glow': 'rgba(247, 223, 30, 0.15)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" style={{ width: '60px', height: '60px', borderRadius: '12px' }} />
            </div>
            <h3 className="course-title">مسار جافاسكريبت (JS)</h3>
            <p className="course-desc">احترف تطوير واجهات الويب الأمامية التفاعلية وافهم أسرار اللغة الأكثر طلباً عالمياً.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* C++ */}
          <Link to="/cpp" className="course-card" style={{ '--course-color': '#00599C', '--course-glow': 'rgba(0, 89, 156, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار C++ الأساسي</h3>
            <p className="course-desc">ابنِ أساساً برمجياً قوياً جداً وافهم خوارزميات وهيكلة البيانات العميقة لتكون مهندساً صلباً.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* Python */}
          <Link to="/python" className="course-card" style={{ '--course-color': '#FFD43B', '--course-glow': 'rgba(55, 118, 171, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار بايثون (Python)</h3>
            <p className="course-desc">لغة العصر! تعلم برمجة الذكاء الاصطناعي، تحليل البيانات، والأتمتة السريعة بأسلوب ممتع.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">لماذا CodeNova؟</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>
            <h3 className="feature-title">محتوى شامل وحديث</h3>
            <p className="feature-desc">كورساتنا تغطي أحدث التقنيات بدءاً من الأساسيات وحتى المستويات المتقدمة التي يطلبها سوق العمل.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <h3 className="feature-title">تطبيق عملي 100%</h3>
            <p className="feature-desc">لن تكتفي بالمشاهدة، ستقوم ببناء تطبيقات ومشاريع حقيقية تضعها في معرض أعمالك (Portfolio).</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 className="feature-title">متابعة ودعم مستمر</h3>
            <p className="feature-desc">نحن معك خطوة بخطوة، نجيب على استفساراتك ونوجهك باستمرار لضمان فهمك الكامل للمادة العلمية.</p>
          </div>
        </div>
      </div>

      {/* Premium Contact Section */}
      <div className="contact-section" style={{ padding: '100px 20px', background: 'radial-gradient(ellipse at bottom, rgba(56, 189, 248, 0.05) 0%, var(--bg-dark) 100%)', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>تواصل معنا</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>نحن هنا دائماً للرد على استفساراتك وتقديم الدعم اللازم لرحلتك التعليمية.</p>
        </div>

        <div className="contact-grid">
          {/* WhatsApp Academy */}
          <a href="https://wa.me/201272442829" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(37,211,102,0.8)', '--border-hover': 'rgba(37,211,102,0.4)', '--icon-bg': 'rgba(37,211,102,0.1)', '--icon-color': '#25D366' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="contact-title">واتساب الأكاديمية</h3>
            <div className="contact-subtitle">للاستفسارات العامة والتسجيل</div>
          </a>



          {/* Facebook */}
          <a href="https://www.facebook.com/share/1BdtYrtu6d/" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(24,119,242,0.8)', '--border-hover': 'rgba(24,119,242,0.4)', '--icon-bg': 'rgba(24,119,242,0.1)', '--icon-color': '#1877F2' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <h3 className="contact-title">فيسبوك</h3>
            <div className="contact-subtitle">تابع آخر أخبارنا ومنشوراتنا</div>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/codenova-academy/" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(10,102,194,0.8)', '--border-hover': 'rgba(10,102,194,0.4)', '--icon-bg': 'rgba(10,102,194,0.1)', '--icon-color': '#0A66C2' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <h3 className="contact-title">لينكد إن</h3>
            <div className="contact-subtitle">انضم لشبكتنا المهنية</div>
          </a>
        </div>
      </div>
    </Layout>

  );
}
