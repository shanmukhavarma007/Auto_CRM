# 🤖 AutoCRM — AI-Powered Lead Capture & Automation

> A modern full-stack CRM frontend that captures leads, validates them server-side, and triggers an automated AI pipeline via Zapier — resulting in automatic email outreach to every qualified lead.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Zapier](https://img.shields.io/badge/Zapier-Automated-ff4a00?style=for-the-badge&logo=zapier)

---

## 📸 What It Does

```
User fills form → Server validates & sanitizes → Zapier webhook fires →
AI qualifies lead → Data saved to Google Sheets CRM → Personalized email sent
```

The entire backend automation is handled by a Zapier workflow:

| Step | Tool | Action |
|------|------|--------|
| 1 | Webhooks by Zapier | Catch Raw Hook (receives lead data) |
| 2 | Code by Zapier | Run JavaScript (transform/enrich data) |
| 3 | Filter by Zapier | Filter conditions (qualify lead) |
| 4 | Google Sheets | Create/update spreadsheet row |
| 5 | AI by Zapier | Analyze and return data |
| 6 | Gmail | Send personalized outreach email |

---

## 🚀 Features

- **Lead Capture Form** — Name, Email, Phone, Product, Demo Request, Budget
- **Server-Side Webhook** — Zapier URL never exposed to the browser
- **Input Sanitization** — All fields sanitized and validated on the server
- **AI Email Outreach** — Every qualified lead receives an automatic email
- **Google Sheets CRM** — Leads stored and organized automatically
- **Production UI** — Dark, premium design with animations and responsive layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Automation | Zapier (6-step workflow) |
| CRM Storage | Google Sheets |
| Email | Gmail via Zapier |
| AI Processing | AI by Zapier |

---

## 📁 Project Structure

```
auto-crm/
├── app/
│   ├── api/
│   │   └── submit-lead/
│   │       └── route.ts        # Server-side Zapier webhook call
│   ├── page.tsx                # Full landing page
│   └── layout.tsx              # Root layout with fonts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── LeadForm.tsx            # Form with client-side validation
│   └── Footer.tsx
├── lib/
│   ├── sanitize.ts             # Input sanitization utilities
│   └── validate.ts             # Validation schemas
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Zapier account with the workflow configured

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/auto-crm.git
cd auto-crm

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root:

```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY/
```

> ⚠️ Never commit this file. The webhook URL must stay server-side only.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Reference

### `POST /api/submit-lead`

Receives form data from the frontend, sanitizes it, and forwards to Zapier.

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "753-492-4967",
  "product": "Mobile",
  "isWantedDemo": "Yes",
  "budget": 50000
}
```

**Zapier Payload (server-side mapping)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "Phone number": "753-492-4967",
  "product": "Mobile",
  "IsWantedDemo": "Yes",
  "Budget": 50000
}
```

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | Lead submitted successfully |
| `400` | Validation failed — response includes which field failed |
| `500` | Server error or Zapier unreachable |

---

## 🔒 Security

- Zapier webhook URL stored in `.env.local` — never sent to the browser
- All inputs sanitized server-side before forwarding
- Field whitelisting on `product` and `budget` values
- HTML tag stripping on text fields
- Email format validated with regex
- Phone number stripped to digits only

### Sanitization Rules

| Field | Rule |
|-------|------|
| `name` | Trim, strip HTML, max 100 chars, letters/spaces/hyphens only |
| `email` | Trim, lowercase, RFC email regex validation |
| `phone` | Strip non-numeric except `+` and `-`, length 7–15 |
| `product` | Whitelist: Mobile, Web, Desktop, Enterprise, SaaS |
| `isWantedDemo` | Coerced to `"Yes"` or `"No"` |
| `budget` | Parsed as integer, whitelist: 10000/25000/50000/100000/250000 |

---

## 🧪 Testing the Webhook

You can test the Zapier webhook directly using a tool like Postman or curl:

```bash
curl -X POST https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "Phone number": "123-456-7890",
    "product": "Mobile",
    "IsWantedDemo": "Yes",
    "Budget": 50000
  }'
```

Expected response:
```json
{ "status": "success" }
```

---

## 🔄 Zapier Workflow Setup

1. **Trigger** — Webhooks by Zapier → Catch Raw Hook
2. **Step 2** — Code by Zapier → Run JavaScript (parse and transform fields)
3. **Step 3** — Filter by Zapier → Only continue if `IsWantedDemo = Yes`
4. **Step 4** — Google Sheets → Create row in `auto_crm` spreadsheet
5. **Step 5** — AI by Zapier → Generate personalized email content
6. **Step 6** — Gmail → Send email to the lead

Google Sheets columns: `Name | Email | Phone Number | Product | IsWantedDemo | Budget`

---

## 📊 Future Enhancements

- [ ] Admin dashboard to view all leads
- [ ] Lead scoring visualization
- [ ] CRM analytics and charts
- [ ] Multi-product support
- [ ] Follow-up email sequences
- [ ] Slack notifications on new leads
- [ ] Auth-protected lead management panel

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT © 2025 — Built as an AI-powered lead automation portfolio project.

---

## 💼 Portfolio Note

This project demonstrates:
- **Full-stack Next.js** with App Router and API routes
- **Security best practices** — server-side secrets, input sanitization
- **No-code automation integration** via Zapier webhooks
- **End-to-end data flow** from UI → API → automation → CRM → email
