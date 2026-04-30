'use client';

import { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  isWantedDemo?: string;
  budget?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  product: string;
  isWantedDemo: string;
  budget: string;
}

const products = ['Mobile', 'Web', 'Desktop', 'Enterprise', 'SaaS'];
const budgets = [
  { value: 10000, label: '$10,000' },
  { value: 25000, label: '$25,000' },
  { value: 50000, label: '$50,000' },
  { value: 100000, label: '$100,000' },
  { value: 250000, label: '$250,000+' },
];

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    product: '',
    isWantedDemo: '',
    budget: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState<string>('');

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length > 100) return 'Name must be 100 characters or less';
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) {
          return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const digits = value.replace(/\D/g, '');
        if (digits.length < 7 || digits.length > 15) {
          return 'Phone number must be 7-15 digits';
        }
        return undefined;
      case 'product':
        if (!value) return 'Please select a product';
        if (!products.includes(value)) return 'Invalid product selection';
        return undefined;
      case 'isWantedDemo':
        if (!value) return 'Please select an option';
        return undefined;
      case 'budget':
        if (!value) return 'Please select a budget';
        const validBudgets = ['10000', '25000', '50000', '100000', '250000'];
        if (!validBudgets.includes(value)) return 'Invalid budget selection';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setApiError('');

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.replace(/[^\d\+\-]/g, ''),
          product: formData.product,
          isWantedDemo: formData.isWantedDemo === "Yes",
          budget: Number(formData.budget),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          product: '',
          isWantedDemo: '',
          budget: '',
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setApiError(errorData.error || "Something went wrong. Please try again.");
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-started" className="py-24 px-6 bg-surface/50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl font-bold mb-4">
            Get Started — Our AI Will Reach Out
          </h2>
          <p className="text-gray-400 text-lg">
            Fill out the form below and we&apos;ll be in touch shortly
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center">
              Your request has been received. Our AI will contact you shortly.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
              {apiError || "Something went wrong. Please try again."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                suppressHydrationWarning={true}
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-border'
                }`}
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                suppressHydrationWarning={true}
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-border'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                suppressHydrationWarning={true}
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-500' : 'border-border'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-2">
                Product
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                onBlur={handleBlur}
                suppressHydrationWarning={true}
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                  errors.product ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.product && <p className="mt-1 text-sm text-red-400">{errors.product}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wants Demo?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isWantedDemo"
                    value="Yes"
                    checked={formData.isWantedDemo === 'Yes'}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-4 h-4 accent-accent-primary"
                  />
                  <span className="text-gray-300">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isWantedDemo"
                    value="No"
                    checked={formData.isWantedDemo === 'No'}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-4 h-4 accent-accent-primary"
                  />
                  <span className="text-gray-300">No</span>
                </label>
              </div>
              {errors.isWantedDemo && (
                <p className="mt-1 text-sm text-red-400">{errors.isWantedDemo}</p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onBlur={handleBlur}
                suppressHydrationWarning={true}
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                  errors.budget ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select your budget</option>
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
              {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-accent-primary hover:bg-accent-primary/80 disabled:bg-accent-primary/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing your request...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}