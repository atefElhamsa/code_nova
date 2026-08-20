const fs = require('fs');

let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

// 1. Fix the button
const oldButtonRegex = /<Link to="\/#courses" className="btn btn-primary" onClick=\{e => \{\s*e\.preventDefault\(\);\s*alert\("سنقوم بإضافة قسم الكورسات قريباً!"\);\s*\}\}>/s;
homeContent = homeContent.replace(oldButtonRegex, `<a href="#courses" className="btn btn-primary">`);

homeContent = homeContent.replace(
  `</Link>
            <Link to="/about" className="btn btn-secondary">`,
  `</a>
            <Link to="/about" className="btn btn-secondary">`
);

// 2. Add the Courses Section
const coursesSectionHtml = `      {/* Courses Section */}
      <div id="courses" className="courses-section" style={{ padding: '100px 20px', background: 'var(--bg-dark)' }}>
        <h2 className="section-title">مساراتنا البرمجية</h2>
        <div className="courses-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Flutter */}
          <Link to="/flutter" className="course-card" style={{ '--course-color': '#02569B', '--course-glow': 'rgba(2, 86, 155, 0.2)' } as React.CSSProperties}>
            <div className="course-icon" style={{ background: 'rgba(2, 86, 155, 0.1)' }}>
              <img src="https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png" alt="Flutter" style={{ width: '40px', height: '40px' }} />
            </div>
            <h3 className="course-title">مسار فلاتر (Flutter)</h3>
            <p className="course-desc">تعلم بناء تطبيقات هواتف ذكية (Android & iOS) بأداء عالي وواجهات احترافية.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>
          
          {/* JavaScript */}
          <Link to="/javascript" className="course-card" style={{ '--course-color': '#F7DF1E', '--course-glow': 'rgba(247, 223, 30, 0.15)' } as React.CSSProperties}>
            <div className="course-icon" style={{ background: 'rgba(247, 223, 30, 0.1)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#F7DF1E"><path d="M3 3h18v18H3V3m11.72 11.45c-.32-.23-.74-.42-1.25-.56v-2.31c1.23.47 2.05 1.15 2.05 1.15l1.09-1.93s-1.12-1.01-2.91-1.37v-1.7h-1.89v1.73c-1.39.2-2.58 1.05-2.58 2.65 0 2.21 2.37 2.76 4.47 3.33v2.54c-1.8.04-3.13-.88-3.13-.88l-1.13 1.95s1.61 1.25 4.26 1.34v1.86h1.89v-1.92c1.72-.25 3.01-1.21 3.01-2.98 0-2.36-2.55-2.65-3.88-3.08M10.15 17.65V9.4H8.26v8.28c0 1.91 1.08 2.92 2.94 2.92 1.38 0 2.38-.45 2.38-.45l-.94-1.85s-.76.32-1.44.32c-1.04 0-1.05-.8-1.05-1.01v+.04z"/></svg>
            </div>
            <h3 className="course-title">مسار جافاسكريبت (JS)</h3>
            <p className="course-desc">احترف تطوير واجهات الويب الأمامية (Front-end) التفاعلية والحديثة.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* C++ */}
          <Link to="/cpp" className="course-card" style={{ '--course-color': '#00599C', '--course-glow': 'rgba(0, 89, 156, 0.2)' } as React.CSSProperties}>
            <div className="course-icon" style={{ background: 'rgba(0, 89, 156, 0.1)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#00599C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4.64 12.3c-.61 1.95-2.6 3.08-4.59 2.53-2.12-.6-3.37-2.82-2.77-4.94.59-2.12 2.82-3.37 4.93-2.77 1.04.29 1.86 1 2.27 1.9h-2.12c-.17-.4-.5-.73-.93-.85-.94-.27-1.93.28-2.2 1.22-.26.94.28 1.93 1.22 2.2.82.23 1.67-.14 2.06-.85h2.13m2.77-.55h-1.1v1.1h-1.1v-1.1h-1.1v-1.1h1.1v-1.1h1.1v1.1h1.1v1.1m-5.5 0h-1.1v1.1h-1.1v-1.1h-1.1v-1.1h1.1v-1.1h1.1v1.1h1.1v1.1z"/></svg>
            </div>
            <h3 className="course-title">مسار C++ الأساسي</h3>
            <p className="course-desc">ابنِ أساساً برمجياً قوياً جداً وافهم خوارزميات وهيكلة البيانات العميقة.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* Python */}
          <Link to="/python" className="course-card" style={{ '--course-color': '#3776AB', '--course-glow': 'rgba(55, 118, 171, 0.2)' } as React.CSSProperties}>
            <div className="course-icon" style={{ background: 'rgba(55, 118, 171, 0.1)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#3776AB"><path d="M12.01 2.02c-4.42 0-4.22 1.91-4.22 1.91v2.18h4.29V7.2h-4.3c-2.82 0-3.62 1.26-3.62 3.51 0 2.24.78 3.55 3.5 3.55h1.11v-1.63c0-2.3 1.91-4.2 4.2-4.2h3.5v-2.3c0-2.22-1.07-4.11-4.46-4.11m-1.97 1.39c.39 0 .7.31.7.7s-.31.7-.7.7c-.39 0-.71-.31-.71-.7 0-.39.32-.7.71-.7m6.72 5.04c-2.3 0-4.2 1.9-4.2 4.2v2.3H9.06v1.62c0 2.25.8 3.51 3.62 3.51h4.3v-1.09h-4.29v-2.18h4.22s-.2-1.91 4.22-1.91c3.39 0 4.46-1.89 4.46-4.11v-2.3c0-2.25-.78-3.51-3.5-3.51h-5.53m1.97 8.16c.39 0 .7.32.7.71 0 .39-.31.7-.7.7-.39 0-.71-.31-.71-.7 0-.39.32-.71.71-.71"/></svg>
            </div>
            <h3 className="course-title">مسار بايثون (Python)</h3>
            <p className="course-desc">لغة العصر! تعلم الذكاء الاصطناعي، تحليل البيانات، والأتمتة السريعة.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>
        </div>
      </div>
      
      {/* Features Section */}`;

homeContent = homeContent.replace(`{/* Features Section */}`, coursesSectionHtml);

// 3. Add CSS for Courses Section
const cssForCourses = `
        /* Courses Section */
        .course-card {
          background: var(--bg-card);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 30px;
          text-decoration: none;
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, var(--course-glow), transparent 60%);
          opacity: 0.5;
          transition: opacity 0.3s;
        }

        .course-card:hover {
          transform: translateY(-8px);
          border-color: var(--course-color);
          box-shadow: 0 15px 35px -10px var(--course-glow);
          text-decoration: none;
          color: var(--text-light);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        .course-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .course-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }

        .course-desc {
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 20px;
          flex-grow: 1;
          position: relative;
          z-index: 2;
        }

        .course-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: var(--course-color);
          position: relative;
          z-index: 2;
        }

        .course-card .arrow {
          transition: transform 0.3s;
        }

        .course-card:hover .arrow {
          transform: translateX(-5px); /* Move left because RTL */
        }
`;

homeContent = homeContent.replace(
  `        .contact-grid {`,
  `${cssForCourses}\n        .contact-grid {`
);

fs.writeFileSync('src/pages/index.tsx', homeContent);
