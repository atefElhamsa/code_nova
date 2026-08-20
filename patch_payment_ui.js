const fs = require('fs');
let content = fs.readFileSync('src/theme/Root.tsx', 'utf-8');

const oldCSSRegex = /<style>\{`\s*\.course-gate-overlay \{.*?<\/style>/s;

const newCSS = `<style>{\`
            .course-gate-overlay {
              position: fixed; inset: 0; z-index: 999999;
              display: grid; place-items: center;
              background: rgba(9, 9, 11, 0.9);
              backdrop-filter: blur(40px);
              -webkit-backdrop-filter: blur(40px);
              padding: 20px;
              overflow-y: auto;
            }
            .course-gate-overlay::-webkit-scrollbar { width: 0px; display: none; }
            
            .fintech-card {
              background: linear-gradient(180deg, rgba(39, 39, 42, 0.9) 0%, rgba(24, 24, 27, 0.9) 100%);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 36px;
              padding: 40px;
              width: 100%;
              max-width: 480px;
              box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
              text-align: center;
              animation: ag-scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              position: relative;
              margin: auto;
            }
            
            @keyframes ag-scaleUp { 
              from { opacity: 0; transform: scale(0.92) translateY(20px); } 
              to { opacity: 1; transform: scale(1) translateY(0); } 
            }
            
            .fintech-header { margin-bottom: 32px; }
            .fintech-title {
              font-size: 1.7rem; font-weight: 800; color: #fff; margin: 0 0 10px;
            }
            .fintech-subtitle {
              color: #a1a1aa; font-size: 1.05rem; line-height: 1.6; margin: 0;
            }

            .instapay-box {
              background: rgba(144, 25, 255, 0.05);
              border: 1px solid rgba(144, 25, 255, 0.3);
              border-radius: 24px;
              padding: 24px;
              margin-bottom: 24px;
              transition: all 0.3s ease;
            }
            .instapay-box:hover {
              background: rgba(144, 25, 255, 0.08);
              box-shadow: 0 0 40px rgba(144, 25, 255, 0.15);
              transform: translateY(-2px);
            }
            .instapay-logo-text {
              font-size: 2.2rem;
              font-weight: 900;
              background: linear-gradient(135deg, #a855f7, #6366f1);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 16px;
              display: inline-block;
              letter-spacing: -1px;
            }
            .instapay-address-wrap {
              background: #000;
              padding: 16px 20px;
              border-radius: 16px;
              font-family: 'Inter', monospace;
              font-size: 1.4rem;
              font-weight: 700;
              color: #fff;
              border: 1px solid #3f3f46;
              margin-bottom: 12px;
              display: flex; align-items: center; justify-content: center; gap: 12px;
              box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
            }

            .fintech-btn {
              width: 100%; padding: 18px; border-radius: 20px; font-weight: 700; font-size: 1.1rem;
              border: none; cursor: pointer; transition: all 0.2s ease;
              display: flex; align-items: center; justify-content: center; gap: 12px;
            }
            .btn-whatsapp {
              background: #25d366; color: #000; text-decoration: none !important;
            }
            .btn-whatsapp:hover { background: #22c55e; transform: scale(1.02); }
            
            .btn-primary {
              background: #38bdf8; color: #000;
            }
            .btn-primary:hover { background: #0ea5e9; transform: scale(1.02); }
            .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

            .toggle-link {
              color: #a1a1aa; background: transparent; border: none; font-size: 1.05rem; font-weight: 600;
              margin-top: 20px; cursor: pointer; transition: color 0.2s; text-decoration: none; padding: 10px;
            }
            .toggle-link:hover { color: #fff; }

            .code-input-wrapper { margin-bottom: 24px; }
            .premium-input {
              width: 100%; background: #000; border: 1px solid #3f3f46; border-radius: 20px;
              padding: 20px; font-size: 1.8rem; color: #fff; text-align: center; letter-spacing: 8px;
              transition: all 0.3s; font-family: monospace; font-weight: 800;
            }
            .premium-input:focus {
              outline: none; border-color: #38bdf8; box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
            }
            
            .msg-alert {
              padding: 16px; border-radius: 16px; font-size: 1rem; margin-bottom: 24px; font-weight: 600;
            }
            .msg-error { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
            .msg-success { background: rgba(34, 197, 94, 0.15); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.3); }

            .footer-nav {
              display: flex; gap: 12px; margin-top: 32px; border-top: 1px solid #3f3f46; padding-top: 24px;
            }
            .footer-btn {
              flex: 1; background: #18181b; color: #a1a1aa; border: 1px solid #3f3f46; 
              padding: 14px; border-radius: 16px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
            }
            .footer-btn:hover { background: #27272a; color: #fff; border-color: #52525b; }
          \`}</style>`;

if (oldCSSRegex.test(content)) {
    content = content.replace(oldCSSRegex, newCSS);
    fs.writeFileSync('src/theme/Root.tsx', content);
    console.log("Updated payment UI styles successfully!");
} else {
    console.log("Could not find the CSS block to replace.");
}
