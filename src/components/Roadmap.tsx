import React from 'react';
import Link from '@docusaurus/Link';

interface Module {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  lessons: number;
  link: string;
  topics: string[];
  color: string;
  icon: React.ReactNode;
}

const modules: Module[] = [
  {
    id: 1, icon: '🎯', color: '#0ea5e9',
    titleAr: 'أسس لغة Dart',
    titleEn: 'Dart Fundamentals',
    descAr: 'من المتغيرات وNull Safety وصولاً إلى Futures وStreams والـ OOP الاحترافي.',
    lessons: 9,
    link: '/docs/part1-dart-fundamentals/variables-and-data-types',
    topics: ['Data Types', 'Null Safety', 'OOP', 'Generics', 'Async/Await', 'Streams'],
  },
  {
    id: 2, icon: '📱', color: '#a78bfa',
    titleAr: 'أساسيات Flutter',
    titleEn: 'Flutter Basics',
    descAr: 'Widget Tree، التخطيطات، go_router، النماذج، والسمات الديناميكية.',
    lessons: 7,
    link: '/docs/part2-flutter-basics/setup-and-architecture',
    topics: ['Widget Tree', 'Layouts', 'go_router', 'Forms', 'Theming'],
  },
  {
    id: 3, icon: '🧹', color: '#22d3a0',
    titleAr: 'الكود النظيف',
    titleEn: 'Clean Code',
    descAr: 'قواعد التسمية المعيارية، SOLID وSRP، هيكلية Feature-First وحقن التبعيات.',
    lessons: 4,
    link: '/docs/part3-clean-code/clean-code-naming',
    topics: ['Naming', 'SOLID', 'Feature-First', 'get_it DI'],
  },
  {
    id: 4, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><path d="M14 14V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>, color: '#f59e0b',
    titleAr: 'MVVM وإدارة الحالة',
    titleEn: 'MVVM & State Management',
    descAr: 'ChangeNotifier وProvider وفصل طبقة الـ View عن الـ ViewModel بصرامة تامة.',
    lessons: 5,
    link: '/docs/part4-mvvm-state-management/intro-to-mvvm',
    topics: ['MVVM Pattern', 'ChangeNotifier', 'Provider', 'ViewStatus'],
  },
  {
    id: 5, icon: '🌐', color: '#fb923c',
    titleAr: 'التكامل مع الـ Backend',
    titleEn: 'Backend Integration',
    descAr: 'Dio وInterceptors والـ Repository Pattern ومعالجة الأخطاء وتسلسل JSON.',
    lessons: 5,
    link: '/docs/part5-backend-integration/dio-and-interceptors',
    topics: ['Dio', 'Repository', 'Failures', 'json_serializable', 'SharedPrefs'],
  },
  {
    id: 6, icon: '🧪', color: '#ec4899',
    titleAr: 'الاختبارات والجودة',
    titleEn: 'Testing & QA',
    descAr: 'Unit Tests للـ ViewModels بـ mocktail، واختبارات الودجات Widget Testing.',
    lessons: 2,
    link: '/docs/part6-testing/unit-testing',
    topics: ['Unit Testing', 'Mocking', 'Widget Testing'],
  },
  {
    id: 7, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5-4 5-4"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 4-5 4-5"></path></svg>, color: '#38bdf8',
    titleAr: 'المشروع التطبيقي الشامل',
    titleEn: 'Capstone: TaskFlow Pro',
    descAr: 'تطبيق كامل من الصفر للإنتاج مبني بـ MVVM + Clean Code + Tests.',
    lessons: 5,
    link: '/docs/part7-capstone-project/project-setup',
    topics: ['Full App', 'Data Layer', 'ViewModel', 'UI Layer', 'Testing'],
  },
];

export default function Roadmap() {
  return (
    <div className="roadmap-grid">
      {modules.map((m, idx) => {
        const rgb = m.color === '#0ea5e9' ? '14,165,233'
          : m.color === '#a78bfa' ? '167,139,250'
          : m.color === '#22d3a0' ? '34,211,160'
          : m.color === '#f59e0b' ? '245,158,11'
          : m.color === '#fb923c' ? '251,146,60'
          : m.color === '#ec4899' ? '236,72,153'
          : '56,189,248';

        return (
          <div
            key={m.id}
            className="glass-card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animation: `fadeUp 0.5s ${0.07 * idx}s ease both`,
            }}>

            {/* Header */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                <div className="roadmap-card-number" style={{
                  background: `linear-gradient(135deg, ${m.color}cc, ${m.color})`,
                  boxShadow: `0 4px 14px ${m.color}55`,
                  animationDelay: `${0.3 * idx}s`,
                }}>
                  {m.id}
                </div>
                <span style={{fontSize:'1.75rem'}}>{m.icon}</span>
              </div>
              <span style={{
                background: `rgba(${rgb},0.15)`,
                color: m.color,
                border: `1px solid ${m.color}40`,
                fontSize:'0.75rem', fontWeight:800,
                padding:'0.2rem 0.6rem', borderRadius:'12px',
                flexShrink: 0,
              }}>
                {m.lessons} دروس
              </span>
            </div>

            {/* Title */}
            <h3 style={{fontSize:'1.25rem', fontWeight:900, margin:'0 0 0.2rem', color:'#e2e8f0'}}>{m.titleAr}</h3>
            <p style={{
              fontSize:'0.8rem', fontWeight:700, color: m.color,
              margin:'0 0 0.9rem', direction:'ltr', textAlign:'left',
              fontFamily:"'Fira Code', monospace",
            }}>
              Part {m.id} · {m.titleEn}
            </p>
            <p style={{fontSize:'0.93rem', color:'#64748b', lineHeight:1.65, margin:'0 0 1.25rem'}}>
              {m.descAr}
            </p>

            {/* Topics */}
            <div style={{marginBottom:'1.25rem'}}>
              {m.topics.map((t, i) => (
                <span key={i} className="topic-tag">{t}</span>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={m.link}
              style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                background: `linear-gradient(135deg, rgba(${rgb},0.15), rgba(${rgb},0.08))`,
                border: `1px solid ${m.color}35`,
                color: m.color + ' !important',
                borderRadius:'10px',
                padding:'0.65rem 1rem',
                fontWeight:800, fontSize:'0.9rem',
                textDecoration:'none',
                transition:'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `rgba(${rgb},0.25)`;
                el.style.borderColor = `${m.color}70`;
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `linear-gradient(135deg, rgba(${rgb},0.15), rgba(${rgb},0.08))`;
                el.style.borderColor = `${m.color}35`;
                el.style.transform = 'translateY(0)';
              }}>
              <span style={{color: m.color}}>ادخل الجزء ←</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
