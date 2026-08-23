'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import {
  X,
  Sparkles,
  Gem,
  Activity,
  Compass,
  Shield,
  Zap,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Orbit,
  Feather,
  Rotate3d,
  Layers,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface PlanetModalProps {
  planet: PlanetPosition | null;
  onClose: () => void;
}

// Procedural texture generator for high-detail, ultra-vivid 3D planet modal rendering
function createModalPlanetTexture(name: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const w = canvas.width;
  const h = canvas.height;

  if (name === 'Sun') {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fef08a');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(0.8, '#d97706');
    grad.addColorStop(1, '#9a3412');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic solar flares & granules
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 16 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === 'Mercury') {
    // Vivid Emerald Crystal
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ecfdf5');
    grad.addColorStop(0.3, '#34d399');
    grad.addColorStop(0.7, '#059669');
    grad.addColorStop(1, '#064e3b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(167, 243, 208, 0.7)' : 'rgba(4, 120, 87, 0.6)';
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 8 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === 'Venus') {
    // Radiant Champagne & Diamond Gold
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#fef9c3');
    grad.addColorStop(0.6, '#fde047');
    grad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 250 + 50, Math.random() * 30 + 5, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === 'Moon') {
    // Luminous Pearlescent Silver & Cyan
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#e0f2fe');
    grad.addColorStop(1, '#7dd3fc');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // Maria
    ctx.fillStyle = 'rgba(30, 41, 59, 0.45)';
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 90 + 30, 0, Math.PI * 2);
      ctx.fill();
    }
    // Craters
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 3000; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 5 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === 'Mars') {
    // Fiery Cosmic Ruby Red
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.1, '#ff4d4f');
    grad.addColorStop(0.5, '#dc2626');
    grad.addColorStop(0.9, '#991b1b');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(69, 10, 10, 0.6)';
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 200 + 40, Math.random() * 25 + 5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === 'Jupiter') {
    // Imperial Golden Topaz & Amber Bands
    const bands = ['#b45309', '#f59e0b', '#fef3c7', '#d97706', '#fde68a', '#92400e', '#fef3c7', '#b45309'];
    const bandH = h / bands.length;
    bands.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(0, idx * bandH, w, bandH);
    });
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 180 + 30, Math.random() * 12 + 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // Great Red Spot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.62, 70, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 4;
    ctx.stroke();
  } else if (name === 'Saturn') {
    const bands = ['#eab308', '#fde047', '#fef08a', '#ca8a04', '#fde047', '#854d0e'];
    const bandH = h / bands.length;
    bands.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(0, idx * bandH, w, bandH);
    });
  } else if (name === 'Rahu' || name === 'Ketu') {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 2);
    grad.addColorStop(0, name === 'Rahu' ? '#c084fc' : '#f472b6');
    grad.addColorStop(0.5, name === 'Rahu' ? '#7c3aed' : '#db2777');
    grad.addColorStop(1, '#05050A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 1500; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Saturn 3D Ring Texture
function createModalRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0.0, 'rgba(250, 204, 21, 0.0)');
  grad.addColorStop(0.15, 'rgba(250, 204, 21, 0.7)');
  grad.addColorStop(0.45, 'rgba(254, 240, 138, 0.95)');
  grad.addColorStop(0.55, 'rgba(5, 5, 10, 0.05)'); // Cassini Division
  grad.addColorStop(0.65, 'rgba(234, 179, 8, 0.85)');
  grad.addColorStop(0.9, 'rgba(250, 204, 21, 0.6)');
  grad.addColorStop(1.0, 'rgba(250, 204, 21, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);
  return new THREE.CanvasTexture(canvas);
}

