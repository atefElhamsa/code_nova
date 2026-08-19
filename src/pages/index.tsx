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
  type, title, titleAr, descEn, descAr, tech, path, lessonCount 
}: { 
  type: 'js' | 'flutter' | 'cpp' | 'python', title: string, titleAr: string, descEn: string, descAr: string, tech: string[], path: string, lessonCount: string 
}) {
  return (
    <div className={`course-card ${type}-card`}>
      <div className="card-glass"></div>
      <div className="card-content">
        <div className="card-header">
          <div className="icon-wrapper">
            {type === 'js' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            )}
            {type === 'flutter' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
            )}
            {type === 'cpp' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="19" y1="12" x2="19" y2="12"></line><line x1="21" y1="12" x2="21" y2="12"></line><line x1="12" y1="9" x2="12" y2="15"></line><line x1="9" y1="12" x2="15" y2="12"></line></svg>
            )}
            {type === 'python' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C9.27 2 8 3.09 8 5v2h4v1H5.5C3.57 8 2 9.57 2 11.5v3C2 16.43 3.57 18 5.5 18H7v-2.5C7 13.57 8.57 12 10.5 12H14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3h-2zM10 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path><path d="M12 22c2.73 0 4-1.09 4-3v-2h-4v-1h6.5c1.93 0 3.5-1.57 3.5-3.5v-3C22 7.57 20.43 6 18.5 6H17v2.5C17 10.43 15.43 12 13.5 12H10c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h2zM14 19.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
            )}
          </div>
          <span className="badge">{lessonCount}</span>
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

        <div className="settings-btn-container" style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 100 }}>
          <Link to="/settings" className="start-btn" style={{ padding: '8px 16px', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.2)', width: 'auto', borderRadius: '12px', gap: '8px' }}>
            <span dir="rtl" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>⚙️ إعدادات حسابي</span>
          </Link>
        </div>

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
              lessonCount="23 Lessons"
            />
            
            <CourseCard 
              type="flutter"
              title="Dart & Flutter Pro"
              titleAr="فلاتر الاحترافي"
              descEn="Build premium mobile apps with Clean Code & MVVM architecture."
              descAr="احترف تطوير الموبايل بمعمارية MVVM الصارمة وأفضل ممارسات الكود."
              tech={['Flutter', 'Dart', 'MVVM']}
              path="/flutter"
              lessonCount="33 Lessons"
            />

            <CourseCard 
              type="cpp"
              title="C++ Mastery"
              titleAr="إتقان C++"
              descEn="From basics to OOP, STL & Memory Management. The language of systems."
              descAr="من الأساسيات للبرمجة الكائنية والـ STL وإدارة الذاكرة. لغة الأنظمة والألعاب."
              tech={['OOP', 'STL', 'Pointers']}
              path="/cpp"
              lessonCount="20 Lessons"
            />

            <CourseCard 
              type="python"
              title="Python Pro"
              titleAr="بايثون الاحترافي"
              descEn="The most popular language for AI, Data Science & Web Development."
              descAr="أكثر لغة مطلوبة في سوق العمل. بوابتك للذكاء الاصطناعي وتحليل البيانات."
              tech={['OOP', 'APIs', 'Generators']}
              path="/python"
              lessonCount="20 Lessons"
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

        .logo-wrapper { margin-bottom: 2rem; position: relative; display: flex; justify-content: center; align-items: center; }
        
        .brand-logo { 
          height: 180px; 
          width: 180px; 
          object-fit: cover;
          border-radius: 50%;
          animation: floatLogo 4s ease-in-out infinite;
          mix-blend-mode: screen;
          filter: drop-shadow(0 10px 20px rgba(56, 189, 248, 0.4));
        }
        @keyframes floatLogo { 
          0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 10px 20px rgba(56, 189, 248, 0.3)); } 
          50% { transform: translateY(-12px) scale(1.02); filter: drop-shadow(0 20px 30px rgba(56, 189, 248, 0.5)); } 
        }

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
        .cpp-card:hover { border-color: rgba(249, 115, 22, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(249, 115, 22, 0.1); transform: translateY(-5px); }
        .python-card:hover { border-color: rgba(55, 118, 171, 0.5); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(55, 118, 171, 0.15); transform: translateY(-5px); }

        .card-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }

        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .icon-wrapper { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; transition: transform 0.4s; }
        .js-card .icon-wrapper { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
        .flutter-card .icon-wrapper { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
        .cpp-card .icon-wrapper { background: rgba(249, 115, 22, 0.1); color: #f97316; border: 1px solid rgba(249, 115, 22, 0.2); }
        .python-card .icon-wrapper { background: rgba(55, 118, 171, 0.15); color: #4da8da; border: 1px solid rgba(55, 118, 171, 0.3); }
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
        .cpp-card .start-btn:hover { background: #f97316; color: #fff; border-color: #f97316; box-shadow: 0 10px 20px rgba(249,115,22,0.25); }
        .python-card .start-btn:hover { background: #3776ab; color: #fff; border-color: #3776ab; box-shadow: 0 10px 20px rgba(55,118,171,0.25); }
        .start-btn:hover .arrow { opacity: 1; transform: translateX(5px); }

        @media (max-width: 1024px) {
          .modern-hub { padding: 5rem 1.5rem; }
          .courses-showcase { gap: 1.5rem; }
          .course-card { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .modern-hub { padding: 4rem 1rem 3rem; }
          .settings-btn-container { top: 10px; right: 10px; left: 10px; display: flex; justify-content: flex-end; }
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
          .logo-wrapper .brand-logo { height: 140px; width: 140px; }
        }
      `}</style>
    </Layout>
  );
}
