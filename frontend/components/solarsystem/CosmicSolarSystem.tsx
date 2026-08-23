'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FullAstrologicalResponse, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS, ZODIAC_SIGNS_METADATA } from '../../lib/constants';
import {
  Sun,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  Orbit,
  Eye,
} from 'lucide-react';

interface CosmicSolarSystemProps {
  data: FullAstrologicalResponse;
  onSelectPlanet: (planet: PlanetPosition) => void;
}

// Relative orbital radii from center (in pixels at zoom 1.0)
const ORBITAL_RADII: Record<string, { radius: number; size: number; baseSpeed: number }> = {
  Mercury: { radius: 52, size: 7, baseSpeed: 4.15 }, // ~88 days
  Venus: { radius: 82, size: 10, baseSpeed: 1.62 },   // ~225 days
  Moon: { radius: 115, size: 8, baseSpeed: 13.37 },   // ~27.3 days
  Mars: { radius: 152, size: 8.5, baseSpeed: 0.53 },  // ~687 days
  Jupiter: { radius: 200, size: 15, baseSpeed: 0.084 }, // ~11.86 years
  Saturn: { radius: 245, size: 13, baseSpeed: 0.034 }, // ~29.46 years
  Rahu: { radius: 285, size: 9, baseSpeed: -0.054 },   // ~18.6 years retrograde
  Ketu: { radius: 285, size: 9, baseSpeed: -0.054 },   // ~18.6 years retrograde
};

