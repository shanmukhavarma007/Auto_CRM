import { NextResponse } from 'next/server';
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  sanitizeProduct,
  sanitizeIsWantedDemo,
  sanitizeBudget,
} from '@/lib/sanitize';
import { validateLeadForm } from '@/lib/validate';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/27303729/uvftqql/';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sanitizedName = sanitizeName(body.name || '');
    const sanitizedEmail = sanitizeEmail(body.email || '');
    const sanitizedPhone = sanitizePhone(body.phone || '');
    const sanitizedProduct = sanitizeProduct(body.product || '');
    const sanitizedIsWantedDemo = sanitizeIsWantedDemo(body.isWantedDemo);
    const sanitizedBudget = sanitizeBudget(body.budget);

    const formData = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      product: sanitizedProduct,
      isWantedDemo: sanitizedIsWantedDemo,
      budget: sanitizedBudget,
    };

    const validationErrors = validateLeadForm(formData);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    const payload = {
      name: sanitizedName,
      email: sanitizedEmail,
      'Phone number': sanitizedPhone,
      product: sanitizedProduct,
      IsWantedDemo: sanitizedIsWantedDemo ? 'Yes' : 'No',
      Budget: sanitizedBudget,
    };

    const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}