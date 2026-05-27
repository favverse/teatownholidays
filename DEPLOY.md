# 🚀 Deploying to Vercel — Complete Guide

## Why the blank page happens
CRA on Vercel goes blank when:
1. The `vercel.json` has a `"builds"` key — **removed, fixed**
2. `"homepage"` in package.json is wrong — **set to `"/"`, fixed**
3. ESLint unused-variable errors fail the build in CI mode — **all fixed**

---

## Fixed ESLint errors (already applied in this zip)
| File | Fix |
|---|---|
| `StorySection.js` | Removed unused `textY` variable |
| `Pricing.js` | Removed unused `price` from destructure |
| `ExperienceGrid.js` | Removed unused `useScroll, useTransform` imports |
| `Navbar.js` | Changed `href="#"` to `href="/#"` |

---

## Deploy steps

### 1. Copy your changed files into your existing repo

Replace these files from this zip into your GitHub repo:

```
src/components/StorySection/StorySection.js   ← textY removed
src/components/Pricing/Pricing.js             ← price removed from destructure
src/components/ExperienceGrid/ExperienceGrid.js ← unused imports removed
src/components/Navbar/Navbar.js               ← href fixed
src/components/Contact/Contact.js             ← real phone/email/whatsapp
vercel.json                                   ← simplified (no "builds" key)
package.json                                  ← homepage: "/" added
```

### 2. Commit and push

```bash
git add .
git commit -m "Fix blank page: ESLint errors + vercel.json + homepage"
git push
```

Vercel auto-deploys on push. Build should succeed.

---

## Vercel Project Settings (check once)

In Vercel Dashboard → your project → Settings → General:

| Setting | Value |
|---|---|
| Framework Preset | **Create React App** |
| Build Command | `npm run vercel-build` |
| Output Directory | `build` |
| Install Command | `npm install` |

---

## How the live price works on Vercel
- `/api/price.js` runs as a Vercel Serverless Function
- Fetches from Airbnb, caches 30 min
- Falls back to ₹3,139 if Airbnb API changes

---

## Local development
```bash
# Frontend only
npm start

# With backend (live price)
cd server && npm install && npm start
# then in another terminal:
npm start
```
