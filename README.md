# Life Decision Simulator

A MERN app: add options (a job offer, an apartment, whatever you're
weighing), rate each on income, growth, and stress, set how much each of
those matters to you, and see which option scores best.

## Stack

- **MongoDB** + **Mongoose** — stores your options
- **Express** — REST API (`/api/options`)
- **React** (Vite) + **Tailwind** — the three-panel dashboard
- **Recharts** — the score chart

## Layout

- **Add Option** (left) — category, name, income, growth (0–100), stress (0–100)
- **Set Priorities** (center) — three sliders: how much income, growth, and
  low stress matter to you (0–100 each)
- **Results** (right) — ranked list of your options with a score, and a bar
  chart

## How scoring works

Income is a raw number, so it's normalized against your other options
(0–100) before combining. Stress is inverted (lower stress = higher score).
Then everything is blended by your priority sliders:

```
score = (incomeScore × incomeWeight + growth × growthWeight + (100 - stress) × stressWeight)
        / (incomeWeight + growthWeight + stressWeight)
```

Computed client-side in `client/src/utils/scoring.js` so the chart updates
instantly as you drag a slider — no round trip needed for that part.

## Project structure

```
life-decision-simulator/
├── server/
│   ├── config/db.js              Mongo connection
│   ├── models/Option.js          Schema: category, name, income, growth, stress
│   ├── controllers/optionController.js
│   ├── routes/optionRoutes.js    /api/options CRUD
│   └── server.js
└── client/
    └── src/
        ├── components/           Header, AddOptionPanel, PrioritiesPanel, ResultsPanel
        ├── api/options.js        Axios calls to the API
        └── utils/scoring.js      Scoring formula
```

## Running it locally

Needs Node.js 18+ and MongoDB (local, or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster).

**1. API**

```bash
cd server
cp .env.example .env     # set MONGO_URI, or leave it and it tries localhost
npm install
npm run dev                # http://localhost:5000
```

**2. Client** (second terminal)

```bash
cd client
npm install
npm run dev                # http://localhost:5173
```

Vite proxies `/api` to `http://localhost:5000`.

## API reference

| Method | Route             | Description          |
|--------|-------------------|-----------------------|
| GET    | `/api/options`     | List all options      |
| POST   | `/api/options`     | Add an option          |
| DELETE | `/api/options/:id` | Remove an option       |

Options persist in MongoDB, so they're still there after a refresh. The
priority sliders are session-only, matching the original design.
