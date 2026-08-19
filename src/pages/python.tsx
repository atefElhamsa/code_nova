import React, {useEffect, useRef, useState, JSX} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

/* ── Scroll Reveal Hook ──────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-revealed'); }); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

/* ── Mouse Track Glow Hook ───────────────────────────────── */
function useMouseGlow(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      ref.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    };
    const el = ref.current;
    if (el) el.addEventListener('mousemove', fn);
    return () => { if (el) el.removeEventListener('mousemove', fn); };
  }, [ref]);
}

/* ── Animated Counter ────────────────────────────────────── */
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

/* ── Tech Chip ───────────────────────────────────────────── */
function TechChip({label, color}: {label: string; color: string}) {
  return (
    <span className="tech-chip" style={{'--chip-color': color, '--chip-bg': `${color}18`, '--chip-border': `${color}45`} as React.CSSProperties}>
      {label}
    </span>
  );
}

/* ── Modules Data ────────────────────────────────────────── */
const modules = [
  {n:1,  ar:'مقدمة وإعداد بيئة العمل',  en:'Intro & Setup',           color:'#3776ab', lessons:2, link:'/docs-python/module1-basics/intro-and-setup',                    chips:['Install','print()','input()']},
  {n:2,  ar:'التحكم في مسار البرنامج',   en:'Control Flow',            color:'#4da8da', lessons:2, link:'/docs-python/module2-control-flow/conditions',                  chips:['if/elif','for','while','break']},
  {n:3,  ar:'هياكل البيانات',            en:'Data Structures',         color:'#ffd43b', lessons:2, link:'/docs-python/module3-data-structures/lists-and-tuples',          chips:['Lists','Tuples','Dict','Sets']},
  {n:4,  ar:'الدوال',                    en:'Functions',               color:'#a8d8ea', lessons:2, link:'/docs-python/module4-functions/functions-basics',                chips:['def','*args','**kwargs','Lambda']},
  {n:5,  ar:'البرمجة الكائنية',          en:'OOP in Python',           color:'#5c7cfa', lessons:2, link:'/docs-python/module5-oop/classes-and-objects',                  chips:['Classes','Inheritance','@property']},
  {n:6,  ar:'الأخطاء والملفات',          en:'Errors & Files',          color:'#748ffc', lessons:2, link:'/docs-python/module6-errors-files/exceptions',                  chips:['try/except','JSON','with open']},
  {n:7,  ar:'الوحدات وبيئات العمل',      en:'Modules & Packages',      color:'#74c0fc', lessons:2, link:'/docs-python/module7-modules-packages/imports-and-pip',         chips:['import','pip','venv']},
  {n:8,  ar:'مفاهيم متقدمة',             en:'Intermediate Python',     color:'#66d9e8', lessons:2, link:'/docs-python/module8-intermediate/decorators-generators',       chips:['Decorators','Generators','Context Mgr']},
  {n:9,  ar:'المكتبات والـ APIs',        en:'Libraries & APIs',        color:'#63e6be', lessons:1, link:'/docs-python/module9-libraries/working-with-apis',              chips:['requests','GET','POST','JSON']},
  {n:10, ar:'المشروع النهائي',           en:'Capstone Project',        color:'#34d399', lessons:1, link:'/docs-python/module10-capstone/weather-app-project',            chips:['Weather App','OOP','API','Exception']},
];

