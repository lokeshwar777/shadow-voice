# Shadow Voice

Shadow Voice is an anonymous social platform for posting thoughts, creating polls, and receiving AI-generated feedback – developed as a part of a university major project.

Live Link - [shadow-voice.vercel.app](https://shadow-voice.vercel.app)

## Features

* Anonymous posting and participation
* Create and vote in polls
* Smart AI-generated feedback using Gemini
* Secure authentication using JWT
* Containerized with Docker

## Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* shadcn/ui
* Radix UI
* Zod for schema validation
* Lovable AI for UI generation
* Deployed on Vercel

### Backend

* Node.js + Express.js
* MongoDB
* JWT authentication
* Gemini API for AI features
* Deployed on Railway
* Dockerized

## Getting Started (Local Setup)

```bash
# Clone the repo
git clone https://github.com/lokeshwar777/shadow-voice.git
cd shadow-voice

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd ../backend
npm install
npm run dev
```

Make sure to add `.env` files with appropriate environment variables in both folders by taking `.env.sample` as a reference

To spin up docker containers see `docker_commands.md`
