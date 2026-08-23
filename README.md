# 🌌 COSMO LAGNA
### Precision Sidereal Ephemeris & Vedic Intelligence Platform

**COSMO LAGNA** is a production-grade Vedic Astrology and Sankhya Shastra platform combining high-precision celestial mathematics with interactive 3D solar system mechanics, classical Parashari scriptures, and modern horological dashboards.

---

## 🚀 Quick Start Guide

To run the application locally on any machine, follow these simple steps:

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Python**: v3.10 or higher ([Download Python](https://www.python.org/))
- **Git**: ([Download Git](https://git-scm.com/))

---

### 2. Clone the Repository
```bash
git clone https://github.com/Singhai17/Cosmo-Lagna.git
cd Cosmo-Lagna
```

---

### 3. Start the Backend Server (FastAPI)

Open a terminal window and run:

```bash
# Navigate to the backend directory
cd backend

# (Optional) Create & activate a virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI backend server
python -m uvicorn app.main:app --port 8000 --host 127.0.0.1 --reload
```

- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Probe**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### 4. Start the Frontend Server (Next.js)

Open a **second terminal window** and run:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Next.js development server
npm run dev
```

- **Application Web UI**: [http://localhost:3000](http://localhost:3000)

---

## 🪐 Key Features

1. **Precision Ephemeris Engine**:
   - High-precision planetary calculations with **Lahiri (Chitra Paksha) Ayanamsa**.
   - Computes D1 (Rashi), D9 (Navamsha), and D10 (Dashamsha) divisional charts.

2. **Interactive 3D Solar System & Charts**:
   - Three.js 3D planetary orbit visualizer with orbital inclination and real-time transit speeds.
   - Dual-style **North Indian (Diamond)** & **South Indian (Box)** chart renderers with interactive Parashari aspect laser rays.

3. **Complete 11-Section Telemetry**:
   - **Shadbala 6-Fold Strength Radar**: Sthanabala, Digbala, Kaalabala, Cheshtabala, Naisargikabala, Drikbala.
   - **12 Bhavas (Houses) Matrix**: Life aspects, karakas, and lord placements.
   - **Gochar (Transits) & Choghadiya Muhurta**: Real-time transit alignments and diurnal/nocturnal auspicious timing compass.
   - **300+ Classical Raja Yogas**: Gaja Kesari, Pancha Mahapurusha, Dharma-Karmadhipati combinations.
   - **120-Year Vimshottari Dasha Hierarchy**: Mahadasha, Antardasha, and Pratyantardasha timeline.
   - **Sarvashtakavarga (SAV)**: 337-bindu distribution matrix.
   - **Sankhya Shastra (Chaldean Numerology)**: Driver (Mulank), Destiny (Bhagyank), Name vibration, and compound frequencies.
   - **Shani Sade Sati & Kaal Sarp Diagnostics**: Real-time phase tracking and classical Upayas.
   - **Scriptural Insights**: Canonical synthesis citing *Brihat Parashara Hora Shastra*, *Phaladeepika*, and *Saravali*.

4. **Global Live Geocoding**:
   - Integrated OpenStreetMap / Photon geocoding covering every city and town worldwide with automatic timezone offset detection.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Three.js / React Three Fiber, Lucide Icons.
- **Backend**: FastAPI (Python), Ephem / Skyfield Ephemeris, Pydantic v2, Uvicorn.
- **License**: MIT
