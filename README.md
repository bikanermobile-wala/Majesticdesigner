# Majestic Designer — Website

React + Vite + GSAP, deployed to GitHub Pages at `https://YOUR-GITHUB-USERNAME.github.io/majestic-designer/`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173/majestic-designer/
npm run build      # production build into /dist
npm run preview
```

## Edit content
| What | File |
| --- | --- |
| Phone, WhatsApp, email, Instagram, hours, Google Maps, form endpoint | `src/data/config.js` |
| Images | `src/data/images.js` |
| Videos (add more with `makeVideo`) | `src/data/videos.js` |
| Products & categories (add a block to `products`) | `src/data/products.js` |

WhatsApp number format: digits with country code, e.g. `919800000000`.
Routing uses `HashRouter` (URLs look like `/#/collections`) so refreshing any page never 404s on GitHub Pages.

## Deploy
1. Create a public GitHub repo named `majestic-designer`.
2. Upload everything in this folder (including the hidden `.github` folder) — **not** `node_modules` or `dist`.
3. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` installs, builds and publishes `dist`.
