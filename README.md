# 🍃 Tea Town Holidays

A cinematic luxury homestay website for **Tea Town Holidays** — a hidden mountain retreat in Meppadi, Wayanad, Kerala.

---

## ✨ Features

- **Real property photos** integrated in Hero, Story, Gallery, and FinalCTA
- **Cinematic hero** cycling through 2 real photos + atmospheric gradient
- **Smooth scroll** via Lenis + GSAP ScrollTrigger
- **Framer Motion** animations throughout every section
- **Custom cursor** with magnetic hover effects
- **Cinematic loading screen** with animated counter
- **Ambient rain** canvas + floating leaf particles
- **Glass panel highlights** with 3D cursor-reactive tilt
- **Masonry gallery** — 2 real photos + 4 cinematic panels
- **"More Photos on Airbnb"** button in gallery
- **Magnetic CTA buttons** with elastic spring animation
- **Contact section** with address, Google Maps button, animated pin map, enquiry form, WhatsApp/email/Airbnb contact cards
- **Express backend** with property API + enquiry endpoint
- **Fully responsive** — mobile-first with sticky booking CTA bar
- **Premium typography**: Bodoni Moda + Manrope + Pinyon Script

---

## 🏗 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18 (Create React App)         |
| Styling     | Tailwind CSS v3                     |
| Animation   | GSAP + ScrollTrigger                |
| Motion      | Framer Motion 11                    |
| Scroll      | Lenis smooth scroll                 |
| Backend     | Node.js + Express                   |
| Fonts       | Google Fonts (Bodoni Moda, Manrope, Pinyon Script) |

---

## 🚀 Quick Start

### 1. Install and run frontend

```bash
npm install
npm start
```

Opens at **http://localhost:3000**

### 2. Run Express backend (optional, separate terminal)

```bash
cd server
npm install
npm start
```

Runs at **http://localhost:5000**

---

## 📁 Project Structure

```
tea-town-holidays/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── property-exterior.webp     ← real photo 1
│   │   └── property-surroundings.jpg  ← real photo 2
│   ├── components/
│   │   ├── Hero/               Fullscreen hero cycling both real photos
│   │   ├── StorySection/       Split-screen with property-exterior photo
│   │   ├── ExperienceGrid/     3D tilt amenity panels
│   │   ├── Highlights/         Floating glass panels
│   │   ├── CinematicGallery/   Masonry grid + "More Photos on Airbnb" btn
│   │   ├── Pricing/            Oversized ₹3,139 with glow + magnetic CTA
│   │   ├── Contact/            Address · Map · Enquiry form · Contact cards
│   │   ├── FinalCTA/           Rain canvas + surroundings photo bg
│   │   ├── Navbar/             Transparent → frosted (has Contact link)
│   │   ├── AmbientEffects/     Rain canvas + floating leaves
│   │   ├── LoadingScreen/      Animated intro counter
│   │   └── CustomCursor/       Dual-layer magnetic cursor
│   ├── index.css               Global styles + Tailwind layers
│   ├── index.js                React entry point
│   └── App.js                  Root — Lenis init, section order
├── server/
│   ├── index.js                Express API
│   └── package.json
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🔧 Update Contact Details

In `src/components/Contact/Contact.js`, update:

```js
const WHATSAPP_URL = 'https://wa.me/91XXXXXXXXXX';  // ← your WhatsApp number
// email is: teatownholidays@gmail.com — update href mailto: if different
```

---

## 🌐 Booking

All CTAs point to:
```
https://www.airbnb.co.in/rooms/1605539872474002137
```

---

## 🎨 Color Palette

| Token   | Hex       | Usage              |
|---------|-----------|--------------------|
| Forest  | `#1A2A1D` | Deep bg, panels    |
| Tea     | `#425B46` | Accents, CTA bg    |
| Mist    | `#F1E7D8` | Primary text       |
| Earth   | `#5A4333` | Warm accents       |
| Cinema  | `#101010` | Page background    |
| Bronze  | `#8B6914` | Stars, gold tone   |

---

*Built with craft and the spirit of Wayanad.*
