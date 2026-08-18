import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

/* ── Scroll Reveal Hook ──────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
}

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

/* ── Animated number counter ─────────────────────────────── */
function Counter({to, suffix = ''}: {to: number; suffix?: string}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      const tick = setInterval(() => {
        n += Math.ceil(to / 45);
        if (n >= to) { setVal(to); clearInterval(tick); } else setVal(n);
      }, 25);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <strong ref={ref} dir="ltr">{val}{suffix}</strong>;
}

/* ── Technology chip ─────────────────────────────────────── */
function TechChip({label, color}: {label: string; color: string}) {
  return (
    <span className="tech-chip" style={{
      '--chip-color': color,
      '--chip-bg': `${color}18`,
      '--chip-border': `${color}45`,
    } as React.CSSProperties}>
      {label}
    </span>
  );
}

/* ── Part card data ──────────────────────────────────────── */
const parts = [
  {n:1, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>, ar:'أساسيات جافاسكريبت', en:'JS Fundamentals', color:'#facc15', lessons:5,
   link:'/docs-js/part1-fundamentals/variables', chips:['Variables','Data Types','Functions','Scope']},
  {n:2, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, ar:'الكائنات والمصفوفات', en:'Objects & Arrays', color:'#f97316', lessons:3,
   link:'/docs-js/part2-objects-arrays/objects', chips:['Objects','Arrays','Destructuring','Spread']},
  {n:3, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, ar:'البرمجة الكائنية', en:'OOP in JS', color:'#ef4444', lessons:4,
   link:'/docs-js/part3-oop/classes-constructors', chips:['Classes','Inheritance','this keyword','Prototypes']},
  {n:4, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, ar:'البرمجة غير المتزامنة', en:'Async JavaScript', color:'#8b5cf6', lessons:3,
   link:'/docs-js/part4-async/callbacks-event-loop', chips:['Callbacks','Promises','Async/Await','Event Loop']},
  {n:5, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>, ar:'التعامل مع المتصفح', en:'DOM & Browser APIs', color:'#0ea5e9', lessons:3,
   link:'/docs-js/part5-dom/dom-manipulation', chips:['DOM','Events','Fetch API']},
  {n:6, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>, ar:'جافاسكريبت الحديثة', en:'Modern JS (ES6+)', color:'#10b981', lessons:2,
   link:'/docs-js/part6-modern-js/modules', chips:['Modules','Optional Chaining','Nullish Coalescing']},
  {n:7, icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>, ar:'مشروع تطبيقي', en:'Mini Project', color:'#6366f1', lessons:3,
   link:'/docs-js/part7-project/setup-ui', chips:['Vanilla JS','To-Do App','LocalStorage']},
];

