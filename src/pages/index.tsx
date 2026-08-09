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
  {n:1, icon:'🎯', ar:'أسس لغة Dart', en:'Dart Fundamentals', color:'#0ea5e9', lessons:9,
   link:'/docs/part1-dart-fundamentals/variables-and-data-types', chips:['Variables','Null Safety','OOP','Generics','Streams']},
  {n:2, icon:'📱', ar:'أساسيات Flutter', en:'Flutter Basics', color:'#a78bfa', lessons:7,
   link:'/docs/part2-flutter-basics/setup-and-architecture', chips:['Widget Tree','Layouts','go_router','Forms','Theming']},
  {n:3, icon:'🧹', ar:'الكود النظيف', en:'Clean Code', color:'#22d3a0', lessons:4,
   link:'/docs/part3-clean-code/clean-code-naming', chips:['Naming','SOLID','Feature-First','get_it']},
  {n:4, icon:'🏗️', ar:'MVVM وإدارة الحالة', en:'MVVM Architecture', color:'#f59e0b', lessons:5,
   link:'/docs/part4-mvvm-state-management/intro-to-mvvm', chips:['MVVM','ChangeNotifier','Provider','ViewStatus']},
  {n:5, icon:'🌐', ar:'التكامل مع الـ Backend', en:'Backend Integration', color:'#fb923c', lessons:5,
   link:'/docs/part5-backend-integration/dio-and-interceptors', chips:['Dio','Repository','Failure','json_serializable']},
  {n:6, icon:'🧪', ar:'الاختبارات', en:'Testing & QA', color:'#f472b6', lessons:2,
   link:'/docs/part6-testing/unit-testing', chips:['Unit Tests','Mocking','Widget Testing']},
  {n:7, icon:'🚀', ar:'المشروع TaskFlow Pro', en:'Capstone Project', color:'#34d399', lessons:5,
   link:'/docs/part7-capstone-project/project-setup', chips:['Full App','MVVM','Tests','Production']},
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  useScrollReveal();
  const heroRef = useRef<HTMLElement>(null);
  useMouseGlow(heroRef);

  return (
    <Layout title="Home 🚀" description="Dart & Flutter Pro Course">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-section" ref={heroRef}>
        {/* Interactive Mouse Glow */}
        <div className="mouse-glow"></div>

        <div className="hero-bg-glow glow-1"></div>
        <div className="hero-bg-glow glow-2"></div>
        <div className="hero-bg-glow glow-3"></div>
        
        {/* Animated grid background */}
        <div className="hero-grid"></div>

        {/* Floating particles */}
        {Array.from({length:15}).map((_,i) => (
          <div key={i} className="particle" style={{
            width: Math.random()*8 + 2, height: Math.random()*8 + 2,
            top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
            animationDuration: `${Math.random()*6 + 6}s`,
            animationDelay: `${Math.random()*3}s`,
          }}/>
        ))}

        <div className="hero-content">
          {/* Top badge */}
          <div className="hero-badge reveal-on-scroll" style={{animationDelay: '0.1s'}}>
            <span className="badge-dot"></span>
            <span className="badge-text" dir="ltr">
              Bilingual Course <span style={{opacity: 0.5, margin: '0 8px'}}>|</span> دورة ثنائية اللغة
            </span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title reveal-on-scroll" style={{animationDelay: '0.2s'}} dir="ltr">
            Dart <span className="text-gradient">&amp;</span> Flutter
          </h1>
          <h2 className="hero-subtitle reveal-on-scroll" style={{animationDelay: '0.3s'}} dir="ltr">
            Zero to Production <span style={{opacity:0.4, margin:'0 10px'}}>|</span> <span dir="rtl" style={{display:'inline-block'}}>دورة من الصفر للاحتراف</span>
          </h2>

          {/* Description */}
          <p className="hero-description reveal-on-scroll" style={{animationDelay: '0.4s'}}>
            <span dir="ltr" style={{display:'block', marginBottom: '10px'}}>Master Flutter with full MVVM Architecture, Clean Code principles, and Real-World Backend Integration.</span>
            <span dir="rtl" style={{display:'block', color:'#94a3b8', fontSize: '0.9em'}}>تعلم Flutter باحترافية مع معمارية MVVM الصارمة ومبادئ الكود النظيف والتكامل مع الـ Backend.</span>
          </p>

          {/* Tech pills */}
          <div className="hero-tech reveal-on-scroll" style={{animationDelay: '0.5s'}}>
            {['Dart 3','Flutter','MVVM','Provider','Clean Code','go_router','Dio','SharedPrefs'].map((t, i) => (
              <div key={t} style={{animation: `float ${3 + (i%3)}s ease-in-out infinite alternate`, animationDelay: `${i*0.1}s`}}>
                <TechChip label={t} color={i%2===0 ? '#0ea5e9' : '#a78bfa'} />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta reveal-on-scroll" style={{animationDelay: '0.6s'}}>
            <Link to='/docs/part1-dart-fundamentals/variables-and-data-types' className="btn btn-primary btn-glow" dir="ltr">
              <span className="btn-icon">⚡</span> Start Learning <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">ابدأ التعلم</span>
            </Link>
            <Link to='/docs/part4-mvvm-state-management/intro-to-mvvm' className="btn btn-secondary" dir="ltr">
              <span className="btn-icon">🏗️</span> MVVM Architecture <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">المعمارية</span>
            </Link>
          </div>
        </div>

        <div className="hero-fade-bottom"></div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              {n:33, suffix:'', labelEn:'Total Lessons', labelAr:'درسًا شاملاً'},
              {n:7,  suffix:'', labelEn:'Main Parts', labelAr:'أجزاء رئيسية'},
              {n:100,suffix:'%',labelEn:'Pure English Code', labelAr:'كود إنجليزي نقي'},
              {n:0,  suffix:'', labelEn:'Logic in UI Layer', labelAr:'منطق في الـ View'},
            ].map((s,i) => (
              <div key={i} className="stat-card reveal-on-scroll scale-up" style={{transitionDelay: `${i*0.15}s`}}>
                <div className="stat-number">
                  <Counter to={s.n} suffix={s.suffix}/>
                </div>
                <div className="stat-label-en" dir="ltr">{s.labelEn}</div>
                <div className="stat-label-ar">{s.labelAr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ARCHITECTURE BANNER ═══════════════ */}
      <section className="architecture-section reveal-on-scroll fade-in">
        <div className="container">
          <p className="architecture-label" dir="ltr">
            Strict Architecture Rule <span style={{opacity:0.5, margin:'0 8px'}}>·</span> القاعدة المعمارية الصارمة
          </p>
          <div className="architecture-flow" dir="ltr">
            {['View (UI only)','→','ViewModel (State + Logic)','→','Repository (Data Access)','→','Model (DTO)'].map((t,i) => (
              <span key={i} className={`arch-step ${t==='→' ? 'arch-arrow' : `arch-box arch-box-${i}`}`}
                    style={{animationDelay: `${i*0.1}s`}}>
                {t}
              </span>
            ))}
          </div>
          <p className="architecture-desc">
            لا يوجد أي منطق تجاري داخل دالة <code dir="ltr">build()</code> إطلاقاً في أي درس من دروس هذه الدورة
          </p>
        </div>
      </section>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="container main-content">

        {/* Features */}
        <div className="section-header reveal-on-scroll">
          <span className="badge" dir="ltr">✨ Why This Course</span>
          <h2 className="section-title" dir="ltr">
            What Makes This Different
            <span className="section-subtitle" dir="rtl">ما الذي يميزها؟</span>
          </h2>
        </div>

        <div className="features-grid">
          {[
            {icon:'💻', color:'#0ea5e9', rgb:'14,165,233',
              en:'Code First Always',   ar:'الكود أولاً دائماً',
              desc:'Complete, runnable English code at the top of every lesson — then bilingual explanation below.',
              descAr:'كود إنجليزي كامل وقابل للتشغيل في أعلى كل درس، ثم شرح بالعربية والإنجليزية.'},
            {icon:'🏗️', color:'#a78bfa', rgb:'167,139,250',
              en:'Strict MVVM, Zero Exceptions', ar:'MVVM صارم بلا استثناءات',
              desc:'Every single example separates View → ViewModel → Repository → Model. No shortcuts.',
              descAr:'كل مثال يفصل الطبقات بالكامل. لا اختصارات ولا منطق في build().'},
            {icon:'🌐', color:'#22d3a0', rgb:'34,211,160',
              en:'True Bilingual (AR + EN)',  ar:'ثنائي اللغة حقيقي',
              desc:'Arabic explanations with English technical terms. Pure English code, left-aligned.',
              descAr:'شرح عربي أصيل مع المصطلحات الإنجليزية. كود إنجليزي نقي محاذى لليسار.'},
            {icon:'🧹', color:'#f59e0b', rgb:'245,158,11',
              en:'Clean Code Enforced',  ar:'الكود النظيف إلزامي',
              desc:'Meaningful naming, SRP, Feature-First folders, and get_it DI in every code example.',
              descAr:'تسمية احترافية، مسؤولية أحادية، هيكلية feature-first وحقن التبعيات في كل مثال.'},
          ].map((f,i) => (
            <div key={i} className="feature-card reveal-on-scroll slide-up" style={{
              '--feature-rgb': f.rgb,
              '--feature-color': f.color,
              transitionDelay: `${i*0.1}s`
            } as React.CSSProperties}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <div className="feature-icon">{f.icon}</div>
              </div>
              <h3 className="feature-title-en" dir="ltr">{f.en}</h3>
              <h4 className="feature-title-ar">{f.ar}</h4>
              <p className="feature-desc-en" dir="ltr">{f.desc}</p>
              <p className="feature-desc-ar">{f.descAr}</p>
            </div>
          ))}
        </div>

        {/* Course Roadmap */}
        <div className="section-header reveal-on-scroll" style={{marginTop: '6rem'}}>
          <span className="badge" dir="ltr">🗺️ Course Roadmap</span>
          <h2 className="section-title" dir="ltr">
            33 Lessons <span style={{opacity:0.3}}>·</span> 7 Parts
            <span className="section-subtitle" dir="rtl">33 درساً في 7 أجزاء</span>
          </h2>
          <p className="section-desc">
            <span dir="ltr" style={{display:'block'}}>Each part builds on the previous — from Dart basics to a full production Flutter app.</span>
            <span dir="rtl" style={{display:'block', fontSize:'0.9em', marginTop:'4px'}}>كل جزء يبني على السابق، من أسس Dart إلى تطبيق Flutter كامل للإنتاج.</span>
          </p>
        </div>

        <div className="parts-grid">
          {parts.map((p,i) => {
            const rgb = p.color==='#0ea5e9'?'14,165,233':p.color==='#a78bfa'?'167,139,250':p.color==='#22d3a0'?'34,211,160':p.color==='#f59e0b'?'245,158,11':p.color==='#fb923c'?'251,146,60':p.color==='#f472b6'?'244,114,182':'52,211,153';
            return (
              <div key={p.n} className="part-card reveal-on-scroll pop-in" style={{
                '--part-color': p.color,
                '--part-rgb': rgb,
                transitionDelay: `${(i % 3)*0.1}s`
              } as React.CSSProperties}>
                {/* Border Glow Effect */}
                <div className="part-card-border"></div>

                {/* Head */}
                <div className="part-header">
                  <div className="part-icon-wrapper">
                    <div className="part-number">{p.n}</div>
                    <span className="part-icon">{p.icon}</span>
                  </div>
                  <span className="part-lessons-badge" dir="ltr">
                    {p.lessons} lessons
                  </span>
                </div>

                {/* Titles */}
                <h3 className="part-title-en" dir="ltr">{p.en}</h3>
                <h4 className="part-title-ar">{p.ar}</h4>
                <p className="part-subtitle" dir="ltr">Part {p.n}</p>

                {/* Chips */}
                <div className="part-chips">
                  {p.chips.map(c => <TechChip key={c} label={c} color={p.color}/>)}
                </div>

                {/* Link */}
                <div style={{marginTop: 'auto'}}>
                  <Link to={p.link} className="part-link" dir="ltr">
                    Start Part {p.n} <span style={{opacity:0.5, margin:'0 6px'}}>·</span> <span dir="rtl">ادخل الجزء ←</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="final-cta reveal-on-scroll scale-up">
          <div className="cta-bg-glow"></div>
          <div className="cta-grid-bg"></div>
          
          <h2 className="cta-title" dir="ltr">
            Ready to Write Clean Flutter Code?
            <span className="cta-subtitle" dir="rtl">مستعد تكتب Flutter Code نظيف ومحترف؟</span>
          </h2>
          <p className="cta-desc">
            <span dir="ltr" style={{display:'block'}}>33 lessons · Zero to Production · MVVM + Clean Code</span>
            <span dir="rtl" style={{display:'block', marginTop:'6px'}}>33 درساً · من الصفر للاحتراف · MVVM + كود نظيف</span>
          </p>
          <Link to='/docs/part1-dart-fundamentals/variables-and-data-types' className="btn btn-primary btn-large btn-glow" dir="ltr">
            <span className="btn-icon">🚀</span> Start for Free <span style={{opacity:0.5, margin:'0 8px'}}>|</span> <span dir="rtl">ابدأ مجاناً الآن</span>
          </Link>
        </div>
      </main>

      <style>{`
        /* ═══════════════ CSS VARIABLES & GLOBAL ═══════════════ */
        :root {
          --color-bg: #04080f;
          --color-surface: rgba(255, 255, 255, 0.03);
          --color-surface-hover: rgba(255, 255, 255, 0.05);
          --color-border: rgba(255, 255, 255, 0.08);
          --color-text: #e2e8f0;
          --color-text-muted: #94a3b8;
          --color-primary: #0ea5e9;
          --color-primary-glow: rgba(14, 165, 233, 0.5);
          --color-secondary: #a78bfa;
        }

        /* ═══════════════ ANIMATIONS ═══════════════ */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* Scroll Reveal Base Classes */
        .reveal-on-scroll {
          opacity: 0;
          visibility: hidden;
        }
        .reveal-on-scroll.is-revealed {
          opacity: 1;
          visibility: visible;
        }

        /* Specific Reveal Animations */
        .reveal-on-scroll.slide-up { transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.slide-up.is-revealed { transform: translateY(0); }

        .reveal-on-scroll.scale-up { transform: scale(0.95); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.scale-up.is-revealed { transform: scale(1); }

        .reveal-on-scroll.pop-in { transform: translateY(30px) scale(0.95); transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .reveal-on-scroll.pop-in.is-revealed { transform: translateY(0) scale(1); }

        .reveal-on-scroll.fade-in { transition: opacity 1s ease; }

        /* Initial Hero Animations */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-section .reveal-on-scroll {
          animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* overridden by animation forwards */
          visibility: visible;
        }

        /* ═══════════════ HERO SECTION ═══════════════ */
        .hero-section {
          position: relative;
          overflow: hidden;
          min-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 1.5rem 6rem;
          background-color: var(--color-bg);
          perspective: 1000px; /* For 3D effects if needed */
        }

        .mouse-glow {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 50%, transparent 80%);
          z-index: 0;
          transform: perspective(500px) rotateX(20deg) scale(1.2);
          transform-origin: top center;
        }

        .hero-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          animation: pulseGlow 10s ease-in-out infinite alternate;
        }
        .glow-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(14, 165, 233, 0.18); }
        .glow-2 { bottom: -10%; right: -10%; width: 60vw; height: 60vw; background: rgba(167, 139, 250, 0.15); animation-delay: -5s; }
        .glow-3 { top: 40%; left: 50%; width: 40vw; height: 40vw; background: rgba(34, 211, 160, 0.1); transform: translate(-50%, -50%); animation-delay: -2s; }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 15px var(--color-primary-glow);
          animation: float linear infinite alternate;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(14, 165, 233, 0.1);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 30px;
          padding: 0.5rem 1.5rem;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hero-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(14, 165, 233, 0.3);
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #0ea5e9;
          box-shadow: 0 0 10px #0ea5e9;
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .badge-text {
          font-size: 0.9rem; font-weight: 700; color: #7dd3fc;
        }

        .hero-title {
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 1rem;
          color: #fff;
          text-shadow: 0 0 40px rgba(14,165,233,0.3);
          letter-spacing: -1px;
        }
        .text-gradient {
          background: linear-gradient(135deg, #38bdf8, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: clamp(1.4rem, 4vw, 2.5rem);
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 2rem;
          color: #e2e8f0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #cbd5e1;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 3.5rem;
        }

        .hero-tech {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
        }

        .hero-cta {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 180px;
          background: linear-gradient(to top, var(--color-bg), transparent);
          pointer-events: none;
          z-index: 1;
        }

        /* ═══════════════ BUTTONS ═══════════════ */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1rem;
          text-decoration: none !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .btn-icon { margin-right: 0.5rem; }
        
        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          color: #fff !important;
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(14, 165, 233, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
          background: linear-gradient(135deg, #0284c7, #1d4ed8);
        }

        .btn-glow::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(transparent, rgba(255,255,255,0.2), transparent);
          transform: rotate(45deg);
          animation: btnShine 3s infinite;
        }
        @keyframes btnShine {
          0% { transform: translateX(-100%) rotate(45deg); }
          20%, 100% { transform: translateX(100%) rotate(45deg); }
        }

        .btn-secondary {
          background: var(--color-surface);
          color: #e2e8f0 !important;
          border: 1px solid var(--color-border);
          backdrop-filter: blur(10px);
        }
        .btn-secondary:hover {
          transform: translateY(-3px) scale(1.02);
          background: var(--color-surface-hover);
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .btn-large {
          padding: 1rem 3.5rem;
          font-size: 1.15rem;
          border-radius: 16px;
        }

        /* ═══════════════ TECH CHIP ═══════════════ */
        .tech-chip {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: 10px;
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          color: var(--chip-color);
          direction: ltr;
          display: inline-flex;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(5px);
        }
        .tech-chip:hover {
          background: var(--chip-color);
          color: #000;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        /* ═══════════════ STATS SECTION ═══════════════ */
        .stats-section {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: 5rem 1rem;
          position: relative;
        }
        .stats-grid {
          display: flex;
          justify-content: center;
          gap: clamp(2rem, 8vw, 8rem);
          flex-wrap: wrap;
        }
        .stat-card {
          text-align: center;
          padding: 1rem;
        }
        .stat-number {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #fff 20%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          line-height: 1;
          filter: drop-shadow(0 4px 15px rgba(56,189,248,0.2));
        }
        .stat-label-en {
          font-size: 0.95rem; font-weight: 800; color: #38bdf8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;
        }
        .stat-label-ar {
          font-size: 0.9rem; color: #94a3b8; font-weight: 600;
        }

        /* ═══════════════ ARCHITECTURE SECTION ═══════════════ */
        .architecture-section {
          background: linear-gradient(90deg, rgba(14,165,233,0.05), rgba(167,139,250,0.05));
          border-bottom: 1px solid var(--color-border);
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .architecture-label {
          font-size: 0.85rem; font-weight: 800; color: #a78bfa; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .architecture-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-family: 'Fira Code', monospace;
          font-size: clamp(0.85rem, 2vw, 1.1rem);
          margin-bottom: 1.5rem;
        }
        .arch-box {
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-weight: 700;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: heroFadeUp 0.6s backwards;
        }
        .arch-box:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
        .arch-box-0 { color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.05); }
        .arch-box-2 { color: #a78bfa; border-color: rgba(167, 139, 250, 0.3); background: rgba(167, 139, 250, 0.05); }
        .arch-box-4 { color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.05); }
        .arch-box-6 { color: #fbbf24; border-color: rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.05); }
        .arch-arrow { color: #64748b; font-weight: 300; }
        .architecture-desc { font-size: 1rem; color: #cbd5e1; margin: 0; }
        .architecture-desc code { background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; color: #38bdf8; }

        /* ═══════════════ MAIN CONTENT SECTION ═══════════════ */
        .main-content {
          padding: 8rem 1rem;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .badge {
          display: inline-block;
          font-size: 0.85rem; font-weight: 800; color: #0ea5e9;
          background: rgba(14,165,233,0.1); border: 1px solid rgba(14,165,233,0.3);
          padding: 0.5rem 1.5rem; border-radius: 30px;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(14,165,233,0.15);
        }
        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #fff 20%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 1rem;
          line-height: 1.2;
        }
        .section-subtitle {
          display: block;
          font-size: clamp(1.3rem, 3vw, 2rem);
          color: #94a3b8;
          margin-top: 0.8rem;
          font-weight: 700;
          -webkit-text-fill-color: #94a3b8;
        }
        .section-desc {
          font-size: 1.15rem; color: #cbd5e1; max-width: 650px; margin: 0 auto; line-height: 1.7;
        }

        /* ═══════════════ FEATURE CARDS ═══════════════ */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 10rem;
        }
        .feature-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at top right, rgba(var(--feature-rgb), 0.15), transparent 70%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(var(--feature-rgb), 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(var(--feature-rgb), 0.15);
        }
        .feature-card:hover::before { opacity: 1; }
        
        .feature-icon-wrapper {
          position: relative;
          width: 70px; height: 70px;
          margin-bottom: 2rem;
        }
        .feature-icon-bg {
          position: absolute; inset: 0;
          background: rgba(var(--feature-rgb), 0.15);
          border-radius: 20px;
          transform: rotate(-10deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .feature-card:hover .feature-icon-bg {
          transform: rotate(0deg) scale(1.1);
          background: rgba(var(--feature-rgb), 0.25);
        }
        .feature-icon {
          position: absolute; inset: 0;
          border: 1px solid rgba(var(--feature-rgb), 0.3);
          border-radius: 20px;
          background: rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .feature-card:hover .feature-icon {
          transform: rotate(10deg) scale(1.1);
        }
        
        .feature-title-en {
          font-size: 1.35rem; font-weight: 900; color: #fff; margin: 0 0 0.5rem; position: relative; z-index: 1;
        }
        .feature-title-ar {
          font-size: 1.05rem; font-weight: 700; color: var(--feature-color); margin: 0 0 1.5rem; position: relative; z-index: 1;
        }
        .feature-desc-en {
          font-size: 1rem; color: #cbd5e1; line-height: 1.6; margin: 0 0 1rem; position: relative; z-index: 1;
        }
        .feature-desc-ar {
          font-size: 0.95rem; color: #94a3b8; line-height: 1.6; margin: 0; position: relative; z-index: 1;
        }

        /* ═══════════════ PART CARDS ═══════════════ */
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
        
        /* Animated border glow on hover */
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
          font-weight: 900; font-size: 1.3rem; color: #fff;
          box-shadow: 0 8px 20px rgba(var(--part-rgb), 0.4);
          transition: transform 0.3s ease;
        }
        .part-card:hover .part-number { transform: scale(1.1) rotate(-5deg); }
        .part-icon { font-size: 2rem; animation: floatIcon 6s ease-in-out infinite; }
        
        .part-lessons-badge {
          font-size: 0.8rem; font-weight: 800; padding: 0.4rem 1rem; border-radius: 20px;
          background: rgba(var(--part-rgb), 0.15); color: var(--part-color); border: 1px solid rgba(var(--part-rgb), 0.3);
        }
        
        .part-title-en {
          font-size: 1.5rem; font-weight: 900; color: #fff; margin: 0 0 0.4rem;
        }
        .part-title-ar {
          font-size: 1.15rem; font-weight: 700; color: var(--part-color); margin: 0 0 1rem;
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

        /* ═══════════════ FINAL CTA ═══════════════ */
        .final-cta {
          margin-top: 10rem; text-align: center; padding: 7rem 2rem;
          border-radius: 40px; position: relative; overflow: hidden;
          background: var(--color-surface);
          border: 1px solid rgba(14,165,233,0.3);
          box-shadow: 0 0 50px rgba(14,165,233,0.1);
        }
        .cta-bg-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(14,165,233,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-grid-bg {
          position: absolute; inset: 0;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
          z-index: 0; opacity: 0.5;
        }
        .cta-title {
          font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900;
          background: linear-gradient(135deg, #fff, #38bdf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem; line-height: 1.2; position: relative; z-index: 1;
        }
        .cta-subtitle {
          display: block; font-size: clamp(1.4rem, 3vw, 2.2rem); color: #94a3b8; margin-top: 0.8rem; font-weight: 700;
          -webkit-text-fill-color: #94a3b8;
        }
        .cta-desc {
          font-size: 1.25rem; color: #cbd5e1; margin-bottom: 3.5rem; line-height: 1.7; position: relative; z-index: 1;
        }
      `}</style>
    </Layout>
  );
}
