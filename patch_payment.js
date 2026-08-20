const fs = require('fs');
let content = fs.readFileSync('src/theme/Root.tsx', 'utf-8');

// Replace the CSS block
const oldCSSRegex = /<style>\{`\s*\.fintech-card \{.*?<\/style>/s;

const newCSS = `<style>{\`
            .course-gate-overlay {
              position: fixed; inset: 0; z-index: 99999;
              display: flex; align-items: center; justify-content: center;
              background: rgba(2, 6, 23, 0.85) !important;
              backdrop-filter: blur(24px) !important;
              padding: 20px;
              overflow-y: auto;
            }
            .course-gate-overlay::-webkit-scrollbar { width: 0px; display: none; }
            
            .fintech-card {
              background: rgba(15, 23, 42, 0.8);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 32px;
              padding: 3rem 2.5rem;
              width: 100%;
              max-width: 460px;
              box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05);
              text-align: center;
              animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              position: relative;
              overflow: hidden;
            }
            
            .fintech-card::before {
              content: '';
              position: absolute;
              top: -50%; left: -50%; width: 200%; height: 200%;
              background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, transparent 60%);
              pointer-events: none;
              z-index: 0;
            }
            
            @keyframes slideUp { 
              from { opacity: 0; transform: translateY(40px) scale(0.95); } 
              to { opacity: 1; transform: translateY(0) scale(1); } 
            }
            
            .fintech-header {
              margin-bottom: 2.5rem;
              position: relative;
              z-index: 2;
            }
            .fintech-title {
              font-size: 1.8rem;
              font-weight: 900;
              color: #f8fafc;
              margin: 0 0 12px;
              letter-spacing: -0.5px;
            }
            .fintech-subtitle {
              color: #94a3b8;
              font-size: 1rem;
              line-height: 1.7;
              margin: 0;
            }

            .instapay-box {
              background: rgba(144, 25, 255, 0.03);
              border: 1px solid rgba(144, 25, 255, 0.2);
              border-radius: 20px;
              padding: 2rem 1.5rem;
              margin-bottom: 1.5rem;
              position: relative;
              overflow: hidden;
              z-index: 2;
              transition: all 0.3s;
            }
            .instapay-box:hover {
              background: rgba(144, 25, 255, 0.06);
              border-color: rgba(144, 25, 255, 0.3);
              box-shadow: 0 10px 30px rgba(144, 25, 255, 0.1);
            }
            .instapay-logo-text {
              font-size: 2.2rem;
              font-weight: 900;
              background: linear-gradient(135deg, #9019ff, #6366f1);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 1.2rem;
              display: inline-block;
              letter-spacing: -1px;
            }
            .instapay-address-wrap {
              background: rgba(0,0,0,0.3);
              padding: 16px;
              border-radius: 16px;
              font-family: monospace;
              font-size: 1.4rem;
              color: #fff;
              border: 1px solid rgba(255,255,255,0.05);
              margin-bottom: 12px;
              letter-spacing: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
            }

            .fintech-btn {
              width: 100%;
              padding: 18px;
              border-radius: 16px;
              font-weight: 800;
              font-size: 1.1rem;
              border: none;
              cursor: pointer;
              transition: all 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              position: relative;
              z-index: 2;
            }
            .btn-whatsapp {
              background: linear-gradient(135deg, #25d366, #128c7e);
              color: #fff;
              text-decoration: none !important;
              box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
            }
            .btn-whatsapp:hover { 
              transform: translateY(-3px); 
              box-shadow: 0 15px 30px rgba(37, 211, 102, 0.4); 
            }
            
            .btn-primary {
              background: var(--ifm-color-primary, #38bdf8);
              color: #000;
              box-shadow: 0 10px 25px rgba(56, 189, 248, 0.3);
            }
            .btn-primary:hover { 
              transform: translateY(-3px); 
              box-shadow: 0 15px 30px rgba(56, 189, 248, 0.4); 
            }
            .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

            .toggle-link {
              color: #94a3b8;
              background: transparent;
              border: none;
              font-size: 1rem;
              font-weight: 600;
              margin-top: 1.5rem;
              cursor: pointer;
              transition: all 0.3s;
              text-decoration: none;
              position: relative;
              z-index: 2;
            }
            .toggle-link:hover { color: #38bdf8; }

            .code-input-wrapper {
              position: relative;
              margin-bottom: 2rem;
              z-index: 2;
            }
            .premium-input {
              width: 100%;
              background: rgba(0,0,0,0.3);
              border: 1.5px solid rgba(255,255,255,0.1);
              border-radius: 16px;
              padding: 20px;
              font-size: 1.4rem;
              color: #fff;
              text-align: center;
              letter-spacing: 4px;
              transition: all 0.3s;
              font-family: monospace;
              font-weight: 800;
            }
            .premium-input:focus {
              outline: none;
              border-color: #38bdf8;
              background: rgba(56,189,248,0.05);
              box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
            }
            
            .msg-alert {
              padding: 14px;
              border-radius: 12px;
              font-size: 0.95rem;
              margin-bottom: 2rem;
              font-weight: 700;
              position: relative;
              z-index: 2;
            }
            .msg-error { background: rgba(239, 68, 68, 0.1); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.2); }
            .msg-success { background: rgba(34, 197, 94, 0.1); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.2); }

            .footer-nav {
              display: flex; gap: 16px; margin-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem;
              position: relative; z-index: 2;
            }
            .footer-btn {
              flex: 1; background: rgba(255,255,255,0.03); color: #94a3b8; border: 1px solid rgba(255,255,255,0.05); 
              padding: 14px; border-radius: 14px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.3s;
            }
            .footer-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
          \`}</style>`;

content = content.replace(oldCSSRegex, newCSS);

// Replace the phone number globally in the file
content = content.replace(/01272442829/g, '01552946586');

fs.writeFileSync('src/theme/Root.tsx', content);
