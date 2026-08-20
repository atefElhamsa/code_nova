const fs = require('fs');

let settingsContent = fs.readFileSync('src/pages/settings.tsx', 'utf-8');

// Replace the stStyles block
const oldStylesRegex = /const stStyles = `.+?`;/s;

const newStyles = `const stStyles = \`
  :root {
    --st-bg: #09090b;
    --st-surface: #18181b;
    --st-border: rgba(255,255,255,0.05);
    --st-text: #f4f4f5;
    --st-text-muted: #94a3b8;
    --st-primary: #38bdf8;
    --st-primary-glow: rgba(56, 189, 248, 0.2);
    --st-danger: #f87171;
  }

  .st-page {
    background-color: var(--st-bg);
    min-height: calc(100vh - 60px);
    font-family: 'Cairo', 'Inter', system-ui, sans-serif;
    direction: rtl;
    padding: 60px 20px;
    position: relative;
    overflow-x: hidden;
  }

  .st-page::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    height: 80vw;
    background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
  }

  .st-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .st-layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  /* Sidebar Styles */
  .st-sidebar {
    width: 300px;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid var(--st-border);
    border-radius: 32px;
    padding: 30px 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    position: sticky;
    top: 100px;
    flex-shrink: 0;
  }

  .st-sidebar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--st-border);
    margin-bottom: 20px;
    position: relative;
  }

  .st-back-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--st-text-muted);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid var(--st-border);
  }
  .st-back-home:hover {
    background: rgba(56, 189, 248, 0.1);
    color: var(--st-primary);
    border-color: rgba(56, 189, 248, 0.3);
    transform: translateX(-5px);
  }
  .st-back-home svg { width: 20px; height: 20px; }

  .st-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 4px solid var(--st-surface);
    box-shadow: 0 0 0 2px var(--st-primary), 0 10px 30px var(--st-primary-glow);
    object-fit: cover;
    margin-bottom: 20px;
    transition: transform 0.3s;
  }
  .st-avatar:hover {
    transform: scale(1.05);
  }

  .st-avatar-placeholder {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
    border: 4px solid var(--st-surface);
    box-shadow: 0 0 0 2px var(--st-primary), 0 10px 30px var(--st-primary-glow);
    margin-bottom: 20px;
  }

  .st-user-info { width: 100%; overflow: hidden; }

  .st-user-name {
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--st-text);
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .st-user-email {
    font-size: 0.95rem;
    color: var(--st-text-muted);
    margin: 0;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .st-nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .st-nav-item {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 16px 20px;
    border-radius: 16px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--st-text-muted);
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: right;
  }

  .st-nav-item svg {
    width: 22px;
    height: 22px;
    opacity: 0.7;
    transition: all 0.3s;
  }

  .st-nav-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--st-text);
    transform: translateX(-4px);
  }

  .st-nav-item.active {
    background: linear-gradient(90deg, rgba(56,189,248,0.1), transparent);
    border-color: rgba(56,189,248,0.2);
    color: var(--st-primary);
    box-shadow: inset -4px 0 0 var(--st-primary);
  }

  .st-nav-item.active svg {
    opacity: 1;
    color: var(--st-primary);
  }

  .st-nav-divider {
    height: 1px;
    background: var(--st-border);
    margin: 12px 0;
  }

  .st-nav-danger {
    color: var(--st-danger);
  }
  .st-nav-danger:hover {
    background: rgba(248, 113, 113, 0.1);
    color: var(--st-danger);
    transform: translateX(-4px);
  }
  .st-nav-danger svg {
    color: var(--st-danger);
  }

  /* Main Content Styles */
  .st-content {
    flex: 1;
    min-width: 0;
    animation: fadeUp 0.6s ease-out;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .st-page-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--st-text);
    margin: 0 0 10px;
    letter-spacing: -0.5px;
  }

  .st-page-sub {
    font-size: 1.15rem;
    color: var(--st-text-muted);
    margin: 0;
  }

  .mt-6 { margin-top: 2.5rem; }
  .mt-4 { margin-top: 1.5rem; }

  .st-card {
    background: var(--st-surface);
    border: 1px solid var(--st-border);
    border-radius: 28px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    transition: transform 0.3s, border-color 0.3s;
  }

  .st-card:hover {
    border-color: rgba(255,255,255,0.1);
  }

  .st-card-hdr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--st-border);
  }

  .st-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--st-text);
    margin: 0;
  }

  .st-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .st-full-width {
    grid-column: 1 / -1;
  }

  .st-inp-wrap {
    margin-bottom: 8px;
  }

  .st-label {
    display: block;
    font-size: 0.95rem;
    color: #cbd5e1;
    margin-bottom: 12px;
    font-weight: 800;
  }

  .st-inp {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--st-border);
    border-radius: 16px;
    color: var(--st-text);
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    box-sizing: border-box;
  }

  .st-inp:focus {
    border-color: var(--st-primary);
    background: rgba(56, 189, 248, 0.03);
    box-shadow: 0 0 0 4px var(--st-primary-glow);
  }

  .st-inp:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0,0,0,0.2);
  }

  .st-inp-hint {
    display: block;
    font-size: 0.85rem;
    color: #64748b;
    margin-top: 10px;
  }

  .st-form-actions {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }

  .st-btn {
    padding: 16px 36px;
    border-radius: 16px;
    font-size: 1.05rem;
    font-weight: 800;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .st-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  .st-btn-primary {
    background: var(--st-primary);
    color: #000;
    box-shadow: 0 10px 20px var(--st-primary-glow);
  }

  .st-btn-primary:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px var(--st-primary-glow);
  }

  .st-btn-danger {
    background: rgba(248, 113, 113, 0.1);
    color: var(--st-danger);
    border: 1px solid rgba(248, 113, 113, 0.2);
    width: 100%;
  }

  .st-btn-danger:hover {
    background: rgba(248, 113, 113, 0.2);
    border-color: rgba(248, 113, 113, 0.4);
    transform: translateY(-2px);
  }

  .st-msg { color: #34d399; font-size: 0.95rem; font-weight: 700; background: rgba(52, 211, 153, 0.1); padding: 10px 16px; border-radius: 12px; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-err { color: var(--st-danger); font-size: 0.95rem; font-weight: 700; background: rgba(248, 113, 113, 0.1); padding: 14px 20px; border-radius: 14px; border: 1px solid rgba(248, 113, 113, 0.2); margin-bottom: 24px; }

  /* Status Box */
  .st-status-box {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--st-border);
    border-radius: 24px;
    transition: transform 0.3s;
  }
  .st-status-box:hover {
    transform: translateY(-3px);
    border-color: rgba(255,255,255,0.1);
  }

  .st-status-icon {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .st-status-icon.approved { background: rgba(52, 211, 153, 0.1); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.2); }
  .st-status-icon.pending { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  
  .st-status-icon svg { width: 32px; height: 32px; }

  /* Course Grid */
  .st-course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .st-course-card {
    position: relative;
    border-radius: 28px;
    padding: 30px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--st-border);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .st-course-card:hover {
    transform: translateY(-8px);
    background: rgba(255,255,255,0.04);
  }
  .st-course-card.js:hover { border-color: rgba(250, 204, 21, 0.4); box-shadow: 0 15px 35px rgba(250, 204, 21, 0.15); }
  .st-course-card.flutter:hover { border-color: rgba(14, 165, 233, 0.4); box-shadow: 0 15px 35px rgba(14, 165, 233, 0.15); }
  .st-course-card.cpp:hover { border-color: rgba(249, 115, 22, 0.4); box-shadow: 0 15px 35px rgba(249, 115, 22, 0.15); }
  .st-course-card.python:hover { border-color: rgba(55, 118, 171, 0.4); box-shadow: 0 15px 35px rgba(55, 118, 171, 0.15); }

  .st-course-card-bg { position: absolute; inset: 0; background: radial-gradient(circle at 50% -20%, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none; }
  .st-course-card-content { position: relative; z-index: 2; width: 100%; display: flex; flex-direction: column; align-items: center; }

  .st-course-icon-large {
    width: 80px;
    height: 80px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    transition: transform 0.4s;
  }
  .st-course-card:hover .st-course-icon-large {
    transform: scale(1.1) translateY(-5px);
  }
  .st-course-card.js .st-course-icon-large { background: rgba(250, 204, 21, 0.1); color: #facc15; border: 1px solid rgba(250, 204, 21, 0.2); }
  .st-course-card.flutter .st-course-icon-large { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
  .st-course-card.cpp .st-course-icon-large { background: rgba(249, 115, 22, 0.1); color: #f97316; border: 1px solid rgba(249, 115, 22, 0.2); }
  .st-course-card.python .st-course-icon-large { background: rgba(55, 118, 171, 0.1); color: #4da8da; border: 1px solid rgba(55, 118, 171, 0.2); }
  .st-course-card.all .st-course-icon-large { background: rgba(167, 139, 250, 0.1); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.2); }
  .st-course-icon-large svg { width: 40px; height: 40px; }

  .st-course-card-title { font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0 0 10px; }
  .st-course-card-date { font-size: 0.95rem; color: var(--st-text-muted); margin: 0 0 28px; }

  .st-btn-go-full {
    width: 100%;
    padding: 14px;
    background: rgba(255,255,255,0.03);
    color: var(--st-text);
    border-radius: 16px;
    text-decoration: none !important;
    font-weight: 800;
    font-size: 1.05rem;
    transition: all 0.3s;
    border: 1px solid var(--st-border);
    display: block;
    text-align: center;
  }
  .st-course-card.js .st-btn-go-full:hover { background: #facc15; color: #000; border-color: #facc15; }
  .st-course-card.flutter .st-btn-go-full:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; }
  .st-course-card.cpp .st-btn-go-full:hover { background: #f97316; color: #fff; border-color: #f97316; }
  .st-course-card.python .st-btn-go-full:hover { background: #3776ab; color: #fff; border-color: #3776ab; }
  .st-course-card.all .st-btn-go-full:hover { background: #a78bfa; color: #fff; border-color: #a78bfa; }

  /* Danger Card */
  .st-danger-card {
    border: 1px solid rgba(248, 113, 113, 0.2);
    background: rgba(248, 113, 113, 0.02);
  }
  .st-danger-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .st-danger-icon {
    width: 60px; height: 60px; border-radius: 16px;
    background: rgba(248, 113, 113, 0.1); color: var(--st-danger);
    display: flex; align-items: center; justify-content: center;
  }
  .st-danger-icon svg { width: 30px; height: 30px; }

  .st-empty {
    text-align: center;
    padding: 60px 20px;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 28px;
    border: 2px dashed rgba(255, 255, 255, 0.08);
  }

  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  /* Phone Input Overrides */
  .react-tel-input { font-family: inherit; direction: ltr; margin-bottom: 0 !important; }
  .react-tel-input .flag { display: none !important; }
  .react-tel-input .form-control { 
    width: 100% !important; padding: 16px 20px 16px 84px !important; height: auto !important;
    background: rgba(255,255,255,.02) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px !important; color: var(--st-text) !important; font-size: 1rem !important; 
    transition: all .3s !important; outline: none !important; box-shadow: none !important;
  }
  .react-tel-input .form-control:focus { border-color: var(--st-primary) !important; background: rgba(56,189,248,.03) !important; box-shadow: 0 0 0 4px var(--st-primary-glow) !important; }
  .react-tel-input .flag-dropdown { 
    background: rgba(255,255,255,.03) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px 0 0 16px !important; border-right: none !important; padding: 0 !important;
    width: 70px !important; display: flex !important; align-items: center !important; justify-content: center !important;
  }
  .react-tel-input .flag-dropdown:hover, .react-tel-input .flag-dropdown.open { background: rgba(255,255,255,.07) !important; }
  .react-tel-input .selected-flag { border-radius: 16px 0 0 16px !important; width: 100% !important; padding: 0 !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important; }
  .react-tel-input .selected-flag .arrow { left: auto !important; right: auto !important; position: static !important; border-top-color: var(--st-text-muted) !important; margin-right: 38px !important; }
  .react-tel-input .selected-flag .arrow.up { border-bottom-color: var(--st-text-muted) !important; }
  .react-tel-input .country-list { 
    background: var(--st-surface) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 16px !important; color: var(--st-text) !important; 
    box-shadow: 0 20px 40px rgba(0,0,0,.3) !important; margin-top: 10px !important; text-align: left !important;
    max-height: 250px !important; overflow-y: auto !important; direction: ltr !important;
  }
  .react-tel-input .country-list::-webkit-scrollbar { width: 6px; }
  .react-tel-input .country-list::-webkit-scrollbar-thumb { background: rgba(56,189,248,.3); border-radius: 10px; }
  .react-tel-input .country-list .country { padding: 12px 16px !important; transition: background .2s; display: flex; align-items: center; direction: ltr !important; text-align: left !important; }
  .react-tel-input .country-list .country:hover, .react-tel-input .country-list .country.highlight { background: rgba(56,189,248,.1) !important; }
  .react-tel-input .country-list .country .dial-code { color: var(--st-text-muted) !important; margin-left: 8px !important; direction: ltr !important; }
  .react-tel-input .country-list .country .country-name { color: var(--st-text) !important; margin-right: 8px !important; }
  .react-tel-input .search { background: var(--st-surface) !important; padding: 12px !important; border-bottom: 1px solid var(--st-border); border-radius: 16px 16px 0 0 !important; z-index: 2; position: sticky; top: 0; }
  .react-tel-input .search-box { 
    background: rgba(255,255,255,.03) !important; border: 1px solid var(--st-border) !important; 
    border-radius: 12px !important; color: #fff !important; width: 100% !important; 
    padding: 10px 14px !important; outline: none; margin: 0 !important; font-family: inherit; direction: rtl;
  }
  .st-dial-code {
    position: absolute; top: 0; left: 30px; height: 100%; display: flex; align-items: center;
    color: var(--st-text); font-weight: 800; font-size: 1rem; pointer-events: none; z-index: 1; direction: ltr;
  }

  @media (max-width: 900px) {
    .st-layout { flex-direction: column; gap: 24px; }
    .st-sidebar { width: 100%; position: static; padding: 24px; display: block; border-radius: 24px; }
    .st-sidebar-header { 
      flex-direction: row; text-align: right; justify-content: flex-start;
      gap: 20px; align-items: center; padding-bottom: 20px; margin-bottom: 20px;
    }
    .st-avatar, .st-avatar-placeholder { margin-bottom: 0; width: 80px; height: 80px; font-size: 2rem; }
    .st-user-name { font-size: 1.3rem; }
    .st-user-email { font-size: 0.9rem; }
    
    .st-nav-menu { 
      flex-direction: row; 
      overflow-x: auto; 
      padding-bottom: 10px;
      margin: 0 -10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    .st-nav-menu::-webkit-scrollbar { height: 0; width: 0; display: none; }
    
    .st-nav-item { 
      width: auto; 
      white-space: nowrap; 
      padding: 12px 20px; 
      background: rgba(255,255,255,0.03); 
      border: 1px solid var(--st-border);
      border-radius: 100px;
      box-shadow: none !important;
    }
    .st-nav-divider { display: none; }
  }

  @media (max-width: 600px) {
    .st-form-grid { grid-template-columns: 1fr; }
    .st-nav-item { min-width: 100%; justify-content: flex-start; }
    .st-card { padding: 30px 20px; }
  }
\`;`;

settingsContent = settingsContent.replace(oldStylesRegex, newStyles);

fs.writeFileSync('src/pages/settings.tsx', settingsContent);
