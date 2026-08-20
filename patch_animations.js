const fs = require('fs');

let content = fs.readFileSync('src/pages/admin.tsx', 'utf-8');

// 1. Add keyframes
content = content.replace('/* ── Main Content ── */', `
        @keyframes vSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes vFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
          50% { box-shadow: 0 0 25px rgba(56, 189, 248, 0.8); }
          100% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
        }
        
        /* ── Main Content ── */`);

// 2. Change v-logo-icon
content = content.replace(`.v-logo-icon {
          width: 32px; height: 32px; border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), var(--purple));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px var(--primary-glow);
        }`, `.v-logo-icon {
          width: 44px; height: 44px; border-radius: 14px;
          background: rgba(56, 189, 248, 0.15); color: var(--primary);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex; align-items: center; justify-content: center;
          animation: glowPulse 2.5s infinite;
        }`);

// 3. Update v-stat-card css
content = content.replace(`.v-stat-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
          transition: transform 0.2s, border-color 0.2s;
        }`, `.v-stat-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
          transition: transform 0.2s, border-color 0.2s;
          animation: vSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .v-stat-card:nth-child(1) { animation-delay: 0.1s; }
        .v-stat-card:nth-child(2) { animation-delay: 0.2s; }
        .v-stat-card:nth-child(3) { animation-delay: 0.3s; }
        .v-stat-card:nth-child(4) { animation-delay: 0.4s; }`);

// 4. Update v-table-row css
content = content.replace(`.v-table-row {
          display: grid; padding: 16px 24px; align-items: center; text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: background 0.2s;
        }`, `.v-table-row {
          display: grid; padding: 16px 24px; align-items: center; text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: background 0.2s;
          animation: vSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }`);

// 5. Update maps for stagger animation
content = content.replace(`) : rows.map(s => (
                        <div key={s.id} className="v-table-row" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }} onClick={() => setSelectedUser(s)}>`, 
`) : rows.map((s, i) => (
                        <div key={s.id} className="v-table-row" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr', animationDelay: \`\${0.1 + (i * 0.05)}s\` }} onClick={() => setSelectedUser(s)}>`);

content = content.replace(`) : accessCodes.map(c => {
                        const isStud = c.code_type === 'student';
                        return (
                          <div key={c.id} className="v-table-row" style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr 1fr 1.5fr' }}>`,
`) : accessCodes.map((c, i) => {
                        const isStud = c.code_type === 'student';
                        return (
                          <div key={c.id} className="v-table-row" style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr 1fr 1.5fr', animationDelay: \`\${0.1 + (i * 0.05)}s\` }}>`);


fs.writeFileSync('src/pages/admin.tsx', content);
