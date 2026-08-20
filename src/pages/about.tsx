import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="عن الأكاديمية" description="تعرف على أكاديمية CodeNova">
      <main className="v-about" dir="rtl">
        
        {/* Background Design */}
        <div className="v-bg-lines"></div>
        <div className="v-bg-glow"></div>

        <div className="v-container">
          
          <header className="v-header">
            <h1 className="v-title">
              نحن <span className="v-brand">CodeNova</span>
            </h1>
            <p className="v-subtitle">
              نؤمن بأن البرمجة هي لغة المستقبل، ولذلك صممنا أكاديمية متكاملة تأخذ بيدك من البداية 
              حتى تصبح مطوراً محترفاً قادراً على بناء أنظمة حقيقية والمنافسة بقوة في سوق العمل.
            </p>
          </header>

          <section className="v-mission-section">
            <div className="v-mission-card">
              <div className="v-mission-icon" style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.1)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h2>رسالتنا</h2>
              <p>
                نستهدف بناء جيل من المبرمجين العرب القادرين على تصميم أنظمة برمجية عالية الكفاءة. 
                من خلال بيئة تعليمية تركز على الجانب العملي بعيداً عن الحشو النظري الممل، مع التركيز على كتابة Clean Code وبناء هيكلة صحيحة للمشاريع.
              </p>
            </div>
            
            <div className="v-mission-card">
              <div className="v-mission-icon" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h2>لماذا نحن؟</h2>
              <p>
                لأننا لا نقدم لك مجرد شروحات نظرية. بل نضعك في بيئة عمل حقيقية (Simulation) 
                حيث تبني أنظمة وتواجه تحديات برمجية حقيقية لكي تتخرج وأنت جاهز تماماً لسوق العمل بكل ثقة واحترافية.
              </p>
            </div>
          </section>

          <section className="v-instructor-section">
            <div className="v-section-header">
              <h2 className="v-section-title">من وراء الأكاديمية؟</h2>
              <p className="v-section-subtitle">تعرف على مؤسس الأكاديمية ومقدم المحتوى</p>
            </div>
            
            <div className="v-instructor-card">
              <div className="v-instructor-avatar">
                <img src="/img/codeNovaLogo.jpg" alt="Atef" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div className="v-instructor-info">
                <h3>عاطف الهمسه</h3>
                <p className="v-instructor-title">مهندس برمجيات | مؤسس CodeNova</p>
                <p className="v-instructor-bio">
                  مهندس ومطور برمجيات يمتلك خبرة عملية طويلة وسجل حافل في سوق العمل البرمجي. عمل على بناء وتصميم العديد من الأنظمة البرمجية المعقدة والمتكاملة لسنوات طويلة. يهدف من خلال الأكاديمية إلى نقل هذه الخبرة العملية العميقة لسد الفجوة بين التعليم النظري ومتطلبات سوق العمل الحقيقية، وتخريج مبرمجين محترفين جاهزين للمنافسة بقوة.
                </p>
                <div className="v-instructor-socials">
                  <a href="https://wa.me/201272442829" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#25D366', background: 'rgba(37,211,102,0.1)', borderColor: 'rgba(37,211,102,0.3)'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    واتساب الأكاديمية
                  </a>

                  <a href="https://www.facebook.com/share/1BdtYrtu6d/" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#1877F2', background: 'rgba(24,119,242,0.1)', borderColor: 'rgba(24,119,242,0.3)'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    فيسبوك
                  </a>
                  <a href="https://www.linkedin.com/company/codenova-academy/" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#0A66C2', background: 'rgba(10,102,194,0.1)', borderColor: 'rgba(10,102,194,0.3)'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    لينكد إن
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="v-footer">
            <p>© {new Date().getFullYear()} CodeNova Academy. جميع الحقوق محفوظة.</p>
          </footer>

        </div>
      </main>

      <style>{`
        :root {
          --v-bg: #09090b;
          --v-surface: #18181b;
          --v-border: rgba(255,255,255,0.05);
          --v-text: #f4f4f5;
          --v-text-muted: #94a3b8;
          --v-primary: #38bdf8;
        }

        .v-about {
          background-color: var(--v-bg);
          min-height: 100vh;
          position: relative;
          font-family: 'Cairo', 'Inter', system-ui, sans-serif;
          padding: 6rem 1rem 0;
          color: var(--v-text);
          overflow-x: hidden;
        }

        /* Ambient Glow */
        .v-bg-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 100vw;
          background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 60%);
          z-index: 0;
          pointer-events: none;
        }

        .v-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .v-header {
          text-align: center;
          margin-bottom: 5rem;
          animation: fadeUp 0.8s ease-out;
        }
        .v-title {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 900;
          margin: 0 0 1rem;
        }
        .v-brand {
          background: linear-gradient(135deg, #38bdf8, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .v-subtitle {
          font-size: 1.25rem;
          color: var(--v-text-muted);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }

        .v-mission-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 6rem;
          animation: fadeUp 1s ease-out;
        }
        .v-mission-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--v-border);
          border-radius: 24px;
          padding: 3rem;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .v-mission-card:hover {
          transform: translateY(-8px);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 15px 35px rgba(56, 189, 248, 0.05);
        }
        .v-mission-icon {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .v-mission-card h2 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .v-mission-card p {
          color: var(--v-text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
          margin: 0;
        }

        .v-section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .v-section-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 0 10px;
        }
        .v-section-subtitle {
          color: var(--v-text-muted);
          font-size: 1.15rem;
        }

        .v-instructor-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2));
          border: 1px solid var(--v-border);
          border-radius: 32px;
          padding: 4rem;
          display: flex;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        
        .v-instructor-card:hover {
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.05);
        }

        .v-instructor-avatar {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.2));
          border: 3px solid rgba(168, 85, 247, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 5px;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
        }
        .v-instructor-info h3 {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 0 10px;
          background: linear-gradient(135deg, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .v-instructor-title {
          color: #a855f7;
          font-weight: 800;
          font-size: 1.2rem;
          margin: 0 0 1.5rem;
        }
        .v-instructor-bio {
          color: var(--v-text-muted);
          font-size: 1.15rem;
          line-height: 1.8;
          margin: 0 0 2.5rem;
        }
        .v-instructor-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .v-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          text-decoration: none !important;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s;
          border: 1px solid;
        }
        
        .v-social-link:hover {
          transform: translateY(-3px);
          filter: brightness(1.2);
        }

        .v-footer {
          text-align: center;
          padding: 2rem 0 4rem;
          color: var(--v-text-muted);
          border-top: 1px solid var(--v-border);
          font-size: 1.1rem;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .v-mission-section {
            grid-template-columns: 1fr;
          }
          .v-instructor-card {
            flex-direction: column;
            text-align: center;
            padding: 2.5rem 1.5rem;
            gap: 2rem;
          }
          .v-instructor-socials {
            justify-content: center;
          }
        }
      `}</style>
    </Layout>
  );
}