/* ── Page ────────────────────────────────────────────────── */
export default function PythonCourse(): JSX.Element {
  useScrollReveal();
  const heroRef = useRef<HTMLElement>(null);
  useMouseGlow(heroRef);

  return (
    <Layout title="Python Course — CodeNova" description="Master Python from basics to OOP, APIs, and Decorators">
      <div className="python-page">

        {/* ═══ HERO ═══ */}
        <section className="hero-section" ref={heroRef}>
          <div className="mouse-glow"></div>
          <div className="hero-bg-glow glow-1"></div>
          <div className="hero-bg-glow glow-2"></div>
          <div className="hero-bg-glow glow-3"></div>
          <div className="hero-grid"></div>

          {/* Particles */}
          {Array.from({length:12}).map((_,i) => (
            <div key={i} className="particle" style={{
              width: Math.random()*6+2, height: Math.random()*6+2,
              top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
              animationDuration: `${Math.random()*6+6}s`,
              animationDelay: `${Math.random()*3}s`,
            }}/>
          ))}

          {/* Back to Hub */}
          <div className="back-btn-wrapper">
            <Link to="/" className="btn-back">
              <span dir="ltr">← Back to Hub</span>
              <span className="divider">|</span>
              <span dir="rtl">العودة للرئيسية</span>
            </Link>
          </div>

          <div className="hero-content">
            <div className="hero-badge reveal-on-scroll">
              <span className="badge-dot"></span>
              <span className="badge-text" dir="ltr">AI · Data Science · Web Dev</span>
            </div>

            <h1 className="hero-title reveal-on-scroll" style={{animationDelay:'0.15s'}} dir="ltr">
              Master <span className="text-gradient">Python</span>
            </h1>
            <h2 className="hero-subtitle reveal-on-scroll" style={{animationDelay:'0.25s'}}>
              <span dir="ltr">From Zero to APIs, OOP & Generators</span>
              <span dir="rtl" style={{display:'block', marginTop:'8px', fontSize:'0.7em', opacity:0.7}}>من الصفر حتى البرمجة الكائنية والـ APIs والمفاهيم المتقدمة</span>
            </h2>

            <p className="hero-description reveal-on-scroll" style={{animationDelay:'0.35s'}}>
              <span dir="ltr" style={{display:'block', marginBottom:'10px'}}>The most sought-after programming language. Master it once, and you open the doors to AI, Data Science, Web Development, and Automation.</span>
              <span dir="rtl" style={{display:'block', color:'#94a3b8', fontSize:'0.9em'}}>اللغة الأكثر طلباً في سوق العمل. احترفها وافتح أبواب الذكاء الاصطناعي، تحليل البيانات، وتطوير الويب.</span>
            </p>

            <div className="hero-tech reveal-on-scroll" style={{animationDelay:'0.45s'}}>
              {['Python 3','OOP','APIs','Decorators','Generators','venv','JSON','requests'].map((t,i) => (
                <div key={t} style={{animation:`float ${3+(i%3)}s ease-in-out infinite alternate`, animationDelay:`${i*0.1}s`}}>
                  <TechChip label={t} color={i%2===0 ? '#3776ab' : '#ffd43b'} />
                </div>
              ))}
            </div>

            <div className="hero-cta reveal-on-scroll" style={{animationDelay:'0.55s'}}>
              <Link to="/docs-python/module1-basics/intro-and-setup" className="btn btn-primary btn-glow" dir="ltr">
                <span className="btn-icon">🐍</span> Start Learning <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">ابدأ التعلم</span>
              </Link>
              <Link to="/docs-python/module5-oop/classes-and-objects" className="btn btn-secondary" dir="ltr">
                <span className="btn-icon">🏗️</span> OOP Module <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">وحدة OOP</span>
              </Link>
            </div>
          </div>

          <div className="hero-fade-bottom"></div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="stats-section">
          <div className="stats-grid">
            {[
              {n:20, suffix:'', labelEn:'Total Lessons',    labelAr:'درسًا شاملاً'},
              {n:10, suffix:'', labelEn:'Course Modules',   labelAr:'وحدة تعليمية'},
              {n:1,  suffix:'', labelEn:'Capstone Project', labelAr:'مشروع تطبيقي'},
              {n:100,suffix:'%',labelEn:'Arabic + English', labelAr:'عربي وإنجليزي'},
            ].map((s,i) => (
              <div key={i} className="stat-card reveal-on-scroll" style={{transitionDelay:`${i*0.1}s`}}>
                <div className="stat-number"><Counter to={s.n} suffix={s.suffix}/></div>
                <div className="stat-label-en" dir="ltr">{s.labelEn}</div>
                <div className="stat-label-ar">{s.labelAr}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ WHY PYTHON BANNER ═══ */}
        <section className="banner-section reveal-on-scroll">
          <div className="banner-inner">
            <p className="banner-label" dir="ltr">Why Python in 2025?  ·  ليه بايثون؟</p>
            <div className="banner-flow" dir="ltr">
              {['#1 Most Popular','→','AI & Machine Learning','→','Data Science','→','Web APIs','→','Automation'].map((t,i) => (
                <span key={i} className={`arch-step ${t==='→' ? 'arch-arrow' : `arch-box arch-box-${i}`}`}>{t}</span>
              ))}
            </div>
            <p className="banner-desc">بايثون هي اللغة الأكثر شيوعاً عالمياً وهي البوابة الرئيسية لمجالات الذكاء الاصطناعي وتحليل البيانات.</p>
          </div>
        </section>

        {/* ═══ MODULES GRID ═══ */}
        <section className="curriculum-section">
          <div className="section-header reveal-on-scroll">
            <div className="section-badge">Roadmap</div>
            <h2 className="section-title">Course Modules</h2>
            <span className="section-subtitle">20 درساً في 10 وحدات — من الأساسيات لتطبيق الطقس الكامل</span>
          </div>

          <div className="parts-grid">
            {modules.map((m,i) => {
              const rgbMap: Record<string,string> = {
                '#3776ab':'55,118,171','#4da8da':'77,168,218','#ffd43b':'255,212,59',
                '#a8d8ea':'168,216,234','#5c7cfa':'92,124,250','#748ffc':'116,143,252',
                '#74c0fc':'116,192,252','#66d9e8':'102,217,232','#63e6be':'99,230,190','#34d399':'52,211,153'
              };
              const rgb = rgbMap[m.color] ?? '55,118,171';
              return (
                <div key={m.n} className="part-card reveal-on-scroll pop-in" style={{'--part-color':m.color,'--part-rgb':rgb,transitionDelay:`${(i%3)*0.1}s`} as React.CSSProperties}>
                  <div className="part-card-border"></div>
                  <div className="part-header">
                    <div className="part-icon-wrapper">
                      <div className="part-number">{m.n}</div>
                    </div>
                    <span className="part-lessons-badge" dir="ltr">{m.lessons} lessons</span>
                  </div>
                  <h3 className="part-title-en" dir="ltr">{m.en}</h3>
                  <h4 className="part-title-ar">{m.ar}</h4>
                  <p className="part-subtitle" dir="ltr">Module {m.n}</p>
                  <div className="part-chips">
                    {m.chips.map(c => <TechChip key={c} label={c} color={m.color}/>)}
                  </div>
                  <div style={{marginTop:'auto'}}>
                    <Link to={m.link} className="part-link" dir="ltr">
                      Start Module {m.n} <span style={{opacity:0.5, margin:'0 6px'}}>·</span> <span dir="rtl">ادخل الوحدة ←</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <div className="final-cta reveal-on-scroll">
          <div className="cta-bg-glow"></div>
          <h2 className="cta-title" dir="ltr">
            Ready to Learn the Language of AI?
            <span className="cta-subtitle" dir="rtl">مستعد تتعلم لغة المستقبل والذكاء الاصطناعي؟</span>
          </h2>
          <p className="cta-desc">
            <span dir="ltr" style={{display:'block'}}>20 lessons · OOP + APIs + Decorators · Weather App Project</span>
            <span dir="rtl" style={{display:'block', marginTop:'6px'}}>20 درساً · OOP + APIs + Decorators · مشروع تطبيق الطقس</span>
          </p>
          <Link to="/docs-python/module1-basics/intro-and-setup" className="btn btn-primary btn-large btn-glow" dir="ltr">
            <span className="btn-icon">🐍</span> Start for Free <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">ابدأ مجاناً الآن</span>
          </Link>
        </div>

      </div>

      <style>{`
        :root {
          --color-bg: #04080f;
          --color-surface: rgba(255,255,255,0.03);
          --color-surface-hover: rgba(255,255,255,0.05);
          --color-border: rgba(255,255,255,0.08);
          --py-color: #3776ab;
          --py-glow: rgba(55,118,171,0.4);
          --py-yellow: #ffd43b;
        }

        .python-page { background-color: var(--color-bg); color: #fff; font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulseGlow { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes btnShine { 0% { transform:translateX(-100%) rotate(45deg); } 20%,100% { transform:translateX(100%) rotate(45deg); } }

        .reveal-on-scroll { opacity:0; visibility:hidden; transition:all 0.8s cubic-bezier(0.16,1,0.3,1); transform:translateY(30px); }
        .reveal-on-scroll.is-revealed { opacity:1; visibility:visible; transform:translateY(0); }
        .pop-in { transform:translateY(30px) scale(0.95); transition:all 0.7s cubic-bezier(0.34,1.56,0.64,1); }
        .pop-in.is-revealed { transform:translateY(0) scale(1); }

        /* Hero */
        .hero-section { position:relative; overflow:hidden; min-height:95vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:8rem 1.5rem 6rem; background-color:var(--color-bg); }
        .hero-section .reveal-on-scroll { animation:heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; visibility:visible; }

        .mouse-glow { position:absolute; inset:0; background:radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(55,118,171,0.07) 0%,transparent 45%); pointer-events:none; z-index:1; }
        .hero-grid { position:absolute; inset:0; background-size:60px 60px; background-image:linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px); mask-image:radial-gradient(ellipse at center,black 50%,transparent 80%); z-index:0; transform:perspective(500px) rotateX(20deg) scale(1.2); transform-origin:top center; }
        .hero-bg-glow { position:absolute; border-radius:50%; filter:blur(100px); z-index:0; animation:pulseGlow 10s ease-in-out infinite alternate; }
        .glow-1 { top:-10%; left:-10%; width:55vw; height:55vw; background:rgba(55,118,171,0.18); }
        .glow-2 { bottom:-10%; right:-10%; width:50vw; height:50vw; background:rgba(255,212,59,0.08); animation-delay:-5s; }
        .glow-3 { top:40%; left:50%; width:40vw; height:40vw; background:rgba(55,118,171,0.08); transform:translate(-50%,-50%); animation-delay:-2s; }
        .particle { position:absolute; border-radius:50%; background:var(--py-color); box-shadow:0 0 12px var(--py-glow); animation:float linear infinite alternate; z-index:1; }
        .hero-fade-bottom { position:absolute; bottom:0; left:0; right:0; height:180px; background:linear-gradient(to top,var(--color-bg),transparent); pointer-events:none; z-index:1; }

        .back-btn-wrapper { position:absolute; top:30px; left:30px; z-index:50; }
        .btn-back { display:inline-flex; align-items:center; gap:8px; padding:0.7rem 1.4rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#a1a1aa; font-weight:600; font-size:0.9rem; text-decoration:none !important; backdrop-filter:blur(10px); transition:all 0.3s; }
        .btn-back:hover { background:rgba(255,255,255,0.1); color:#fff; transform:translateX(-4px); }
        .divider { opacity:0.3; margin:0 8px; }

        .hero-content { position:relative; z-index:2; max-width:950px; margin:0 auto; display:flex; flex-direction:column; align-items:center; }

        .hero-badge { display:inline-flex; align-items:center; gap:0.75rem; background:rgba(55,118,171,0.1); border:1px solid rgba(55,118,171,0.3); border-radius:30px; padding:0.5rem 1.5rem; margin-bottom:2.5rem; }
        .badge-dot { width:8px; height:8px; border-radius:50%; background:var(--py-color); box-shadow:0 0 10px var(--py-color); animation:pulseGlow 2s ease-in-out infinite; }
        .badge-text { font-size:0.9rem; font-weight:700; color:#74c0fc; }

        .hero-title { font-size:clamp(3.5rem,8vw,6.5rem); font-weight:900; margin:0 0 1rem; color:#fff; letter-spacing:-1px; }
        .text-gradient { background:linear-gradient(135deg,#3776ab,#4da8da,#ffd43b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .hero-subtitle { font-size:clamp(1.3rem,3vw,2rem); font-weight:800; margin:0 0 2rem; color:#e2e8f0; }
        .hero-description { font-size:clamp(1rem,2vw,1.2rem); color:#cbd5e1; line-height:1.8; max-width:700px; margin:0 auto 3.5rem; }
        .hero-tech { display:flex; flex-wrap:wrap; justify-content:center; gap:0.75rem; margin-bottom:3.5rem; }
        .hero-cta { display:flex; gap:1.25rem; justify-content:center; flex-wrap:wrap; }

        .tech-chip { font-family:'Fira Code',monospace; font-size:0.8rem; font-weight:600; padding:0.4rem 1rem; border-radius:10px; background:var(--chip-bg); border:1px solid var(--chip-border); color:var(--chip-color); direction:ltr; display:inline-flex; transition:all 0.3s; }
        .tech-chip:hover { background:var(--chip-color); color:#000; transform:translateY(-3px) scale(1.05); }

        /* Buttons */
        .btn { display:inline-flex; align-items:center; justify-content:center; padding:0.85rem 2rem; border-radius:14px; font-weight:800; font-size:1rem; text-decoration:none !important; transition:all 0.3s cubic-bezier(0.16,1,0.3,1); position:relative; overflow:hidden; }
        .btn-icon { margin-right:0.5rem; }
        .btn-primary { background:linear-gradient(135deg,#3776ab,#2563eb); color:#fff !important; box-shadow:0 10px 25px rgba(55,118,171,0.4); border:1px solid rgba(255,255,255,0.1); }
        .btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 15px 35px rgba(55,118,171,0.6); }
        .btn-glow::after { content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:linear-gradient(transparent,rgba(255,255,255,0.2),transparent); transform:rotate(45deg); animation:btnShine 3s infinite; }
        .btn-secondary { background:var(--color-surface); color:#e2e8f0 !important; border:1px solid var(--color-border); backdrop-filter:blur(10px); }
        .btn-secondary:hover { transform:translateY(-3px) scale(1.02); border-color:rgba(55,118,171,0.5); box-shadow:0 10px 25px rgba(0,0,0,0.3); }
        .btn-large { padding:1rem 3.5rem; font-size:1.15rem; border-radius:16px; }

        /* Stats */
        .stats-section { background:rgba(255,255,255,0.02); border-top:1px solid var(--color-border); border-bottom:1px solid var(--color-border); padding:5rem 1rem; }
        .stats-grid { display:flex; justify-content:center; gap:clamp(2rem,8vw,8rem); flex-wrap:wrap; }
        .stat-card { text-align:center; padding:1rem; }
        .stat-number { font-size:clamp(3rem,6vw,4.5rem); font-weight:900; background:linear-gradient(135deg,#fff 20%,#3776ab 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:0.5rem; line-height:1; }
        .stat-label-en { font-size:0.9rem; font-weight:800; color:#4da8da; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px; }
        .stat-label-ar { font-size:0.9rem; color:#94a3b8; font-weight:600; }

        /* Why Python Banner */
        .banner-section { background:linear-gradient(90deg,rgba(55,118,171,0.05),rgba(255,212,59,0.05)); border-bottom:1px solid var(--color-border); padding:3rem 1.5rem; text-align:center; }
        .banner-inner { max-width:1100px; margin:0 auto; }
        .banner-label { font-size:0.85rem; font-weight:800; color:#4da8da; letter-spacing:2px; text-transform:uppercase; margin-bottom:1.5rem; }
        .banner-flow { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0.75rem; font-family:'Fira Code',monospace; font-size:clamp(0.8rem,2vw,1rem); margin-bottom:1.5rem; }
        .arch-box { padding:0.5rem 1rem; border-radius:10px; font-weight:700; background:rgba(55,118,171,0.08); border:1px solid rgba(55,118,171,0.25); color:#74c0fc; transition:transform 0.2s; }
        .arch-box:hover { transform:translateY(-3px) scale(1.05); }
        .arch-box-2 { background:rgba(255,212,59,0.05); border-color:rgba(255,212,59,0.25); color:#ffd43b; }
        .arch-box-4 { background:rgba(99,230,190,0.05); border-color:rgba(99,230,190,0.25); color:#63e6be; }
        .arch-box-6 { background:rgba(116,192,252,0.05); border-color:rgba(116,192,252,0.25); color:#74c0fc; }
        .arch-box-8 { background:rgba(77,168,218,0.05); border-color:rgba(77,168,218,0.25); color:#4da8da; }
        .arch-arrow { color:#64748b; font-weight:300; }
        .banner-desc { font-size:1rem; color:#cbd5e1; margin:0; }

        /* Curriculum */
        .curriculum-section { padding:8rem 2rem; max-width:1300px; margin:0 auto; }
        .section-header { text-align:center; margin-bottom:5rem; }
        .section-badge { display:inline-block; padding:6px 16px; border-radius:20px; background:rgba(55,118,171,0.1); color:#4da8da; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:1rem; }
        .section-title { font-size:clamp(2.2rem,5vw,3.5rem); font-weight:900; color:#fff; margin:0 0 1rem; line-height:1.2; }
        .section-subtitle { display:block; font-size:1.1rem; color:#94a3b8; font-weight:600; margin-top:8px; }

        .parts-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:2rem; }
        .part-card { background:var(--color-surface); border-radius:24px; padding:2.5rem; display:flex; flex-direction:column; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); position:relative; border:1px solid var(--color-border); }
        .part-card-border { position:absolute; inset:0; border-radius:24px; padding:1px; background:linear-gradient(135deg,rgba(var(--part-rgb),0.5),transparent,rgba(var(--part-rgb),0.3)); -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity 0.4s; }
        .part-card:hover .part-card-border { opacity:1; }
        .part-card:hover { transform:translateY(-12px); box-shadow:0 25px 50px rgba(0,0,0,0.5),0 0 40px rgba(var(--part-rgb),0.15); background:rgba(255,255,255,0.05); }
        .part-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2rem; }
        .part-icon-wrapper { display:flex; align-items:center; gap:1rem; }
        .part-number { width:50px; height:50px; border-radius:14px; background:linear-gradient(135deg,rgba(var(--part-rgb),0.9),var(--part-color)); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1.3rem; color:#000; box-shadow:0 8px 20px rgba(var(--part-rgb),0.4); transition:transform 0.3s; }
        .part-card:hover .part-number { transform:scale(1.1) rotate(-5deg); }
        .part-lessons-badge { font-size:0.8rem; font-weight:800; padding:0.4rem 1rem; border-radius:20px; background:rgba(var(--part-rgb),0.15); color:var(--part-color); border:1px solid rgba(var(--part-rgb),0.3); }
        .part-title-en { font-size:1.5rem; font-weight:900; color:#fff; margin:0 0 0.4rem; }
        .part-title-ar { font-size:1.1rem; font-weight:700; color:var(--part-color); margin:0 0 1rem; }
        .part-subtitle { font-size:0.9rem; font-family:'Fira Code',monospace; color:#94a3b8; font-weight:600; margin:0 0 1.8rem; }
        .part-chips { flex-grow:1; margin-bottom:2.5rem; display:flex; flex-wrap:wrap; gap:0.6rem; align-content:flex-start; }
        .part-link { display:flex; align-items:center; justify-content:center; padding:1.1rem; border-radius:16px; text-decoration:none !important; background:rgba(var(--part-rgb),0.1); border:1px solid rgba(var(--part-rgb),0.3); color:var(--part-color); font-weight:800; font-size:1rem; transition:all 0.3s; }
        .part-card:hover .part-link { background:var(--part-color); color:#000; box-shadow:0 10px 20px rgba(var(--part-rgb),0.3); transform:translateY(-3px); }

        /* Final CTA */
        .final-cta { position:relative; text-align:center; padding:8rem 2rem; background:linear-gradient(180deg,transparent,rgba(55,118,171,0.06),transparent); border-top:1px solid rgba(55,118,171,0.15); border-bottom:1px solid rgba(55,118,171,0.15); overflow:hidden; }
        .cta-bg-glow { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:300px; background:radial-gradient(ellipse,rgba(55,118,171,0.2),transparent 70%); pointer-events:none; }
        .cta-title { font-size:clamp(2rem,4vw,3.5rem); font-weight:900; color:#fff; margin:0 0 1.5rem; display:flex; flex-direction:column; align-items:center; gap:0.8rem; position:relative; }
        .cta-subtitle { font-size:clamp(1.2rem,2.5vw,1.8rem); color:#94a3b8; font-weight:700; }
        .cta-desc { font-size:1.1rem; color:#64748b; margin:0 auto 3rem; max-width:600px; line-height:1.8; position:relative; }

        @media (max-width:768px) {
          .hero-section { padding:6rem 1rem 3rem; }
          .hero-title { font-size:clamp(2.5rem,8vw,3.5rem); }
          .parts-grid { grid-template-columns:1fr; }
          .stats-grid { gap:2rem; }
          .back-btn-wrapper { top:16px; left:16px; }
          .btn-back span:last-child { display:none; }
          .hero-cta { flex-direction:column; width:100%; }
          .btn { width:100%; }
          .banner-flow { font-size:0.8rem; }
        }
      `}</style>
    </Layout>
  );
}
