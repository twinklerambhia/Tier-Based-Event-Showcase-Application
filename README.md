# 🎉 Tier-Based Event Showcase App

A dynamic event platform where users can access events based on their **subscription tier** (Free, Silver, Gold, Platinum). Built using **Next.js 14 App Router**, **Clerk**, **Supabase**, **TailwindCSS**, and deployed on **Vercel**.

---

## 🚀 Features

- 🔐 Authentication via Clerk
- 🏷️ Tier-based access control using metadata
- 🗂️ Event data managed with Supabase
- 🔄 Simulate tier upgrades (Free → Platinum)
- 🧠 Smart event filtering (by tier)
- 🧊 Blurred locked cards + hover prompt to upgrade
- 📱 Responsive UI using TailwindCSS
- 🔄 Real-time tier changes reflected in the UI

---

## 🧰 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Clerk.dev
- **Database**: Supabase
- **Hosting**: Vercel

---

## 📦 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/twinklerambhia/Tier-Based-Event-Showcase-Application.git
cd Tier-Based-Event-Showcase-Application
```

2. **Install dependencies**

```bash
npm install
```

3. **Add environment variables**

Create a `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the app locally**

```bash
npm run dev
```

---

## 👥 Demo User Credentials

You can log in with the following test accounts (or create your own):

| Tier       | Email                     | Password   |
|------------|---------------------------|------------|
| Free       | free@demo.com             | 12345678   |
| Silver     | silver@demo.com           | 12345678   |
| Gold       | gold@demo.com             | 12345678   |
| Platinum   | platinum@demo.com         | 12345678   |

*You can also simulate upgrades using the dropdown in the UI.*

---

## 🌐 Live Demo

🔗 [**Click here to view the deployed app on Vercel**](https://tier-based-event-showcaseapp.vercel.app/)

---

## ✨ Bonus Features (Optional)

- Tier filter buttons (All, Free, Silver, etc.)
- Real-time tier simulation (metadata updates)
- Smooth UI transitions for locked/blurred cards
- Easy Unsplash image integration for events

---

## 🙏 Acknowledgements

- Clerk for authentication
- Supabase for backend services
- Tailwind for clean UI
- OpenAI GPT for assistance 😉