// 3D Planet Viewport in Modal
const Planet3DViewport: React.FC<{ planet: PlanetPosition }> = ({ planet }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // Rich Colorful Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0e1738, 2.0);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(8, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(planet.color || '#38bdf8', 1.5);
    dirLight2.position.set(-8, -6, -4);
    scene.add(dirLight2);

    // Planet Mesh
    const texture = createModalPlanetTexture(planet.name, planet.color);
    const sphereGeo = new THREE.SphereGeometry(2.35, 64, 64);

    let sphereMat: THREE.Material;
    if (planet.name === 'Sun') {
      sphereMat = new THREE.MeshBasicMaterial({ map: texture });
    } else {
      sphereMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.15,
        emissive: new THREE.Color(planet.color),
        emissiveIntensity: 0.35,
      });
    }

    const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(planetMesh);

    // Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(2.65, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(planet.color),
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Saturn 3D Rings
    if (planet.name === 'Saturn') {
      const ringTex = createModalRingTexture();
      const ringGeo = new THREE.RingGeometry(3.0, 5.5, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTex,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.4,
        opacity: 0.95,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      ringMesh.rotation.y = Math.PI / 8;
      scene.add(ringMesh);
    }

    // Animation Loop
    let animId: number;
    const animate = () => {
      controls.update();
      planetMesh.rotation.y += 0.004;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [planet]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />;
};

export const PlanetModal: React.FC<PlanetModalProps> = ({ planet, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dignity' | 'scripture' | 'astronomy' | 'remedies'>('dignity');

  if (!planet) return null;

  const isExalted = planet.dignity === 'Exalted';
  const isDebilitated = planet.dignity === 'Debilitated';
  const isMoolatrikona = planet.dignity === 'Moolatrikona';
  const isOwnSign = planet.dignity === 'Own Sign';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/80 backdrop-blur-2xl animate-fadeIn">
      {/* Outer Modal Container */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl glass-panel border border-white/[0.12] shadow-luxury-hover overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Split-Screen Layout: LEFT (3D Planet) | RIGHT (All Details & Tabs) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: Interactive 3D Planet Model + Visual Telemetry (5 Cols on LG) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 bg-obsidian-950/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
            
            {/* Header Identity */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold font-serif shadow-sm shrink-0"
                  style={{
                    backgroundColor: `${planet.color}18`,
                    color: planet.color,
                    border: `1px solid ${planet.color}40`,
                  }}
                >
                  {PLANETARY_GLYPHS[planet.name] || '★'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-serif tracking-wide">
                    {planet.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-serif">
                    {planet.sanskrit}
                  </span>
                </div>
              </div>

              <span
                className="text-xs font-medium px-3 py-1 rounded-full border shadow-sm font-mono"
                style={{
                  backgroundColor: `${planet.color}15`,
                  color: planet.color,
                  borderColor: `${planet.color}40`,
                }}
              >
                {planet.dignity}
              </span>
            </div>

            {/* 3D Planet Viewport */}
            <div className="relative w-full h-[200px] sm:h-[300px] my-3 rounded-2xl overflow-hidden bg-obsidian-950/80 border border-white/[0.06] flex items-center justify-center">
              <Planet3DViewport planet={planet} />

              {/* 3D Drag Hint Overlay */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-obsidian-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.08] text-[10px] text-slate-400 select-none pointer-events-none">
                <Rotate3d className="w-3 h-3 text-sky-400" />
                <span>Drag to Rotate 3D Planet</span>
              </div>
            </div>

            {/* Quick Planetary Status Matrix Bar */}
            <div className="grid grid-cols-2 gap-2.5 z-10">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-0.5 font-mono">
                <span className="text-slate-500 text-[10px] uppercase tracking-wider block">
                  House Placement:
                </span>
                <span className="font-semibold text-white font-serif text-sm">
                  House {planet.house}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {planet.sign_name} ({planet.degrees_in_sign.toFixed(2)}°)
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-0.5 font-mono">
                <span className="text-slate-500 text-[10px] uppercase tracking-wider block">
                  Nakshatra Pada:
                </span>
                <span className="font-semibold text-white font-serif text-sm truncate block">
                  {planet.nakshatra_name}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Pada {planet.nakshatra_pada} • Lord {planet.nakshatra_lord}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Interactive Tabs & Information Panels (7 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 p-4 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            
            {/* Top Navigation Tabs with Clear Active Indicators */}
            <div className="flex items-center overflow-x-auto no-scrollbar space-x-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setActiveTab('dignity')}
                className={`py-2 px-3.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'dignity'
                    ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Dignities & Strength
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('scripture')}
                className={`py-2 px-3.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'scripture'
                    ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Parashari Phala
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('astronomy')}
                className={`py-2 px-3.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'astronomy'
                    ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vargas & Degrees
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('remedies')}
                className={`py-2 px-3.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'remedies'
                    ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Upayas & Mantras
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1">
              {/* Tab 1: Dignities & Strength */}
              {activeTab === 'dignity' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Exaltation (Uchcha) Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isExalted
                          ? 'bg-white/[0.08] border-white/[0.25] shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Exaltation (Uchcha)</span>
                        </span>
                        {isExalted && (
                          <span className="text-[10px] bg-white text-obsidian-950 px-2 py-0.5 rounded-full font-bold shadow-sm">
                            EXALTED
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5 space-y-0.5">
                        <div className="text-sm font-bold text-white font-serif">
                          {planet.exaltation_sign_name || 'Aries (Mesha)'}
                        </div>
                        <div className="text-xs text-slate-300 font-medium">
                          Deep Exaltation: <span className="font-mono text-white">{planet.exaltation_deg ?? 0.0}°</span>
                        </div>
                      </div>
                    </div>

                    {/* Debilitation (Neecha) Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDebilitated
                          ? 'bg-rose-500/10 border-rose-500/30'
                          : 'bg-white/[0.02] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                          <Flame className="w-4 h-4 text-rose-400" />
                          <span>Debilitation (Neecha)</span>
                        </span>
                        {isDebilitated && (
                          <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                            DEBILITATED
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5 space-y-0.5">
                        <div className="text-sm font-bold text-white font-serif">
                          {planet.debilitation_sign_name || 'Libra (Tula)'}
                        </div>
                        <div className="text-xs text-slate-300 font-medium">
                          Deep Debilitation: <span className="font-mono text-white">{planet.debilitation_deg ?? 0.0}°</span>
                        </div>
                      </div>
                    </div>

                    {/* Moolatrikona Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isMoolatrikona
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-white/[0.02] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <span>Moolatrikona Zone</span>
                        </span>
                        {isMoolatrikona && (
                          <span className="text-[10px] bg-emerald-500 text-obsidian-950 px-2 py-0.5 rounded-full font-bold shadow-sm">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5 space-y-0.5">
                        <div className="text-sm font-bold text-white font-serif">
                          {planet.moolatrikona_sign_name || 'Leo (Simha)'}
                        </div>
                        <div className="text-xs text-slate-300 font-medium font-mono">
                          Span: {planet.moolatrikona_range?.[0] ?? 0}° to {planet.moolatrikona_range?.[1] ?? 30}°
                        </div>
                      </div>
                    </div>

                    {/* Own Signs (Swakshetra) Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isOwnSign
                          ? 'bg-sky-500/10 border-sky-500/30'
                          : 'bg-white/[0.02] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                          <Shield className="w-4 h-4 text-sky-400" />
                          <span>Own Signs (Swakshetra)</span>
                        </span>
                        {isOwnSign && (
                          <span className="text-[10px] bg-sky-400 text-obsidian-950 px-2 py-0.5 rounded-full font-bold shadow-sm">
                            SWAKSHETRA
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5 space-y-0.5">
                        <div className="text-sm font-bold text-white font-serif">
                          {planet.own_signs_names?.join(', ') || 'N/A'}
                        </div>
                        <div className="text-xs text-slate-400">Complete Planetary Sovereignty</div>
                      </div>
                    </div>
                  </div>

                  {/* Vargottama Banner */}
                  {planet.is_vargottama && (
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.1] flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-white text-sm font-serif">
                          Vargottama Strength (D1 = D9)
                        </div>
                        <p className="text-slate-300 leading-relaxed font-light">
                          {planet.name} occupies the identical zodiac sign ({planet.sign_name}) in both the natal Rashi ($D_1$) chart and the Navamsha ($D_9$) chart. In classical Parashari Jyotish, Vargottama confers fortitude equivalent to an exaltation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Parashari Phala & Karaka Significations */}
              {activeTab === 'scripture' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                    <div className="flex items-center space-x-2 text-slate-300 text-xs font-semibold uppercase tracking-wider font-mono">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      <span>Brihat Parashara Hora Shastra (BPHS) Signification</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-light">
                      &quot;{planet.bphs_phala || 'Canonical scriptural reading in classical Vedic Jyotish.'}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono text-[10.5px] uppercase tracking-wider block">
                        Karaka (Significations):
                      </span>
                      <span className="text-slate-200 font-medium leading-relaxed block">
                        {planet.karaka || 'Primary Life Significator'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono text-[10.5px] uppercase tracking-wider block">
                        Elemental Energy & Nature:
                      </span>
                      <span className="text-slate-200 font-medium leading-relaxed block">
                        {planet.nature || 'Planetary Energy'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Vargas & Astronomy */}
              {activeTab === 'astronomy' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1.5">
                        <Compass className="w-4 h-4 text-sky-400" />
                        <span>Nakshatra & Pada:</span>
                      </span>
                      <span className="text-sm font-bold text-white font-serif block">
                        {planet.nakshatra_name} (Pada {planet.nakshatra_pada})
                      </span>
                      <span className="text-[11px] text-slate-400 block font-sans">
                        Lord: {planet.nakshatra_lord} • Deity: {planet.nakshatra_deity}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1.5">
                        <Activity className="w-4 h-4 text-sky-400" />
                        <span>Daily Motion Speed:</span>
                      </span>
                      <span className="text-sm font-bold text-white block">
                        {planet.speed ? `${planet.speed.toFixed(4)}° / day` : 'Mean Node (-0.0529°/d)'}
                      </span>
                      <span className="text-[11px] text-slate-400 block font-sans">
                        {planet.is_retrograde ? 'Vakri (Retrograde)' : 'Marga (Direct motion)'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Sidereal Longitude:</span>
                      </span>
                      <span className="text-sm font-bold text-white block">
                        {planet.longitude.toFixed(4)}° Nirayana
                      </span>
                      <span className="text-[11px] text-slate-400 block font-sans">
                        Lahiri (Chitra Paksha) Ayanamsa
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1.5">
                        <Orbit className="w-4 h-4 text-purple-400" />
                        <span>Harmonic Vargas:</span>
                      </span>
                      <span className="text-sm font-bold text-white font-serif block">
                        D1: {planet.sign_name} • D9: Sign {planet.d9_sign_id || planet.sign_id}
                      </span>
                      <span className="text-[11px] text-slate-400 block font-sans">
                        D10 Dashamsha: Sign {planet.d10_sign_id || planet.sign_id}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Upayas & Mantras */}
              {activeTab === 'remedies' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 font-mono">
                      <Feather className="w-4 h-4 text-sky-400" />
                      <span>Canonical Vedic Root Mantra (108 Japa)</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white font-mono select-all bg-white/[0.03] p-3 rounded-xl border border-white/[0.08]">
                      &quot;{planet.mantra || 'Om Shanti'}&quot;
                    </div>
                    <p className="text-[11px] text-slate-400 font-light">
                      Chant during the ruling planetary hora or sunrise for spiritual alignment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Gem className="w-3.5 h-3.5 text-amber-400" />
                        <span>Gemstone:</span>
                      </span>
                      <span className="text-sm font-semibold text-white block">{planet.gemstone}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span>Deity:</span>
                      </span>
                      <span className="text-sm font-semibold text-white block">{planet.deity || 'Presiding Deva'}</span>
                      <span className="text-[10.5px] text-slate-400 block">{planet.chakra}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sacred Metal:</span>
                      </span>
                      <span className="text-sm font-semibold text-white block">{planet.metal || 'Alloy'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-slate-400">
              <span>Classical Parashari Siddha Engine</span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white font-medium transition-colors cursor-pointer border border-white/[0.08]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
