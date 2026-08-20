const fs = require('fs');

let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

// Replace CSS
const oldCssRegex = /\/\* Stats Section \*\/.+?\.stat-label \{.+?\}/s;
const newCss = `/* Premium Stats Section */
        .stats-section {
          padding: 80px 20px;
          background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, var(--bg-dark) 100%);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 40px 20px;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .stat-item:hover {
          transform: translateY(-8px);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 15px 35px rgba(56, 189, 248, 0.1);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          background: rgba(56, 189, 248, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 2rem;
          transition: transform 0.3s;
        }

        .stat-item:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-num {
          font-size: 3.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 1.15rem;
          font-weight: 800;
        }`;

homeContent = homeContent.replace(oldCssRegex, newCss);

// Replace JSX
const oldJsxRegex = /\{\/\* Stats Section \*\/\}.+?\{\/\* Features Section \*\/\}/s;
const newJsx = `{/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div className="stat-num">+1500</div>
            <div className="stat-label">طالب مسجل</div>
          </div>
          <div className="stat-item" style={{ '--primary': '#a855f7' } as React.CSSProperties}>
            <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 22 12 17 22 22 12 2"></polygon></svg>
            </div>
            <div className="stat-num" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4</div>
            <div className="stat-label">مسارات برمجية</div>
          </div>
          <div className="stat-item" style={{ '--primary': '#34d399' } as React.CSSProperties}>
            <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div className="stat-num" style={{ background: 'linear-gradient(135deg, #34d399 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+50</div>
            <div className="stat-label">مشروع عملي</div>
          </div>
        </div>
      </div>

      {/* Features Section */}`;

homeContent = homeContent.replace(oldJsxRegex, newJsx);

fs.writeFileSync('src/pages/index.tsx', homeContent);
