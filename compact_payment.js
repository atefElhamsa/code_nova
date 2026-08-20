const fs = require('fs');

// 1. Revert global numbers back to WhatsApp number
function replaceGlobal(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        // We revert the change we made earlier.
        let newContent = content
            .replace(/01552946586/g, '01272442829')
            .replace(/201552946586/g, '201272442829');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Reverted numbers in ${filePath}`);
        }
    }
}

replaceGlobal('src/components/AccessGate.tsx');
replaceGlobal('src/pages/about.tsx');
replaceGlobal('src/pages/index.tsx');
replaceGlobal('src/theme/Root.tsx');

// 2. Set the InstaPay specifically to 01552946586 and fix CSS for compact height
let rootContent = fs.readFileSync('src/theme/Root.tsx', 'utf-8');

// Replace the InstaPay number
// Inside Root.tsx, we have:
// <svg ...> 01272442829 </div>
// We need to replace exactly that one.
rootContent = rootContent.replace(
    /<div className="instapay-address-wrap" dir="ltr">\s*<svg[^>]*>.*?<\/svg>\s*01272442829\s*<\/div>/s,
    `<div className="instapay-address-wrap" dir="ltr">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9019ff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    01552946586
                  </div>`
);

// 3. Compact CSS
const oldCSSRegex = /<style>\{`\s*\.course-gate-overlay \{.*?<\/style>/s;

const newCSS = `<style>{\`
            .course-gate-overlay {
              position: fixed; inset: 0; z-index: 999999;
              display: grid; place-items: center;
              background: rgba(9, 9, 11, 0.9);
              backdrop-filter: blur(40px);
              -webkit-backdrop-filter: blur(40px);
              padding: 10px;
              overflow-y: auto;
            }
            .course-gate-overlay::-webkit-scrollbar { width: 0px; display: none; }
            
            .fintech-card {
              background: linear-gradient(180deg, rgba(39, 39, 42, 0.9) 0%, rgba(24, 24, 27, 0.9) 100%);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 24px;
              padding: 24px;
              width: 100%;
              max-width: 440px;
              box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
              text-align: center;
              animation: ag-scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              margin: auto;
            }
            
            @keyframes ag-scaleUp { 
              from { opacity: 0; transform: scale(0.95) translateY(10px); } 
              to { opacity: 1; transform: scale(1) translateY(0); } 
            }
            
            .fintech-header { margin-bottom: 16px; }
            
            .fintech-header-icon {
              width: 48px; height: 48px; 
              background: rgba(56,189,248,0.1); 
              border-radius: 14px; display: flex; align-items: center; justify-content: center; 
              margin: 0 auto 12px; color: #38bdf8;
            }

            .fintech-title {
              font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 4px;
            }
            .fintech-subtitle {
              color: #a1a1aa; font-size: 0.9rem; line-height: 1.4; margin: 0;
            }

            .instapay-box {
              background: rgba(144, 25, 255, 0.05);
              border: 1px solid rgba(144, 25, 255, 0.3);
              border-radius: 16px;
              padding: 16px;
              margin-bottom: 16px;
              transition: all 0.3s ease;
            }
            .instapay-box:hover {
              background: rgba(144, 25, 255, 0.08);
              box-shadow: 0 0 30px rgba(144, 25, 255, 0.15);
              transform: translateY(-2px);
            }
            .instapay-logo-text {
              font-size: 1.8rem;
              font-weight: 900;
              background: linear-gradient(135deg, #a855f7, #6366f1);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
              display: inline-block;
              letter-spacing: -1px;
            }
            .instapay-address-wrap {
              background: #000;
              padding: 12px 16px;
              border-radius: 12px;
              font-family: 'Inter', monospace;
              font-size: 1.2rem;
              font-weight: 700;
              color: #fff;
              border: 1px solid #3f3f46;
              margin-bottom: 8px;
              display: flex; align-items: center; justify-content: center; gap: 8px;
              box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
            }

            .fintech-btn {
              width: 100%; padding: 14px; border-radius: 16px; font-weight: 700; font-size: 1rem;
              border: none; cursor: pointer; transition: all 0.2s ease;
              display: flex; align-items: center; justify-content: center; gap: 10px;
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
              color: #a1a1aa; background: transparent; border: none; font-size: 0.95rem; font-weight: 600;
              margin-top: 12px; cursor: pointer; transition: color 0.2s; text-decoration: none; padding: 6px;
            }
            .toggle-link:hover { color: #fff; }

            .code-input-wrapper { margin-bottom: 16px; }
            .premium-input {
              width: 100%; background: #000; border: 1px solid #3f3f46; border-radius: 16px;
              padding: 16px; font-size: 1.5rem; color: #fff; text-align: center; letter-spacing: 6px;
              transition: all 0.3s; font-family: monospace; font-weight: 800;
            }
            .premium-input:focus {
              outline: none; border-color: #38bdf8; box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
            }
            
            .msg-alert {
              padding: 12px; border-radius: 12px; font-size: 0.9rem; margin-bottom: 16px; font-weight: 600;
            }
            .msg-error { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
            .msg-success { background: rgba(34, 197, 94, 0.15); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.3); }

            .footer-nav {
              display: flex; gap: 8px; margin-top: 20px; border-top: 1px solid #3f3f46; padding-top: 16px;
            }
            .footer-btn {
              flex: 1; background: #18181b; color: #a1a1aa; border: 1px solid #3f3f46; 
              padding: 10px; border-radius: 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
            }
            .footer-btn:hover { background: #27272a; color: #fff; border-color: #52525b; }
          \`}</style>`;

if (oldCSSRegex.test(rootContent)) {
    rootContent = rootContent.replace(oldCSSRegex, newCSS);
    
    // We also need to fix the header icons to use the smaller class
    rootContent = rootContent.replace(
        /<div style=\{\{\s*width:\s*64,\s*height:\s*64,\s*background:\s*'rgba\(56,189,248,0\.1\)',\s*borderRadius:\s*'18px',\s*display:\s*'flex',\s*alignItems:\s*'center',\s*justifyContent:\s*'center',\s*margin:\s*'0 auto 1rem',\s*color:\s*'#38bdf8'\s*\}\}>/g,
        '<div className="fintech-header-icon">'
    );
    
    fs.writeFileSync('src/theme/Root.tsx', rootContent);
    console.log("Updated Root.tsx successfully!");
} else {
    console.log("Could not find the CSS block to replace in Root.tsx.");
}
