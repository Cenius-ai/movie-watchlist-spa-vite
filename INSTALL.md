# Installation

## Prerequisites

- **Node.js 20** or later
- **npm** (bundled with Node.js)

## Steps

1. **Install dependencies and verify the build:**
   ```bash
   sh install.sh
   ```
   This runs `npm install` and a production build check. It exits when done — it does NOT start the server.

2. **Start the dev server:**
   ```bash
   npm run dev
   ```
   The app is served at `http://localhost:5173`. Demo movies are auto-seeded on first load.

3. **Production build (optional):**
   ```bash
   npm run build
   npm run preview
   ```

## Environment

No environment variables are required. The app is fully client-side with localStorage persistence.
