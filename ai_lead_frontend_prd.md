# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 🧩 Product Name
AI Lead Capture & Conversion Frontend

---

## 🎯 Objective
Build a modern frontend website that captures user leads through a form and sends the data to a Zapier webhook, triggering an automated backend workflow for lead qualification, storage, AI processing, and email outreach.

---

## 🌐 Webhook Endpoint
https://hooks.zapier.com/hooks/catch/27303729/uvftqql/

---

## 🧠 Product Overview
This system simulates a real-world business website where:
1. A user visits a professional landing page
2. Submits a lead form
3. Data is sent to a webhook
4. Backend automation processes and responds

---

## 🧾 Lead Capture Form Fields

- Name (text)
- Email (email)
- Phone Number (tel)
- Product (text or dropdown)
- IsWantedDemo (boolean / checkbox)
- Budget (dropdown or number)

---

## ⚙️ Form Submission Logic

### Example Request
```javascript
await fetch("https://hooks.zapier.com/hooks/catch/27303729/uvftqql/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    phone,
    product,
    isWantedDemo,
    budget
  })
});
```

---

## 🎨 Frontend Requirements

### Landing Page Sections
- Hero Section
- Features/Services
- Testimonials
- CTA
- Lead Form

---

## ⚡ UX Behavior

### Loading
“Analyzing your request…”

### Success
“Your request has been received. Our AI will contact you shortly.”

### Error
“Something went wrong. Please try again.”

---

## 🎨 Tech Stack

- Next.js
- Tailwind CSS

---

## 📱 Responsiveness
- Mobile-first
- Works on all screen sizes

---

## 🧪 Testing

- Submit form → webhook triggered
- Data flows through Zapier
- Email is sent

---

## 🔒 Security

- Basic input validation
- Prevent empty/invalid submissions

---

## 📊 Future Enhancements

- Admin dashboard
- Lead analytics
- CRM integration

---

## 💼 Portfolio Positioning

AI-Powered Lead Automation System:
Frontend captures leads → webhook triggers automation → AI processes → email outreach

---

## ✅ Success Criteria

- Webhook triggers successfully
- Data processed end-to-end
- Emails sent
- UI is production-ready
