import { NextResponse } from 'next/server';
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  sanitizeProduct,
  sanitizeIsWantedDemo,
} from '@/lib/sanitize';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/27303729/uvftqql/';

const ALLOWED_BUDGETS = [10000, 25000, 50000, 100000, 250000];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const sanitizedName = sanitizeName(body.name || '');
    const sanitizedEmail = sanitizeEmail(body.email || '');
    const sanitizedPhone = sanitizePhone(body.phone || '');
    const sanitizedProduct = sanitizeProduct(body.product || '');
    const sanitizedIsWantedDemo = sanitizeIsWantedDemo(body.isWantedDemo);
    const budget = parseInt(body.budget, 10);

    if (!sanitizedName || sanitizedName.trim().length === 0) {
      console.log("Validation failed:", "name", body.name);
      return Response.json({ error: "Invalid field", field: "name" }, { status: 400 });
    }

    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      console.log("Validation failed:", "email", body.email);
      return Response.json({ error: "Invalid field", field: "email" }, { status: 400 });
    }

    const phoneDigits = sanitizedPhone.replace(/\D/g, '');
    if (!sanitizedPhone || phoneDigits.length < 7 || phoneDigits.length > 15) {
      console.log("Validation failed:", "phone", body.phone);
      return Response.json({ error: "Invalid field", field: "phone" }, { status: 400 });
    }

    if (!sanitizedProduct || !['Mobile', 'Web', 'Desktop', 'Enterprise', 'SaaS'].includes(sanitizedProduct)) {
      console.log("Validation failed:", "product", body.product);
      return Response.json({ error: "Invalid field", field: "product" }, { status: 400 });
    }

    if (typeof sanitizedIsWantedDemo !== 'boolean') {
      console.log("Validation failed:", "isWantedDemo", body.isWantedDemo);
      return Response.json({ error: "Invalid field", field: "isWantedDemo" }, { status: 400 });
    }

    if (isNaN(budget) || !ALLOWED_BUDGETS.includes(budget)) {
      console.log("Validation failed:", "budget", body.budget);
      return Response.json({ error: "Invalid field", field: "budget" }, { status: 400 });
    }

    const payload = {
      name: sanitizedName,
      email: sanitizedEmail,
      'Phone number': sanitizedPhone,
      product: sanitizedProduct,
      IsWantedDemo: sanitizedIsWantedDemo ? 'Yes' : 'No',
      Budget: budget,
    };

    console.log("=== ZAPIER PAYLOAD ===", JSON.stringify(payload, null, 2));

    const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log("Zapier status:", zapierResponse.status);
    const zapierBody = await zapierResponse.text();
    console.log("Zapier response:", zapierBody);

    if (!zapierResponse.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to submit to webhook' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}