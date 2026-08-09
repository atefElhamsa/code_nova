import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

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
  return <strong ref={ref}>{val}{suffix}</strong>;
}

/* ── Technology chip ─────────────────────────────────────── */
function TechChip({label, color}: {label: string; color: string}) {
  return (
    <span style={{
      fontFamily: "'Fira Code', monospace",
      fontSize: '0.78rem', fontWeight: 600,
      padding: '0.25rem 0.7rem',
      borderRadius: '6px',
      background: `${color}18`,
      border: `1px solid ${color}45`,
      color,
      margin: '0.2rem',
      display: 'inline-block',
      direction: 'ltr',
    }}>
      {label}
    </span>
  );
}

/* ── Part card ───────────────────────────────────────────── */
const parts = [
  {n:1, icon:'🎯', ar:'أسس لغة Dart', en:'Dart Fundamentals', color:'#0ea5e9', lessons:9,
   link:'/docs/part1-dart-fundamentals/variables-and-data-types',
   chips:['Variables','Null Safety','OOP','Generics','Streams']},
  {n:2, icon:'📱', ar:'أساسيات Flutter', en:'Flutter Basics', color:'#a78bfa', lessons:7,
   link:'/docs/part2-flutter-basics/setup-and-architecture',
   chips:['Widget Tree','Layouts','go_router','Forms','Theming']},
  {n:3, icon:'🧹', ar:'الكود النظيف', en:'Clean Code', color:'#22d3a0', lessons:4,
   link:'/docs/part3-clean-code/clean-code-naming',
   chips:['Naming','SOLID','Feature-First','get_it']},
  {n:4, icon:'🏗️', ar:'MVVM وإدارة الحالة', en:'MVVM Architecture', color:'#f59e0b', lessons:5,
   link:'/docs/part4-mvvm-state-management/intro-to-mvvm',
   chips:['MVVM','ChangeNotifier','Provider','ViewStatus']},
  {n:5, icon:'🌐', ar:'التكامل مع الـ Backend', en:'Backend Integration', color:'#fb923c', lessons:5,
   link:'/docs/part5-backend-integration/dio-and-interceptors',
   chips:['Dio','Repository','Failure','json_serializable']},
  {n:6, icon:'🧪', ar:'الاختبارات', en:'Testing & QA', color:'#f472b6', lessons:2,
   link:'/docs/part6-testing/unit-testing',
   chips:['Unit Tests','Mocking','Widget Testing']},
  {n:7, icon:'🚀', ar:'المشروع TaskFlow Pro', en:'Capstone Project', color:'#34d399', lessons:5,
   link:'/docs/part7-capstone-project/project-setup',
   chips:['Full App','MVVM','Tests','Production']},
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Home 🚀" description="دورة Dart و Flutter الشاملة باللغتين العربية والإنجليزية">

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        position:'relative', overflow:'hidden',
        minHeight:'92vh', display:'flex', alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'6rem 1.5rem 5rem',
        background:`
          radial-gradient(ellipse 90% 70% at 50% -5%, rgba(14,165,233,0.28) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 90% 80%, rgba(167,139,250,0.15) 0%, transparent 55%),
          radial-gradient(ellipse 35% 35% at 5%  70%, rgba(34,211,160,0.1)  0%, transparent 55%)
        `,
      }}>
        {/* Animated rings */}
        {[420,320,220].map((s,i) => (
          <div key={i} style={{
            position:'absolute', top:'50%', left:'50%',
            width:s, height:s, borderRadius:'50%',
            border:`1px solid rgba(14,165,233,${0.07 - i*0.02})`,
            transform:'translate(-50%,-50%)',
            animation:`spin ${20+i*8}s linear infinite`,
          }}/>
        ))}

        {/* Floating particles */}
        {Array.from({length:8}).map((_,i) => (
          <div key={i} style={{
            position:'absolute',
            width: 4+Math.random()*4, height: 4+Math.random()*4,
            borderRadius:'50%',
            background:`rgba(14,165,233,${0.3+Math.random()*0.4})`,
            top:`${10+Math.random()*80}%`, left:`${5+Math.random()*90}%`,
            animation:`float ${3+Math.random()*4}s ease-in-out ${Math.random()*2}s infinite alternate`,
            boxShadow:'0 0 8px rgba(14,165,233,0.6)',
          }}/>
        ))}

        <div style={{position:'relative', zIndex:1, maxWidth:'950px', margin:'0 auto'}}>
          {/* Top badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'0.5rem',
            background:'rgba(14,165,233,0.1)', border:'1px solid rgba(14,165,233,0.3)',
            borderRadius:'30px', padding:'0.45rem 1.25rem', marginBottom:'2rem',
            animation:'fadeUp 0.5s ease both',
            backdropFilter:'blur(8px)',
          }}>
            <span style={{
              width:8, height:8, borderRadius:'50%', background:'#0ea5e9',
              boxShadow:'0 0 8px #0ea5e9',
              animation:'pulse 2s ease-in-out infinite',
              display:'inline-block',
            }}/>
            <span style={{fontSize:'0.88rem', fontWeight:700, color:'#7dd3fc'}}>
              🌐 Bilingual Course · دورة ثنائية اللغة
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize:'clamp(2.4rem,6vw,4.5rem)', fontWeight:900, lineHeight:1.1,
            margin:'0 0 0.6rem',
            background:'linear-gradient(135deg,#fff 15%,#93c5fd 45%,#0ea5e9 80%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            animation:'fadeUp 0.6s 0.05s ease both',
          }}>
            Dart &amp; Flutter
          </h1>
          <h2 style={{
            fontSize:'clamp(1.5rem,4vw,2.8rem)', fontWeight:900, lineHeight:1.2,
            margin:'0 0 1.5rem', color:'#e2e8f0',
            animation:'fadeUp 0.6s 0.1s ease both',
          }}>
            دورة من الصفر للاحتراف | Zero to Production
          </h2>

          {/* Description */}
          <p style={{
            fontSize:'clamp(0.95rem,2vw,1.2rem)', color:'#64748b', lineHeight:1.75,
            maxWidth:'680px', margin:'0 auto 2.5rem',
            animation:'fadeUp 0.6s 0.15s ease both',
          }}>
            Learn Flutter professionally with full MVVM Architecture &amp; Clean Code principles.<br/>
            <span style={{color:'#94a3b8'}}>تعلم Flutter باحترافية مع معمارية MVVM الصارمة ومبادئ الكود النظيف.</span>
          </p>

          {/* Tech pills */}
          <div style={{marginBottom:'2.5rem', animation:'fadeUp 0.6s 0.2s ease both'}}>
            {['Dart 3','Flutter','MVVM','Provider','Clean Code','go_router','Dio','SharedPrefs'].map(t => (
              <TechChip key={t} label={t} color='#0ea5e9' />
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap',
            animation:'fadeUp 0.6s 0.25s ease both',
          }}>
            <Link to='/docs/part1-dart-fundamentals/variables-and-data-types' className="btn-primary">
              ⚡ Start Learning · ابدأ التعلم
            </Link>
            <Link to='/docs/part4-mvvm-state-management/intro-to-mvvm' className="btn-outline">
              🏗️ MVVM Architecture · المعمارية
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:120,
          background:'linear-gradient(to top, #04080f, transparent)',
          pointerEvents:'none',
        }}/>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section style={{
        borderTop:'1px solid rgba(14,165,233,0.12)',
        borderBottom:'1px solid rgba(14,165,233,0.12)',
        background:'rgba(14,165,233,0.04)',
        padding:'2.5rem 1rem',
      }}>
        <div className="container">
          <div style={{
            display:'flex', justifyContent:'center', gap:'clamp(2rem,6vw,6rem)', flexWrap:'wrap',
          }}>
            {[
              {n:33, suffix:'', labelEn:'Total Lessons', labelAr:'درسًا شاملاً'},
              {n:7,  suffix:'', labelEn:'Main Parts', labelAr:'جزء رئيسي'},
              {n:100,suffix:'%',labelEn:'Pure English Code', labelAr:'كود إنجليزي نقي'},
              {n:0,  suffix:'', labelEn:'Logic in UI Layer', labelAr:'منطق في الـ View'},
            ].map((s,i) => (
              <div key={i} style={{textAlign:'center', minWidth:100}}>
                <div style={{
                  fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1,
                  background:'linear-gradient(135deg,#fff 30%,#38bdf8)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  marginBottom:'0.4rem',
                }}>
                  <Counter to={s.n} suffix={s.suffix}/>
                </div>
                <div style={{fontSize:'0.82rem', color:'#0ea5e9', fontWeight:700}}>{s.labelEn}</div>
                <div style={{fontSize:'0.78rem', color:'#475569'}}>{s.labelAr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ARCHITECTURE BANNER ═══════════════ */}
      <section style={{
        background:`linear-gradient(135deg, rgba(14,165,233,0.07) 0%, rgba(167,139,250,0.07) 100%)`,
        borderBottom:'1px solid rgba(14,165,233,0.1)',
        padding:'2.5rem 1.5rem',
        textAlign:'center',
      }}>
        <div className="container" style={{maxWidth:900}}>
          <p style={{
            fontSize:'0.82rem', color:'#0ea5e9', fontWeight:800, letterSpacing:2,
            textTransform:'uppercase', marginBottom:'1rem', direction:'ltr',
          }}>
            Architecture Rule · القاعدة المعمارية الصارمة
          </p>
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            gap:'0.5rem', flexWrap:'wrap', fontSize:'clamp(0.9rem,2vw,1.15rem)',
            fontFamily:"'Fira Code', monospace", direction:'ltr',
          }}>
            {['View (UI only)','→','ViewModel (State + Logic)','→','Repository (Data Access)','→','Model (DTO)'].map((t,i) => (
              <span key={i} style={{
                color: t==='→' ? '#334155' : i===0 ? '#0ea5e9' : i===2 ? '#a78bfa' : i===4 ? '#22d3a0' : '#f59e0b',
                fontWeight: t==='→' ? 400 : 700,
                padding: t==='→' ? '0' : '0.3rem 0.75rem',
                background: t==='→' ? 'none' : 'rgba(255,255,255,0.04)',
                borderRadius: t==='→' ? 0 : 8,
                border: t==='→' ? 'none' : '1px solid rgba(255,255,255,0.07)',
              }}>
                {t}
              </span>
            ))}
          </div>
          <p style={{fontSize:'0.9rem', color:'#475569', marginTop:'1rem', marginBottom:0}}>
            لا يوجد أي منطق تجاري داخل دالة <code>build()</code> إطلاقاً في أي درس من دروس هذه الدورة
          </p>
        </div>
      </section>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="container" style={{padding:'5rem 1rem'}}>

        {/* Features */}
        <div style={{textAlign:'center', marginBottom:'4rem'}}>
          <span className="code-first-badge">✨ Why This Course · لماذا هذه الدورة</span>
          <h2 style={{
            fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:900, marginTop:'1rem',
            background:'linear-gradient(135deg,#fff 20%,#38bdf8 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>
            What Makes This Different · ما الذي يميزها؟
          </h2>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',
          gap:'1.25rem', marginBottom:'6rem',
        }}>
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
            <div key={i} className="glass-card" style={{padding:'1.75rem', animationDelay:`${i*0.08}s`, animation:'fadeUp 0.5s ease both'}}>
              <div style={{
                fontSize:'2rem', width:56, height:56, borderRadius:14,
                background:`rgba(${f.rgb},0.12)`, border:`1px solid rgba(${f.rgb},0.25)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'1.25rem',
              }}>
                {f.icon}
              </div>
              <h3 style={{fontSize:'1.1rem', fontWeight:900, color:'#e2e8f0', margin:'0 0 0.2rem'}}>{f.ar}</h3>
              <p style={{fontSize:'0.78rem', color:f.color, fontWeight:700, margin:'0 0 0.9rem', direction:'ltr', textAlign:'left', fontFamily:"'Fira Code',monospace"}}>
                {f.en}
              </p>
              <p style={{fontSize:'0.9rem', color:'#94a3b8', lineHeight:1.65, margin:'0 0 0.75rem'}}>{f.descAr}</p>
              <p style={{fontSize:'0.82rem', color:'#475569', lineHeight:1.6, margin:0, direction:'ltr', textAlign:'left'}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Course Roadmap */}
        <div style={{textAlign:'center', marginBottom:'3.5rem'}}>
          <span className="code-first-badge">🗺️ Course Roadmap · خارطة الدورة</span>
          <h2 style={{
            fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, marginTop:'1rem',
            background:'linear-gradient(135deg,#fff 20%,#38bdf8 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>
            33 Lessons · 7 Parts | 33 درساً في 7 أجزاء
          </h2>
          <p style={{color:'#475569', maxWidth:600, margin:'0.75rem auto 0'}}>
            Each part builds on the previous — from Dart basics to a full production Flutter app.<br/>
            <span style={{fontSize:'0.9em'}}>كل جزء يبني على السابق، من أسس Dart إلى تطبيق Flutter كامل للإنتاج.</span>
          </p>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.25rem',
        }}>
          {parts.map((p,i) => {
            const rgb = p.color==='#0ea5e9'?'14,165,233':p.color==='#a78bfa'?'167,139,250':p.color==='#22d3a0'?'34,211,160':p.color==='#f59e0b'?'245,158,11':p.color==='#fb923c'?'251,146,60':p.color==='#f472b6'?'244,114,182':'52,211,153';
            return (
              <div key={p.n} className="glass-card" style={{
                padding:'1.6rem', display:'flex', flexDirection:'column',
                animation:`fadeUp 0.5s ${i*0.07}s ease both`,
              }}>
                {/* Head */}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.1rem'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'0.6rem'}}>
                    <div style={{
                      width:36, height:36, borderRadius:'50%', flexShrink:0,
                      background:`linear-gradient(135deg,${p.color}aa,${p.color})`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontWeight:900, fontSize:'0.9rem', color:'#fff',
                      boxShadow:`0 4px 12px ${p.color}55`,
                    }}>{p.n}</div>
                    <span style={{fontSize:'1.6rem'}}>{p.icon}</span>
                  </div>
                  <span style={{
                    fontSize:'0.72rem', fontWeight:800, padding:'0.2rem 0.6rem', borderRadius:10,
                    background:`rgba(${rgb},0.12)`, color:p.color, border:`1px solid rgba(${rgb},0.25)`,
                  }}>
                    {p.lessons} lessons
                  </span>
                </div>

                {/* Titles */}
                <h3 style={{fontSize:'1.1rem', fontWeight:900, color:'#e2e8f0', margin:'0 0 0.2rem'}}>{p.ar}</h3>
                <p style={{fontSize:'0.78rem', color:p.color, fontWeight:700, fontFamily:"'Fira Code',monospace", direction:'ltr', textAlign:'left', margin:'0 0 1rem'}}>
                  Part {p.n} · {p.en}
                </p>

                {/* Chips */}
                <div style={{flexGrow:1, marginBottom:'1.1rem'}}>
                  {p.chips.map(c => <TechChip key={c} label={c} color={p.color}/>)}
                </div>

                {/* Link */}
                <Link to={p.link} style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem',
                  padding:'0.6rem', borderRadius:10, textDecoration:'none',
                  background:`rgba(${rgb},0.1)`, border:`1px solid rgba(${rgb},0.25)`,
                  color:p.color, fontWeight:800, fontSize:'0.88rem',
                  transition:'all 0.2s ease',
                }}>
                  Start Part {p.n} · ادخل الجزء ←
                </Link>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div style={{
          marginTop:'5rem', textAlign:'center', padding:'4rem 2rem',
          background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%)',
          border:'1px solid rgba(14,165,233,0.15)', borderRadius:24,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(167,139,250,0.03) 100%)',
            pointerEvents:'none',
          }}/>
          <h2 style={{
            fontSize:'clamp(1.6rem,4vw,2.5rem)', fontWeight:900,
            background:'linear-gradient(135deg,#fff,#38bdf8)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            marginBottom:'1rem',
          }}>
            Ready to Write Clean Flutter Code?<br/>
            <span style={{fontSize:'0.75em', color:'#64748b', WebkitTextFillColor:'#64748b'}}>مستعد تكتب Flutter Code نظيف ومحترف؟</span>
          </h2>
          <p style={{color:'#475569', marginBottom:'2rem', fontSize:'1rem'}}>
            33 lessons · Zero to Production · MVVM + Clean Code<br/>
            33 درساً · من الصفر للاحتراف · MVVM + كود نظيف
          </p>
          <Link to='/docs/part1-dart-fundamentals/variables-and-data-types' className="btn-primary" style={{fontSize:'1.1rem', padding:'0.9rem 2.5rem'}}>
            🚀 Start for Free · ابدأ مجاناً الآن
          </Link>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:0.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.4); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </Layout>
  );
}
