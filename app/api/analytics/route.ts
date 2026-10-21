import {NextResponse} from 'next/server';
import {FieldValue} from 'firebase-admin/firestore';
import {adminDb} from '@/lib/firebase-admin';
import {createHash} from 'node:crypto';

export const runtime = 'nodejs';

const events = new Set([
  'page_view',
  'contact_click',
  'whatsapp_click',
  'email_click',
  'service_cta',
  'project_open'
]);

const safe = (v: unknown, max = 60) =>
  String(v || '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, max);

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host) {
      try {
        const o = new URL(origin);
        if (o.host !== host) {
          return NextResponse.json({ok: false}, {status: 403});
        }
      } catch {
        return NextResponse.json({ok: false}, {status: 403});
      }
    }

    const length = Number(req.headers.get('content-length') || 0);
    if (length > 2000) {
      return NextResponse.json({ok: false}, {status: 413});
    }

    // Lightweight rate limit: max 60 events per hashed IP per hour
    const forwarded =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const hash = createHash('sha256')
      .update(
        `${process.env.RATE_LIMIT_SALT || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'analytics'}:${forwarded}`
      )
      .digest('hex');
    const rateRef = adminDb().collection('rateLimits').doc(`analytics_${hash}`);
    const allowed = await adminDb().runTransaction(async (tx) => {
      const snap = await tx.get(rateRef);
      const now = Date.now();
      const old = snap.exists ? snap.data()! : {};
      const start = Number(old.windowStart || now);
      const count = now - start > 3600000 ? 0 : Number(old.count || 0);
      if (count >= 60) return false;
      tx.set(
        rateRef,
        {
          windowStart: count === 0 ? now : start,
          count: count + 1,
          expiresAt: new Date(now + 7200000)
        },
        {merge: true}
      );
      return true;
    });
    if (!allowed) {
      return NextResponse.json({ok: false}, {status: 429});
    }

    const body = await req.json();
    if (!events.has(body.event)) {
      return NextResponse.json({ok: false}, {status: 400});
    }

    const day = new Date().toISOString().slice(0, 10);
    const ref = adminDb().collection('analyticsDaily').doc(day);
    const data: Record<string, unknown> = {
      [`events.${body.event}`]: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp()
    };

    if (body.event === 'page_view') {
      const path = safe(body.path, 100);
      if (path) data[`pages.${path}`] = FieldValue.increment(1);
      const source = safe(body.source);
      const medium = safe(body.medium);
      const campaign = safe(body.campaign);
      if (source || medium || campaign) {
        const key = [source || 'direct', medium || 'none', campaign || 'none']
          .join('__')
          .slice(0, 180);
        data[`campaigns.${key}`] = FieldValue.increment(1);
      }
    }

    await ref.set(data, {merge: true});
    return NextResponse.json(
      {ok: true},
      {headers: {'Cache-Control': 'no-store'}}
    );
  } catch {
    return NextResponse.json({ok: false}, {status: 503});
  }
}
