# MOET Learning App (Level 3 Electrical Technician)

A premium, AI-integrated study assistant for the Level 3 Maintenance and Operations Engineering Technician End-Point Assessment.

## Features

- **Dashboard**: Overview of your study progress and test scores.
- **Study Mode**: Deep dive into all 36 KSBs with key points.
- **Mock Tests**: 30-question timed exams with full explanations (Pass/Merit/Distinction).
- **Portfolio Builder**: AI-assisted evidence writing with auto-KSB tagging.
- **KSB Tracker**: Visual grid showing your coverage across the standard.
- **AI Tutor**: Chat with Gemini for immediate help on technical topics.

## Cloud Deployment (Recommended)

Since local `npm install` may be blocked by network restrictions, we recommend deploying to the cloud. The build process will happen on the host's servers, bypassing your local network issues.

### Deploy to Vercel

1. **Push to GitHub**:
   - Create a new repo on GitHub.
   - Initialize git in this folder: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "initial commit"`
   - Push to your remote repo.

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com).
   - Import your GitHub repository.
   - Click **Deploy**.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini API (AI Studio)
- **Persistence**: LocalStorage (data stays in your browser)
