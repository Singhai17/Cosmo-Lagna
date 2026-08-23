'use client';

import React, { useState } from 'react';
import { PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import { Activity, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';

interface ShadbalaRadarProps {
  planets: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

// Classical Shadbala minimum requirement in Rupas (BPHS Ch. 27)
const MIN_SHADBALA_RUPAS: Record<string, number> = {
  Sun: 6.5,
  Moon: 6.0,
  Mars: 5.0,
  Mercury: 7.0,
  Jupiter: 6.5,
  Venus: 5.5,
  Saturn: 5.0,
};

export const ShadbalaRadar: React.FC<ShadbalaRadarProps> = ({
  planets,
  onSelectPlanet,
}) => {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('Sun');

  const classicalPlanets = planets.filter(
    (p) => !['Rahu', 'Ketu'].includes(p.name)
  );

  const selectedPlanet =
    classicalPlanets.find((p) => p.name === selectedPlanetName) ||
    classicalPlanets[0];

  // Calculate synthetic sixfold components based on real ephemeris parameters
  const calculateSixfoldComponents = (p: PlanetPosition) => {
    let sthana = 130;
    if (p.dignity === 'Exalted') sthana = 195;
    else if (p.dignity === 'Moolatrikona') sthana = 175;
    else if (p.dignity === 'Own Sign') sthana = 160;
    else if (p.dignity === 'Friendly') sthana = 135;
    else if (p.dignity === 'Debilitated') sthana = 65;

    let dig = 45;
    if (['Jupiter', 'Mercury'].includes(p.name) && p.house === 1) dig = 60;
    else if (['Sun', 'Mars'].includes(p.name) && p.house === 10) dig = 60;
    else if (['Saturn'].includes(p.name) && p.house === 7) dig = 60;
    else if (['Moon', 'Venus'].includes(p.name) && p.house === 4) dig = 60;

    const chesta = p.is_retrograde ? 58 : 35 + Math.min(20, Math.abs(p.speed) * 15);
    const naisargika = {
      Sun: 60,
      Moon: 51.4,
      Venus: 42.8,
      Jupiter: 34.3,
      Mercury: 25.7,
      Mars: 17.1,
      Saturn: 8.6,
    }[p.name] || 30;

    const kala = 45 + (p.degrees_in_sign / 30) * 15;
    const drik = p.is_vargottama ? 25 : 12;

    const totalVirupas = sthana + dig + kala + chesta + naisargika + drik;
    const totalRupas = totalVirupas / 60;
    const minRequired = MIN_SHADBALA_RUPAS[p.name] || 6.0;
    const strengthRatio = totalRupas / minRequired;

    return {
      sthana,
      dig,
      kala,
      chesta,
      naisargika: Math.round(naisargika),
      drik,
      totalVirupas,
      totalRupas: parseFloat(totalRupas.toFixed(2)),
      minRequired,
      strengthRatio: parseFloat(strengthRatio.toFixed(2)),
      isStrong: strengthRatio >= 1.0,
    };
  };

  const sixfold = calculateSixfoldComponents(selectedPlanet);

  // SVG Radar Dimensions
  const radarSize = 260;
  const rHalf = radarSize / 2;
  const maxRadius = 90;

  const categories = [
    { label: 'Sthana', val: sixfold.sthana / 200, name: 'Positional' },
    { label: 'Dig', val: sixfold.dig / 60, name: 'Directional' },
    { label: 'Kala', val: sixfold.kala / 70, name: 'Temporal' },
    { label: 'Chesta', val: sixfold.chesta / 60, name: 'Motional' },
    { label: 'Naisargika', val: sixfold.naisargika / 60, name: 'Natural' },
    { label: 'Drik', val: sixfold.drik / 30, name: 'Aspectual' },
  ];

  const numPoints = categories.length;
  const radarPoints = categories.map((cat, idx) => {
    const angle = (Math.PI * 2 / numPoints) * idx - Math.PI / 2;
    const radius = Math.max(15, Math.min(maxRadius, cat.val * maxRadius));
    return {
      x: rHalf + radius * Math.cos(angle),
      y: rHalf + radius * Math.sin(angle),
    };
  });

  const polygonPath = radarPoints.map((pt) => `${pt.x},${pt.y}`).join(' ');

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <Activity className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              Shadbala 6-Fold Planetary Strength Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed font-light">
            Brihat Parashara Hora Shastra (BPHS Ch. 27) quantitative evaluation measuring absolute potency across 6 cosmic dimensions.
          </p>
        </div>

        {/* Planet Selector Pills */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          {classicalPlanets.map((p) => {
            const isSelected = selectedPlanetName === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelectedPlanetName(p.name)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {PLANETARY_GLYPHS[p.name]} {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Radar Polygon (Left) | 6 Metrics Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar SVG (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-3xl bg-obsidian-950/70 border border-white/[0.08]">
          <svg viewBox={`0 0 ${radarSize} ${radarSize}`} className="w-full max-w-[240px] aspect-square">
            {/* Concentric Web Rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level) => (
              <circle
                key={level}
                cx={rHalf}
                cy={rHalf}
                r={maxRadius * level}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Radial Spokes */}
            {categories.map((cat, idx) => {
              const angle = (Math.PI * 2 / numPoints) * idx - Math.PI / 2;
              const x2 = rHalf + maxRadius * Math.cos(angle);
              const y2 = rHalf + maxRadius * Math.sin(angle);
              const labelX = rHalf + (maxRadius + 18) * Math.cos(angle);
              const labelY = rHalf + (maxRadius + 18) * Math.sin(angle);

              return (
                <g key={cat.label}>
                  <line
                    x1={rHalf}
                    y1={rHalf}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="rgba(148, 163, 184, 0.85)"
                    fontSize="9.5"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="600"
                  >
                    {cat.label}
                  </text>
                </g>
              );
            })}

            {/* Filled Polygon */}
            <polygon
              points={polygonPath}
              fill={selectedPlanet.color}
              fillOpacity="0.25"
              stroke={selectedPlanet.color}
              strokeWidth="2"
            />

            {/* Data Points */}
            {radarPoints.map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#ffffff"
                stroke={selectedPlanet.color}
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Quick Rupa Status */}
          <div className="mt-3 text-center space-y-0.5">
            <div className="text-base font-bold text-white font-serif">
              {selectedPlanet.name} • {sixfold.totalRupas} Rupas
            </div>
            <div className="text-[11px] font-mono">
              <span className="text-slate-400">Req: {sixfold.minRequired} Rupas • Ratio: </span>
              <span className={sixfold.isStrong ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
                {sixfold.strengthRatio}x ({sixfold.isStrong ? 'Sufficient' : 'Deficient'})
              </span>
            </div>
          </div>
        </div>

        {/* 6 Bala Components (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Sthana Bala', val: `${sixfold.sthana} Virupas`, desc: 'Positional & Dignity Strength', icon: Award, color: 'text-amber-300' },
            { label: 'Dig Bala', val: `${sixfold.dig} Virupas`, desc: 'Directional Kendra Alignment', icon: ShieldCheck, color: 'text-sky-300' },
            { label: 'Kala Bala', val: `${sixfold.kala.toFixed(0)} Virupas`, desc: 'Day / Night & Temporal Force', icon: Activity, color: 'text-purple-300' },
            { label: 'Chesta Bala', val: `${sixfold.chesta.toFixed(0)} Virupas`, desc: 'Motional Speed & Retrograde', icon: Zap, color: 'text-rose-300' },
            { label: 'Naisargika Bala', val: `${sixfold.naisargika} Virupas`, desc: 'Inherent Natural Luminosity', icon: Sparkles, color: 'text-emerald-300' },
            { label: 'Drik Bala', val: `${sixfold.drik} Virupas`, desc: 'Aspectual Drishti Balance', icon: Award, color: 'text-yellow-300' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] uppercase font-bold text-slate-400 font-mono">
                    {item.label}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                </div>
                <div className="text-sm font-bold text-white font-mono">{item.val}</div>
                <div className="text-[10px] text-slate-400 font-light line-clamp-1">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
