# 🚀 Cosmic Quiz — Multiplayer Edition

A Kahoot-style real-time multiplayer quiz game built with Node.js, Express, and Socket.io.

---

## Project Structure

```
cosmic-quiz/
├── server.js          ← Game logic + WebSocket server
├── package.json
└── public/
    ├── host.html      ← Host/teacher screen (big display)
    └── player.html    ← Player screen (phones/tablets)
```

---

## Quick Start

### 1. Install dependencies
```bash
cd cosmic-quiz
npm install
```

### 2. Start the server
```bash
npm start
```

You'll see:
```
🚀 Cosmic Quiz Server running on http://localhost:3000
   Host screen : http://localhost:3000/host.html
   Player screen: http://localhost:3000/player.html
```

### 3. Host a game
- Open **http://localhost:3000/host.html** on your main/projected screen
- Select a difficulty and click **Create Room**
- A 6-character room code is generated (e.g. `QZ4R8K`)

### 4. Players join
- Players open **http://localhost:3000/player.html** on their phones
- They enter the room code + their name + pick an avatar
- They appear live on the host lobby screen

### 5. Start!
- Host clicks **Start Game ▶**
- Questions are sent to all players simultaneously
- Players tap answers — faster correct answers = more points
- Live leaderboard shown after every question

---

## How Scoring Works

| Condition | Points |
|-----------|--------|
| Wrong answer or timeout | 0 |
| Correct, answered at last second | 300 |
| Correct, answered instantly | 1000 |
| Speed bonus | Scales linearly between 300–1000 |

---

## How to Play on a Local Network (same Wi-Fi)

Find your computer's local IP:
- **Mac/Linux:** `ifconfig` or `ip addr` → look for `192.168.x.x`
- **Windows:** `ipconfig` → look for `IPv4 Address`

Then players visit: `http://192.168.x.x:3000/player.html`

---

## Deploying Online (so anyone can join from anywhere)

### Option A — Railway (easiest, free tier)
1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Railway auto-detects Node.js and runs `npm start`
4. You get a public URL like `https://cosmic-quiz-production.up.railway.app`

### Option B — Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set Build Command: `npm install`, Start Command: `node server.js`

### Option C — Fly.io
```bash
npm install -g flyctl
fly auth login
fly launch
fly deploy
```

---

## Customising Questions

Edit the `QUESTION_BANK` object in `server.js`. Each question follows this format:

```javascript
{
  question: "Your question text here?",
  answers: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0,   // index of the correct answer (0 = first option)
  facts: [
    "Fun fact shown after answering — can have multiple, one is picked at random.",
    "Another fun fact.",
    "A third option."
  ]
}
```

Add as many questions as you want to any of the three difficulty arrays: `easy`, `medium`, `hard`.

---

## Configuration

At the top of `server.js` you can change:

```javascript
const QUESTION_TIME = 20;   // seconds per question
const POINTS_BASE   = 300;  // points for a correct but slow answer
const POINTS_SPEED  = 700;  // extra points for answering instantly
```

---

## Tech Stack

- **Node.js + Express** — serves static files and HTTP
- **Socket.io** — real-time bidirectional events between server and all browsers
- **Vanilla JS + CSS** — no frontend framework needed; runs on any modern browser
