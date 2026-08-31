#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Installing dependencies..."
npm install --no-audit --no-fund

echo ""
echo "==> Build check..."
npx vite build

echo ""
echo "==> Setup complete."
echo "    Run the app with: npm run dev"
echo "    The app seeds demo movies automatically on first load."
