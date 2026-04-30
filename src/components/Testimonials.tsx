'use client';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Sales',
    company: 'TechScale Inc.',
    quote: 'AutoCRM transformed our lead flow. We went from manually chasing every inquiry to having a system that instantly qualifies and routes prospects. Our conversion rate jumped 40% in just two months.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    company: 'GrowthBox',
    quote: 'The AI scoring is incredibly accurate. It knows which leads are worth our time before we even talk to them. Our sales team now focuses only on high-quality prospects.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'LaunchPad SaaS',
    quote: 'Setup was painless and the results were immediate. Within a week, we had automated our entire lead nurturing process. I wish I had found this sooner.',
    rating: 5,
  },
];

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Trusted by Teams</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            See what forward-thinking companies are achieving with AutoCRM
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-2xl p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-gray-300 flex-grow mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}