# CollegeGPT

**Your college's day-to-day, answered instantly.**

> 🏅 **Patented.** This project's underlying system/method has been granted a patent.

CollegeGPT is a role-based campus portal with a built-in AI assistant. Students, faculty, and the placement cell each get a tailored dashboard, and a Gemini-powered chatbot answers questions about notes, schedules, placements, and college policy on the spot.

Built as a college mini-project, with a focus on a working end-to-end demo: real role-based access, real Q&A flows, and an AI assistant that's actually useful — not just a chat window bolted on top.

## Features

- **Role-based login** — Students, Faculty, and Placement Cell members each land on a different dashboard based on a whitelisted email.
- **Student Portal**
  - Academic dashboard: event schedule, daily timetable, branch-specific notes
  - Ask-a-Faculty Q&A thread
  - AI chatbot for notes, schedule, and general academic queries
  - Placement dashboard: interview schedules, training resources, job/internship listings
  - Ask-the-Placement-Cell Q&A thread
  - AI chatbot for placement-specific queries
- **Faculty Portal**
  - Respond to student questions
  - View daily teaching schedule
  - Upload notes to a branch-specific drive
  - Post campus-wide notices
  - AI chatbot for admin/policy/research queries
- **Placement Cell Console**
  - Manage placement schedule, training resources, and job postings
  - Respond to student placement queries
  - AI chatbot for drafting responses and policy questions
- **Campus announcements** — a shared notice board visible to everyone

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **AI:** Google Gemini API (`gemini-2.5-flash`), with Google Search grounding enabled
- **Backend:** A minimal serverless function (`api/chat.js`, Vercel-style) that proxies chatbot requests so the Gemini API key stays server-side
- **Data:** Currently mock data (in-memory JS arrays) standing in for a real database — see [Roadmap](#roadmap)

## Project Structure

```
CollegeGPT/
├── public/
│   └── index.html      # Frontend — UI, role dashboards, chatbot widgets
├── api/
│   └── chat.js          # Serverless function — proxies chatbot calls to Gemini
├── .env.example          # Template for required environment variables
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- [Vercel CLI](https://vercel.com/docs/cli) (for local dev with the serverless function): `npm i -g vercel`

### Setup

1. Clone the repo
   ```bash
   git clone https://github.com/<your-username>/CollegeGPT.git
   cd CollegeGPT
   ```

2. Copy the environment template and add your key
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste in your Gemini API key.

3. Run locally
   ```bash
   vercel dev
   ```
   This serves `public/index.html` and runs `api/chat.js` locally so the chatbot works end-to-end.

### Deploying

The project is set up to deploy directly on [Vercel](https://vercel.com/):

1. Push this repo to GitHub
2. Import the repo in Vercel
3. Add `GEMINI_API_KEY` under Project Settings → Environment Variables
4. Deploy

## Test Logins

The app currently uses a whitelisted-email mock auth system (no real password/auth flow yet). Try these:

| Role | Email |
|---|---|
| Student (AI Branch) | `shreyashetty670@gmail.com` |
| Faculty (CS) | `faculty1@gmail.com` |
| Placement Cell | `placement1@gmail.com` |

## Roadmap

- [ ] Replace mock data arrays with a real database (Firebase/Firestore or similar)
- [ ] Real authentication instead of a hardcoded email whitelist
- [ ] Persist Q&A threads and notices across sessions
- [ ] File upload support for notes (currently link-only)

## License

MIT — see [LICENSE](LICENSE).
