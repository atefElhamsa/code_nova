import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

/* ── Mouse Track Glow Hook ───────────────────────────────── */
function useMouseGlow(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.setProperty('--mouse-x', `${x}px`);
      ref.current.style.setProperty('--mouse-y', `${y}px`);
    };
    const el = ref.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, [ref]);
}

function CourseCard({ 
  type, title, titleAr, descEn, descAr, tech, path 
}: { 
  type: 'js' | 'flutter', title: string, titleAr: string, descEn: string, descAr: string, tech: string[], path: string 
}) {
  return (
    <div className={`course-card ${type}-card`}>
      <div className="card-glass"></div>
      <div className="card-content">
        <div className="card-header">
          <div className="icon-wrapper">
            {type === 'js' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
            )}
          </div>
          <span className="badge">{type === 'js' ? '23 Lessons' : '33 Lessons'}</span>
        </div>
        
        <h3 className="title" dir="ltr">{title} <span className="title-ar" dir="rtl">{titleAr}</span></h3>
        
        <p className="desc">
          <span dir="ltr">{descEn}</span>
          <span dir="rtl" className="desc-ar">{descAr}</span>
        </p>
        
        <div className="tech-stack">
          {tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
        </div>

        <Link to={path} className="start-btn">
          <span className="btn-text" dir="ltr">Start Learning</span>
          <span className="btn-divider">|</span>
          <span className="btn-text-ar" dir="rtl">ابدأ الآن</span>
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </Link>
      </div>
    </div>
  );
}

