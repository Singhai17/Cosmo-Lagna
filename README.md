# 🌌 COSMO LAGNA
### High-Precision Sidereal Ephemeris, 3D Orbital Mechanics & Canonical Vedic Intelligence

[![Live Demo](https://img.shields.io/badge/Live_App-cosmo--lagna.vercel.app-38bdf8?style=for-the-badge&logo=vercel)](https://cosmo-lagna.vercel.app)
[![API Status](https://img.shields.io/badge/Live_API-Render_Cloud-10b981?style=for-the-badge&logo=fastapi)](https://cosmo-lagna-api.onrender.com/health)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)

**COSMO LAGNA** is a production-grade celestial intelligence platform bridging authentic **Classical Parashari Vedic Astrology (Jyotish)** and **Chaldean Numerology (Sankhya Shastra)** with modern astrophysics, real-time **Three.js 3D planetary orbital mechanics**, and luxury horological telemetry design.

---

## 🌐 Live Production Links

- **🪐 Web Application**: [https://cosmo-lagna.vercel.app](https://cosmo-lagna.vercel.app)
- **⚡ Ephemeris Engine API**: [https://cosmo-lagna-api.onrender.com](https://cosmo-lagna-api.onrender.com)
- **📖 Interactive API Documentation**: [https://cosmo-lagna-api.onrender.com/docs](https://cosmo-lagna-api.onrender.com/docs)
- **🩺 API Health Endpoint**: [https://cosmo-lagna-api.onrender.com/health](https://cosmo-lagna-api.onrender.com/health)

---

## 🪐 Core Features & Telemetry Modules

### 1. 🌌 Interactive 3D Solar System (Three.js & WebGL)
- Real-time 3D planetary physics engine rendering true orbital inclinations, semi-major axes, rotation velocities, and celestial trails.
- Interactive planetary inspector with cinematic orbital camera transitions and detailed astronomical telemetry.

### 2. 💎 Precision Vedic Chart Renderers (D1, D9, D10 Vargas)
- Dual-style vector chart engine supporting **North Indian (Diamond Kundali)** and **South Indian (Fixed Rashi Box)** charts.
- **Dynamic Parashari Aspect Laser Rays (Drishti)**: Interactive visual raycaster depicting planetary sight lines (7th full aspect, Mars 4th/8th, Jupiter 5th/9th, Saturn 3rd/10th, Rahu/Ketu 5th/9th).
- Divisional harmonics: **D1 (Lagna / Physical Manifestation)**, **D9 (Navamsha / Spiritual Dharma & Marriage)**, and **D10 (Dashamsha / Career & Public Authority)**.

### 3. 🎯 Shadbala 6-Fold Planetary Strength Radar
- Hexagonal radar visualization calculating the 6 classical sources of planetary strength (*Bala*):
  - **Sthanabala** (Positional), **Digbala** (Directional), **Kaalabala** (Temporal), **Cheshtabala** (Motional), **Naisargikabala** (Natural), and **Drikbala** (Aspectual).

### 4. 🏛️ 12 Bhavas (Houses) Matrix & Jaimini Karakas
- Deep analysis of all 12 life domains (*Tanu, Dhana, Sahaja, Sukha, Putra, Ari, Kalatra, Randhra, Dharma, Karma, Labha, Vyaya*).
- Calculates ruling lords, house placements, occupying planets, aspects, and natural significators (*Chara & Sthira Karakas*).

### 5. ⏱️ Real-Time Gochar (Transits) & Choghadiya Muhurta
- Real-time celestial transit engine tracking planetary motion against the natal chart.
- Diurnal & Nocturnal **Choghadiya Compass** calculating live auspicious timing (*Amrit, Shubh, Labh, Chal, Rog, Kaal, Udveg*).

### 6. 👑 300+ Classical Raja Yogas & Royal Combinations
- Mathematical detection of canonical combinations citing *Brihat Parashara Hora Shastra* and *Phaladeepika*.
- Identifies **Gaja Kesari**, **Pancha Mahapurusha** (*Ruchaka, Bhadra, Hamsa, Malavya, Sasa*), **Dharma-Karmadhipati**, and **Dhana Yogas** with active status filtering.

### 7. ⏳ 120-Year Vimshottari Dasha Hierarchy
- Precision progression engine calculating chronological start and end dates down to **Mahadasha**, **Antardasha**, and **Pratyantardasha** cycles based on natal Moon Nakshatra degree balance.

### 8. 📊 Sarvashtakavarga (SAV) Matrix
- 337-bindu aggregate auspiciousness matrix across all 12 houses and 7 primary Grahas, identifying life domains of effortless manifestation versus resilience testing.

### 9. 🔢 Sankhya Shastra (Chaldean Numerology)
- Calculates **Driver Number (Mulank)**, **Destiny Number (Bhagyank)**, and **Name Vibration (Namank)** with ancient Chaldean compound number archetype titles (e.g. *The Star of the Magi*, *The Crown of the Magi*).

### 10. 🪐 Shani Sade Sati & Kaal Sarp Diagnostics
- Real-time Saturn transit tracking across the 12th, 1st, and 2nd houses from the natal Moon (Rising, Peak, and Setting phases).
- Nodal axis analysis identifying **12 Classical Kaal Sarp variations** (*Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhachur, Ghatak, Vishdhar, Sheshnaag*) with scriptural Upayas and Bija Mantras.

### 11. 📜 Canonical Scriptural Insights
- Non-fatalistic, empowering spiritual and practical wisdom distilled from classical texts (*BPHS, Phaladeepika, Saravali*).

### 12. 🌍 Global Internet Geocoding Engine
- Integrated OpenStreetMap / Photon geocoding with instant autocomplete covering every worldwide city, town, village, and locality with automated UTC timezone offset estimation.

---

## 🛠️ Architecture & Tech Stack

```
Cosmo-Lagna/
├── frontend/             # Next.js 15 App Router, React 19, Tailwind CSS
│   ├── app/              # Core layout, pages, and global styling
│   ├── components/       # 3D Solar System, Charts, Radar, Telemetry matrices
│   ├── lib/              # API client, Geocoding, Constants
│   └── types/            # TypeScript data contracts & Ephemeris schemas
│
├── backend/              # FastAPI Python 3.10+
│   ├── app/
│   │   ├── engine/       # Ephemeris, Vargas, Dasha, Yogas, Ashtakavarga, Numerology
│   │   ├── models/       # Pydantic schemas, astronomical constants
│   │   └── routes/       # REST endpoints (/api/calculate, /health, /numerology)
│   ├── requirements.txt  # Python package specifications
│   └── start_backend.py  # Local dev bootstrapper
│
└── render.yaml           # 1-Click Cloud Infrastructure deployment descriptor
```

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Lucide Icons.
- **Backend**: FastAPI, Ephem, Skyfield, Pydantic v2, Uvicorn, Python 3.10+.
- **Deployment**: Vercel (Frontend CI/CD) + Render (Backend Web Service).

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/Singhai17/Cosmo-Lagna.git
cd Cosmo-Lagna
```

### 3. Start Backend Server (FastAPI)
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --host 127.0.0.1 --reload
```
*Backend runs on: `http://127.0.0.1:8000`*

### 4. Start Frontend Server (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
