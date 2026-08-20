const fs = require('fs');

let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

// The new CSS for contact cards
const newCss = `
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 30px 20px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--hover-color), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-hover);
          text-decoration: none;
          box-shadow: 0 15px 35px -10px var(--hover-color);
        }

        .contact-card:hover::before {
          opacity: 0.15;
        }

        .contact-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--icon-bg);
          color: var(--icon-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 2rem;
          transition: transform 0.3s;
        }

        .contact-card:hover .contact-icon-wrap {
          transform: scale(1.1);
        }

        .contact-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-light);
          margin-bottom: 8px;
        }

        .contact-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
`;

homeContent = homeContent.replace(
  `        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }`,
  newCss
);


// The new JSX for contact section
const newContactSection = `      {/* Premium Contact Section */}
      <div className="contact-section" style={{ padding: '100px 20px', background: 'radial-gradient(ellipse at bottom, rgba(56, 189, 248, 0.05) 0%, var(--bg-dark) 100%)', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>تواصل معنا</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>نحن هنا دائماً للرد على استفساراتك وتقديم الدعم اللازم لرحلتك التعليمية.</p>
        </div>
        
        <div className="contact-grid">
          {/* WhatsApp Academy */}
          <a href="https://wa.me/201272442829" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(37,211,102,0.8)', '--border-hover': 'rgba(37,211,102,0.4)', '--icon-bg': 'rgba(37,211,102,0.1)', '--icon-color': '#25D366' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="contact-title">واتساب الأكاديمية</h3>
            <div className="contact-subtitle">للاستفسارات العامة والتسجيل</div>
          </a>
          
          {/* WhatsApp Atef */}
          <a href="https://wa.me/201552946586" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(37,211,102,0.8)', '--border-hover': 'rgba(37,211,102,0.4)', '--icon-bg': 'rgba(37,211,102,0.1)', '--icon-color': '#25D366' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="contact-title">واتساب م. عاطف</h3>
            <div className="contact-subtitle">للتواصل المباشر والاستشارات</div>
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/share/1BdtYrtu6d/" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(24,119,242,0.8)', '--border-hover': 'rgba(24,119,242,0.4)', '--icon-bg': 'rgba(24,119,242,0.1)', '--icon-color': '#1877F2' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <h3 className="contact-title">فيسبوك</h3>
            <div className="contact-subtitle">تابع آخر أخبارنا ومنشوراتنا</div>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/codenova-academy/" target="_blank" rel="noreferrer" className="contact-card" style={{ '--hover-color': 'rgba(10,102,194,0.8)', '--border-hover': 'rgba(10,102,194,0.4)', '--icon-bg': 'rgba(10,102,194,0.1)', '--icon-color': '#0A66C2' } as React.CSSProperties}>
            <div className="contact-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <h3 className="contact-title">لينكد إن</h3>
            <div className="contact-subtitle">انضم لشبكتنا المهنية</div>
          </a>
        </div>
      </div>
    </Layout>`;

homeContent = homeContent.replace(
  /      \{\/\* Contact Section \*\/\}.*<\/Layout>/s,
  newContactSection
);

fs.writeFileSync('src/pages/index.tsx', homeContent);
