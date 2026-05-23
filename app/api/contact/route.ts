import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, company, role, email, phone, challenge } = await req.json();

    if (!name || !email || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: 'info@3cmediamktg.com',
      replyTo: email,
      subject: `New lead: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#070A0D;color:#F4F7F8;padding:40px;border-radius:4px;">
          <div style="border-bottom:1px solid rgba(26,95,122,0.3);padding-bottom:24px;margin-bottom:24px;">
            <p style="color:#7ECECA;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 8px;">3C Waypoint</p>
            <h1 style="color:#F4F7F8;font-size:22px;margin:0;">New Contact Form Submission</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
            <tr>
              <td style="padding:10px 0;color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:110px;vertical-align:top;">Name</td>
              <td style="padding:10px 0;font-size:15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Company</td>
              <td style="padding:10px 0;font-size:15px;">${company || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Role</td>
              <td style="padding:10px 0;font-size:15px;">${role || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Email</td>
              <td style="padding:10px 0;font-size:15px;"><a href="mailto:${email}" style="color:#7ECECA;text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Phone</td>
              <td style="padding:10px 0;font-size:15px;">${phone || '—'}</td>
            </tr>
          </table>
          <div style="background:rgba(26,95,122,0.08);border:1px solid rgba(26,95,122,0.25);border-radius:2px;padding:20px;">
            <p style="color:rgba(244,247,248,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">Biggest visibility challenge</p>
            <p style="font-size:15px;line-height:1.65;margin:0;white-space:pre-wrap;">${challenge}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact/route]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
