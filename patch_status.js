const fs = require('fs');

let content = fs.readFileSync('src/pages/admin.tsx', 'utf-8');

// 1. Change status text from "لم يطلب" to "حساب مسجل"
content = content.replace(
  `: <span className="v-badge neutral">لم يطلب</span>}`,
  `: <span className="v-badge neutral">حساب مسجل</span>}`
);

// 2. Add the delete button to the quick actions in the row
content = content.replace(
  `                            )}
                          </div>
                        </div>
                      ))}
                    </div>`,
  `                            )}
                            <button className="v-btn" style={{ padding: '6px', background: 'rgba(248,113,113,0.1)', color: 'var(--danger)', borderColor: 'rgba(248,113,113,0.2)' }} onClick={() => { setConfirmDelete({id: s.id, name: s.display_name}); }} title="مسح نهائي">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>`
);

fs.writeFileSync('src/pages/admin.tsx', content);
