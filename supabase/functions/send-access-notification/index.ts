// Type declaration for Deno global — this file runs on Deno (Supabase Edge Functions),
// not Node.js, so we declare the minimal types needed to silence TS editor errors.
declare const Deno: {
  env: { get(key: string): string | undefined };
};

// @ts-ignore — Deno URL imports are not understood by Node.js TypeScript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ── Generate a random access code (e.g. FL-A3K9) ─────────────────
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no confusing chars (0,O,1,I)
  const part = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${part(3)}-${part(4)}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { requesterInfo, userAgent, timestamp } = await req.json()

    const RESEND_API_KEY     = Deno.env.get('RESEND_API_KEY')
    const SUPABASE_URL       = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const ADMIN_EMAIL        = 'atefelhamsa60@gmail.com'

    if (!RESEND_API_KEY)       throw new Error('RESEND_API_KEY is not set')
    if (!SUPABASE_URL)         throw new Error('SUPABASE_URL is not set')
    if (!SUPABASE_SERVICE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')

    // ── 1. Generate & save code to DB ──────────────────────────────
    const code = generateCode()
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    const { error: dbError } = await supabase
      .from('access_codes')
      .insert({
        code,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        notes: `تلقائي — ${requesterInfo?.substring(0, 60) ?? 'بدون معلومات'}`,
      })

    if (dbError) throw new Error(`DB insert error: ${dbError.message}`)

    // ── 2. Format time ─────────────────────────────────────────────
    const date = new Date(timestamp || Date.now())
    const formattedTime = date.toLocaleString('ar-EG', {
      timeZone: 'Africa/Cairo',
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

    // ── 3. Send email with the code ────────────────────────────────
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Access Gate <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `🔐 طلب وصول جديد — الكود: ${code}`,
        html: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8">
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#04080f;color:#e2e8f0;margin:0;padding:0}
  .wrap{max-width:580px;margin:0 auto;padding:40px 20px}
  .card{background:linear-gradient(135deg,#0c1930,#071120);border:1px solid rgba(14,165,233,.3);border-radius:20px;padding:36px}
  .badge{display:inline-block;background:rgba(14,165,233,.12);border:1px solid rgba(14,165,233,.3);color:#38bdf8;padding:5px 14px;border-radius:100px;font-size:12px;font-weight:700;margin-bottom:20px}
  h1{color:#fff;font-size:20px;margin:0 0 6px}
  .sub{color:#64748b;font-size:13px;margin:0 0 28px}

  /* ── CODE BOX ── */
  .code-box{background:rgba(14,165,233,.08);border:2px solid rgba(14,165,233,.4);border-radius:16px;padding:24px;text-align:center;margin:0 0 28px}
  .code-label{color:#64748b;font-size:12px;font-weight:700;letter-spacing:.08em;margin-bottom:10px}
  .code-value{font-family:'Courier New',monospace;font-size:2.4rem;font-weight:900;color:#38bdf8;letter-spacing:.3em;text-shadow:0 0 20px rgba(14,165,233,.5)}
  .code-expire{color:#475569;font-size:12px;margin-top:10px}

  /* ── INFO ROWS ── */
  .info-grid{display:grid;gap:10px;margin-bottom:24px}
  .row{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
  .lbl{color:#64748b;font-size:12px;font-weight:700}
  .val{color:#e2e8f0;font-size:13px;font-weight:500;text-align:left;direction:ltr;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  /* ── WA button ── */
  .wa-btn{display:block;text-align:center;background:linear-gradient(135deg,#1a7f3c,#25d366);color:#fff;text-decoration:none;padding:13px 24px;border-radius:12px;font-weight:800;font-size:15px;margin-top:10px}
  .footer{text-align:center;margin-top:24px;color:#1e293b;font-size:11px}
</style>
</head>
<body>
<div class="wrap">
<div class="card">
  <div class="badge">🔐 طلب وصول جديد</div>
  <h1>وصل طلب دخول جديد!</h1>
  <p class="sub">أرسل الكود أدناه للزائر عبر واتساب</p>

  <div class="code-box">
    <div class="code-label">كود الوصول — أرسله للزائر</div>
    <div class="code-value">${code}</div>
    <div class="code-expire">⏰ صالح لمدة ساعة واحدة فقط</div>
  </div>

  <div class="info-grid">
    <div class="row">
      <span class="lbl">👤 بيانات الزائر</span>
      <span class="val">${requesterInfo ?? 'بدون معلومات'}</span>
    </div>
    <div class="row">
      <span class="lbl">⏰ وقت الطلب</span>
      <span class="val">${formattedTime}</span>
    </div>
    <div class="row">
      <span class="lbl">🌐 المتصفح</span>
      <span class="val">${(userAgent ?? '').substring(0, 70)}…</span>
    </div>
  </div>

  <a class="wa-btn" href="https://wa.me/201552946586?text=${encodeURIComponent('كودك هو: ' + code + ' — صالح لمدة ساعة ✅')}" target="_blank">
    📲 إرسال الكود للزائر عبر واتساب مباشرة
  </a>
</div>
<div class="footer">Dart &amp; Flutter Pro — Access Gate System</div>
</div>
</body>
</html>`,
      }),
    })

    if (!emailRes.ok) {
      const errorText = await emailRes.text()
      throw new Error(`Resend API error: ${errorText}`)
    }

    const emailData = await emailRes.json()

    return new Response(
      JSON.stringify({ success: true, messageId: emailData.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
