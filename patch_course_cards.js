const fs = require('fs');

let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

// Replace the Courses section JSX
const oldCoursesRegex = /\{\/\* Courses Section \*\/\}.*?(?=\{\/\* Features Section \*\/})/s;

const newCoursesSection = `{/* Courses Section */}
      <div id="courses" className="courses-section" style={{ padding: '100px 20px', background: 'var(--bg-dark)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>مساراتنا البرمجية</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>اختر المسار الذي يناسب طموحك وابدأ رحلة الاحتراف بخطوات عملية ومشاريع حقيقية.</p>
        </div>
        
        <div className="courses-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Flutter */}
          <Link to="/flutter" className="course-card" style={{ '--course-color': '#42A5F5', '--course-glow': 'rgba(66, 165, 245, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار فلاتر (Flutter)</h3>
            <p className="course-desc">تعلم بناء تطبيقات هواتف ذكية (Android & iOS) بأداء عالي وواجهات احترافية بأسلوب متقدم.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>
          
          {/* JavaScript */}
          <Link to="/javascript" className="course-card" style={{ '--course-color': '#F7DF1E', '--course-glow': 'rgba(247, 223, 30, 0.15)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" style={{ width: '60px', height: '60px', borderRadius: '12px' }} />
            </div>
            <h3 className="course-title">مسار جافاسكريبت (JS)</h3>
            <p className="course-desc">احترف تطوير واجهات الويب الأمامية التفاعلية وافهم أسرار اللغة الأكثر طلباً عالمياً.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* C++ */}
          <Link to="/cpp" className="course-card" style={{ '--course-color': '#00599C', '--course-glow': 'rgba(0, 89, 156, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار C++ الأساسي</h3>
            <p className="course-desc">ابنِ أساساً برمجياً قوياً جداً وافهم خوارزميات وهيكلة البيانات العميقة لتكون مهندساً صلباً.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>

          {/* Python */}
          <Link to="/python" className="course-card" style={{ '--course-color': '#FFD43B', '--course-glow': 'rgba(55, 118, 171, 0.2)' } as React.CSSProperties}>
            <div className="course-bg-shape"></div>
            <div className="course-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" style={{ width: '60px', height: '60px' }} />
            </div>
            <h3 className="course-title">مسار بايثون (Python)</h3>
            <p className="course-desc">لغة العصر! تعلم برمجة الذكاء الاصطناعي، تحليل البيانات، والأتمتة السريعة بأسلوب ممتع.</p>
            <div className="course-footer">استكشف المسار <span className="arrow">←</span></div>
          </Link>
        </div>
      </div>
      
      `;

homeContent = homeContent.replace(oldCoursesRegex, newCoursesSection);


// Replace the CSS
const oldCssRegex = /\/\* Courses Section \*\/.+?\.contact-grid \{/s;

const newCss = `/* Courses Section */
        .course-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 28px;
          padding: 40px 30px;
          text-decoration: none;
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .course-bg-shape {
          position: absolute;
          width: 150px;
          height: 150px;
          background: var(--course-glow);
          border-radius: 50%;
          top: -50px;
          right: -50px;
          filter: blur(40px);
          opacity: 0.3;
          transition: all 0.4s;
          pointer-events: none;
        }

        .course-card:hover .course-bg-shape {
          transform: scale(1.5);
          opacity: 0.8;
        }

        .course-card:hover {
          transform: translateY(-10px);
          border-color: var(--course-color);
          box-shadow: 0 20px 40px -10px var(--course-glow);
          text-decoration: none;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.03);
        }

        .course-icon {
          width: 90px;
          height: 90px;
          border-radius: 24px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .course-card:hover .course-icon {
          transform: scale(1.1) translateY(-5px);
          border-color: rgba(255,255,255,0.1);
        }

        .course-title {
          font-size: 1.6rem;
          font-weight: 900;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .course-desc {
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 30px;
          flex-grow: 1;
          position: relative;
          z-index: 2;
        }

        .course-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 800;
          color: var(--course-color);
          position: relative;
          z-index: 2;
          padding: 12px 24px;
          background: rgba(255,255,255,0.03);
          border-radius: 100px;
          width: 100%;
          transition: background 0.3s;
        }

        .course-card:hover .course-footer {
          background: rgba(255,255,255,0.08);
        }

        .course-card .arrow {
          transition: transform 0.3s;
        }

        .course-card:hover .arrow {
          transform: translateX(-5px);
        }

        .contact-grid {`;

homeContent = homeContent.replace(oldCssRegex, newCss);

fs.writeFileSync('src/pages/index.tsx', homeContent);
