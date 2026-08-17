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

/* ── 3D Tilt Effect Hook ─────────────────────────────────── */
function useTilt(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}

function CourseCard({ 
  type, title, titleAr, descEn, descAr, tech, path 
}: { 
  type: 'js' | 'flutter', title: string, titleAr: string, descEn: string, descAr: string, tech: string[], path: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);
  
  return (
    <div className={`card-container ${type}-container`}>
      <div className={`premium-card ${type}-card`} ref={cardRef}>
        <div className="card-border-glow"></div>
        <div className="card-inner">
          <div className="card-top">
            <div className={`icon-backdrop ${type}-backdrop`}></div>
            <div className={`course-icon-wrapper ${type}-icon`}>
              {type === 'js' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
              )}
            </div>
            <div className="course-badge">{type === 'js' ? '23 Lessons' : '33 Lessons'}</div>
          </div>
          
          <div className="card-body">
            <h2 className="course-title" dir="ltr">{title} <span className="title-ar" dir="rtl">{titleAr}</span></h2>
            <p className="course-desc">
              <span dir="ltr" style={{ display: 'block', marginBottom: '8px' }}>{descEn}</span>
              <span dir="rtl" className="desc-ar">{descAr}</span>
            </p>
            <div className="course-tech">
              {tech.map((t, i) => <span key={i} className={`tech-pill ${type}-pill`}>{t}</span>)}
            </div>
          </div>

          <div className="card-footer">
            <Link to={path} className={`action-btn ${type}-btn`}>
              <div className="btn-content">
                <span className="btn-text" dir="ltr">Start Course</span>
                <span className="btn-divider">|</span>
                <span className="btn-text-ar" dir="rtl">ابدأ الكورس</span>
              </div>
              <div className="btn-arrow-wrapper">
                <svg viewBox="0 0 24 24" className="arrow-icon" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hub() {
  const heroRef = useRef<HTMLElement>(null);
  useMouseGlow(heroRef);

  return (
    <Layout title="Courses Hub" description="Choose your learning path">
      <section className="hub-section" ref={heroRef}>
        <div className="mouse-glow"></div>
        <div className="hub-bg-glow glow-1"></div>
        <div className="hub-bg-glow glow-2"></div>
        <div className="hub-bg-glow glow-3"></div>
        
        {/* Dynamic mesh background */}
        <div className="mesh-bg"></div>
        
        {/* Animated grid */}
        <div className="hero-grid"></div>

        {Array.from({length: 20}).map((_, i) => (
          <div key={i} className="particle" style={{
            width: Math.random()*4 + 2, height: Math.random()*4 + 2,
            top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
            animationDuration: `${Math.random()*10 + 5}s`,
            animationDelay: `${Math.random()*5}s`,
          }}/>
        ))}

        <div className="hub-content">
          <div className="hub-header">
            <div className="welcome-badge">
              <span className="badge-dot"></span> 
              <span dir="ltr" style={{marginRight: '8px', marginLeft: '8px'}}>Next-Gen Learning</span>
              <span style={{opacity: 0.3, margin: '0 8px'}}>|</span>
              <span dir="rtl" style={{fontWeight: 700}}>الجيل الجديد للتعلم</span>
            </div>
            
            <h1 className="hub-title" dir="ltr">
              <span className="title-static">Code</span><span className="text-gradient">Nova</span>
            </h1>
            
            <p className="hub-subtitle" dir="ltr">
              Ignite your programming journey with immersive, world-class interactive courses.<br/>
              <span dir="rtl" className="subtitle-ar">ابدأ رحلتك البرمجية مع دورات تفاعلية بمستوى عالمي.</span>
            </p>
          </div>

          <div className="courses-grid">
            <CourseCard 
              type="js"
              title="Modern JavaScript"
              titleAr="الجافاسكريبت الحديثة"
              descEn="Deep dive into JavaScript from core fundamentals to advanced async patterns and DOM manipulation."
              descAr="تعلم الجافاسكريبت من الصفر، التعامل مع المتصفح، والبرمجة المتقدمة خطوة بخطوة."
              tech={['ES6+', 'DOM', 'Async/Await']}
              path="/javascript"
            />
            
            <CourseCard 
              type="flutter"
              title="Dart & Flutter Pro"
              titleAr="فلاتر الاحترافي"
              descEn="Master mobile development with MVVM Architecture, Clean Code principles, and robust Backend Integrations."
              descAr="احترف تطوير تطبيقات الموبايل بمعمارية MVVM الصارمة وأفضل ممارسات الكود النظيف."
              tech={['Flutter', 'Dart', 'MVVM']}
              path="/flutter"
            />
          </div>
        </div>
      </section>

      <style>{`
        :root {
          --color-bg: #030712;
          --flutter-color: #00e1ff;
          --js-color: #facc15;
        }

        .hub-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background-color: var(--color-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .mouse-glow {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%);
          pointer-events: none; z-index: 1;
        }

        .mesh-bg {
          position: absolute; inset: 0;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(250, 204, 21, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(0, 225, 255, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(138, 43, 226, 0.04) 0%, transparent 50%);
          z-index: 0; filter: blur(60px);
        }

        .hero-grid {
          position: absolute; inset: 0;
          background-size: 80px 80px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          z-index: 0; transform: perspective(500px) rotateX(40deg) scale(1.5);
          transform-origin: top center;
        }

        .hub-bg-glow {
          position: absolute; border-radius: 50%; filter: blur(120px); z-index: 0;
          animation: pulseGlow 15s ease-in-out infinite alternate;
        }
        .glow-1 { top: -20%; left: -10%; width: 60vw; height: 60vw; background: rgba(250, 204, 21, 0.08); }
        .glow-2 { bottom: -20%; right: -10%; width: 60vw; height: 60vw; background: rgba(0, 225, 255, 0.08); animation-delay: -5s; }
        .glow-3 { top: 40%; left: 40%; width: 40vw; height: 40vw; background: rgba(138, 43, 226, 0.05); animation-delay: -10s; }

        @keyframes pulseGlow { 0% { opacity: 0.5; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1.1); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        .particle {
          position: absolute; border-radius: 50%; background: #fff; box-shadow: 0 0 20px rgba(255,255,255,1);
          animation: float linear infinite alternate; z-index: 1; opacity: 0.3;
        }

        .hub-content {
          position: relative; z-index: 2; width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center;
        }

        .hub-header { text-align: center; margin-bottom: 5rem; animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }

        .welcome-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 24px; border-radius: 40px; color: #a1a1aa; font-size: 1rem; font-weight: 500;
          margin-bottom: 2rem; backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .badge-dot { width: 10px; height: 10px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 15px #38bdf8; animation: pulseGlow 2s infinite; }

        .hub-title { font-size: clamp(4rem, 10vw, 7rem); font-weight: 900; margin: 0 0 2rem; letter-spacing: 0; line-height: 1.2; }
        .title-static { color: #fff; text-shadow: 0 0 40px rgba(255,255,255,0.2); }
        .text-gradient { 
          background: linear-gradient(135deg, #38bdf8, #a78bfa); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
        }
        
        .hub-subtitle { font-size: clamp(1.15rem, 2.5vw, 1.4rem); color: #cbd5e1; line-height: 1.8; max-width: 650px; margin: 0 auto; }
        .subtitle-ar { display: block; margin-top: 20px; font-weight: 600; font-size: 1.25rem; color: #94a3b8; line-height: 1.8; }

        .courses-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; width: 100%;
        }

        .card-container {
          perspective: 1500px;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .js-container { animation-delay: 0.2s; }
        .flutter-container { animation-delay: 0.4s; }

        .premium-card {
          position: relative; display: flex; flex-direction: column;
          border-radius: 30px; transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;
          background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(24px); height: 100%;
        }
        
        .card-border-glow {
          position: absolute; inset: -2px; border-radius: 32px; z-index: -1; opacity: 0; transition: opacity 0.5s;
        }
        .js-card .card-border-glow { background: linear-gradient(135deg, var(--js-color), transparent, var(--js-color)); }
        .flutter-card .card-border-glow { background: linear-gradient(135deg, var(--flutter-color), transparent, var(--flutter-color)); }
        
        .premium-card:hover .card-border-glow { opacity: 0.3; }
        
        .js-card:hover { box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 50px rgba(250, 204, 21, 0.15); background: rgba(15, 23, 42, 0.8); }
        .flutter-card:hover { box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 50px rgba(0, 225, 255, 0.15); background: rgba(15, 23, 42, 0.8); }

        .card-inner {
          position: relative; padding: 3rem; z-index: 2; display: flex; flex-direction: column; height: 100%; transform: translateZ(50px);
        }

        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; position: relative; }
        
        .icon-backdrop { position: absolute; width: 100px; height: 100px; border-radius: 50%; filter: blur(40px); opacity: 0.4; transition: opacity 0.5s; }
        .js-backdrop { background: var(--js-color); top: -30px; left: -30px; }
        .flutter-backdrop { background: var(--flutter-color); top: -30px; left: -30px; }
        .premium-card:hover .icon-backdrop { opacity: 0.8; }

        .course-icon-wrapper {
          width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 2; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .course-icon-svg { width: 36px; height: 36px; }
        .premium-card:hover .course-icon-wrapper { transform: scale(1.1) rotate(-5deg); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        
        .js-icon { background: rgba(250, 204, 21, 0.15); border: 1px solid rgba(250, 204, 21, 0.3); color: var(--js-color); }
        .flutter-icon { background: rgba(0, 225, 255, 0.15); border: 1px solid rgba(0, 225, 255, 0.3); color: var(--flutter-color); }

        .course-badge {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px;
          border-radius: 30px; font-size: 0.95rem; font-weight: 700; color: #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .card-body { flex-grow: 1; }
        .course-title { font-size: 2.4rem; font-weight: 900; color: #fff; margin: 0 0 2rem; letter-spacing: 0; display: flex; flex-direction: column; line-height: 1.3; }
        .title-ar { font-size: 1.4rem; color: #cbd5e1; font-weight: 700; margin-top: 10px; }

        .course-desc { font-size: 1.1rem; color: #94a3b8; line-height: 1.8; margin: 0 0 3rem; }
        .desc-ar { display: block; margin-top: 16px; font-size: 1.05rem; font-weight: 600; color: #a1a1aa; line-height: 1.8; }

        .course-tech { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3.5rem; align-content: flex-start; }
        .tech-pill { font-family: 'Fira Code', monospace; font-size: 0.85rem; padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 600; transition: all 0.3s; }
        .js-pill { background: rgba(250, 204, 21, 0.05); color: #fde047; border: 1px solid rgba(250, 204, 21, 0.1); }
        .flutter-pill { background: rgba(0, 225, 255, 0.05); color: #67e8f9; border: 1px solid rgba(0, 225, 255, 0.1); }
        
        .js-card:hover .js-pill { background: rgba(250, 204, 21, 0.15); border-color: rgba(250, 204, 21, 0.4); }
        .flutter-card:hover .flutter-pill { background: rgba(0, 225, 255, 0.15); border-color: rgba(0, 225, 255, 0.4); }

        .card-footer { margin-top: auto; }
        
        /* Next-Gen Button Styling */
        .action-btn {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 1.2rem 1.5rem; border-radius: 20px; text-decoration: none !important; 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        
        .btn-content { display: flex; align-items: center; justify-content: center; flex-grow: 1; }
        .btn-text { font-size: 1.15rem; font-weight: 800; }
        .btn-text-ar { font-weight: 700; font-size: 1.1rem; }
        .btn-divider { margin: 0 15px; opacity: 0.3; }
        
        .btn-arrow-wrapper { 
          width: 45px; height: 45px; border-radius: 14px; background: rgba(255,255,255,0.1); 
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arrow-icon { width: 22px; height: 22px; transition: transform 0.4s; }
        
        .js-btn { background: rgba(250, 204, 21, 0.1); color: var(--js-color); border: 1px solid rgba(250, 204, 21, 0.2); }
        .js-btn:hover { background: var(--js-color); color: #000; box-shadow: 0 15px 30px rgba(250, 204, 21, 0.3); }
        .js-btn:hover .btn-arrow-wrapper { background: rgba(0,0,0,0.1); transform: translateX(-5px); }
        
        .flutter-btn { background: rgba(0, 225, 255, 0.1); color: var(--flutter-color); border: 1px solid rgba(0, 225, 255, 0.2); }
        .flutter-btn:hover { background: var(--flutter-color); color: #000; box-shadow: 0 15px 30px rgba(0, 225, 255, 0.3); }
        .flutter-btn:hover .btn-arrow-wrapper { background: rgba(0,0,0,0.1); transform: translateX(-5px); }

        .premium-card:hover .arrow-icon { transform: translateX(5px); }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hub-section { padding: 4rem 1rem; }
          .hub-title { font-size: 3.5rem; }
          .card-inner { padding: 2rem; }
          .course-title { font-size: 2rem; }
          .action-btn { padding: 1rem; }
          .btn-text, .btn-text-ar { font-size: 1rem; }
          .courses-grid { grid-template-columns: 1fr; }
          .btn-arrow-wrapper { width: 35px; height: 35px; }
        }
      `}</style>
    </Layout>
  );
}
