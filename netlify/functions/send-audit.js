// Env vars required in Netlify dashboard:
//   ANTHROPIC_API_KEY  — from console.anthropic.com
//   BREVO_API_KEY      — from brevo.com (free: 300 emails/day, no domain needed)
//   FROM_EMAIL         — verified sender email in Brevo (can be your Gmail)
//   NOTIFY_EMAIL       — BCC to your own inbox (optional, defaults to anders.parr02@gmail.com)

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Ugyldig format' }) };
  }

  const { name, email, company, size, tasks = [], response_time, dream } = data;

  if (!name || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Navn og e-post er påkrevd' }) };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Ugyldig e-postadresse' }) };
  }

  // --- Generate report via Claude ---
  const taskList = Array.isArray(tasks) ? tasks.join(', ') : tasks;

  const prompt = `Du er Anders Parr, AI-automatiseringskonsulent basert i Bergen. En bedriftseier har fylt ut et gratis audit-skjema.

Svar fra skjemaet:
- Navn: ${name}
- Bedrift/bransje: ${company || 'ikke oppgitt'}
- Virksomhetsstørrelse: ${size || 'ikke oppgitt'}
- Responstid på nye henvendelser: ${response_time || 'ikke oppgitt'}
- Oppgaver som tar mest tid: ${taskList || 'ikke oppgitt'}
- Ønsket automatisering: ${dream || 'ikke oppgitt'}

Skriv en personlig AI-automatiseringsrapport til ${name} på norsk. Strukturen:

1. Én personlig innledning (maks 2 setninger) som viser at du har lest svarene.
2. De 2–3 mest relevante automatiseringsmulighetene for akkurat dem, basert på disse fem typene:
   - Speed to Lead: automatisk svar på nye leads innen sekunder (aktuelt hvis responstid er lang)
   - Automatisk oppfølging: sekvenser som fortsetter til noen svarer (aktuelt ved salgspipeline-problemer)
   - Database Reactivation: reaktivere gamle kontakter/kunder (aktuelt ved eksisterende kundebase)
   - Dokumentprosessering: automatisk ekstraksjon fra PDF/fakturaer (aktuelt ved manuell dataflytting)
   - Intern rapportering: automatisk KPI-distribusjon (aktuelt ved manuell rapportering)
   For hvert punkt: navn, hva det løser for akkurat dem, estimert tidsbesparelse.
3. Én avsluttende setning med CTA: book gratis 30-min kartlegging på https://calendly.com/anders-parr02/30min

Maks 380 ord. Ikke bruk markdown-tegn som **, *, ##. Bruk vanlig tekst med linjeskift. Profesjonelt, direkte og vennlig norsk.`;

  let reportText;
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!claudeRes.ok) {
      console.error('Claude API error:', await claudeRes.text());
      return { statusCode: 500, body: JSON.stringify({ error: 'Kunne ikke generere rapport' }) };
    }

    const claudeData = await claudeRes.json();
    reportText = claudeData.content[0].text;
  } catch (err) {
    console.error('Claude fetch error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Kunne ikke generere rapport' }) };
  }

  // --- Send email via Brevo (no domain needed — works with Gmail address) ---
  const reportHtml = reportText
    .split('\n')
    .filter(l => l.trim())
    .map(l => `<p style="margin:0 0 14px;line-height:1.8;color:#444">${l}</p>`)
    .join('');

  const fromEmail = process.env.FROM_EMAIL || 'anders.parr02@gmail.com';

  const emailHtml = `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Din AI-automatiseringsrapport</title>
</head>
<body style="margin:0;padding:0;background:#f5f3f0;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f0;padding:40px 16px">
<tr><td align="center">
<table width="100%" style="max-width:580px;background:#fff;border:1px solid #e0dbd4">

  <!-- Header -->
  <tr><td style="padding:32px 40px 24px;border-bottom:1px solid #e8e3dd">
    <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999">Anders Parr Consulting</p>
  </td></tr>

  <!-- Title -->
  <tr><td style="padding:40px 40px 8px">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D97A3D">— Din gratis rapport</p>
    <h1 style="margin:0;font-weight:400;font-size:30px;line-height:1.15;color:#1A1614">Hei ${name} —<br>her er din AI-automatiseringsrapport</h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px 40px 8px">
    ${reportHtml}
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:16px 40px 40px">
    <a href="https://calendly.com/anders-parr02/30min"
       style="display:inline-block;padding:14px 32px;background:#D97A3D;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase">
      Book gratis 30-min kartlegging
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 40px;border-top:1px solid #e8e3dd;background:#faf9f7">
    <p style="margin:0 0 4px;font-size:13px;color:#888">Anders Parr · Bergen, Norge</p>
    <p style="margin:0;font-size:13px;color:#aaa">Du mottar denne e-posten fordi du ba om en gratis AI-automatiseringsrapport.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Anders Parr', email: fromEmail },
        to: [{ email, name }],
        bcc: [{ email: process.env.NOTIFY_EMAIL || 'anders.parr02@gmail.com' }],
        subject: `Din AI-automatiseringsrapport, ${name}`,
        htmlContent: emailHtml
      })
    });

    if (!brevoRes.ok) {
      console.error('Brevo error:', await brevoRes.text());
      return { statusCode: 500, body: JSON.stringify({ error: 'Kunne ikke sende e-post' }) };
    }
  } catch (err) {
    console.error('Brevo fetch error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Kunne ikke sende e-post' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true })
  };
};