export default function Hub() {
  const heroRef = useRef<HTMLElement>(null);
  useMouseGlow(heroRef);

  return (
    <Layout title="Home" description="CodeNova Academy">
      <main className="modern-hub" ref={heroRef}>
        
        {/* Background Effects */}
        <div className="ambient-background">
          <div className="spotlight spot-1"></div>
          <div className="spotlight spot-2"></div>
        </div>
        
        <div className="mouse-glow"></div>

        <div className="content-container">
          
          <header className="hero-section">
            <div className="announcement-pill">
              <span className="dot"></span>
              <span className="pill-text" dir="ltr">The future of coding</span>
              <span className="pill-divider"></span>
              <span className="pill-text-ar" dir="rtl">مستقبل البرمجة يبدأ هنا</span>
            </div>

            <div className="logo-wrapper">
              <img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" className="brand-logo" />
            </div>

            <h1 className="main-title" dir="ltr">
              <div className="brand-name">
                <span className="brand-code">Code</span><span className="brand-nova">Nova</span>
              </div>
              <div className="brand-academy">Academy</div>
            </h1>

            <p className="main-subtitle" dir="ltr">
              Build the future with world-class interactive programming courses.<br/>
              <span dir="rtl" className="subtitle-ar">ابنِ مستقبلك مع أقوى الدورات البرمجية التفاعلية بمستوى عالمي.</span>
            </p>
          </header>

          <section className="courses-showcase">
            <CourseCard 
              type="js"
              title="Modern JavaScript"
              titleAr="الجافاسكريبت الحديثة"
              descEn="Master JS from core fundamentals to advanced async patterns."
              descAr="تعلم الجافاسكريبت من الصفر واحتراف التعامل مع المتصفح والبرمجة المتقدمة."
              tech={['ES6+', 'DOM', 'Async']}
              path="/javascript"
            />
            
            <CourseCard 
              type="flutter"
              title="Dart & Flutter Pro"
              titleAr="فلاتر الاحترافي"
              descEn="Build premium mobile apps with Clean Code & MVVM architecture."
              descAr="احترف تطوير الموبايل بمعمارية MVVM الصارمة وأفضل ممارسات الكود."
              tech={['Flutter', 'Dart', 'MVVM']}
              path="/flutter"
            />
          </section>

        </div>
      </main>

      <style>{`
        :root {
          --bg-color: #020617;
          --surface-color: rgba(15, 23, 42, 0.4);
          --border-color: rgba(255, 255, 255, 0.08);
          --primary-glow: #0ea5e9;
          --secondary-glow: #8b5cf6;
        }

        .modern-hub {
          background-color: var(--bg-color);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1rem;
        }

        /* Ambiance */
        .ambient-background { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .spotlight { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; mix-blend-mode: screen; animation: float 10s infinite ease-in-out alternate; }
        .spot-1 { background: var(--primary-glow); width: 50vw; height: 50vw; top: -20%; left: -10%; }
        .spot-2 { background: var(--secondary-glow); width: 40vw; height: 40vw; bottom: -10%; right: -10%; animation-delay: -5s; }
        
        .mouse-glow {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255,255,255,0.03), transparent 40%);
        }

        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(20px, 30px) scale(1.1); } }

        .content-container { position: relative; z-index: 2; width: 100%; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }

        /* Hero Section */
        .hero-section { text-align: center; margin-bottom: 5rem; animation: fadeUp 1s ease-out; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .announcement-pill {
          display: inline-flex; align-items: center; gap: 12px;
          background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 24px; border-radius: 100px;
          margin-bottom: 2.5rem; backdrop-filter: blur(10px);
        }
        .dot { width: 8px; height: 8px; background: #38bdf8; border-radius: 50%; box-shadow: 0 0 10px #38bdf8; }
        .pill-text { color: #94a3b8; font-size: 0.9rem; font-weight: 500; }
        .pill-divider { width: 1px; height: 14px; background: rgba(255,255,255,0.2); }
        .pill-text-ar { color: #e2e8f0; font-size: 0.95rem; font-weight: 700; }

        .logo-wrapper { margin-bottom: 2rem; position: relative; display: flex; justify-content: center; align-items: center; animation: floatLogo 6s infinite ease-in-out; }
        
        .brand-logo { 
          height: 180px; 
          width: auto; 
          border-radius: 35px; /* Crops the black corners of the JPG perfectly to a squircle */
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        @keyframes floatLogo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

        .main-title { margin: 0 0 1.5rem; line-height: 1.1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .brand-name { font-size: clamp(4rem, 8vw, 6.5rem); font-weight: 900; letter-spacing: -2px; display: flex; align-items: center; justify-content: center; }
        .brand-code { color: #ffffff; text-shadow: 0 0 30px rgba(255,255,255,0.2); }
        .brand-nova { 
          background: linear-gradient(135deg, #38bdf8, #8b5cf6); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
        }
        .brand-academy { 
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          background: linear-gradient(90deg, #94a3b8, #e2e8f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .main-subtitle { font-size: 1.15rem; color: #94a3b8; max-width: 600px; margin: 0 auto; line-height: 1.8; }
        .subtitle-ar { display: block; margin-top: 15px; font-size: 1.25rem; font-weight: 600; color: #cbd5e1; line-height: 1.8; }

        /* Courses Section */
        .courses-showcase { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; width: 100%; animation: fadeUp 1s ease-out 0.2s backwards; }

        .course-card {
          position: relative; border-radius: 24px; padding: 2.5rem; display: flex; flex-direction: column;
          background: var(--surface-color); border: 1px solid var(--border-color);
          backdrop-filter: blur(20px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        
        .card-glass { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%); opacity: 0; transition: opacity 0.4s; }
        .course-card:hover .card-glass { opacity: 1; }
        
        .js-card:hover { border-color: rgba(250, 204, 21, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(250, 204, 21, 0.1); transform: translateY(-5px); }
        .flutter-card:hover { border-color: rgba(14, 165, 233, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(14, 165, 233, 0.1); transform: translateY(-5px); }

        .card-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }

        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .icon-wrapper { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; transition: transform 0.4s; }
        .js-card .icon-wrapper { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
        .flutter-card .icon-wrapper { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
        .icon-wrapper svg { width: 28px; height: 28px; }
        .course-card:hover .icon-wrapper { transform: scale(1.1) rotate(-5deg); }

        .badge { background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); }

        .title { font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 8px; line-height: 1.3; }
        .title-ar { font-size: 1.3rem; color: #94a3b8; font-weight: 700; }

        .desc { font-size: 1rem; color: #64748b; line-height: 1.7; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }
        .desc-ar { font-weight: 600; color: #94a3b8; font-size: 1.05rem; }

        .tech-stack { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 2.5rem; }
        .tech-tag { padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; font-family: monospace; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #a1a1aa; }

        .start-btn {
          display: flex; align-items: center; justify-content: center; width: 100%;
          padding: 1rem 1.5rem; border-radius: 16px; text-decoration: none !important;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; transition: all 0.3s; gap: 15px; position: relative; overflow: hidden;
        }
        .btn-text { font-weight: 700; font-size: 1.05rem; }
        .btn-divider { opacity: 0.2; }
        .btn-text-ar { font-weight: 700; font-size: 1.05rem; }
        .arrow { width: 20px; height: 20px; opacity: 0.5; transition: transform 0.3s; }
        
        .js-card .start-btn:hover { background: #facc15; color: #000; border-color: #facc15; box-shadow: 0 10px 20px rgba(250,204,21,0.2); }
        .flutter-card .start-btn:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; box-shadow: 0 10px 20px rgba(14,165,233,0.2); }
        .start-btn:hover .arrow { opacity: 1; transform: translateX(5px); }

        @media (max-width: 1024px) {
          .modern-hub { padding: 5rem 1.5rem; }
          .courses-showcase { gap: 1.5rem; }
          .course-card { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .modern-hub { padding: 3rem 1rem; }
          .brand-name { font-size: clamp(3rem, 10vw, 4rem); }
          .brand-academy { font-size: clamp(1.5rem, 6vw, 2rem); }
          .main-subtitle { font-size: 1rem; }
          .subtitle-ar { font-size: 1.1rem; }
          .courses-showcase { grid-template-columns: 1fr; gap: 1.5rem; }
          .course-card { padding: 1.5rem; align-items: center; text-align: center; }
          .card-header { width: 100%; }
          .title { font-size: 1.5rem; align-items: center; text-align: center; }
          .desc { align-items: center; text-align: center; }
          .tech-stack { justify-content: center; }
          .start-btn { flex-direction: row; gap: 6px; padding: 0.8rem; }
          .btn-text, .btn-text-ar { font-size: 0.95rem; }
          .btn-divider { display: block; opacity: 0.3; }
          .logo-wrapper .brand-logo { height: 130px; }
        }
      `}</style>
    </Layout>
  );
}
