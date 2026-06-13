import { NextResponse } from 'next/server';
import { google } from 'googleapis';

async function appendToSheet(values: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

export async function POST(req: Request) {
  try {
    const { name, company, role, email, phone, challenge } = await req.json();

    if (!name || !email || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    await appendToSheet([timestamp, name, company || '', role || '', email, phone || '', challenge]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact/route]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
