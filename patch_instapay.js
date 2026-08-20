const fs = require('fs');

let rootContent = fs.readFileSync('src/theme/Root.tsx', 'utf-8');

// Update the handle
rootContent = rootContent.replace(/codenova@instapay/g, 'atefelhamsa@instapay');

// Find the InstaPay logo text and replace it with an icon + text
const oldLogoText = '<div className="instapay-logo-text">InstaPay</div>';
const newLogoText = `<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#instapay-grad)" fillOpacity="0.1"/>
                      <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12V16M16 16L18 14M16 16L14 14" stroke="url(#instapay-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12V8M8 8L6 10M8 8L10 10" stroke="url(#instapay-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="instapay-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#a855f7" />
                          <stop offset="1" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="instapay-logo-text" style={{ marginBottom: 0 }}>InstaPay</div>
                  </div>`;

rootContent = rootContent.replace(oldLogoText, newLogoText);

fs.writeFileSync('src/theme/Root.tsx', rootContent);
console.log("Updated handle and added InstaPay icon.");
