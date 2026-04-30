export function sanitizeName(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .slice(0, 100)
    .replace(/[^a-zA-Z\s\-']/g, '');
}

export function sanitizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function sanitizePhone(input: string): string {
  const cleaned = input.replace(/[^\d\+\-]/g, '');
  return cleaned;
}

export function sanitizeProduct(input: string): string {
  const allowed = ['Mobile', 'Web', 'Desktop', 'Enterprise', 'SaaS'];
  return allowed.includes(input) ? input : '';
}

export function sanitizeIsWantedDemo(input: unknown): boolean {
  if (typeof input === 'boolean') return input;
  if (typeof input === 'string') {
    const lower = input.toLowerCase();
    if (lower === 'yes' || lower === 'true') return true;
    if (lower === 'no' || lower === 'false') return false;
  }
  return false;
}

export function sanitizeBudget(input: unknown): number | null {
  const allowed = [10000, 25000, 50000, 100000, 250000];
  if (typeof input === 'number') {
    return allowed.includes(input) ? input : null;
  }
  if (typeof input === 'string') {
    const parsed = parseInt(input, 10);
    return allowed.includes(parsed) ? parsed : null;
  }
  return null;
}