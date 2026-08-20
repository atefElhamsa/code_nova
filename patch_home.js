const fs = require('fs');

const newHomeContent = `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="الرئيسية"
      description="أكاديمية CodeNova لاحتراف البرمجة - مسارك من الصفر حتى الاحتراف">
      
      <style>{\`
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

        /* Stats Section */
        .stats-section {
          padding: 60px 20px;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.05), rgba(168, 85, 247, 0.05));
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stats-grid {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: 0 auto;
          gap: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-num {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 1.1rem;
          font-weight: 700;
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
        
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .hero-buttons { flex-direction: column; }
          .btn { width: 100%; justify-content: center; }
        }
      \`}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        
        <div className="hero-content">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid rgba(56,189,248,0.5)', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }} />
          </div>
          <h1 className="hero-title">
            ابدأ رحلتك نحو <span>الاحتراف</span> في البرمجة
          </h1>
          <p className="hero-subtitle">
            أكاديمية CodeNova تقدم لك مسارات تعليمية متكاملة، مشاريع عملية، ودعم مستمر لتصبح مطور برمجيات محترف ومستعد لسوق العمل.
          </p>
          <div className="hero-buttons">
            <Link to="/#courses" className="btn btn-primary" onClick={e => {
              e.preventDefault();
              alert("سنقوم بإضافة قسم الكورسات قريباً!");
            }}>
              استكشف الكورسات
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </Link>
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
            <div className="stat-num">+1500</div>
            <div className="stat-label">طالب مسجل</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4</div>
            <div className="stat-label">مسارات برمجية</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">+50</div>
            <div className="stat-label">مشروع عملي</div>
          </div>
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

    </Layout>
  );
}
`;

fs.writeFileSync('src/pages/index.tsx', newHomeContent);