export default function JavascriptHome() {
  const {siteConfig} = useDocusaurusContext();
  useScrollReveal();
  const heroRef = useRef<HTMLElement>(null);
  useMouseGlow(heroRef);

  return (
    <Layout title="Modern JavaScript Course" description="Master JavaScript from scratch">
      <div className="js-page">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="hero-section" ref={heroRef}>
          <div className="mouse-glow"></div>
          <div className="hero-bg-glow glow-1"></div>
          <div className="hero-bg-glow glow-2"></div>
          
          <div className="back-btn-wrapper">
            <Link to="/" className="btn-back">
              <span dir="ltr">← Back to Hub</span>
              <span className="divider">|</span>
              <span dir="rtl">العودة للرئيسية</span>
            </Link>
          </div>

          <div className="hero-content">
            <div className="tech-badge reveal-on-scroll">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               Modern JavaScript Pro
            </div>

            <h1 className="hero-title reveal-on-scroll" style={{animationDelay: '0.1s'}} dir="ltr">
              Master <span className="text-gradient">JavaScript</span><br/>From Zero to Hero
            </h1>
            
            <p className="hero-subtitle reveal-on-scroll" style={{animationDelay: '0.2s', display: 'block'}} dir="ltr">
              The ultimate JavaScript course for Dart & Flutter developers. Master modern ES6+, Async programming, and DOM manipulation.
              <span style={{display: 'block', marginTop: '16px', color: '#a1a1aa', fontSize: '1.2rem'}} dir="rtl">الكورس الشامل لاحتراف الجافاسكريبت الحديثة لمطوري فلاتر.</span>
            </p>

            <div className="reveal-on-scroll" style={{animationDelay: '0.3s', marginTop: '2.5rem'}}>
              <Link to='/docs-js/part1-fundamentals/variables' className="btn btn-primary" dir="ltr">
                <span style={{marginRight: '12px'}}>⚡ Start Learning</span>
                <span style={{opacity:0.3, margin:'0 12px'}}>|</span> 
                <span dir="rtl" style={{marginLeft: '12px'}}>ابدأ التعلم الآن</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ STATS BAR ═══════════════ */}
        <section className="stats-section">
          <div className="stats-grid">
            {[
              {n:23, labelEn:'Total Lessons', labelAr:'درسًا شاملاً'},
              {n:7,  labelEn:'Main Parts', labelAr:'أجزاء رئيسية'},
              {n:100,labelEn:'Practical Code', labelAr:'تطبيق عملي'},
              {n:1,  labelEn:'Mini Project', labelAr:'مشروع تطبيقي'},
            ].map((s,i) => (
              <div key={i} className="stat-card reveal-on-scroll" style={{transitionDelay: `${i*0.1}s`}}>
                <div className="stat-number"><Counter to={s.n}/>{i===2 ? '%': ''}+</div>
                <div className="stat-label-en">{s.labelEn}</div>
                <div className="stat-label-ar">{s.labelAr}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ CURRICULUM ═══════════════ */}
        <section className="curriculum-section">
          <div className="section-header reveal-on-scroll">
            <div className="section-badge">Roadmap</div>
            <h2 className="section-title">Course Curriculum</h2>
            <span className="section-subtitle">منهج دراسي متكامل من الأساسيات إلى المشاريع العملية</span>
          </div>

          <div className="parts-grid">
            {parts.map((p, i) => {
              const rgb = '250, 204, 21';
              return (
                <div key={p.n} className="part-card reveal-on-scroll pop-in" style={{
                  '--part-color': p.color,
                  '--part-rgb': rgb,
                  transitionDelay: `${(i % 3)*0.1}s`
                } as React.CSSProperties}>
                  <div className="part-card-border"></div>

                  <div className="part-header">
                    <div className="part-icon-wrapper">
                      <div className="part-number">{p.n}</div>
                      <span className="part-icon">{p.icon}</span>
                    </div>
                    <span className="part-lessons-badge" dir="ltr">
                      {p.lessons} lessons
                    </span>
                  </div>

                  <h3 className="part-title-en" dir="ltr">{p.en}</h3>
                  <h4 className="part-title-ar">{p.ar}</h4>
                  <p className="part-subtitle" dir="ltr">Part {p.n}</p>

                  <div className="part-chips">
                    {p.chips.map(c => <TechChip key={c} label={c} color={p.color}/>)}
                  </div>

                  <div style={{marginTop: 'auto'}}>
                    <Link to={p.link} className="part-link" dir="ltr">
                      Start Part {p.n} <span style={{opacity:0.5, margin:'0 6px'}}>·</span> <span dir="rtl">ادخل الجزء ←</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <style>{`
        :root {
          --color-bg: #050505;
          --js-color: #ffd000;
          --color-surface: rgba(255, 255, 255, 0.03);
          --color-surface-hover: rgba(255, 255, 255, 0.05);
          --color-border: rgba(255, 255, 255, 0.08);
        }

        .js-page {
          background-color: var(--color-bg);
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8rem 2rem 4rem;
        }

        .back-btn-wrapper {
          position: absolute; top: 30px; left: 30px; z-index: 50;
        }
        .btn-back {
          display: inline-flex; align-items: center; padding: 0.8rem 1.5rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: #a1a1aa; font-weight: 600; font-size: 0.95rem;
          text-decoration: none !important; backdrop-filter: blur(10px); transition: all 0.3s;
        }
        .btn-back:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateX(-5px); }
        .divider { opacity: 0.3; margin: 0 12px; }

        .mouse-glow {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 40%);
          pointer-events: none; z-index: 1;
        }

        .hero-bg-glow {
          position: absolute; border-radius: 50%; filter: blur(120px); z-index: 0;
          animation: pulseGlow 15s ease-in-out infinite alternate;
        }
        .glow-1 { top: -10%; right: -10%; width: 50vw; height: 50vw; background: rgba(255, 208, 0, 0.08); }
        .glow-2 { bottom: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(255, 208, 0, 0.04); animation-delay: -5s; }

        @keyframes pulseGlow { 0% { opacity: 0.5; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); } }

        .hero-content {
          position: relative; z-index: 2; text-align: center; max-width: 900px;
        }

        .tech-badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 24px;
          background: rgba(255, 208, 0, 0.05); border: 1px solid rgba(255, 208, 0, 0.2);
          border-radius: 30px; color: var(--js-color); font-weight: 600; margin-bottom: 2rem;
          box-shadow: 0 0 20px rgba(255, 208, 0, 0.1);
        }

        .hero-title {
          font-size: clamp(3.5rem, 7vw, 6rem); font-weight: 900; line-height: 1.3; margin-bottom: 2rem; letter-spacing: 0;
        }
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.3rem); color: #a1a1aa; max-width: 700px; margin: 0 auto 1.5rem; line-height: 1.8;
        }

        .btn-primary {
          display: inline-flex; align-items: center; padding: 1.2rem 2.5rem;
          background: rgba(255, 208, 0, 0.1); color: var(--js-color); font-size: 1.2rem; font-weight: 800;
          border-radius: 16px; border: 1px solid rgba(255, 208, 0, 0.3); text-decoration: none !important; transition: all 0.3s;
        }
        .btn-primary:hover {
          transform: translateY(-5px); box-shadow: 0 10px 30px rgba(255, 208, 0, 0.2);
          background: var(--js-color); color: #000;
        }

        /* Stats Section */
        .stats-section {
          padding: 2rem 2rem 6rem; position: relative; z-index: 2; margin-top: -50px;
        }
        .stats-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto;
        }
        .stat-card {
          background: rgba(20,20,20,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05);
          padding: 2.5rem 2rem; border-radius: 24px; text-align: center; transition: transform 0.3s;
        }
        .stat-card:hover { transform: translateY(-10px); border-color: rgba(255, 208, 0, 0.2); }
        .stat-number { font-size: 3.5rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; line-height: 1; }
        .stat-label-en { font-size: 1rem; color: #a1a1aa; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .stat-label-ar { display: block; font-size: 1rem; color: #71717a; margin-top: 5px; }

        /* Curriculum Section */
        .curriculum-section {
          padding: 6rem 2rem 8rem; max-width: 1300px; margin: 0 auto; position: relative; z-index: 2;
        }
        .section-header { text-align: center; margin-bottom: 5rem; }
        .section-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; background: rgba(255, 208, 0, 0.1); color: var(--js-color); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-size: 3.5rem; font-weight: 900; color: #fff; margin-bottom: 1rem; line-height: 1.3; letter-spacing: 0; }
        .section-subtitle { display: block; font-size: 1.2rem; color: #a1a1aa; font-weight: 500; line-height: 1.6; margin-top: 10px; }

        .parts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }
        .part-card {
          background: var(--color-surface);
          border-radius: 24px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          border: 1px solid var(--color-border);
        }
        
        .part-card-border {
          position: absolute; inset: 0; border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, rgba(var(--part-rgb),0.5), transparent, rgba(var(--part-rgb),0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .part-card:hover .part-card-border { opacity: 1; }

        .part-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(var(--part-rgb), 0.15);
          background: rgba(255,255,255,0.05);
        }
        
        .part-header {
          display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;
        }
        .part-icon-wrapper {
          display: flex; align-items: center; gap: 1rem;
        }
        .part-number {
          width: 50px; height: 50px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(var(--part-rgb),0.9), var(--part-color));
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 1.3rem; color: #000;
          box-shadow: 0 8px 20px rgba(var(--part-rgb), 0.4);
          transition: transform 0.3s ease;
        }
        .part-card:hover .part-number { transform: scale(1.1) rotate(-5deg); }
        .part-icon { font-size: 2rem; }
        
        .part-lessons-badge {
          font-size: 0.8rem; font-weight: 800; padding: 0.4rem 1rem; border-radius: 20px;
          background: rgba(var(--part-rgb), 0.15); color: var(--part-color); border: 1px solid rgba(var(--part-rgb), 0.3);
        }
        
        .part-title-en {
          font-size: 1.5rem; font-weight: 900; color: #fff; margin: 0 0 0.4rem; line-height: 1.3;
        }
        .part-title-ar {
          font-size: 1.15rem; font-weight: 700; color: var(--part-color); margin: 0 0 1rem; line-height: 1.3;
        }
        .part-subtitle {
          font-size: 0.9rem; font-family: 'Fira Code', monospace; color: #94a3b8; font-weight: 600; margin: 0 0 1.8rem;
        }
        .part-chips {
          flex-grow: 1; margin-bottom: 2.5rem; display: flex; flex-wrap: wrap; gap: 0.6rem;
          align-content: flex-start; align-items: flex-start;
        }
        
        .part-link {
          display: flex; align-items: center; justify-content: center;
          padding: 1.1rem; border-radius: 16px; text-decoration: none !important;
          background: rgba(var(--part-rgb), 0.1); border: 1px solid rgba(var(--part-rgb), 0.3);
          color: var(--part-color); font-weight: 800; font-size: 1.05rem;
          transition: all 0.3s ease;
        }
        .part-card:hover .part-link {
          background: var(--part-color); color: #000;
          box-shadow: 0 10px 20px rgba(var(--part-rgb), 0.3);
          transform: translateY(-3px);
        }

        /* Utilities */
        .reveal-on-scroll { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-revealed { opacity: 1; transform: translateY(0); }
        .pop-in { transform: translateY(30px) scale(0.95); transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pop-in.is-revealed { transform: translateY(0) scale(1); }

        @media (max-width: 1024px) {
          .hero-section { padding: 8rem 1.5rem 4rem; min-height: auto; }
          .hero-title { font-size: clamp(3rem, 6vw, 4.5rem); }
          .stats-grid { gap: 2rem; grid-template-columns: repeat(2, 1fr); }
          .parts-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
          .curriculum-section { padding: 4rem 1.5rem 6rem; }
        }

        @media (max-width: 768px) {
          .hero-section { padding: 6rem 1rem 3rem; }
          .hero-title { font-size: clamp(2.5rem, 8vw, 3.5rem); }
          .hero-subtitle { font-size: 1.1rem; }
          .section-title { font-size: 2rem; }
          .section-subtitle { font-size: 1.1rem; }
          
          .stats-section { padding: 2rem 1rem 4rem; }
          .stats-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .stat-card { padding: 1.5rem; }
          
          .parts-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .part-card { padding: 1.5rem; }
          .part-title-en { font-size: 1.3rem; }
          .part-title-ar { font-size: 1rem; }
          
          .btn-back { padding: 0.6rem 1rem; font-size: 0.85rem; }
          .btn-back .divider, .btn-back span:last-child { display: none; }
          
          .btn-primary { width: 100%; padding: 0.8rem; font-size: 1rem; justify-content: center; }
        }
      `}</style>
    </Layout>
  );
}