export const CosmicSolarSystem: React.FC<CosmicSolarSystemProps> = ({
  data,
  onSelectPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isBirthLocked, setIsBirthLocked] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1.0);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Dynamic planet angles in radians (initialized from natal sidereal longitudes)
  const planetAnglesRef = useRef<Record<string, number>>({});
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Initialize natal angles from data
  useEffect(() => {
    const angles: Record<string, number> = {};
    data.planets.forEach((p) => {
      // Invert Y for standard math counter-clockwise coordinates
      // Standard sidereal longitude: 0° Aries is typically on the right (0 rad) or top (90°)
      const rad = ((p.longitude - 90) * Math.PI) / 180.0;
      angles[p.name] = rad;
    });
    planetAnglesRef.current = angles;
  }, [data]);

  const resetToNatalPositions = useCallback(() => {
    const angles: Record<string, number> = {};
    data.planets.forEach((p) => {
      const rad = ((p.longitude - 90) * Math.PI) / 180.0;
      angles[p.name] = rad;
    });
    planetAnglesRef.current = angles;
    setIsBirthLocked(true);
  }, [data]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000.0;
      lastTimeRef.current = now;

      // Update orbital angles if not locked and playing
      if (!isBirthLocked && isPlaying) {
        Object.keys(planetAnglesRef.current).forEach((pName) => {
          const cfg = ORBITAL_RADII[pName];
          if (cfg) {
            const deltaRad = cfg.baseSpeed * 0.2 * speedMultiplier * dt;
            planetAnglesRef.current[pName] += deltaRad;
          }
        });
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const effectiveZoom = zoom * Math.min(width / 700, height / 600, 1.2);

      // Save transform
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(effectiveZoom, effectiveZoom);

      // 1. Draw Zodiac Outer Ring (Aries to Pisces 12 Signs)
      const outerZodiacRadius = 330;
      ctx.beginPath();
      ctx.arc(0, 0, outerZodiacRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer Zodiac Segments (30° each)
      for (let i = 0; i < 12; i++) {
        const angleDeg = i * 30 - 90;
        const angleRad = (angleDeg * Math.PI) / 180.0;
        const nextAngleRad = ((angleDeg + 30) * Math.PI) / 180.0;

        // Radial dividing lines
        const x1 = Math.cos(angleRad) * (outerZodiacRadius - 18);
        const y1 = Math.sin(angleRad) * (outerZodiacRadius - 18);
        const x2 = Math.cos(angleRad) * (outerZodiacRadius + 18);
        const y2 = Math.sin(angleRad) * (outerZodiacRadius + 18);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Zodiac Sign Glyph and Name
        const signData = ZODIAC_SIGNS_METADATA[i];
        const midRad = (angleRad + nextAngleRad) / 2;
        const textDist = outerZodiacRadius;
        const tx = Math.cos(midRad) * textDist;
        const ty = Math.sin(midRad) * textDist;

        ctx.fillStyle = 'rgba(254, 240, 138, 0.75)';
        ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${signData.glyph} ${signData.name.slice(0, 3)}`, tx, ty);
      }

      // 2. Draw Ascendant (Lagna) Axis Ray
      const ascDeg = data.ascendant.longitude;
      const ascRad = ((ascDeg - 90) * Math.PI) / 180.0;
      const ascX = Math.cos(ascRad) * (outerZodiacRadius + 22);
      const ascY = Math.sin(ascRad) * (outerZodiacRadius + 22);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(ascX, ascY);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Lagna Marker
      ctx.beginPath();
      ctx.arc(ascX, ascY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
      ctx.fillText(`ASC (${data.ascendant.sign_name.slice(0, 3)})`, ascX + 12, ascY);

      // 3. Draw Orbital Track Rings
      Object.entries(ORBITAL_RADII).forEach(([pName, cfg]) => {
        if (pName === 'Ketu') return; // Ketu shares orbit with Rahu

        ctx.beginPath();
        ctx.arc(0, 0, cfg.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 4. Draw Central Sun (Surya)
      const sunMeta = data.planets.find((p) => p.name === 'Sun');
      const sunRad = ((data.planets.find((p) => p.name === 'Sun')?.longitude ?? 90) - 90) * Math.PI / 180.0;

      // Solar Corona Glow
      const sunGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
      sunGlow.addColorStop(0, 'rgba(254, 240, 138, 1)');
      sunGlow.addColorStop(0.3, 'rgba(245, 158, 11, 0.8)');
      sunGlow.addColorStop(0.7, 'rgba(217, 119, 6, 0.25)');
      sunGlow.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Sun Core
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#05050A';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('☉', 0, 1);

      // 5. Draw Orbiting Planets (Grahas)
      const planetScreenPositions: Array<{
        planet: PlanetPosition;
        x: number;
        y: number;
        radius: number;
      }> = [];

      // Add Sun to clickable positions
      if (sunMeta) {
        planetScreenPositions.push({
          planet: sunMeta,
          x: 0,
          y: 0,
          radius: 18,
        });
      }

      data.planets.forEach((planet) => {
        if (planet.name === 'Sun') return;

        const cfg = ORBITAL_RADII[planet.name] || { radius: 100, size: 8, baseSpeed: 1 };
        let angle = planetAnglesRef.current[planet.name] ?? 0;

        // If Ketu, always 180° opposite Rahu
        if (planet.name === 'Ketu') {
          const rahuAngle = planetAnglesRef.current['Rahu'] ?? 0;
          angle = rahuAngle + Math.PI;
        }

        const px = Math.cos(angle) * cfg.radius;
        const py = Math.sin(angle) * cfg.radius;

        planetScreenPositions.push({
          planet: planet,
          x: px,
          y: py,
          radius: cfg.size + 4,
        });

        // Radial line from center to planet (Natal aspect ray)
        if (isBirthLocked) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `${planet.color}25`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Saturn Rings special render
        if (planet.name === 'Saturn') {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, cfg.size * 2.1, cfg.size * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // Planet Glow Halo
        ctx.beginPath();
        ctx.arc(px, py, cfg.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${planet.color}30`;
        ctx.fill();

        // Planet Core Body
        ctx.beginPath();
        ctx.arc(px, py, cfg.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = planet.is_vargottama ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Planet Glyph Icon
        ctx.fillStyle = '#05050A';
        ctx.font = `bold ${Math.max(9, cfg.size - 2)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(PLANETARY_GLYPHS[planet.name] || '★', px, py + 0.5);

        // Planet Name Label & Dignity Badge
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 10.5px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(planet.name, px, py + cfg.size + 4);

        // Subtitle Dignity
        let subText = planet.dignity;
        if (planet.is_vargottama) subText = 'Vargottama ★';
        ctx.fillStyle = planet.is_vargottama ? '#fef08a' : '#94a3b8';
        ctx.font = '500 8.5px Plus Jakarta Sans, sans-serif';
        ctx.fillText(subText, px, py + cfg.size + 16);
      });

      ctx.restore();

      // Check Hovered Planet (in canvas coordinates)
      if (mousePos) {
        const relX = (mousePos.x - centerX) / effectiveZoom;
        const relY = (mousePos.y - centerY) / effectiveZoom;

        let found: PlanetPosition | null = null;
        for (const pPos of planetScreenPositions) {
          const dist = Math.hypot(pPos.x - relX, pPos.y - relY);
          if (dist <= pPos.radius + 6) {
            found = pPos.planet;
            break;
          }
        }
        setHoveredPlanet(found);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data, isPlaying, speedMultiplier, isBirthLocked, zoom, mousePos]);

  // Handle Click on Canvas to Open Planet Modal
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const effectiveZoom = zoom * Math.min(canvas.width / 700, canvas.height / 600, 1.2);

    const relX = (clickX - centerX) / effectiveZoom;
    const relY = (clickY - centerY) / effectiveZoom;

    // Check Sun
    const sunMeta = data.planets.find((p) => p.name === 'Sun');
    if (sunMeta && Math.hypot(relX, relY) < 24) {
      onSelectPlanet(sunMeta);
      return;
    }

    // Check Other Planets
    for (const planet of data.planets) {
      if (planet.name === 'Sun') continue;
      const cfg = ORBITAL_RADII[planet.name] || { radius: 100, size: 8 };
      let angle = planetAnglesRef.current[planet.name] ?? 0;
      if (planet.name === 'Ketu') {
        const rahuAngle = planetAnglesRef.current['Rahu'] ?? 0;
        angle = rahuAngle + Math.PI;
      }
      const px = Math.cos(angle) * cfg.radius;
      const py = Math.sin(angle) * cfg.radius;

      const dist = Math.hypot(px - relX, py - relY);
      if (dist <= cfg.size + 14) {
        onSelectPlanet(planet);
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredPlanet(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] rounded-3xl glass-panel-glow overflow-hidden select-none border border-vedic-gold/40 shadow-2xl"
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-obsidian-950/85 backdrop-blur-xl px-5 py-3 rounded-2xl border border-vedic-gold/30 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-vedic-gold animate-ping" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-vedic-bright">
              Cosmic Solar System Graha Mandala
            </div>
            <div className="text-[11px] text-slate-400">
              Exact Sidereal Orbits • Click any planet to inspect dignities
            </div>
          </div>
        </div>

        {/* Orbit Controls */}
        <div className="flex items-center space-x-2 bg-obsidian-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          {/* Birth Position Lock Toggle */}
          <button
            type="button"
            onClick={() => {
              if (!isBirthLocked) {
                resetToNatalPositions();
              } else {
                setIsBirthLocked(false);
                setIsPlaying(true);
              }
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isBirthLocked
                ? 'bg-vedic-gold text-obsidian-950 shadow-gold-glow font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Lock to exact natal birth coordinates"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isBirthLocked ? 'Natal Chart Lock' : 'Simulating Orbit'}</span>
          </button>

          {/* Play/Pause */}
          {!isBirthLocked && (
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 text-slate-300 hover:text-vedic-gold hover:bg-slate-800/60 rounded-lg transition-colors"
              title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {/* Speed Selector */}
          {!isBirthLocked && (
            <div className="flex items-center space-x-1 pl-1 border-l border-slate-800">
              {[1, 5, 20].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-1 rounded text-[10.5px] font-bold ${
                    speedMultiplier === s
                      ? 'bg-amber-500/20 text-vedic-bright border border-vedic-gold/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 pl-1 border-l border-slate-800">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(prev + 0.15, 1.8))}
              className="p-1.5 text-slate-400 hover:text-white rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.7))}
              className="p-1.5 text-slate-400 hover:text-white rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={resetToNatalPositions}
              className="p-1.5 text-slate-400 hover:text-vedic-gold rounded"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-pointer block"
      />

      {/* Hover Tooltip / Quick Planet Banner */}
      {hoveredPlanet && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-obsidian-900/95 backdrop-blur-xl px-5 py-3 rounded-2xl border border-vedic-gold/40 text-xs text-slate-100 shadow-2xl animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: `${hoveredPlanet.color}25`,
                color: hoveredPlanet.color,
                border: `1.5px solid ${hoveredPlanet.color}`,
              }}
            >
              {PLANETARY_GLYPHS[hoveredPlanet.name] || '★'}
            </div>
            <div>
              <div className="font-bold text-sm text-slate-100 font-serif">
                {hoveredPlanet.name} ({hoveredPlanet.sanskrit}) • {hoveredPlanet.sign_name} ({hoveredPlanet.formatted_dms})
              </div>
              <div className="text-[11px] text-slate-300">
                House {hoveredPlanet.house} • Dignity: <strong className="text-vedic-bright">{hoveredPlanet.dignity}</strong>
                {hoveredPlanet.is_vargottama && ' • Vargottama ★'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlanet(hoveredPlanet)}
            className="px-4 py-1.5 rounded-xl bg-vedic-gold text-obsidian-950 font-extrabold text-xs shadow-gold-glow hover:brightness-110"
          >
            Inspect Dignities & Remedies →
          </button>
        </div>
      )}
    </div>
  );
};
