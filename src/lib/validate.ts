const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_REGEX = /^\+?[\d\-]{7,15}$/;

export interface ValidationError {
  field: string;
  message: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  product: string;
  isWantedDemo: boolean;
  budget: number;
}

export function validateName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length > 100) {
    return 'Name must be 100 characters or less';
  }
  const validNameRegex = /^[a-zA-Z\s\-']+$/;
  if (!validNameRegex.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim().length === 0) {
    return 'Phone number is required';
  }
  const digitsOnly = phone.replace(/[\d]/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return 'Phone number must be 7-15 digits';
  }
  if (!PHONE_DIGITS_REGEX.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
}

export function validateProduct(product: string): string | null {
  const allowed = ['Mobile', 'Web', 'Desktop', 'Enterprise', 'SaaS'];
  if (!product || product.trim().length === 0) {
    return 'Please select a product';
  }
  if (!allowed.includes(product)) {
    return 'Invalid product selection';
  }
  return null;
}

export function validateIsWantedDemo(isWantedDemo: unknown): string | null {
  if (isWantedDemo === undefined || isWantedDemo === null) {
    return 'Please select an option';
  }
  return null;
}

export function validateBudget(budget: unknown): string | null {
  const allowed = [10000, 25000, 50000, 100000, 250000];
  if (budget === undefined || budget === null) {
    return 'Please select a budget';
  }
  const budgetNum = typeof budget === 'number' ? budget : parseInt(String(budget), 10);
  if (isNaN(budgetNum) || !allowed.includes(budgetNum)) {
    return 'Invalid budget selection';
  }
  return null;
}

export function validateLeadForm(data: LeadFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateName(data.name);
  if (nameError) errors.push({ field: 'name', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const productError = validateProduct(data.product);
  if (productError) errors.push({ field: 'product', message: productError });

  const demoError = validateIsWantedDemo(data.isWantedDemo);
  if (demoError) errors.push({ field: 'isWantedDemo', message: demoError });

  const budgetError = validateBudget(data.budget);
  if (budgetError) errors.push({ field: 'budget', message: budgetError });

  return errors;
}