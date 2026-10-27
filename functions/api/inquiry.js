export async function onRequestPost({ request, env }) {
  const f = await request.formData();
  const ts = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: f.get('cf-turnstile-response') || '' })
  }).then(r => r.json());
  if (!ts.success) return new Response('Captcha check failed. Go back and try again.', { status: 400 });
  const text = ['name', 'email', 'phone', 'address', 'message'].map(k => `${k}: ${f.get(k) || ''}`).join('\n') + `\nemail list: ${f.get('list') ? 'yes' : 'no'}`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.FROM_EMAIL, to: env.TO_EMAIL, reply_to: f.get('email'), subject: 'Litter inquiry', text })
  });
  return r.ok ? Response.redirect(new URL('/?sent=1#contact', request.url), 303) : new Response('Message failed to send. Please call instead.', { status: 502 });
}
