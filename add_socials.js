const fs = require('fs');

// 1. Update about.tsx
let aboutContent = fs.readFileSync('src/pages/about.tsx', 'utf-8');

aboutContent = aboutContent.replace(
  `<div className="v-instructor-socials">
                  <a href="#" className="v-social-link">LinkedIn</a>
                  <a href="#" className="v-social-link">GitHub</a>
                  <a href="#" className="v-social-link">YouTube</a>
                </div>`,
  `<div className="v-instructor-socials" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="https://wa.me/201272442829" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#25D366', background: 'rgba(37,211,102,0.1)', borderColor: 'rgba(37,211,102,0.2)'}}>واتساب الأكاديمية</a>
                  <a href="https://wa.me/201552946586" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#25D366', background: 'rgba(37,211,102,0.1)', borderColor: 'rgba(37,211,102,0.2)'}}>واتساب م. عاطف</a>
                  <a href="https://www.facebook.com/share/1BdtYrtu6d/" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#1877F2', background: 'rgba(24,119,242,0.1)', borderColor: 'rgba(24,119,242,0.2)'}}>فيسبوك</a>
                  <a href="https://www.linkedin.com/company/codenova-academy/" target="_blank" rel="noreferrer" className="v-social-link" style={{color: '#0A66C2', background: 'rgba(10,102,194,0.1)', borderColor: 'rgba(10,102,194,0.2)'}}>لينكد إن</a>
                </div>`
);
fs.writeFileSync('src/pages/about.tsx', aboutContent);

// 2. Update index.tsx
let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

const footerHtml = `      {/* Contact Section */}
      <div className="contact-section" style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--bg-card)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 className="section-title" style={{ marginBottom: '40px' }}>تواصل معنا</h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          <a href="https://wa.me/201272442829" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ color: '#25D366', borderColor: 'rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.05)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            واتس الأكاديمية
          </a>
          <a href="https://wa.me/201552946586" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ color: '#25D366', borderColor: 'rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.05)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            واتس م. عاطف
          </a>
          <a href="https://www.facebook.com/share/1BdtYrtu6d/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ color: '#1877F2', borderColor: 'rgba(24,119,242,0.3)', background: 'rgba(24,119,242,0.05)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            فيسبوك
          </a>
          <a href="https://www.linkedin.com/company/codenova-academy/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ color: '#0A66C2', borderColor: 'rgba(10,102,194,0.3)', background: 'rgba(10,102,194,0.05)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            لينكد إن
          </a>
        </div>
      </div>
    </Layout>
`;

homeContent = homeContent.replace(
  `    </Layout>`,
  footerHtml
);
fs.writeFileSync('src/pages/index.tsx', homeContent);
